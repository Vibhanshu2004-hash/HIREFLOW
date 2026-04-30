# HireFlow Frontend

HireFlow is a production-style job portal frontend built with Next.js App Router, Tailwind CSS, and Axios. It includes job discovery, authentication, saved jobs, application submission, and an application tracking dashboard.

## Updated Folder Structure

```text
frontend/
  src/
    app/
      dashboard/page.tsx
      jobs/page.tsx
      login/page.tsx
      register/page.tsx
      globals.css
      layout.tsx
      page.tsx
    components/
      ApplicationCard.tsx
      AuthForm.tsx
      Button.tsx
      Container.tsx
      EmptyState.tsx
      Icon.tsx
      JobCard.tsx
      Navbar.tsx
      SectionHeader.tsx
      StatCard.tsx
      StatusBadge.tsx
      StatusTimeline.tsx
    hooks/
      useAuth.ts
      useJobs.ts
      useSavedJobs.ts
    services/
      authService.ts
      jobService.ts
      savedJobsService.ts
    utils/
      dummyData.ts
      status.ts
    lib/
      types.ts
```

## Product Features

- Modern SaaS-style UI with custom forest/amber/coral palette
- Responsive home, auth, jobs, and dashboard pages
- Axios service layer for backend API calls
- JWT token storage and automatic bearer token headers
- Saved jobs with local persistence
- Application tracking timeline: `Applied -> Under Review -> Shortlisted -> Rejected`
- Dashboard metrics for total applications, active jobs, and saved jobs
- Empty states, loading states, and clear success/error messages
- Demo jobs fallback when the backend is unavailable

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
copy .env.example .env.local
```

3. Set the backend API URL in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Build and run:

```bash
npm run build
npm run start
```

The app runs at `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Backend API Contract

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/jobs
POST /api/apply
GET  /api/applications
```

Protected requests require:

```text
Authorization: Bearer <token>
```

Backend statuses are normalized in the UI. Current backend statuses are `applied`, `shortlisted`, and `rejected`; adding `under_review` later will automatically display as `Under Review`.
