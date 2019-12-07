# Convert package-lock.json to package.json

## Why?
I didn't do npm init when working on a project because i wasn't sure this will go to prod and later when i needed to push that project to prod i tried looking for tools that convert package-lock.json to package.json( I found some scripts but they included sub dependencies and i wanted clean package.json ) so made this

## Todo
* Allow package name and versions to pick from provided json
* Allow dev dependencies
