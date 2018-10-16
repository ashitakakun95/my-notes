# Medical Dashboard To Do List

## Setup v1.0

- [ ] Wireframing

### Focus on doctor to patient conversation

- [ ] all html content
  - [ ] folder structure
    - [ ] views
      - [x] landing page
      - [ ] entry
        - [ ] confirm password on sign up
      - [ ] dashboard
  - [ ] routes

- [x] database setup
  - [x] models
    - [x] Doctor
    - [x] Patient
    - [x] Conversation
    - [x] Message

- [ ] profile pic upload for user/show
- [X] pusher(CANCELLED)
- [ ] chat feature
  - [ ] search contacts
  - [x] new chat via searchID
  - [ ] **video call**
    - [ ] toggle fullscreen
    - [ ] audio

- [ ] fullscreen webpage
- [x] loading screen
- [ ] strong parameter?
- [ ] doctors show page(refer Oreo's dashboard(Add Doctor) for full detail)
  - [ ] same goes to patients

- **Don't work on CSS first**
- **Focus on funtionality**

### Issues

- [ ] user ID search doens't work on patient
- [ ] user still can chat(create message) even server restart
  - [ ] check on user's status in the web page

### Fixes

- [ ] do not auto-scroll if user is not at the bottom of conversation
- [ ] cookie parser?
- [ ] ~~Use minified `moment.js`~~ alternative to `moment.js`
- [ ] conversation need to be update on small screen(phone) via socket emit(updatePeopleList)
- [ ] flashes with close button on entry pages
- [ ] spike on sending message
- [ ] fix currentUser security usage

## v1.1

- [ ] testing, **Oh SHIT**
- [ ] 404 page
- [ ] bot chat?
- [ ] medical search API
- [ ] dialog
- [ ] chat message scroller(float)
- [ ] timeline(checkout oreo's)
- [ ] lock screen
- [ ] pagination
- [ ] record with file upload

### Fixes

- [ ] Express sessions
- [ ] Refactor `async` code
- [ ] Security! Disallow users to change id on conversation using `socket[socket.id]`

## v1.2

- [ ] PWA
- [ ] Workers and Emails?
  - [ ] Redis?
- [ ] More Regexp validations?
- [ ] Bcrypt
- [ ] safety lock? auto sign out after time.
- [ ] unique model check for `person`
- [ ] contact online status

## v2.0

- [ ] `babel` transpiler for all browser support
- [ ] Responsive design
- [ ] Browser performance benchmark check
- [ ] Security implementation
- [ ] Remember me implementation
- [ ] Forgot password?

- [ ] Learn React - Changing of CSS framework
  - [Material UI](https://material-ui.com/)
- [ ] Beginners guide
- [ ] Preloader
- [ ] install `static-favicon` package

## v2.1

- [X] QR Code?
- [ ] Dark Mode Toggle

---

## On Hold

- [ ] Webpack?
- [ ] Firebase
- [ ] Clean your code - make it more readable? arrow function to function on certain case?

## Main Features

- [ ] Chat via Socket.io
- [ ] Video Call
- [ ] Medical Journal
- [ ] Log Journal
- [ ] Data Analytics via D3

## Styling References

- [Oreo Hospital](https://thememakker.com/templates/oreo/hospital/angular/dashboard)
- [Medical Dashboard Design](https://www.behance.net/gallery/15407565/Medical-Dashboard-Design)
- [Codepen - Nice Design](https://codepen.io/jlalovi/pen/bIyAr)
- [Codepen 404](https://codepen.io/koenigsegg1/pen/VawWov)
- [ ] Codrops it!

### Styling Ideas

- [ ] Smooth span highlight

## Ideas

- Bot Chat
- Schedule

## Reminder

- [ ] Comment your code
- [ ] Doctor's licence code: required = true

## Research

- [greenpioneersolutions/menstackjs](https://github.com/greenpioneersolutions/menstackjs)
- [passport-local-demo](https://github.com/caasjj/passport-local-demo/blob/master/app.js)
  - [Passport Local Strategy Authentication](http://walidhosseini.com/journal/2014/10/18/passport-local-strategy-auth.html)
- [Video Call Tutorial](https://www.youtube.com/watch?v=nG7OhBnfefE&t=1166s)
- [Videl Call HTML5](https://www.html5rocks.com/en/tutorials/getusermedia/intro/)
- [CSS Timeline](https://freefrontend.com/css-timelines/)
- [Live Chat Widget](https://pusher.com/tutorials/chat-widget-javascript)
- [health design](http://healthdesignchallenge.com/#showcase)
- [Appointment Scheduluer](https://cosmicjs.com/apps/appointment-scheduler)




