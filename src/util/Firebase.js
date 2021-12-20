/**
 * Conexão com Firebase
 *-------- original do curso
const firebase = require('firebase');
require('firebase/firestore');
export class Firebase{
 *---------
*/
/** https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js*/
import firebase from "firebase";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
 
export class Firebase {
    constructor() {
 
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        this._config = {
            apiKey: "AIzaSyBUdD0_oBnuANTV6_4K-xMznZ-dZudqtyM",
            authDomain: "whatsapp-clone-f42e2.firebaseapp.com",
            projectId: "whatsapp-clone-f42e2",
            storageBucket: "gs://whatsapp-clone-f42e2.appspot.com",
            //storageBucket: "whatsapp-clone-f42e2.appspot.com",
            messagingSenderId: "1097929310989",
            appId: "1:1097929310989:web:8cd25ddb1f51a6c2966644",
            
        };
        //console.log('Firebase constructor: _config:', this._config);
        this.init();
    }
 
    init(){
        // Initialize Firebase
        //console.log('Firebase init(): !this._initialized', this._initialized);
        if (!window._initializedFirebase) {
            //console.log('Firebase init(): !this._initialized>firebase', firebase);
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            window._initializedFirebase = true;
        }
    }
 
    static db() {
        return firebase.firestore();
    }
 
    static hd() {
        return firebase.storage();
    }
 
    initAuth(){
 
        return new Promise((s, f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            //console.log('Firebase initAuth(): (S)', provider);
            //
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                //console.log('Firebase initAuth(): (result)', user, token);
                s({
                    user,
                    token
                });
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                //console.log('Firebase initAuth(): (error)', errorCode, errorMessage, email, credential );
                f(error);
                // ...
            });
            
        });
 
    }
 
}