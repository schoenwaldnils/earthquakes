#!/usr/bin/env bash

next build
next export -o docs
touch docs/.nojekyll
touch docs/CNAME
echo \"earthquakes.schoenwald.media\" >> docs/CNAME
git add docs
git commit -m \"build\"
