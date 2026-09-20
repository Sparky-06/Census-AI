/**
 * Census AI — Mock Reports strictly conforming to system-contract.md
 * Matches the reference design items (MG Road, Main St & 5th Ave, Central Park)
 * with accurate categories, priority scores, and timestamps.
 */

export const MOCK_REPORTS = [
  {
    id: "b02e17ac-9dd8-4a38-ba26-3dc0bfe8e9cf",
    category: "pothole",
    priority: "High",
    priority_score: 70,
    status: "reported",
    photo_url: "/demo/pothole.jpg",
    location: "MG Road near bus stop",
    description: "Large pothole causing traffic and vehicle damage",
    created_at: "2026-09-20T23:45:00Z",
    updated_at: "2026-09-20T23:45:00Z"
  },
  {
    id: "26389a85-1092-48f8-a227-88b7056abd70",
    category: "water_leak",
    priority: "Medium",
    priority_score: 65,
    status: "reported",
    photo_url: "/demo/water_leak.jpg",
    location: "Main St & 5th Ave",
    description: "Water leaking from fire hydrant",
    created_at: "2026-09-20T23:45:00Z",
    updated_at: "2026-09-20T23:45:00Z"
  },
  {
    id: "74fc76e3-e3f2-4b6e-87bf-e30b0e82c030",
    category: "garbage",
    priority: "Low",
    priority_score: 35,
    status: "reported",
    photo_url: "/demo/garbage.jpg",
    location: "Central Park entrance",
    description: "Overflowing trash bin causing foul smell",
    created_at: "2026-09-20T23:45:00Z",
    updated_at: "2026-09-20T23:45:00Z"
  }
];
