const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
/*
var idCursoCounter = 0;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

*/
exports.obsCantidadCursos = functions.database.ref('usuarios/{idUsuario}/cursos/')
.onWrite(function(snap,contex){
    var afterdata = snap.after.val();
    var beforedata = snap.before.val();

    var afterTotalInscrptos = getObjLength(afterdata);
    var beforeTotalInscrptos = getObjLength(beforedata);
    
    var totalInscrptos;
    if (afterTotalInscrptos!=beforeTotalInscrptos) totalInscrptos = afterTotalInscrptos;   
    else return null;
 
    return admin.database().ref(snap.after.ref).update({"cantidad":`${totalInscrptos-1}`})
    .catch(function(error){
        console.log(error);
    });
});
/*
exports.obsCantidadUsuarios = functions.database.ref('usuarios/{idUsuiario}/inscriptos/names')
.onWrite(function(snap,contex){
    var afterdata = snap.after.val();
    var beforedata = snap.before.val();

    var afterTotalInscrptos = getObjLength(afterdata);
    var beforeTotalInscrptos = getObjLength(beforedata);
    
    var totalInscrptos;
    if (afterTotalInscrptos!=beforeTotalInscrptos) totalInscrptos = afterTotalInscrptos;
    else return null;

    return admin.database().ref(snap.after.ref.parent.child('meta')).update({cantidad:totalInscrptos})
    .catch(function(error){
        console.log(error);
    });
});

exports.obsUserInscripcionesCursos = functions.database.ref('usuarios/{idUsuario}/inscriptos/names')
.onWrite(function(snap,contex){
    var idUsuario = snap.after.ref.parent.parent.key;
    var snapObj = snap.after.toJSON();
    for (var key in snapObj){
        var idCurso = key;
        admin.database().ref(`cursos/${idCurso}/alumnos/inscriptos/names`).update(idUsuario).then(function(succed){
            console.log("en succed hay: ",succed);
            //capaz puede estar aparte
            functions.database.ref(`cursos/${}`).onWrite(function(snap2,contex2){
                var objetivos = 
                admin.database().ref(`usuario/${idUsuario}/cursos/${idCurso}/desempeno/objetivos`).set(objetivos);

            });

           
        },function(error){
            console.log("error en push: ",error);
        });
        
    }
    return null;
});
/*
exports.obsObjetivos = 
exports.IdCuoursesGenerator = functions.https.onRequest(function(quest, response){
    idCursoCounter++;
    response.send(idCursoCounter.toString());
});
*/

exports.obsAlumnosAgregadosACurso = functions.database.ref('cursos/{cursoId}/')
.onWrite(function(snap,context){//con onCreate snap.val() is not a function
    var datoRaiz = snap.after.val(); 
    console.log(datoRaiz);
    //var dirAlumno = snap.after.ref.child('alumnos').key.toString();
    var dirData = snap.after.ref.child('data').key.toString();
    var idGeneradoPorPush = snap.after.ref.child('alumnos').child("").key.toString();
    console.log(idGeneradoPorPush);

    var idDelCurso = snap.after.ref.key.toString();
    var uidDelAlumno = datoRaiz["alumnos"][`${idGeneradoPorPush}`]["idDelUsuario"];
    var nombre = datoRaiz[`${dirData}`]["nombre"];
    var dataJSON = {
        uidDelAlumno : uidDelAlumno,
        idDelCurso : idDelCurso,
        nombreDelCurso : nombre,
    };
    console.log(dataJSON);

    var refNuevoAlumno = admin.database().ref(`usuarios/${dataJSON.uidDelAlumno}/cursos/${dataJSON.idDelCurso}`);
    refNuevoAlumno.set(dataJSON)
    .then(function(){
        console.log("Curso llamando a Alumno OK");
    },function(error){
        console.log("Curso no pudo llamar a Alumno: ",error);
    });
    return null;
});

function getObjLength (obj){
	var cont = 0;
	for (var key in obj){
		cont++;
	}
return cont;
}

