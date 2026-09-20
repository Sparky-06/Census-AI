/**
 * Census AI — Canonical Contract Constants & Type Definitions
 * Strict adherence to system-contract.md
 * 
 * DO NOT MODIFY FIELD NAMES OR ENUM VALUES.
 */

export const CATEGORIES = {
  POTHOLE: 'pothole',
  GARBAGE: 'garbage',
  DRAINAGE: 'drainage',
  STREETLIGHT: 'streetlight',
  WATER_LEAK: 'water_leak',
  OTHER: 'other',
};

export const PRIORITIES = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const STATUSES = {
  REPORTED: 'reported',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  VERIFIED: 'verified',
};

export const CATEGORY_LABELS = {
  [CATEGORIES.POTHOLE]: 'Pothole',
  [CATEGORIES.GARBAGE]: 'Garbage',
  [CATEGORIES.DRAINAGE]: 'Drainage',
  [CATEGORIES.STREETLIGHT]: 'Streetlight',
  [CATEGORIES.WATER_LEAK]: 'Water Leak',
  [CATEGORIES.OTHER]: 'Other',
};
