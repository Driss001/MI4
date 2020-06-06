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

//Functie register
function register() {

    app.dialog.progress();


    var FDB = firebase.database();
    var email = $$('#email').val();
    var password = $$('#password').val();

    if (!email || !password) {
        alert('Please fill in all the fields ' + email + " " + password, 'Empty field');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (transaction) {

            var user = firebase.auth().currentUser;
            var userID = user.uid;
            var rootref = firebase.database().ref();
            var userref = rootref.child('gebruikers/unassigned/' + userID);

            //set de data in de tabel vd database
            userref.set({
                email: email,
                password: password
            });

            //Verificatie mail verzenden
            user.sendEmailVerification();
            app.dialog.close();
            app.dialog.alert("A verification mail has been sent to your inbox", function () {
                window.location.href = './index.html';
            });
        
    }).catch(function (error) {

    //Registration unsuccessful 
    app.dialog.close();
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    app.dialog.alert(errorMessage, 'Error');

});
};


//Login functie
function login() {

    app.dialog.progress();

    var email = $$('#email').val();
    var password = $$('#password').val();
    if (!email || !password) {
        app.dialog.alert('Please fill in all the fields', 'Empty field');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        var user = firebase.auth().currentUser;
        var rootref = firebase.database().ref();
        var userID = user.uid;

        var playersRef = firebase.database().ref("gebruikers/administrator/");
        checkRoleUID(playersRef, userID, user);

        playersRef = firebase.database().ref("gebruikers/unassigned/");
        checkRoleUID(playersRef, userID, user);

        playersRef = firebase.database().ref("gebruikers/workers/");
        checkRoleUID(playersRef, userID, user);
    }).catch(function (error) {
        app.dialog.close();
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        app.dialog.alert(errorMessage, 'Error');
    });

}

function checkRoleUID(playersRef, userID, user) {
    var checkPlayersRef = playersRef;
    var checkUserID = userID;
    var checkUser = user;

    //adhv van snapshots de keys gaan halen van de childs van de groepen "admin" etc
    checkPlayersRef.once('value').then(function (snapshot) {
        var userCategory = snapshot.key;
        snapshot.forEach(function (snapshot1) {
            var snapshotUID = snapshot1.key;
            if (checkUserID == snapshotUID) {
                checkIfUserVerified(userCategory, checkUser);
            };
        });
    });


}

function checkIfUserVerified(userCategory, checkUser) {
    var checkedUserCategory = userCategory;
    var checkUserVerifyMail = checkUser;
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        if (user) {
            if (user != null) {
                var email_id = user.email;
                var email_verified = user.emailVerified;
                console.log("User is verified: " + email_verified);
                if (email_verified == false) {
                    console.log("Your account is NOT verified");
                    app.dialog.confirm('Re-send Verification Mail?', function () {
                        user.sendEmailVerification().then(function () {
                            alert("A verification mail has been sent to your inbox");
                            logout();

                        })
                    });
                } else {
                    app.dialog.close();
                    window.location.href = '../use-phase/pages-' + userCategory + '/index.html';
                }
            } else {
                console.log("USER is empty");
                return;
            }
        } else {
            return;
        }
    });
}

//Logout functie
function logout() {
    firebase.auth().signOut().then(function () {
        app.dialog.alert("SIGNING OUT");
    }).catch(function (error) {
        console.log(error)
    });
}
