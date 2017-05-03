# NoteFire #

NoteFire is a simple notes app I'm writing to prove to myself (and to anyone else that cares) that I can ship a product.

To see NoteFire in action, visit [notefireapp.com](https://www.notefireapp.com)

To see what I have planned for NoteFire, see the [Product Backlog](https://github.com/bobzurad/NoteFire/wiki/Product-Backlog)

For the Development Demo that spawned this, see [NoteFireDev](https://github.com/bobzurad/NoteFireDev)

## Development ##
Developing this project requires
* [node.js](https://nodejs.org/)
* [grunt](https://www.npmjs.com/package/grunt)
* A [firebase](https://firebase.google.com) account
  * Only needed if you want to write to your own firebase.
  * Install [firebase-tools](https://www.npmjs.com/package/firebase-tools) to deploy to your own firebase account

### Installation ###
Once you've cloned this repository, go to it's location and run:

```bash
$ npm install
```

### Running on localhost ###
```bash
$ npm start
```
This will start two instances of the application. http://localhost:8001 targets the app folder, and http://localhost:8002 targets the \_deploy folder. The port numbers can be changed in server.js


### Configuration ###
You can configure this application to point to your own firebase. You'll need to add your own config settings in app/js/app.js

```javascript
FirebaseConfig: {
  apiKey: ...,
  authDomain: ...,
  databaseURL: ...,
  storageBucket: ...,
}
```

### Deploying to Firebase ###
Before deploying to your firebase instance, update the files in \_deploy. To do this, run:
```bash
$ grunt
```
To deploy the files in \_deploy to Firebaes, run:
```bash
$ firebase deploy
```
