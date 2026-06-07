#!/bin/bash
set -e
npm install --no-audit --no-fund
npm run push --workspace=@workspace/db
