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

function getStandarCourse (){
    var dataJSON = {
            data : {
                nombre: "nombre del curso",
                tematica: "tematica del curso",
                certificacion: "true-false",
                cupo: "cantidad de alumnos",
                abono: "pago-gratuito",
            },       
            objetivos: {
                idGeneradoPorPush: {
                    nombre: "nombre del objetivo",
                    descripcion: "descripcion del objetivo",
                    idDelUsuario: "uid generado por Auth()"
                },
            },
            alumnos: {
                idGeneradoPorPush: {
                    nombre: "nombre del alumno",
                    apellido: "apellido del alumno",
                    idDelUsuario: "uid generado por Auth()",
                }
            },
            meta: {
                uidDelCurso : "id generado por push",
            },
        };
    return dataJSON;
        
    // var nuevoObjetivo = {nombre:"Tema1",descripcion:"Estudien mucho"};
    // dataJSON["objetivo1"]
    // dataJSON.objetivos.push(nuevoObjetivo);
}


function getStandarUser (){
    var dataJSON = {
            data : {
                nombre: "nombre del usuario",
                apellido: "apellido del curso",
                DNI: "37847898",
                localidad: "Haedo",
                Nacionalidad: "Argentino",
                email: "email del usuario",
                nick: "nick del usuario",
                repassword: "confirmacion contraseña",
                password: "contraseña",
            },       
            cursos: {
                idGeneradoPorPush: {
                    meta:{
                        nombre: "nombre del curso al que esta inscripto",
                        idDelCurso: "idGeneradoPorPush",
                        apellido: "apellido del alumno en el curso que esta inscripto",
                    },
                    administrativo : {
                            asistencias : "numero de asistencias",
                            calificacion : "calificacion del alumno",
                            regularidad : "true-false",
                    },
                    desempeno : {
                        objetivos : {
                            idGeneradoPorPush: {
                                nombre: "nombre del objetivo",
                                puntaje: "puntaje del alumno en este objetivo",
                            },
                        },
                        participacion : {
                            colaboracion : "comentario agergado por la profesora",
                        },
                    },
                },
            },
            meta: {
                uidDelUsuario : "id generado por Auth",
            },
        };
    return dataJSON;
}

function createStructUser (){ //funcion interna   
    var refNuevoUsuario = fbdb.ref('usuarios/').push();
    var newUserData = getStandarUser();
    newUserData.meta[`uidDelCurso`] = refNuevoUsuario.key;
    refNuevoUsuario.set(newUserData)
    .then(function(){
        console.log("se logró crear usuario vacio");
    })
    .catch(function(error){
        console.log("no se pudo crear usuario vacio: ",error);
    });
}

function createStructCourse (){ //funcion interna
    var refNuevoCurso = fbdb.ref('cursos/').push();
    var newCourseData = getStandarCourse();
    newCourseData.meta[`uidDelCurso`] = refNuevoCurso.key;
    refNuevoCurso.set(newCourseData)
    .then(function(){
        console.log("se logró crear cursos vacio");
    })
    .catch(function(error){
        console.log("no se pudo crear cursos vacio: ",error);
    });
}

function createCourse (dataJSON){
    //var xhr = new XMLHttpRequest().send('GET',"https://us-central1-bravofolclass.cloudfunctions.net/IdCuoursesGenerator")
    //xhr.open('GET', true);
    //var idNewAvaileble = xhr;
    var refNuevoCurso = fbdb.ref('cursos/').push();
    var newCourseData = dataJSON;//= datos del gestor. formulario de la pagina actual
    newCourseData.meta[`uidDelCurso`] = refNuevoCurso.key;
    refNuevoCurso.set(newCourseData)
    .then(function(){
        console.log("se logró crear curso");
    })
    .catch(function(error){
        console.log("no se pudo crear curso: ",error);
    });
    //console.log(idNewAvaileble,newCourseData.meta.uid);
    //var path = 'cursos/'+idNewAvaileble;
    //idCourses.push(idNewAvaileble); update "metadata de cursos" cloudFunction tiene que actualizar lenght de cursos
    //storage(path, newCourseData);
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
    creador = currentUser;
    flag = false;
    register(dataObj);

}

function updateAtributeStudent (uidStudent, atribute, dataObj) {
    //atribute format : ['usuarios/uid/ids/] => 'administrativo/.../'
    var path = 'usuarios/'+uidStudent+'ids'+atribute;
    update (path, dataObj);

}

function retrieveUserInformation(user){
    readCurrentUser(user.uid); // OBJETO USUARIO
}

function readCourse (idCourse){ //lee el curso actual
    fbdb.ref('cursos/'+idCourse).on('value',function(snap){
    currentCourse = snap.val(); 
    console.log("se disparó value de readCourse");
   });  
}

function readCurrentUser (uid){ //lee el curso actual
    fbdb.ref('usuarios/'+uid).on('value',function(snap){
    currentUser = snap.val();
    for (var key in currentUser.cursos){
        if (key == "cantidad"){} 
        else {
            nombresCursosDisponibles.push(currentUser.cursos[`${key}`].meta['nombreDelCurso']);
            idCursosDisponibles.push(currentUser.cursos[`${key}`].meta['idDelCurso']);
        }
    }
    console.log("se disparó value de readUser");
    })/*.then(function(){
        readCourse(Object.keys(currentUser.inscriptos.names)[0]); // OBJETO CURSO
   },function(error){
       console.log("no se pudo leer el usuario");
   })*/;  
}

function readUser (uid){  //lee cualquier usuario
    fbdb.ref('usuarios/'+uid).on('value',function(snap){
        rndUser = snap.val(); 
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


