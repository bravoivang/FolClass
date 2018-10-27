const AUTH = firebase.auth();
var persistence = firebase.auth.Auth.Persistence.LOCAL;//puede que tenga error de sintaxys!
AUTH.setPersistence(persistence);

var user = AUTH.currentUser;

AUTH.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email+" is signed in. by AuthState");
        mainView.router.navigate('/');
    }
    else {
        mainView.router.navigate('/access-screen/');
        console.log("no estas logeado. by AuthState");
    }
});

function register (data) {
    if (data.password === data.repassword)
    {
        AUTH.createUserWithEmailAndPassword(data.email, data.password)
        .catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        });
    }
    else{
        console.log("pass no iguales");
    }
}

function login (data) {
    AUTH.signInWithEmailAndPassword(data.email, data.password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            }
            else {
            alert(errorMessage);
            }
            console.log(error);
        })
        .then(function () {
            AUTH.updateCurrentUser(user);
        });
}
function singOut () {
    AUTH.signOut();
}
/* <- Revisar funcionamiento, no hace nada. pero tampoco tira error
function deleteAcount (user){
    AUTH.delete(user);
}
*/