const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//var idsCursosObjetivosGeneradoPorPush = [];

/*
var idCursoCounter = 0;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

*/
exports.obsCantidadAlumnosSubcriptos = functions.database.ref('cursos/{idCurso}/alumnos/')
.onWrite(function(snap,contex){
    var afterdata = snap.after.val();
    var beforedata = snap.before.val();

    var afterTotalInscrptos =  getObjLength(afterdata);
    var beforeTotalInscrptos = getObjLength(beforedata);
    
    var totalInscrptos;
    if (afterTotalInscrptos!=beforeTotalInscrptos) totalInscrptos = afterTotalInscrptos;   
    else return null;
 
    return admin.database().ref(snap.after.ref).update({"cantidad":`${totalInscrptos-1}`})
    .catch(function(error){
        console.log(error);
    });
});

exports.obsCantidadObjetivos = functions.database.ref('cursos/{idCurso}/objetivos/')
.onWrite(function(snap,contex){
    var afterdata = snap.after.val();
    var beforedata = snap.before.val();

    var afterTotalInscrptos =  getObjLength(afterdata);
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
});*/

exports.obsCantObjAlumnoCurso = functions.database.ref('usuarios/{idUsuario}/cursos/{idCurso}/desempeno/objetivos')
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
    var cursoOnUpdate = snap.after.val(); 
    var before = snap.before.val();
    
    var cantidadA = cursoOnUpdate.alumnos.cantidad;
    var cantidadB = before.alumnos.cantidad;
    // if (cursoOnUpdate.data.abono != before.data.abono ||
    //     cursoOnUpdate.data.cupo != before.data.cupo ||
    //     cursoOnUpdate.data.nombre != before.data.nombre ||
    //     cursoOnUpdate.data.tematica != before.data.tematica){
    if (cantidadA!=cantidadB) {

        console.log(cursoOnUpdate);
        var idsAlumosGeneradosPorPush = [];
        for (var key in cursoOnUpdate.alumnos){
            if (key != "cantidad"){
                idsAlumosGeneradosPorPush.push(key);
            }
        }
        
        var idsDeAlumnos = [];
        for (var i =0; i<getObjLength(idsAlumosGeneradosPorPush); i++){
            idsDeAlumnos.push(cursoOnUpdate.alumnos[idsAlumosGeneradosPorPush[i]].idDelUsuario);
        }
        
        console.log(idsAlumosGeneradosPorPush);
        
        // var idDelCurso = snap.after.ref.key.toString();
        var idDelCurso = cursoOnUpdate.meta.uidDelCurso;
        var nombreDelCurso = cursoOnUpdate.data.nombre;
        
        for (var i = 0; i<getObjLength(idsDeAlumnos); i++){
            var dataJSON = {
                uidDelAlumno : idsDeAlumnos[i],
                idDelCurso : idDelCurso,
                nombreDelCurso : nombreDelCurso,
            }
            console.log(dataJSON);
            
            var refNuevoAlumno = admin.database().ref(`usuarios/${dataJSON.uidDelAlumno}/cursos/${dataJSON.idDelCurso}/meta/`);
            refNuevoAlumno.set(dataJSON)       
        };
        
        return null;
    }
    return null;
});


exports.obsObjetivosAgregadosACurso = functions.database.ref("cursos/{idCursos}")
.onWrite(function (snap,context){
    var objetivosOnWrite = snap.after.val();
    var before = snap.before.val();
    console.log(objetivosOnWrite);

    var cantidadA = objetivosOnWrite.objetivos.cantidad;
    var cantidadB = before.objetivos.cantidad;
    // if (cursoOnUpdate.data.abono != before.data.abono ||
    //     cursoOnUpdate.data.cupo != before.data.cupo ||
    //     cursoOnUpdate.data.nombre != before.data.nombre ||
    //     cursoOnUpdate.data.tematica != before.data.tematica){
        if (cantidadA!=cantidadB) {

            
            //esto es igual que el que ve los alumnos agregados:
            var idsAlumosGeneradosPorPush = [];
            for (var key in objetivosOnWrite.alumnos){
                if (key != "cantidad"){
                    idsAlumosGeneradosPorPush.push(key);
                }
            }
            var idsDeAlumnos = [];
            for (var i =0; i<getObjLength(idsAlumosGeneradosPorPush); i++){
                idsDeAlumnos.push(objetivosOnWrite.alumnos[idsAlumosGeneradosPorPush[i]].idDelUsuario);
            }
            
            var idsObjetivosGeneradosPorPush = [];
            for (var key in objetivosOnWrite.objetivos){
                if (key != "cantidad"){
                    idsObjetivosGeneradosPorPush.push(key);
                }
            }
            var idDelCurso = objetivosOnWrite.meta.uidDelCurso; 
            
            for (var i =0; i<getObjLength(idsDeAlumnos); i++){
                
                for (var j = 0; j<getObjLength(idsObjetivosGeneradosPorPush); j++){
                    var dataJSON = {
                        nombre : objetivosOnWrite.objetivos[idsObjetivosGeneradosPorPush[j]].nombre,
                        idDelCurso : idDelCurso,
                        idObjetivoGeneradoPorPush : idsObjetivosGeneradosPorPush[j],
                        puntaje : 0,
                    }
                    console.log(dataJSON);
                    
                    var refDesempenoObjetivos = admin.database().ref(`usuarios/${idsDeAlumnos[i]}/cursos/${idDelCurso}/desempeno/objetivos/${idsObjetivosGeneradosPorPush[j]}`);
                    refDesempenoObjetivos.update(dataJSON);     
                    
                };
            }
            return null;
        }
    return null;
});


exports.obsObjetivosDelCursoSegunAlumno = functions.database.ref('usuarios/{idUsuario}/cursos/{idCurso}/')
.onUpdate(function(snap,contex){
    var cursoOnUpdate = snap.after.val();
    var before = snap.before.val();
    console.log(cursoOnUpdate);
    var cantidadA = cursoOnUpdate.desempeno.objetivos.cantidad;
    var cantidadB = before.desempeno.objetivos.cantidad;

    if (cantidadA==cantidadB) {
    var idsObjetivosGeneradosPorPush = [];
    for (var key in cursoOnUpdate.desempeno.objetivos){
        if (key != "cantidad"){
            idsObjetivosGeneradosPorPush.push(key);
        }
    }
    for (var i = 0; i<getObjLength(idsObjetivosGeneradosPorPush); i++){
        var puntaje = cursoOnUpdate.desempeno.objetivos[idsObjetivosGeneradosPorPush[i]].puntaje;
        var idDelcurso = cursoOnUpdate.desempeno.objetivos[idsObjetivosGeneradosPorPush[i]].idDelCurso;
        
        var refObjetivo = admin.database().ref(`cursos/${idDelcurso}/objetivos/${idsObjetivosGeneradosPorPush[i]}/`);
        console.log(refObjetivo);
        refObjetivo.update({"bucket":puntaje}); 
    }
    return null;
    }
    return null;
});


exports.sumarPuntajesEnEstadisticas = functions.database.ref('cursos/{idCurso}/objetivos/{idObjetivo}/')
.onUpdate(function(snap,contex){ 
    var cantidad = snap.after.ref.key;
    if (cantidad == "cantidad") return null;

    var puntajeEntrante = snap.after.child("bucket").val();
    var refObjetoDentroDeObjetivo = snap.after.ref;
    var estadisticaAcumulada = snap.before.child("estadistica").val();
    var estadisticaNueva = estadisticaAcumulada + puntajeEntrante;

    if (puntajeEntrante != 0 ){
        refObjetoDentroDeObjetivo.update({"bucket":0,"estadistica":estadisticaNueva});
    }
    return null;
});

getObjLength = function (obj){
	var cont = 0;
	for (var key in obj){
		cont++;
	}
return cont;
}

