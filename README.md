# oop-learning-platform
Full-stack web platform for interactive and visual learning of Object-Oriented Programming (OOP). Includes dynamic code generation, multi-language support, and personal progress tracking.

## Production improvements (Day 5)

* **Generator abstraction layer** – strategy pattern with `server/generators` folder; add new languages without touching routes.
* **Progress summary API** – `/api/progress/summary` returns completed‑topics percentage for dashboards.
* **Backend hardening**
  * input validation on critical routes (`/generate`, quiz submit, practice save, etc.)
  * JWT expiration handling and clear error messages
  * protection against duplicate quiz submissions
* **Client tweaks**
  * Progress bar on dashboard
  * Token persisted in `localStorage` with reload handling
  * Builder payload aligned with new API

These changes make the system cleaner, scalable and closer to a real product.