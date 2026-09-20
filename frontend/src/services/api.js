import { MOCK_REPORTS } from '../data/mockReports';

// Base URL configuration (from env or default localhost:4000)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Initial mock mode setting (defaults to true if unset, or respects VITE_USE_MOCK_DATA)
export const DEFAULT_USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== undefined
  ? import.meta.env.VITE_USE_MOCK_DATA === 'true'
  : false;

/**
 * Format photo URL to ensure valid loading from backend or high-res static assets
 */
export function formatPhotoUrl(url, category = 'other') {
  if (!url) {
    return getCategoryFallback(category);
  }

  // Handle seed images from backend to provide high-res reference visuals
  if (url.includes('seed1.jpg')) {
    return '/demo/pothole.jpg';
  }
  if (url.includes('seed2.jpg')) {
    return '/demo/garbage.jpg';
  }
  if (url.includes('seed3.jpg')) {
    return '/demo/water_leak.jpg';
  }

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const cleanBase = API_BASE_URL.replace(/\/$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBase}${cleanPath}`;
}

export function getCategoryFallback(category) {
  switch (category) {
    case 'pothole':
      return '/demo/pothole.jpg';
    case 'water_leak':
      return '/demo/water_leak.jpg';
    case 'garbage':
      return '/demo/garbage.jpg';
    case 'streetlight':
      return '/demo/streetlight.svg';
    case 'drainage':
      return '/demo/drainage.svg';
    default:
      return '/demo/pothole.jpg';
  }
}

/**
 * Fetch all civic reports
 * Contract: GET /api/reports
 * Returns: Array of canonical Incident objects sorted by priority_score DESC
 */
export async function fetchReports({ useMock = false } = {}) {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const sorted = [...MOCK_REPORTS].sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
    return {
      data: sorted,
      isMock: true,
      error: null,
    };
  }

  try {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/reports`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      let errorCode = 'HTTP_ERROR';

      try {
        const errJson = await response.json();
        if (errJson.error) errorMessage = errJson.error;
        if (errJson.code) errorCode = errJson.code;
      } catch {
        // Non-JSON
      }

      return {
        data: [],
        isMock: false,
        error: { message: errorMessage, code: errorCode },
      };
    }

    const json = await response.json();

    if (!Array.isArray(json)) {
      return {
        data: [],
        isMock: false,
        error: {
          message: 'Malformed response: Expected an array of incident reports',
          code: 'INVALID_DATA_FORMAT',
        },
      };
    }

    // Ensure reports are sorted by priority_score DESCENDING
    const sorted = [...json].sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));

    return {
      data: sorted,
      isMock: false,
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      isMock: false,
      error: {
        message: err.message || 'Unable to connect to backend server at ' + API_BASE_URL,
        code: 'NETWORK_ERROR',
      },
    };
  }
}

/**
 * Fetch single report by ID
 * Contract: GET /api/reports/{id}
 */
export async function fetchReportById(id, { useMock = false } = {}) {
  if (!id) {
    return {
      data: null,
      isMock: useMock,
      error: { message: 'Complaint ID is required', code: 'VALIDATION_ERROR' },
    };
  }

  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const found = MOCK_REPORTS.find((r) => r.id === id || r.id.toLowerCase() === id.toLowerCase());
    if (found) {
      return { data: found, isMock: true, error: null };
    }
    return {
      data: null,
      isMock: true,
      error: { message: `Report with ID "${id}" was not found in demo records`, code: 'REPORT_NOT_FOUND' },
    };
  }

  try {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/reports/${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = `Report not found (Status ${response.status})`;
      let errorCode = 'REPORT_NOT_FOUND';

      try {
        const errJson = await response.json();
        if (errJson.error) errorMessage = errJson.error;
        if (errJson.code) errorCode = errJson.code;
      } catch {
        // Non-JSON
      }

      return {
        data: null,
        isMock: false,
        error: { message: errorMessage, code: errorCode },
      };
    }

    const report = await response.json();
    return {
      data: report,
      isMock: false,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      isMock: false,
      error: {
        message: err.message || 'Unable to fetch report from server.',
        code: 'NETWORK_ERROR',
      },
    };
  }
}

/**
 * Create a new report
 * Contract: POST /api/reports
 */
export async function createReport(formData, { useMock = false } = {}) {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const location = formData.get('location') || 'Unspecified Location';
    const description = formData.get('description') || '';
    const photoFile = formData.get('photo');

    let previewUrl = '/demo/pothole.jpg';
    if (photoFile && typeof photoFile !== 'string') {
      try {
        previewUrl = URL.createObjectURL(photoFile);
      } catch {
        previewUrl = '/demo/pothole.jpg';
      }
    }

    const mockNewReport = {
      id: `demo-${Date.now().toString(36)}`,
      category: 'pothole',
      priority: 'High',
      priority_score: 82,
      status: 'reported',
      photo_url: previewUrl,
      location,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    MOCK_REPORTS.unshift(mockNewReport);

    return {
      data: mockNewReport,
      isMock: true,
      error: null,
    };
  }

  try {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/api/reports`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Submission failed (HTTP ${response.status})`;
      let errorCode = 'SUBMISSION_ERROR';

      try {
        const errJson = await response.json();
        if (errJson.error) errorMessage = errJson.error;
        if (errJson.code) errorCode = errJson.code;
      } catch {
        // Non-JSON
      }

      return {
        data: null,
        isMock: false,
        error: { message: errorMessage, code: errorCode },
      };
    }

    const created = await response.json();
    return {
      data: created,
      isMock: false,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      isMock: false,
      error: {
        message: err.message || 'Network error during complaint submission.',
        code: 'NETWORK_ERROR',
      },
    };
  }
}
