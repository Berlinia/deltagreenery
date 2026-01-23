@echo off
setlocal enabledelayedexpansion

REM === CONFIG ===
set "REPO_URL=https://github.com/Berlinia/deltagreenery"
set "REPO_DIR=deltagreenery"
set "BRANCH=master"

echo.
echo === Repo bootstrap / update / docker compose up ===
echo Repo URL : %REPO_URL%
echo Repo dir : %REPO_DIR%
echo Branch   : %BRANCH%
echo.

REM --- Check prerequisites ---
where git >nul 2>&1 || (echo ERROR: git not found in PATH & exit /b 1)
where docker >nul 2>&1 || (echo ERROR: docker not found in PATH & exit /b 1)

REM --- Determine repo path (avoid recursive cloning when run inside the repo) ---
set "REPO_PATH="

if exist ".git" (
  REM Running from inside the repo already
  set "REPO_PATH=%CD%"
) else if exist "%REPO_DIR%\.git" (
  REM Repo exists as a subfolder
  set "REPO_PATH=%CD%\%REPO_DIR%"
) else (
  REM Not present -> clone into REPO_DIR
  echo Cloning repo...
  git clone "%REPO_URL%" "%REPO_DIR%" || (echo ERROR: git clone failed & exit /b 1)
  set "REPO_PATH=%CD%\%REPO_DIR%"
)

echo Using repo path: "%REPO_PATH%"
echo.

REM --- Pull updates ---
pushd "%REPO_PATH%" || (echo ERROR: cannot cd into "%REPO_PATH%" & exit /b 1)

echo Fetching latest...
git fetch --all --prune || (echo ERROR: git fetch failed & popd & exit /b 1)

echo Checking out branch: %BRANCH%
git checkout "%BRANCH%" >nul 2>&1
if errorlevel 1 (
  echo Branch "%BRANCH%" not found locally. Trying to create tracking branch...
  git checkout -b "%BRANCH%" "origin/%BRANCH%" || (echo ERROR: checkout failed & popd & exit /b 1)
)

echo Updating by hard-reset to origin/%BRANCH% ...
git fetch --all --prune || (echo ERROR: fetch failed & popd & exit /b 1)
git checkout "%BRANCH%" || (echo ERROR: checkout failed & popd & exit /b 1)
git reset --hard "origin/%BRANCH%" || (echo ERROR: reset failed & popd & exit /b 1)
git clean -fd || (echo ERROR: clean failed & popd & exit /b 1)

REM --- Docker compose up ---
echo.
echo Starting docker compose...
docker compose up  || (echo ERROR: docker compose up failed & popd & exit /b 1)

popd
echo.
echo Done.
exit /b 0
