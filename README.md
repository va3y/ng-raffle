# NgRaffle

## Features

* The db is hosted by planetscale, connection in dev is done via secrets
* The simple backend is done by serverless functions on Vercel
* The components are implemented as standalone to cut boilerplate code

## Todo 

- [x] Create a form template
- [x] Figure out the way to handle persistence. I can use a separate endpoint, or maybe just store it in a cookie
- [x] Create basic db tables and setup connection for dev/prod environment 
- [x] Intercept requests with session id header
- [x] Write backend api endpoints 
  - [x] Submit Form 
  - [x] Logging
  - [ ] ~~Get a session id (?)~~
  - [x] Get current form state (?)
- [ ] Integrate frontend with api
- [ ] Validation
- [ ] Show total number of application and the chance to win
- [ ] Fancy layout
- [ ] Create form in backend by schema
- [ ] Decompose components
- [ ] Code cleanup

Nice to have-s:
- [ ] Prefetch assets
- [ ] Figure out a way to store files. Connect s3 
- [ ] PWA
- [ ] Tests
- [ ] Move off the material ui
- [ ] i18n supoprt. So far, all the text content is in English string literals
- [ ] If the form grows in complexity, moving the form building to backend must be a good idea

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
