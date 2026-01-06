# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Purpose

This repository contains the frontend for the **UI UX Pro Max Skill**  customs client app, which integrates with a FastAPI + PyView backend.

Claude should:

- Prioritize high-quality UI/UX, accessibility, and responsive layouts.
- Generate production-ready React + TypeScript code using Vite + Tailwind + shadcn/ui.
- Design UI pages based on backend API contracts documented in `backend.md`.
- Avoid large rewrites unless explicitly requested; prefer small, focused changes.

---

## Commands

### Install Dependencies

To install project dependencies:

```bash
pnpm install
```

### Start Development Server

To start the development server with Hot Module Replacement (HMR):

```bash
pnpm run dev
```

### Build for Production

To create a production-ready build of the application:

```bash
pnpm run build
```

### Lint Code

To lint the codebase using ESLint:

```bash
pnpm run lint
```

### Preview Production Build

To serve the compiled production build locally for testing:

```bash
pnpm run preview
```

**Note on Testing:** There are no explicit commands for running tests defined in `package.json`. A separate test runner (e.g., Vitest, Jest) would typically be configured for this.

---

## High-Level Code Architecture and Structure

This is a React and TypeScript frontend web application, built with Vite and using `pnpm` for package management. It leverages `shadcn/ui` for its component library, which integrates Radix UI and Tailwind CSS for styling.

### Core Structure

- **Entry Point**: The `index.html` file serves as the main HTML file, loading the React application mounted by `src/main.tsx`.
- **Root Component**: `src/App.tsx` is the primary application component.
- **Components**: Reusable UI elements and application-specific components are organized within `src/components/`. Specifically, `src/components/ui/` houses components from `shadcn/ui` or their local adaptations.
- **Hooks**: Custom React hooks for encapsulating reusable logic are found in `src/hooks/`.
- **Utilities**: General utility functions are located in `src/lib/`.
- **Styling**: Tailwind CSS is used for styling, with `src/index.css` as the main stylesheet.
- **Build Tooling**: Vite is used for fast development and optimized production builds. TypeScript is used throughout the codebase for type safety.

### Important Configuration Files

- `package.json`: Defines project metadata, scripts, and dependencies.
- `pnpm-lock.yaml`: Lock file for `pnpm` package manager.
- `vite.config.ts`: Configuration file for Vite.
- `tsconfig*.json`: TypeScript configuration files.
- `eslint.config.js`: ESLint configuration for code linting.
- `components.json`: Configuration for `shadcn/ui`.

---

## Files and Directories of Interest

When navigating and editing this codebase, Claude should pay special attention to:

- `src/App.tsx`: Main app shell and routing entry.
- `src/components/`: App-specific reusable components.
- `src/components/ui/`: shadcn/ui-based primitives. Prefer extending these instead of creating ad-hoc UI from scratch.
- `src/hooks/`: Custom React hooks. Put reusable stateful logic here.
- `src/lib/`: Utilities and shared helpers (keep UI-free).
- `src/types/api.ts`: TypeScript type definitions for backend API contracts.
- `src/index.css`: Global Tailwind layers and design tokens.

When editing:

- Prefer updating or composing existing components in `src/components/` over duplicating logic.
- Avoid unnecessary changes to tooling files (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`) unless the task explicitly requires it.
- Keep the file and folder structure stable unless a refactor is explicitly requested.

---

## Backend API Reference

This frontend integrates with a **FastAPI + PyView backend**. All API contracts, endpoint definitions, and data models are documented in `backend.md`.

**Claude's role:** Design UI pages and components that properly consume the backend APIs. Focus on frontend UX and do not worry about backend implementation.

### When Designing Any Page with API Integration

Claude **MUST**:

1. **Read `backend.md`** to understand what endpoints and data are available
2. Extract the endpoint path, HTTP method, request parameters, and response schema
3. Check `src/types/api.ts` for corresponding TypeScript type definitions
4. Design the UI to match the backend contract exactly (use correct field names, required/optional fields, error handling, etc.)

### Common API Response Pattern

All API endpoints follow this structure:

```json
{
  "code": 200,
  "message": "Success",
  "data": T, // 具体的业务数据模型
  "timestamp": "YYYY-MM-DDTHH:MM:SS.ffffff"
}
```

### Key Reference Files

- **`backend.md`**: Complete API documentation with all endpoints, request/response schemas, and examples (read first when designing pages with API calls!)
- **`src/types/api.ts`**: TypeScript interfaces matching backend Pydantic models—use for type safety
- **`src/hooks/`**: Custom hooks for data fetching and state management
- **`src/lib/`**: Shared utilities and API client helpers

---

## Coding and UI/UX Guidelines

### Language & Framework

- Use modern React function components and hooks.
- Use TypeScript everywhere. Add or keep explicit types for public APIs, hooks, and complex props.
- Prefer composition over inheritance and heavy prop drilling.
- Keep components focused: UI in components, business logic in hooks or utilities where appropriate.

### shadcn/ui & Tailwind

- Use components from `src/components/ui/` as the first choice for buttons, inputs, dialogs, etc.
- Keep Tailwind class lists clear and grouped in a consistent order:
  - Layout → spacing → typography → color → borders → effects → animation.
- Avoid inline `style` unless strictly necessary; use Tailwind utilities or component props.
- Reuse existing design tokens and classes defined in `src/index.css` or configuration files.

### State & Data Flow

- Prefer local component state (`useState`, `useReducer`) for UI concerns.
- Extract complex or shared logic into custom hooks in `src/hooks/`.
- Avoid introducing new global state management libraries without explicit instruction.
- Keep props surfaces small and documented for key components.

### Accessibility

- Preserve and use Radix/shadcn accessibility features (roles, aria attributes, focus management).
- Ensure sufficient color contrast and visible focus states on interactive elements.
- All interactive elements must be keyboard accessible (Tab/Shift+Tab, Enter/Space where appropriate).
- Provide meaningful `aria-label`s and `alt` text for icons and images where applicable.

### UI Behavior and UX Details

- Favor small, meaningful animations (e.g. `transition-colors`, `transition-transform` with 150–250ms duration).
- Handle loading, empty, and error states for any non-trivial view or data fetch.
- Maintain visual consistency with existing components and pages (spacing, typography, radii, shadows).
- Avoid clutter; prioritize clear hierarchy, alignment, and whitespace.

---

## Frontend-Backend Contract Rules

**Follow these rules to ensure UI pages correctly integrate with backend APIs.**

### Before Designing a Page That Calls APIs

1. **Read the relevant endpoint(s) in `backend.md`** — Understand the exact request/response schema
2. **Reference `src/types/api.ts`** — Use the corresponding TypeScript types for the component props and state
3. **Ask for clarification** if the endpoint behavior is ambiguous or if you need to design an error flow

### Common Mistakes to Avoid

- ❌ Using incorrect endpoint paths or HTTP methods (always check `backend.md`)
- ❌ Assuming response shapes without verifying in `backend.md`
- ❌ Missing required query parameters, headers, or request body fields
- ❌ Not handling loading, error, and empty states during API calls
- ❌ Hardcoding API base URL (use environment variables like `VITE_API_BASE_URL`)
- ❌ Ignoring error response messages or not displaying them to users

### Example: Correct API Integration Pattern

When designing a component that fetches data:

```typescript
// ✅ Correct: Check backend.md, use types from src/types/api.ts
import { ApiResponse, User } from '@/types/api';

// Component properly handles all states
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/users/list`);
        const result: ApiResponse<User[]> = await response.json();
        
        if (result.success) {
          setUsers(result.data);
        } else {
          setError(result.error);
        }
      } catch (e) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Render with loading, error, and empty states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No users found</div>;
  
  return <div>{/* render users */}</div>;
};
```

### Data Type Synchronization

- Backend models (Pydantic) have corresponding TypeScript interfaces in `src/types/api.ts`
- Always use these types when building components
- Field names, types, and nullability must match `backend.md` exactly

---

## Recommended Workflow for Claude

When implementing a feature or refactor, Claude should follow this workflow:

1. **Plan First**

   - Read the relevant files in `src/` and outline a short plan in Markdown.
   - If the feature involves API calls, read `backend.md` and identify the relevant endpoints.
   - Summarize the current behavior and the intended change.
   - For larger changes, seek confirmation on the plan before making extensive edits.

2. **Implement Incrementally**

   - Make small, focused changes per step instead of rewriting large files.
   - Keep changes logically grouped (UI structure vs styling vs behavior vs API integration).
   - Prefer refactors that are easy to review and revert.

3. **Run Checks**

   - After code changes, run:
     - `pnpm run lint`
     - `pnpm run build`
   - Report any errors and fix them before considering the task complete.

4. **Ask When Unsure**

   - If requirements are ambiguous or there are multiple reasonable approaches (e.g. layout patterns, component APIs, API response handling), present concise options and ask for a choice before proceeding.

5. **Avoid**

   - Adding new dependencies without explicit approval.
   - Large-scale renames or reorganizing folders unless explicitly requested.
   - Changing project tooling (Vite, Tailwind, shadcn/ui, pnpm) without instruction.

---

## Testing and Quality

- There is currently no dedicated test runner configured.
- For any non-trivial logic added to `src/hooks/` or `src/lib/`:
  - At minimum, add clear TypeScript types and inline documentation comments where helpful.
  - When suggesting tests, describe a simple test strategy (e.g. using Vitest/Jest) but do not add test tooling without explicit approval.

Claude should:

- Avoid leaving `TODO` comments in production code unless explicitly requested.
- Prefer small, well-named helper functions over deeply nested logic.
- Keep the codebase free of unused imports, dead code, and console logs (except where explicitly needed for debugging and clearly marked).

---

## Project-Specific Do / Don't

**Do:**

- Reuse existing design patterns, components, and APIs where possible.
- Keep the app visually and behaviorally consistent with existing pages.
- Use shadcn/ui components and Tailwind utilities as the primary building blocks.
- Document any non-obvious decisions or trade-offs in brief comments or Markdown notes.
- **Read `backend.md` before designing any page that calls backend APIs.**
- **Use TypeScript types from `src/types/api.ts` when implementing API integrations.**

**Don't:**

- Change the package manager (must keep `pnpm`).
- Replace Tailwind or shadcn/ui with other UI frameworks or CSS solutions.
- Introduce breaking changes to public component APIs without clearly calling them out.
- Perform large-scale refactors or rewrites without an agreed plan.
- Design API-integrated pages without referencing `backend.md`.
- Assume response shapes or field names—always verify in `backend.md` and `src/types/api.ts`.
