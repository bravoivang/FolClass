//se encarga de modificar datos de las pantallas segun
//estado de user
//es quien utiliza DOM7 para selecionar segun pantalla objetos HTML

//access-screen/

$$(document).on('page:init', '.page[data-name="access"]', function () {
    var accObj= {};
    accObj.el_accTitle = $$('#accessTitle');
    accObj.el_accRegLog = $$('[name="acc-reg-log"]');
    accObj.el_accReg = $$('[name="acc-reg"]');
    accObj.el_accCommands = $$('[name="acc-commands"]'); 
    accObj.el_accGo = $$('[name="acc-go"]');
    accObj.el_accInputs = $$('[name="acc-inputs"]');
    accObj.el_accButtonLog = $$('#acc-login');
    accObj.el_accButtonReg = $$('#acc-register');
    accObj.el_accButtonGo = $$('#acc-go');
    accObj.el_accButtonBack = $$('#acc-back');
    
    accRest(accObj);

    accObj.el_accButtonLog.on('click',() => {
        accGoLog(accObj);
    });
    accObj.el_accButtonReg.on('click',() => {
        accGoReg(accObj);
    });
});

function accRest(accObj) {
    accObj.el_accGo.hide();
    accObj.el_accCommands.show();
    accObj.el_accInputs.hide();
    accObj.el_accTitle.text("Bienvenido");
}

function accGoLog (accObj){
    accObj.el_accInputs.show();
    accObj.el_accReg.hide();
    accObj.el_accCommands.hide();
    accObj.el_accGo.show();
    accObj.el_accTitle.text("Login");
    accObj.el_accButtonGo.text("Go Log!");
    accObj.el_accButtonBack.on('click', () =>{
        accRest(accObj);
    });
    accObj.el_accButtonGo.on('click',() =>{
        var dataJSON = accTakeData();
        login (dataJSON);
        console.log("User: "+dataJSON.data.email+"Password: "+dataJSON.data.password);
    });

}
function accGoReg (accObj){
    accObj.el_accInputs.show();
    accObj.el_accReg.show();
    accObj.el_accCommands.hide();
    accObj.el_accGo.show();
    accObj.el_accTitle.text("Register");
    accObj.el_accButtonGo.text("Go Reg!");
    accObj.el_accButtonBack.on('click', function () {
        accRest(accObj);
    });
    accObj.el_accButtonGo.on('click', function () {
        var dataJSON = accTakeData();
        register (dataJSON);
        console.log("User: "+dataJSON.data.email+ "Password: "+dataJSON.data.password + "Repass: "+ dataJSON.data.repassword +" Nick: "+dataJSON.data.nick);
    });
}

function accTakeData (){
    var dataJSON = getStandarUser();
    dataJSON.data.email = $$('#acc-email').val(); 
    dataJSON.data.password = $$('#acc-password').val();
    dataJSON.data.nick = $$('#acc-nick').val();
    dataJSON.data.repassword = $$('#acc-repassword').val();
    return dataJSON;
}

function perTakeData () { 
    var dataJSON = {};
    dataJSON = {
        //uid: currentUser.uid,
        nick: $$('#nick').val(),
        //email: $$('#email')[0].value, //plus: cambiar email
        //password: $$('#password')[0].value, //plus : cambiar password
        date: $$('#date').val(),
        toggle: $$('#toggle').val(),
        slider: $$('#slider').val(),
        checkbox: $$('#checkbox').val(),
    };
    var pathUid = "usuarios/"+currentUser.uid;
    update(pathUid,dataJSON);
    return dataJSON;
}

function dibujarListadoObjetivos(cantidad){
    var el = $$('#mod-course-formObjetivos');
    var currentObjetivo = currentCourse.objetivos;
    for (var i=0; i<cantidad; i++){
        var nombre = currentObjetivo[idsObjetivoPusheadoCursoActual[i]].nombre;
        var descripcion = currentObjetivo[idsObjetivoPusheadoCursoActual[i]].descripcion;
        var elChild = $$("<div>").attr("class","block-tittle");
        elChild.text(`${nombre}`);
        elChild.html(
            `<ul id="list-formObjetivos${i}">\
            <li>\
                <div class="item-content item-input">\
                    <div class="item-inner">\
                        <div class="item-title item-label">Nombre del objetivo</div>\
                        <div class="item-input-wrap">\
                            <input type="text" name="nombre${i}" placeholder=${nombre}>\
                        </div>\
                    </div>\
                </div>\
                    <div class="item-content item-input">\
                        <div class="item-inner">\
                            <div class="item-title item-label">Descripción</div>\
                            <div class="item-input-wrap">\
                                <textarea name="descripcion${i}" placeholder="${descripcion}"></textarea>\
                            </div>\                       
                    </div>\
                </div>\

                <div class="row">        
                    <!--<div class="col-33"><button class="button button-fill" onclick="actualizarObjetivo(${i})">Actualizar</button></div>-->\
                    <a href="#" onclick="actualizarObjetivo(${i})">Actualizar</a>
                </div>\
            </li>`);
        el.append(elChild);
    }
}

//para UPDATEAR curso
$$(document).on('page:init', '.page[data-name="mod-course"]', function () {
    dibujarListadoObjetivos(currentCourse.objetivos.cantidad);

    //    fbdb.ref().once('child_added',function(snap){
        var formData = {
            'certificacion': currentCourse.data.certificacion,
            'cupo': currentCourse.data.curpo,
            'tematica': currentCourse.data.tematica,
            'nombre': currentCourse.data.nombre,
            'abono': currentCourse.data.abono,
            // 'listadoAlumnos': {juan:"juan"},
            // 'listadoObjetivos': {css:"css"},
        };
    // app.form.fillFromData('#my-form p', formData);
});

$$(document).on('page:afterin', '.page[data-name="mod-course"]', function () {
    $$('.convert-form-to-data').on('click', function(){
        var formData = app.form.convertToData('#mod-course-formDatos');
        console.log(formData);
        var data = {
            certificacion: formData.certificacion,
            cupo : formData.cupo,
            tematica : formData.tematica,
            nombre : formData.nombre,
            abono : formData.abono,
        };
           
        updateAtributeCourse(currentCourse.meta.uidDelCurso, '/data', data);
        mainView.router.navigate('/cursos/');
        // var nuevoObjetivo = {nombre:"Tema1",descripcion:"Estudien mucho"};
        // dataJSON["objetivo1"]
        // dataJSON.objetivos.push(nuevoObjetivo);

        //updateAtributeCourse(currentCourse.meta.uidDelCurso, '/alumnos/inscriptos/names', alumnos);       
    });   
});

function actualizarObjetivo(i){
    var formObjetivo = app.form.convertToData(`#mod-course-formObjetivos${i}`);
    var objetivo = {
        descripcion : formObjetivo[`descripcion${i}`],
        nombre : formObjetivo[`nombre${i}`],
    };
    console.log(formObjetivo);
    updateAtributeCourse(currentCourse.meta.uidDelCurso, `/objetivos/${idsObjetivoPusheadoCursoActual[i]}`, objetivo);
}

//para CREAR curso
$$(document).on('page:init', '.page[data-name="add-course"]', function () {
   
    $$('.convert-form-to-data').on('click', function(){
        var formData = app.form.convertToData('#my-form');
        console.log(formData);
        var curso = getStandarCourse();
        curso.data = {
            certificacion: formData.certificacion,
            cupo : formData.cupo,
            tematica : formData.tematica,
            name : formData.name,
            abono : formData.abono,
        };
        createCourse(curso);        
    }); 
});
var pickerInline;
//para CREAR Alumno
$$(document).on('page:init', '.page[data-name="add-student"]', function () {

    $$('.convert-form-to-data').on('click', function(){
        var formData = app.form.convertToData('#my-form');
        formData.listadoAlumnos = {juan:"juan"};
        formData.listadoObjetivos = {css:"css",html:"html",js:"js",f7:"f7",};
        console.log(formData);
       /* var curso = getStandarCourse();
        curso.alumnos.inscriptos.names = formData.listadoAlumnos;
        curso.data = {
            certificacion: formData.certificacion,
            cupo : formData.cupo,
            tematica : formData.tematica,
            name : formData.name,
            abono : formData.abono,
        };
        curso.objetivos.inscriptos.names = formData.listadoObjetivos;
        createCourse(curso);   */     
    }); 
    $$('#date').on('click', function() {
        
        pickerInline = app.picker.create(app.picker);
    
});

});

function couTakeData (){
    var dataJSON = {};
    dataJSON = {
        data : {
            name: $$('#name').val(),
            tematica: $$('#tematica').val(),
            certificacion: $$('#certificacion').val(),
            cupo: $$('#cupo').val(),
        },        
        objetivos: {
            inscriptos: {
                meta: {
                    cantidad: "",
                },
                names: {
                    html: $$('#html').val(),
                    js: $$('#js').val(),
                    css: $$('#css').val(),
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
        },
    };
    var pathUid = "cursos/"+currentCourse.meta.uid;
    storage(pathUid+'/data',dataJSON.data);
    storage(pathUid+"/objetivos/inscriptos/names" , dataJSON.objetivos.inscriptos.names);
    update('usuarios/'+currentUser.uid+'/inscriptos/names/',{[currentCourse.meta.uid]: currentCourse.meta.uid}); //ECMA6 //el value es igual al key
}

function stuTakeData (){
    var dataJSON = {};
    dataJSON = {   
        alumnos: {
            inscriptos: {
                meta: {
                    cantidad : "",
                },
                names: {
                    [$$('#name').val()]: {
                        apellido: $$('#apellido').val(),
                        edad,
                        email,
                        
                    },
                }
            }
        },
    };


    var pathUid = "cursos/"+currentCourse.meta.uid;
    update(pathUid+'/data',dataJSON.data);
    update(pathUid+"/objetivos/inscriptos/names" , dataJSON.objetivos.inscriptos.names);
    update('usuarios/'+currentUser.uid+'/inscriptos/names/',{[currentCourse.meta.uid]: dataJSON.name}); //ECMA6
}


panelLeft.once('open', function (panel) {
    var vecId = idCursosDisponibles;
    var vecNombres = nombresCursosDisponibles;
    console.log("abierto desde gestor");
    var itemsAcordeonPanelLeft = $$('#acordionCursosList');
    for(var i = 0; i<vecNombres.length; i++){
        var nombreCurso = vecNombres[i];
        var idCurso = vecId[i];
        var currentA = $$('<a>');
        currentA.addClass("button panel-close color-white");
        currentA.text(nombreCurso);
        //currentA.attr('href', '/');
        currentA.attr('onclick', `haElegidoCurso('${idCurso}')`);
        itemsAcordeonPanelLeft.append(currentA);
    }
});


function haElegidoCurso (idCurso){
    readCourse(idCurso);
    // mainView.router.navigate('/',{
    //     reloadCurrent: true,
    //     animate: true,

    // });
}