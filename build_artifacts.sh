#!/bin/bash

while [ $# -gt 0 ]; do
  case "$1" in
    --v )
      VERSION="$2"
      shift 2
      ;;
    -- )
      shift
      break
      ;;
    *)
      echo "Invalid Argument: ${1}"
      exit 1
      ;;
  esac
done

mkdir -p dist

rm -rf dist/*

docker run --rm -i -v "$(pwd)":/work -w /work/build alpine:latest \
  /bin/sh -c "apk add --update --no-cache curl ca-certificates zip jq && zip -r ../dist/familysearch_salesforce-${VERSION}.zip ./*"
