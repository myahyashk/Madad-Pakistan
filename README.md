# FloodAids Pakistan

Offline-first flood relief coordination portal for public aid requests, field teams, NGOs, government schemes, private donors, and administrators.

This repository currently runs as a complete localhost demo. It includes seeded mock data, role-based demo access, IndexedDB field storage, local mock API persistence, biometric duplicate checks, and a documented path to a real backend.

## Quick Start

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:3000/`. If that port is busy, Vite selects the next available port.

Production checks:

```bash
npm run lint
npm run build
```

## Demo Access

The public portal opens without login. Use **Team login** in the header for protected workspaces.

| Role | Email | Password | Access |
| --- | --- | --- | --- |
| Admin | `admin@floodaids.local` | `admin123` | All household verification, team directory, donor contacts, and assignments |
| NGO | `ngo@prcs.local` | `ngo123` | PRCS organization-scoped records |
| Government | `government@pdma.local` | `gov123` | PDMA government-scheme records |
| Private donor | `donor@community.local` | `donor123` | Own contribution feed and dummy donation form |
| Field team | `team.dadu@prcs.local` | `team123` | Team-scoped survey and aid-provided upload workspace |

The accounts are local demo identities, not real email accounts.

## Main Workspaces

### Public portal

Public users can browse relief zones, shelters, stories, achievements, and the public ledger without entering an email. They can also submit an emergency aid request.

### Admin Control Room

Admins can review all organization records, household status, verification state, team contacts, portal names, capabilities, current tasks, donor contacts, and demo task assignments. Admin users do not see donor contribution controls.

### Organization Dashboard

NGO and government users only see records filtered by their `organizationId`. Team and area metadata further scopes field operations.

### Private Donor Dashboard

Donors only see their own contribution history, target areas, purposes, statuses, total PKR, and the responsive dummy contribution form.

### Team Workspace

Field teams only see submissions for their `teamId`. They can upload:

- Household surveys
- Aid-provided reports
- Household name and village
- Family size and home status
- Items provided and field notes

## Data Storage

### Local field storage

- Household records: browser `IndexedDB`, database `FloodAidsFieldDB_v1`, store `beneficiaries`.
- Offline upload queue: IndexedDB `syncQueue`, records marked `pending_cloud_sync`.
- Biometric and audit blocks: IndexedDB `tamperBlocks`.
- Cryptographic verification: SHA-256 block integrity before reconciliation.

### Local mock backend

- Partner/admin household data: `localStorage` key `floodaids-demo-beneficiaries-v1`.
- Donor contributions: `localStorage` key `floodaids-demo-donations-v1`.
- Team survey and aid reports: `localStorage` key `floodaids-demo-team-submissions-v1`.
- Login session: `localStorage` key `floodaids-demo-session`.

The local mock data survives page refreshes in the same browser profile.

## Sync Flow

1. A field worker submits a household record.
2. The record is written to IndexedDB and queued as `pending_cloud_sync`.
3. Offline mode keeps the record on the device and can broadcast it over the local P2P mesh.
4. When the device returns online, the SHA-256 block is verified.
5. The record is sent to the configured backend and marked `synced` locally.
6. Without `VITE_API_BASE_URL`, the same operation is simulated through localStorage.

Donor and team dashboards perform live-style refreshes through the same adapter. In demo mode those requests read localStorage; in real mode they use the API below.

## Backend API Contract

Set an API base URL to replace the mock adapter:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

Expected endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/beneficiaries` | Sync a verified field disbursement |
| `GET` | `/api/admin/beneficiaries` | Admin-only cross-organization records |
| `PATCH` | `/api/admin/beneficiaries/:recordId/verification` | Update home and verification status |
| `GET` | `/api/donors/:organizationId/contributions` | Donor-scoped contribution feed |
| `POST` | `/api/donations` | Create a donor contribution |
| `GET` | `/api/teams/:teamId/submissions` | Team-scoped field submissions |
| `POST` | `/api/team-submissions` | Upload a survey or aid-provided report |

## Authorization Requirements

The current login is deliberately dummy/local for demonstration. A production backend must enforce authorization on the server, not rely on frontend filtering.

- Admin: access to all operational records and assignment tools.
- NGO, government, private donor: access only to their own `organizationId`.
- Field team: access only to its `teamId` and assigned `areaId`.
- Public users: no private dashboard or organization data.
- Duplicate aid: enforce unique identity/CNIC rules and biometric review across organizations.
- Donor privacy: keep contribution history separate from admin household data unless explicit audit permission exists.

## Project Structure

```text
src/
  backend/          Mock/real API adapter
  components/       Navigation, field terminal, forms, and shared UI
  data/             Relief data and team/donor directory fixtures
  engine/           IndexedDB, cloud sync, biometrics, crypto, and P2P mesh
  pages/            Public, admin, donor, organization, and team workspaces
  store/            Zustand auth, language, image, and field-worker state
  types/            Relief access, household, donor, and team contracts
```

## Important Note

This is a working localhost demonstration, not a production humanitarian data system. Do not place real CNICs, biometric photos, donor payment details, or beneficiary PII in mock storage. Before deployment, add real authentication, HTTPS, encrypted storage, server-side authorization, audit logging, data retention rules, and a protected database.

## Technologies Used

### Languages and platform

- **TypeScript:** application logic, data contracts, stores, API adapter, and type-safe React components.
- **TSX:** React page and component UI files.
- **CSS:** Tailwind utility classes and existing stylesheet rules.
- **English and Urdu:** the interface supports `en` and `ur`. Urdu switches the document to right-to-left layout.
- **HTML:** Vite entry document and browser application shell.

### Frontend libraries

- **React 19:** component-based UI and page rendering.
- **React DOM:** browser mounting in `src/main.tsx`.
- **Zustand:** auth, language, image, and field-worker state management.
- **Lucide React:** interface icons.
- **Tailwind CSS 4:** responsive layout and visual styling through the Vite plugin.
- **Vite:** development server, module bundling, and production build.
- **TypeScript compiler:** strict type checking with `npm run lint`.

### Browser APIs and local engines

- **IndexedDB:** offline household records, sync queue, and tamper blocks.
- **localStorage:** demo session, language preference, mock partner records, donor contributions, and team submissions.
- **Web Crypto API:** SHA-256 hashes for tamper-evident record blocks.
- **Canvas API:** local perceptual face hash generation from a captured image.
- **BroadcastChannel:** local browser-tab P2P disbursement event sharing.
- **Service Worker and Background Sync:** registered as an offline reconciliation enhancement when the browser supports it.
- **Fetch API:** calls the configured real backend or the local mock adapter.

### Not currently used

- **MongoDB:** not installed or connected in this repository.
- **Supabase:** not installed or connected in this repository.
- **Firebase:** not installed or connected in this repository.
- **Express/NestJS backend:** no server project exists in this repository yet.
- **Real OAuth/JWT authentication:** demo login is local only.
- **Real Bluetooth mesh:** Web Bluetooth is a conceptual fallback path; the working browser demo uses BroadcastChannel and IndexedDB.

To use MongoDB, Supabase, or another database in production, implement the API contract in a separate protected backend and set `VITE_API_BASE_URL` in the frontend.

## Problem and Solution Mapping

### 1. Duplicate aid and unfair distribution

**Problem:** A family could appear under different names or through different organizations and receive aid more than once.

**Implemented solution:**

- CNIC/token comparison before disbursement.
- Face perceptual hash comparison through `checkDuplicateFace`.
- Duplicate checks include locally stored and P2P-replicated records, not only the active team's visible records.
- Organization/team filtering controls visibility, while the duplicate scan remains cross-organization on the local device.
- An alert shows the matched household, previous package, organization, worker, and village.
- The backend contract must repeat these checks centrally when records are online.

**Important limitation:** A client-side biometric hash is an anti-duplication aid, not proof of identity. Production use needs consent, biometric security, human review, false-match handling, and legal/privacy controls.

### 2. Lost CNICs and household documents

**Problem:** Floods can destroy CNICs, paper lists, and home records.

**Implemented solution:**

- CNIC is optional in the field registration flow.
- When a CNIC is unavailable, the app creates an emergency token.
- `BiometricCapture` creates a local perceptual face hash and vector digest using Canvas and SHA-256.
- The record also stores village, household size, needs, damage level, and field worker details.
- The worker can save this information offline in IndexedDB.

**Important limitation:** The demo stores no real biometric protection beyond the application hash flow. Production must encrypt biometric data, minimize retention, obtain consent, and avoid treating face matching as infallible.

### 3. NGOs, government, and donors not sharing lists

**Problem:** Different partners may maintain separate lists and cannot coordinate in a remote village.

**Implemented solution:**

- Every record carries `organizationType`, `organizationId`, `teamId`, and `areaId`.
- Each partner sees only its own organization scope.
- The global duplicate scan still compares records received through the local mesh.
- `BroadcastChannel` shares disbursement events between open browser contexts.
- Offline records enter the sync queue and reconcile when connectivity returns.
- Admin has a consolidated operational view for verification and team assignment.

**Important limitation:** BroadcastChannel works between browser contexts on the same origin/device environment. It is not a complete multi-device Bluetooth network. A production deployment needs an authenticated P2P/BLE transport or a backend gateway.

### 4. Political pressure, fake entries, and record manipulation

**Problem:** Field workers, local leaders, or political pressure can influence lists and reported numbers.

**Implemented solution:**

- Each disbursement creates a SHA-256 tamper-evident block.
- Blocks link to the previous block hash.
- P2P packets are verified before accepted records are stored.
- Cloud reconciliation verifies the block before upload.
- Admin can see organization, team, area, worker, household, verification, and home-status metadata.
- The admin page provides explicit verification states: pending, needs review, verified, and rejected.

**Important limitation:** Hashing detects changes; it does not stop a privileged user from deleting a local browser database or entering false data before hashing. Production needs an append-only server audit log, signed identities, role permissions, independent review, and immutable backups.

### 5. Weak infrastructure, no smartphones, power cuts, and no signal

**Problem:** Remote communities may have no reliable electricity, internet, mobile signal, literacy access, or smartphones.

**Implemented solution:**

- Field records are saved first to IndexedDB without internet.
- Offline mode can continue registration and aid disbursement.
- P2P event replication helps nearby field contexts share disbursement information.
- A service worker and Background Sync are registered where supported.
- The public portal does not require login or email.
- Team accounts have a simple upload workspace for survey and aid-provided reports.
- The interface supports Urdu and right-to-left layout.

**Important limitation:** This browser demo still requires a device capable of running the web app. A production solution would need Android/PWA packaging, device testing, low-literacy UX, power-bank procedures, local-language training, and a reliable physical data exchange plan.

### 6. Fairness, transparency, and donor trust

**Problem:** Donors and auditors need to know where aid goes without exposing private data to every user.

**Implemented solution:**

- Admin has household verification and team assignment controls.
- Donors see only their own contribution feed, target area, purpose, PKR amount, and status.
- NGOs, government users, and teams have separate organization/team dashboards.
- Public users see the public ledger and impact pages, not private operational records.
- Local records have sync states and cryptographic verification details.

**Important limitation:** The current login and mock storage are not production security. Real donor privacy requires backend authentication, authorization, encryption, payment verification, and server-side row-level access rules.

## End-to-End Workflow

1. A public user opens the portal without login and can request emergency help.
2. An admin reviews incoming operational records and assigns an area/task to a team.
3. A team logs in and uploads a household survey or aid-provided report.
4. A field worker registers a household, using CNIC when available or an emergency token plus biometric fallback when it is not.
5. The local device checks CNIC and face-hash duplicates against all records available on that device.
6. If no duplicate is detected, the app creates a tamper-evident block and saves the record to IndexedDB.
7. The worker can continue while offline. Nearby browser contexts can receive a disbursement event through BroadcastChannel.
8. When online mode is restored, pending records are integrity-checked and sent through the API adapter.
9. The mock adapter writes to localStorage when no API URL exists; a real backend receives the same endpoint requests when `VITE_API_BASE_URL` is configured.
10. Admin verifies home status and record status, while each partner and team continues to see only its own authorized scope.

## Repository Map

- `src/App.tsx`: public shell, role routing, login gate, and modal state.
- `src/pages/`: public portal, admin, donor, organization, team, and field-worker workspaces.
- `src/components/`: reusable portal UI, navigation, forms, field terminal, and donation UI.
- `src/store/`: Zustand auth, language, images, and field-worker state.
- `src/backend/reliefApi.ts`: mock API and real REST API adapter.
- `src/engine/offlineDb.ts`: IndexedDB records, tamper blocks, and sync queue.
- `src/engine/cloudSync.ts`: online reconciliation and integrity checks.
- `src/engine/biometrics.ts`: face hash and duplicate matching logic.
- `src/engine/crypto.ts`: SHA-256 block creation and verification.
- `src/engine/p2pSync.ts`: BroadcastChannel disbursement replication.
- `src/data/portalDirectory.ts`: dummy team and donor contacts, capabilities, and assignments.
- `src/locales/translations.ts`: English and Urdu translations.
