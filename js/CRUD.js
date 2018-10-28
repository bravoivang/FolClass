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

function createStructCourse (){
    var dataJSON = {};
    dataJSON = {
        name: "",
        tematica: "",
        certificacion: "",
        cupo: "",
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

function createCourse (){
    var idNewAvaileble = generateNewId();
    var newCourseData;//= datos del gestor. formulario de la pagina actual
    var path = 'cursos/'+idNewAvaileble;
    //idCourses.push(idNewAvaileble); update "metadata de cursos" cloudFunction tiene que actualizar lenght de cursos
    storage(path, newCourseData);
}

function readCourse (idCourse){ //lee el curso actual
    fbdb.ref('cursos/'+idCourse).on('value',function(snap){
    currentCourse = snap.val(); 
   });  
}

function readUser (uid){ //lee el curso actual
    fbdb.ref('usuarios/'+uid).on('value',function(snap){
    currentUser = snap.val(); 
    myIdCourses = currentUser.inscriptos.array;
   });  
}

function generateNewId(){
    //cloud function. El servidor tiene que generar los id para que sean unicos y no se pisen
    //entre multiples usuarios
    return Math.ceil(Math.random()*1000000);
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

function getObjLength (obj){
	var cont = 0;
	for (var key in obj){
		cont++;
	}
return cont;
}