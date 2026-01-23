@echo off
setlocal enabledelayedexpansion

REM === CONFIG ===
set "REPO_DIR=deltagreenery"
set "BRANCH=master"
set "COMMIT_MSG=update"

echo.
echo === Git auto-push ===
echo Branch : %BRANCH%
echo Message: %COMMIT_MSG%
echo.

REM --- Check git ---
where git >nul 2>&1 || (echo ERROR: git not found in PATH & exit /b 1)

REM --- Determine repo path ---
set "REPO_PATH="

if exist ".git" (
  set "REPO_PATH=%CD%"
) else if exist "%REPO_DIR%\.git" (
  set "REPO_PATH=%CD%\%REPO_DIR%"
) else (
  echo ERROR: No git repository found.
  echo        Run this script from inside the repo or its parent directory.
  exit /b 1
)

echo Using repo: "%REPO_PATH%"
echo.

pushd "%REPO_PATH%" || (echo ERROR: cannot cd into repo & exit /b 1)

REM --- Ensure correct branch ---
git checkout "%BRANCH%" >nul 2>&1
if errorlevel 1 (
  echo ERROR: Branch "%BRANCH%" does not exist.
  popd
  exit /b 1
)

REM --- Stage everything ---
git add .
if errorlevel 1 (
  echo ERROR: git add failed.
  popd
  exit /b 1
)

REM --- Check if anything to commit ---
git diff --cached --quiet
if not errorlevel 1 (
  echo Nothing to commit. Working tree clean.
  popd
  exit /b 0
)

REM --- Commit ---
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo ERROR: Commit failed.
  popd
  exit /b 1
)

REM --- Push ---
echo.
echo Pushing to origin/%BRANCH% ...
git push origin "%BRANCH%"
if errorlevel 1 (
  echo ERROR: Push failed.
  popd
  exit /b 1
)

popd
echo.
echo Push complete.
exit /b 0
