# Census AI — Shared System Contract

**This file is the single source of truth for the project.** Every person,
on every track, builds against this file — not against what someone said
in chat, not against what feels right in the moment. If code and this file
disagree, the file wins until the team agrees to change the file.

Rule for everyone: **if you need to add, rename, or remove a field, edit
this file first and tell the team, then change your code.** Never do it
the other way around. This one habit is what keeps N people's code
integrating smoothly, whether N is 3 or 30.

---

## 1. Naming convention (applies everywhere)
- **JSON fields:** `snake_case` always — `photo_url`, `priority_score`,
  `created_at`. Never mix in `camelCase` fields.
- **URL paths:** lowercase, plural nouns — `/api/reports`, not
  `/api/Report` or `/api/getReports`.
- **Enum values:** lowercase with underscores — `water_leak`, not
  `WaterLeak` or `Water Leak`.
- **IDs:** always strings, never assume they're numeric or sequential.
- **Timestamps:** always ISO 8601 UTC strings —
  `"2026-09-20T14:30:00Z"`. Never Unix epoch, never localized formats.

## 2. The canonical Incident object
Every endpoint that returns a report returns **exactly this shape**. No
endpoint may add, rename, or omit fields without this file being updated
first.

```json
{
  "id": "string",
  "category": "pothole | garbage | drainage | streetlight | water_leak | other",
  "priority": "High | Medium | Low",
  "priority_score": 0,
  "status": "reported | assigned | in_progress | resolved | verified",
  "photo_url": "string",
  "location": "string",
  "description": "string",
  "created_at": "ISO8601 timestamp",
  "updated_at": "ISO8601 timestamp"
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Server-generated, never set by the client |
| `category` | enum | Fixed list above — no free text, ever |
| `priority` | enum | Human-readable label, derived from `priority_score` |
| `priority_score` | integer 0–100 | Higher = more urgent |
| `status` | enum | Fixed list above — this is the full lifecycle, even if this build only uses `reported` |
| `photo_url` | string | A URL the frontend can load directly in an `<img>` tag |
| `location` | string | Free text for MVP (e.g. "MG Road near bus stop") |
| `description` | string | May be empty string, never `null` |
| `created_at` | string | Set once, by the server, on creation |
| `updated_at` | string | Set by the server on every change; equals `created_at` if never updated |

**Enum lock-in:**
- `category`: `pothole`, `garbage`, `drainage`, `streetlight`, `water_leak`, `other`
- `priority`: `High`, `Medium`, `Low`
- `status`: `reported`, `assigned`, `in_progress`, `resolved`, `verified`

## 3. Endpoints

### `POST /api/reports`
Creates a new report. Called by the citizen-facing form.

Request: `multipart/form-data`
```
photo: <file>              required
location: string           required
description: string        optional, default ""
```

Response: `201 Created`, body = one Incident object (see §2), with
`status` always `"reported"` and `priority`/`priority_score` computed
by the server before responding.

### `GET /api/reports`
Returns all reports. Called by the dashboard.

Response: `200 OK`, body = array of Incident objects, sorted by
`priority_score` descending (highest priority first).

### `GET /api/reports/:id`
Returns a single report by id. Optional for MVP — include if any track
needs a detail view.

Response: `200 OK` with one Incident object, or `404 Not Found` (see §5)
if the id doesn't exist.

### `PATCH /api/reports/:id` (optional)
Request body: `{ "status": "assigned" }`
Response: `200 OK` with the full updated Incident object.

## 4. Server basics every consumer can rely on
- **Base URL:** `http://localhost:4000`
- **CORS:** open (`*`) for local development.
- **Content type:** all responses are `application/json` except `POST /api/reports` which is `multipart/form-data`.

## 5. Error format (applies to every endpoint)
```json
{
  "error": "human-readable message",
  "code": "SHORT_MACHINE_CODE"
}
```
