#!/bin/bash
set -e
ENVIRONMENT="production"

payload="{
  \"attachments\": [{
    \"color\": \"#1d9bd1\",
    \"text\": \"Deployment of \`$TRAVIS_REPO_SLUG\` @ \`$TRAVIS_TAG\` to \`$ENVIRONMENT\` has started.\"
  }]
}"
curl -f -X POST --data "$payload" \
  -H 'Content-type: application/json' \
  https://hooks.slack.com/services/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
