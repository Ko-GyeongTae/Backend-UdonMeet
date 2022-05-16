# Udon Meet

동네 친구를 만들어 보자!

## Skill

- Typescript
- Typeorm
- Express.js

## Struct

src \
-- app.js # App entry point \
 └───api # Express route controllers for all the endpoints of the app \
 └───config # Environment variables and configuration related stuff \
 └───jobs # Jobs definitions for agenda.js \
 └───loaders # Split the startup process into modules \
 └───models # Database models \
 └───services # All the business logic is here \
 └───subscribers # Event handlers for async task \
 └───types # Type declaration files (d.ts) for Typescript
