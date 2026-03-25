# Codetopia Community - Admin Center Overview

The **Admin Center** is a secure, monolithic dashboard integrated directly within the Next.js application designed to manage the core data sets for the Codetopia Community site. It provides full CRUD operations over major architectural models (e.g. Team Members, Subscribers) and acts as the gatekeeper for community administration.

## 1. High-Level Architecture
- **Routing**: Built natively within Next.js App Router under `/src/app/admin/*`.
- **Layout Management**: Uses a standalone `SidebarProvider` driven `layout.tsx` wrapper to completely detach the admin UI (sleek SaaS grayscale aesthetic) from the public-facing site (heavy black/white Neobrutalist aesthetic). 
- **Navigation Orchestration**: The static navigation link schema is fully decoupled into `src/lib/data/admin-nav.ts` to cleanly loop and map through nested sidebar items.

## 2. Authentication & Middleware
The application leverages a lightweight JWT-based authentication system:
- **Login Module**: Accessible at `/admin/login`, protected routes redirect unauthenticated users here.
- **Session Tokens**: Active sessions are managed and issued manually utilizing securely signed JWTs injected into HTTP-only cookies (`auth-token`).
- **Proxy Workarounds**: Due to host infrastructure limitations with classic Edge-based Next.js Middleware, route interception is handled by custom proxying logic or direct endpoint validation (calling `await getSession()` per internal route).

## 3. Core Modules

### Team Management (`/admin/team`)
A complex CRUD sub-system that manages the public `Team Directory`:
- **State Logic Orchestration**: Managed by a central orchestrator (`page.tsx`) mapping state down to deeply modular nested components (`TeamFormModal`, `TeamTable`, `TeamDeleteModal`, `TeamToolbar`).
- **Real-Time Data Parsing**: Uploads physical user avatars via standard web APIs, formats the Data URLs seamlessly, and natively writes them to local system resources (`public/uploads/...`) via `fs.promises` prior to DB insertions.
- **Synchronized Fallback Cleansing**: A custom `utils/deleteImage()` algorithm intercepts row deletions and systematically unlinks abandoned UI avatar assets.

### Account Settings (`/admin/settings`)
Governs the foundational identity layer for backend access:
- **Zero-Trust Input**: Profile modifications demand re-transmission of the active `Current Password` alongside updates to deter hijacking.
- **Smart Hot-Swapping**: Instead of booting users back to the login screen after changing critical primary email keys, the backend parses successful requests and transparently hot-swaps the underlying JWT header to maintain continuous interaction.

## 4. UI/UX Design Syntax
To separate the administrative ecosystem from the public-facing site, the Admin Center adopts a drastically different internal component library:
- Overrides aggressive brutalist boxes for calculated, modern rounded SaaS borders (`rounded-xl` and `rounded-2xl`).
- Disables pure CMYK brand colors (reds, blues, neons) entirely in favor of a strictly professional `Greyscale` (`zinc` & `grey`) palette to maximize focus and reduce eye strain for operators.
- Dynamic route-parsing algorithms map active URIs into polished human-readable breadcrumbs (e.g., `/admin/settings` -> `Admin Center / Settings`).
