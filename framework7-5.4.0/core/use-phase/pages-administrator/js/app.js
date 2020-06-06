'use strict';

// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    routes: routes,

});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYqHJfIgMAO9cJXK2HxeA1y6SvXShpJOw",
    authDomain: "advanced-web-mobile-odisee.firebaseapp.com",
    databaseURL: "https://advanced-web-mobile-odisee.firebaseio.com",
    projectId: "advanced-web-mobile-odisee",
    storageBucket: "advanced-web-mobile-odisee.appspot.com",
    messagingSenderId: "998167202628",
    appId: "1:998167202628:web:04fe1572d2dba223842511",
    measurementId: "G-3KZ1MHFM40"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("SIGNED IN");
    } else {
        console.log("SIGNED OUT");
    }
});

function logout() {
    app.dialog.confirm('Are you sure you want to sign out?', function () {
        firebase.auth().signOut().then(function () {
            window.location.href = '../../login-phase/index.html';
        }).catch(function (error) {
            console.log(error)
        });
    });

}
