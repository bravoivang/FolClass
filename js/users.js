//users.js se encarga de administrar la sección actual. Sirve los datos traidos de la DB FB
//para el currentUser
//observa el estado de la sección y bloquea con el access page si no hay secion actual

const auth = firebase.auth();
var persistence = firebase.auth.Auth.Persistence.LOCAL;//puede que tenga error de sintaxys!
auth.setPersistence(persistence);

var currentUser;
var currentCourse;
var mycourses = currentUser.mycourses; //id de cursos

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
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
        auth.createUserWithEmailAndPassword(data.email, data.password)
        .catch(function(error) {
            app.methods.pushError(error);
        })
        .then(function(result){
            storage("usuarios/"+result.user.uid,data);
        });
    }
    else{
        console.log("pass no iguales");
    }
}

function login (data) {
    auth.signInWithEmailAndPassword(data.email, data.password)
        .catch(function(error) {
            app.methods.pushError(error);
            if (error.code === 'auth/wrong-password') {
            alert('Wrong password.'); //rediseñar
            }
            else {
            alert(error.message); //rediseñar
            }
        })
        .then(function () {
            

        });
}
function singOut () {
    auth.signOut();
}
/* <- Revisar funcionamiento, no hace nada. pero tampoco tira error
function deleteAcount (user){
    AUTH.delete(user);
}
*/

function getDataFor (view){
    fbdb.ref('cursos/'+currentUser.user.uid).once('child_added', function (snap) {
        preload = snap.val();
    });
}
