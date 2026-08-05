#!/usr/bin/env bash
# dist/ 내용만 정확히 gh-pages 브랜치로 배포한다.
# (gh-pages npm 패키지가 이 환경에서 프로젝트 루트의 .gitignore/.env.example/.vscode를
#  dist와 함께 잘못 끼워넣는 문제가 있어, 직접 임시 디렉터리에 dist만 복사해 배포한다.)
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_URL=$(git remote get-url origin)

npm run build

TMP_DIR=$(mktemp -d)
cp -R dist/. "$TMP_DIR"/

(
  cd "$TMP_DIR"
  git init -q
  git checkout -q -b gh-pages
  git add -A
  git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git remote add origin "$REPO_URL"
  git push --force origin gh-pages:gh-pages
)

rm -rf "$TMP_DIR"
echo "Deployed to GitHub Pages"
