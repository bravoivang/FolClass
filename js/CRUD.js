//¿quien genera el path? => el que lo llama
//¿quien parsea el obj? => nadie, se guarda entero. El que lo pide despues lo filtra ;)

const fbdb = firebase.database();
const ROOTref = firebase.database().ref();
 
var preload = fbdb.ref('usuarios/'+currentUser.user.uid).once('child_added', function (snap) {
    var result = snap.val();
    myIdCourses = result.myCourses
    return result; //esto funciona ? mmmm
});

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

function readCourse (){ //lee el curso actual
   fbdb.ref('cursos/'+currentCourse).on('child_added',function(snap){
       console.log(snap); 
   });  
}

function generateNewId(){
    //cloud function. El servidor tiene que generar los id para que sean unicos y no se pisen
    //entre multiples usuarios
    return Math.ceil(Math.random()*1000000);
}