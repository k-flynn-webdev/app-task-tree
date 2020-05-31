# app-base-nodejs

Taking a lot of inspiration from ['Bulletproof node.js project architecture'](https://softwareontheroad.com/ideal-nodejs-project-structure?utm_source=github&utm_medium=readme) by Sam Quinn.

## Goal:

A fresh start on a NodeJS setup with ease of use and fast progression in mind.

## Stack:
- NodeJS (ExpressJS)
- MySQL 
- Secured via jsonwebtoken

## Thoughts:

Upto now I had dragged a node project from a tutorial kicking and screaming with duct-taped features. This is a fresh NodeJS backend using Express with some more interesting approaches to ease development and speed taking lots of inspiration from the above Sam Quinn's article and repo.


## Features:
	
- Env variables loaded via `vars.env` provided at the /server root.
- Simplified folder setup to help with `soc` choices.
- Automatically add any `route.js` found inside: [ api/routes ].
- Automatically run any `.Init(app)` function found inside: [ interfaces, services ].
- Automatically run any `.js` found inside: [ subscribers ].
- A log of all errors/messages at `log/log`.
- A basic CRUD api for Users.
- Email can be triggered on events

### Images:
![start](./docs/nodejs.png?raw=true "on start")