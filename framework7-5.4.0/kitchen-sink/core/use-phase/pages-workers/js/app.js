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

function register() {
    console.log("Start register");

    var FDB = firebase.database();
    var gebruikersnaam = $$('#username').val();
    var password = $$('#password').val();
    if (!gebruikersnaam || !password) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }

    console.log("Start Firebase Registration");

    firebase.auth().createUserWithEmailAndPassword(gebruikersnaam, password).then(function (user) {

        var user = firebase.auth().currentUser;
        var userID = user.uid;
        var rootref = firebase.database().ref();
        var userref = rootref.child('gebruikers/workers/' + userID);
        userref.set({
            gerbuikersnaam: gebruikersnaam,
            password: password
        })
        console.log('uid', user.uid)
    }).catch(function (error) {
        //Registration unsuccessful 
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        app.dialog.alert(errorMessage, 'Error');
    });
    console.log("End Register")

}

function login() {
    var gebruikersnaam = $$('#username').val();
    var password = $$('#password').val();
    if (!gebruikersnaam || !password) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }
    app.dialog.alert('U bent ' + gebruikersnaam + ' wachtwoord is ' + password);


}

function openLoginPagina() {
    window.location.href = './pages/login-pagina.html';
}




//Function in geval dat return/back niet werkt
/*function returnToHomePage()
{
    app.views.main.router.navigate("/")
}*/
