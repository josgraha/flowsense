# Flow Sense©: FX Markets Intelligence Monorepo

**Disclaimer:** this is a demonstration project only and is NOT a _real_ financial application.

## Overview
Demo project to expore concepts with mono-repo based on `Next.js` (Next) app and shared dependencies.

## Running
from a console with Node 8+ installed 
* first make sure dependencies are installed (required first time)
`yarn`
* enter the following
`yarn start`

## App
The app is based on `Next.js` which optimizes Time To Interaction (TTI) over Time To First Byte (TTFB).  More about the philosphy and technical details for Next are in the resources section.

## Data API
Data is fetched via the Next lifecycle hooks

## UI Components
Shared components are located in the Core UI project in the `core-ui` folder.  Additionally Next specific components are located in the `app/components` folder to provide SSR hints.

## References
* [Zeit blog on Next](https://zeit.co/blog/next2)

## Dependencies (WIP)
* Node 8+
* yarn (`npm i -g yarn@latest`)
    
## TODO (unordered)
- document high level dependencies in `Dependencies` section in this document
- build all artifacts in `dist` folder
  - `cpx` artifacts to `dist` folder
  - gitignore the `dist` folder
  - move `functions` project back into `projects` workspace
  - babel `functions` source and stream output to `dist` folder
  - update `next` config to build artifacts in `dist` folder
  - delete `yarn.lock` in `functions` folder (keep master yarn.lock)
