import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false

 //Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCGXAJcJD5bH-eorEh4rk4Qo-Gxn-q5IPA",
  authDomain: "konecta-clima-99131.firebaseapp.com",
  databaseURL: "https://konecta-clima-99131.firebaseio.com",
  projectId: "konecta-clima-99131",
  storageBucket: "konecta-clima-99131.appspot.com",
  messagingSenderId: "366947859845",
  appId: "1:366947859845:web:ac6278b373a6de24d4d8ec",
  measurementId: "G-61NK6C2G0Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

// const spawn = require('child_process').spawn;
// const process = spawn('python', ['./pytho.py',  'Andrea']);
// process.stdout.on('data', data=>{
//   console.log(data.toString())
// })