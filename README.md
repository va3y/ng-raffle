# NgRaffle

Live: https://ng-raffle.vercel.app/

## Development server

To run the app with the dev server, Vercel CLI is needed:

```bash
npm i -g vercel
npm i

npm run vstart # runs api + frontend
npm run start # runs only frontend
```

## Environment variables

To run the api locally the `DATABASE_URL` environment variable must be set. This is a secret for db connection.


## Features

* Optimistic UI. The data is saved as you type 
* The session id is stored in a cookie
* A simple [logging service](src/app/logging.service.ts) is implemented with a simple api call
* The form is created dynamically, according to the [schema](api-utils/formSchema.ts)
* The db is hosted by Planetscale, connection in dev is done via secret env keys
* The basic backend is done by serverless functions on Vercel


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
- [x] Integrate frontend with api
- [ ] Validation
- [x] Show total number of application and the chance to win
- [x] A more fancy layout
- [x] Create form in backend by schema
- [x] Decompose components
- [x] Code cleanup

Nice to have-s:
- [ ] Prefetch assets
- [ ] Figure out a way to store files. Connect s3 
- [ ] PWA
- [ ] Tests
- [ ] Move off the material ui
- [ ] i18n supoprt. So far, all the text content is in English string literals
- [x] If the form grows in complexity, moving the form building to backend must be a good idea
