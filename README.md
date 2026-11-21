# Employee Management

A small employee management back-office built with **Angular 22**, **PrimeNG 22** (Aura theme) and **Tailwind CSS 4**.
All data is dummy, held in memory (no backend).

## Environment

| Tool    | Version   |
| ------- | --------- |
| Node.js | 24.x (≥ 20.19 works) |
| npm     | 11.x      |
| Angular | 22.3      |
| PrimeNG | 22.x |
| Tailwind CSS | 4.x  |

## Run

```bash
npm install
npm start          # http://localhost:4200
```

PrimeNG 22 needs a PrimeUI license key (free Community License for individuals),
set in `src/app/app.config.ts` → `providePrimeNG({ license })`. Without it a license notice is shown.

Production build: `npm run build` (output in `dist/employee-app`).

**Login:** `admin` / `admin123`

## Pages

| Route | Page | Notes |
| ----- | ---- | ----- |
| `/login` | Login | Hardcoded credentials, session kept in `sessionStorage`. |
| `/employees` | Employee List | 120 dummy rows. Search by keyword + status + group (AND), column sorting, paging, rows per page. Edit (yellow) / Delete (red) show a notification. |
| `/employees/new` | Add Employee | Every field required; date picker capped at today; email format check; numeric salary; searchable group dropdown (10 groups). |
| `/employees/:username` | Employee Detail | Formatted output (salary as `Rp. 12.500.000,00`). **OK** returns to the list with the previous search intact. |

Employee routes are protected by an auth guard.

## Structure

```
src/app/
  core/   auth (service + guard), employee service (model + dummy data), rupiah pipe
  pages/  login, employee-list, employee-add, employee-detail
```

Notes: the spec lists `description` as `datetime`; it's treated as free text since that's what a description is.
Added employees live in memory and reset on page reload.
