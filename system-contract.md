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

If a track needs a category or status not on this list, that's a contract
change — raise it with the team, add it here, then build against it.
Nobody invents a new enum value silently.

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
`priority_score` descending (highest priority first). If your team
changes the sort order, update this line first.

### `GET /api/reports/:id`
Returns a single report by id. Optional for MVP — include if any track
needs a detail view.

Response: `200 OK` with one Incident object, or `404 Not Found` (see §5)
if the id doesn't exist.

### `PATCH /api/reports/:id` (optional — only if a status-update workflow is in scope)
Request body: `{ "status": "assigned" }` — only `status` may be updated
this way for the MVP.
Response: `200 OK` with the full updated Incident object.

**No other endpoints exist unless added here first.** If your track needs
a new endpoint, write its method, path, request shape, and response shape
into this section before building it, so everyone sees the same version.

## 4. Server basics every consumer can rely on
- **Base URL:** `http://localhost:<PORT>` — write the actual port here
  once decided, e.g. `http://localhost:4000`, so nobody guesses.
- **CORS:** open (`*`) for local development. No auth headers required
  for this MVP.
- **Content type:** all responses are `application/json` except the
  `POST /api/reports` request, which is `multipart/form-data`.

## 5. Error format (applies to every endpoint)
Any failure returns this shape, not a bare string or HTML error page:
```json
{
  "error": "human-readable message",
  "code": "SHORT_MACHINE_CODE"
}
```
Standard HTTP status codes apply: `400` for bad input (e.g. missing
photo), `404` for a missing id, `500` for server-side failure. Every
consumer should check `response.ok` / status code before reading the
body as a success object.

## 6. File uploads
- Field name is always `photo` — not `image`, not `file`.
- Accepted types: `image/jpeg`, `image/png`.
- No enforced size limit for the demo, but keep test images under 5MB
  so uploads stay fast.
- The server is responsible for turning the uploaded file into a
  `photo_url` that any frontend can load directly — consumers never
  handle raw file bytes themselves.

## 7. What is explicitly NOT part of this contract
To avoid scope creep multiplying across people, the following are
out of scope for every track unless the team deliberately adds them here:
- Authentication / user identity of any kind
- Pagination, filtering, or search query parameters on `GET /api/reports`
- Websockets / real-time push (poll `GET /api/reports` on an interval or
  a manual refresh button instead)
- Soft deletes or an audit log

## 8. Integration checklist (run before every demo or merge)
- [ ] Every field name in every request/response matches §2 exactly —
      no `desc` vs `description`, no `photoUrl` vs `photo_url`
- [ ] Every enum value used anywhere matches the fixed lists in §2
      exactly, including case
- [ ] Timestamps are ISO 8601 strings everywhere, not epoch numbers
- [ ] The base URL and port in §4 match what the backend is actually
      running on
- [ ] Errors are handled using the shape in §5, not left to crash the UI
- [ ] Anyone who changed a field, endpoint, or enum updated this file
      and told the team **before** merging their code

## 9. Change process
This file is versioned like code. To change it:
1. Propose the change to the team (a message is enough for a 3-person
   team; a PR comment for a larger one).
2. Get a quick yes from whoever's work touches that part of the contract.
3. Update this file.
4. Only then update your implementation.

This ordering — contract first, code second — is the entire reason this
approach scales from 3 people to 30: nobody is ever integrating against
a guess.
