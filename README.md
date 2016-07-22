#NoteFire

NoteFire is a simple notes app I'm writing to prove to myself (and to anyone else that cares) that I can ship a product.

To see NoteFire in action, visit [www.notefireapp.com](https://www.notefireapp.com)

For the Development Demo that spawned this, see [NoteFireDev](https://github.com/bobzurad/NoteFireDev)

##Development
Developing this project requires
* [node.js](http://nodejs.org/)
* A [firebase](http://firebase.google.com) account
  * Only needed if you want to write to your own firebase.
  * Install [firebase-tools](https://www.npmjs.com/package/firebase-tools) to deploy to your own firebase account

###Installation
Once you've cloned this repository, cd to it's location and run:

```bash
$ npm install
```

###Running on localhost
You can run this application locally at http://localhost:8001 by running:
```bash
$ npm start
```

If you need to run this application at a different port you can change it in package.json.
```json
"start": "http-server ./app -a localhost -p 8001",
```

###Configuration
You can configure this application to point to your own firebase. You'll need to add your own config settings in app/js/app.js

```javascript
FirebaseConfig: {
  apiKey: ...,
  authDomain: ...,
  databaseURL: ...,
  storageBucket: ...,
}
```
