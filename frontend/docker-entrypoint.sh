#!/bin/sh
set -eu

cat <<EOF > /usr/share/nginx/html/config.js
window.API_BASE_URL = "${API_BASE_URL}";
EOF
