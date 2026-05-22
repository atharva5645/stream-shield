# Admin Panel Implementation Plan

## Scope

Build a complete modern SaaS-style admin panel for the video management platform with:

1. Admin Dashboard
2. User Management
3. Tenant Management
4. Moderation Panel
5. Analytics Dashboard
6. System Settings

## Architecture

### Shared UI

- `frontend/src/components/admin/AdminShell.jsx`
  - Standard page hero, header, and action area.
- `frontend/src/components/admin/StatCard.jsx`
  - Reusable KPI cards.
- `frontend/src/components/admin/AdminTable.jsx`
  - Shared table with badge states and row actions.
- `frontend/src/components/admin/SimpleBarChart.jsx`
  - Lightweight bar chart component.
- `frontend/src/components/admin/SimpleLineChart.jsx`
  - Lightweight SVG line chart component.
- `frontend/src/components/admin/ActivityFeedCard.jsx`
  - Shared activity feed block.

### Mock Data Layer

- `frontend/src/data/adminMockData.js`
  - Centralized users, tenants, moderation items, analytics series, and activity feed data.

## Page Plan

### 1. Admin Dashboard

- KPI overview cards
- Upload velocity chart
- Activity feed
- Tenant health table
- Moderation pressure table
- Quick navigation tiles

### 2. User Management

- Create user form
- Reusable management table
- Edit role action
- Suspend user action
- Delete user action

### 3. Tenant Management

- Create organization form
- Assign user action
- Tenant analytics chart
- Tenant table with plan, users, storage, uploads, health

### 4. Moderation Panel

- Review counters
- Flagged content table
- Approve action
- Reject action
- Sensitivity score visibility

### 5. Analytics Dashboard

- Uploads/day cards and charts
- Storage usage visualization
- Active streams and user activity KPIs
- Flagged ratio KPI
- Activity feed

### 6. System Settings

- Platform controls
- Security controls
- Alert preferences
- API key management

## Routing

- Add `/admin/analytics`
- Add analytics item to admin sidebar
- Keep shared viewer/editor settings separate from admin settings

## Verification

- Run `npm run build`
- Confirm all admin routes render
- Confirm user actions update local page state
- Confirm no regressions to viewer/editor settings routes
