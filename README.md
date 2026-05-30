# RamReserve

A small FastAPI + static frontend demo for local ticket reservation and login flow.

## Local setup

1. Install Python 3.11.
2. Open a terminal in the project folder.
3. Create a virtual environment (recommended):

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

4. Install dependencies:

```powershell
py -3.11 -m pip install -r requirements.txt
```

5. Optionally configure credentials:

- Copy `.env.example` to `.env`
- Edit the values if you want custom login credentials

6. Run the app:

```powershell
py -3.11 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

7. Open in your browser:

```text
http://127.0.0.1:8000/static/index.html
or
localhost:8000/home.html
```

## Credential configuration

The backend supports environment variables for credentials:

- `RAMRESERVE_USER_EMAIL`
- `RAMRESERVE_USER_PASSWORD`
- `RAMRESERVE_ADMIN_EMAIL`
- `RAMRESERVE_ADMIN_PASSWORD`

If none are set, the app falls back to the default values from `.env.example`.

## GitHub / deployment readiness

This version is okay for a simple demo repository, but it is not production-ready yet.

What is included:

- `main.py` runs a FastAPI server
- `public/` contains static frontend files
- `requirements.txt` lists Python dependencies
- `.gitignore` ignores common Python and environment files
- `.env.example` documents local credential configuration

What is not ready for production:

- no real user database or secure authentication
- no HTTPS / secret management
- no deployment scripts or containerization
- no database persistence; tickets are stored in memory only

## Re-hosting on another device

1. Clone or copy the repo.
2. Install Python 3.11.
3. Create and activate a virtual environment.
4. Install `requirements.txt`.
5. Optionally add a `.env` file from `.env.example`.
6. Run the app with Uvicorn.
7. Open the browser to the local URL.
