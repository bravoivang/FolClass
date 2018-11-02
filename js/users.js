//users.js se encarga de administrar la sección actual. Sirve los datos traidos de la DB FB
//para el currentUser
//observa el estado de la seción y bloquea con el access page si no hay secion actual

const auth = firebase.auth();
var persistence = firebase.auth.Auth.Persistence.LOCAL;//puede que tenga error de sintaxys!
auth.setPersistence(persistence);

var currentUser = {}; //info completa de user =>currentUser.user.uid = uid
var currentCourse = {}; //info completa del course actual currentCourse.metas / alumnos / etc

var nombresCursosDisponibles = [];


var flag = true; // parche momentaneo
var creador; 
auth.onAuthStateChanged(function(user) {
    if (user && flag) { 
        retrieveUserInformation(user);
        console.log(user.email+" is signed in. by AuthState");
        mainView.router.navigate('/');
    }
    else {
        if (!flag){ //parche momentaneo
            singOut();
            login(creador);
            console.log("flag sistem");
            flag = true;
        }
        else{
            mainView.router.navigate('/access-screen/');
            console.log("no estas logeado. by AuthState");
        }
    }
});

function register (dataJSON) {
    if (dataJSON.data.password === dataJSON.data.repassword)
    {
        auth.createUserWithEmailAndPassword(dataJSON.data.email, dataJSON.data.password)
        .catch(function(error) {
            app.methods.pushError(error);
        })
        .then(function(result){
            storage("usuarios/"+result.user.uid,dataJSON);
        });
    }
    else{
        console.log("pass no iguales");
    }
}

function login (dataJSON) {
    auth.signInWithEmailAndPassword(dataJSON.data.email, dataJSON.data.password)
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
//cursos van por idCurso
/*
function getDataFor (view){
    fbdb.ref('cursos/'+currentUser.user.uid).once('child_added', function (snap) {
        userPreload = snap.val();
    });
}
*/

