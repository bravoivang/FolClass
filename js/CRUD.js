//¿quien genera el path? => el que lo llama
//¿quien parsea el obj? => nadie, se guarda entero. El que lo pide despues lo filtra ;)

const fbdb = firebase.database();
const ROOTref = firebase.database().ref();
/*
var resultPreload;
 auth.onAuthStateChanged(function(user) <= ya esta trayendo al user inicialmente, ESTE ES EL PRELOAD
function userPreload(){
        preload = fbdb.ref('usuarios/'+currentUser.uid).once('child_added', function (snap) {
        resultPreload = snap.val();
        myIdCourses = resultPreload.myCourses;
        //currentCourse = resultPreload.myCourses.a; ??
    });
}
*//*
readCourse("123456789");
getCantidad('cursos/123456789/alumnos/inscriptos/names');
getCantidad('cursos/123456789/objetivos/inscriptos/names');
getCantidad('usuarios/'+currentUser.uid+'/inscriptos/names');
*/
/*readCourse(Object.keys(currentUser.inscriptos.names)[0]);
getCantidad('cursos/'+
                    Object.keys(currentUser.inscriptos.names)[0]+
                    '/alumnos.inscriptos/names');
getCantidad('cursos/'+
                    Object.keys(currentUser.inscriptos.names)[0]+
                    '/objetivos.inscriptos/names');
getCantidad('usuarios/'+currentUser.uid+'/inscriptos/names');*/
/*
var i = 0;
var funtArray = [a,b,c,d];

var myInterval = setInterval(function(){

    funtArray[i]();
    i++;
    console.log("inicializando: "+i);
    if (i == 3) clearInterval(myInterval); 
    },1000); 
*/


function storage (path, obj) {
    fbdb.ref(path).set(obj);

}

function update (pathUid, valuesChanged) {
    fbdb.ref(pathUid).update(valuesChanged);
}

function remove (path){
    fbdb.ref(path).remove(function (){
        console.log("hijo removido de: "+path);
    });
}

function createStructCourse (){ //funcion interna
    var dataJSON = {};
    dataJSON = {
        data : {
            name: "",
            tematica: "",
            certificacion: "",
            cupo: "",
        },
        
        objetivos: {
            inscriptos: {
                meta: {
                    cantidad : "",
                },
                names: {
                    1: "",
                }
            }
        },
        alumnos: {
            inscriptos: {
                meta: {
                    cantidad : "",
                },
                names: {
                    1: "",
                }
            }
        },
        meta: {
            uid : currentCourse.meta.uid,
        }
    };
    var pathUid = "cursos/"+currentCourse.meta.uid;
    storage(pathUid,dataJSON);
}

/*
function observadorGeneral (){
fbdb.ref('usuarios/').on('value',function(){console.log("algo cambió!");});}*/

function generateNewId(){
    //cloud function. El servidor tiene que generar los id para que sean unicos y no se pisen
    //entre multiples usuarios
    return Math.ceil(Math.random()*1000000);
}

function createCourse (dataObj){
    var idNewAvaileble = generateNewId();
    var newCourseData =dataObj;//= datos del gestor. formulario de la pagina actual
    var path = 'cursos/'+idNewAvaileble;
    //idCourses.push(idNewAvaileble); update "metadata de cursos" cloudFunction tiene que actualizar lenght de cursos
    storage(path, newCourseData);
}

function updateAtributeCourse (idCurso, atribute, dataObj){  //cambia un atributo a la vez
    //atribute format : ['cursos/] => 'data/.../'
    var path = 'cursos/'+idCurso+atribute;
    update (path, dataObj);
}

function createStudent (dataObj) {
    dataObj.password ='Folclass1234';
    dataObj.repassword = dataObj.password;
    //parche momentaneo. Register fuerza a cambiar la seción, por lo que dispara auth.onUserStateChange()
    var creador = currentUser;
    register(dataObj);
    singOut();
    login(creador);


}

function updateAtributeStudent () {

}

function retrieveUserInformation(user){
    readUser(user.uid); // OBJETO USUARIO
}

function readCourse (idCourse){ //lee el curso actual
    fbdb.ref('cursos/'+idCourse).on('value',function(snap){
    currentCourse = snap.val(); 
    console.log("se disparó value de readCourse");
   });  
}

function readUser (uid){ //lee el curso actual
    fbdb.ref('usuarios/'+uid).on('value',function(snap){
    currentUser = snap.val(); 
    myIdCourses = currentUser.inscriptos.names;
    console.log("se disparó value de readUser");
    readCourse(Object.keys(currentUser.inscriptos.names)[0]); // OBJETO CURSO
   });  
}

//listeners entre base de datos.  
function getCantidad (path){  //creeria qeu es una cloudFunction
    var cantidad = {
        cantidad,
    };
	fbdb.ref(path).on('value',function (snap) {
		cantidad.cantidad = getObjLength(snap.val());
    });
    var lastIndex = fbdb.ref(path).getKey();
    var rePath = path.slice(0,-lastIndex.length)+'/meta';
    update(rePath,cantidad);
    return cantidad;
} 

//helper
function getObjLength (obj){
	var cont = 0;
	for (var key in obj){
		cont++;
	}
return cont;
}


