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

//para UPDATEAR curso
$$(document).on('page:init', '.page[data-name="mod-course"]', function () {
   /* fbdb.ref().once('child_added',function(snap){
        var formData = {
            'certificacion': currentCourse.data.certificacion,
            'cupo': currentCourse.data.curpo,
            'tematica': currentCourse.data.tematica,
            'name': currentCourse.data.name,
            'abono': currentCourse.data.abono,
            'listadoAlumnos': {juan:"juan"},
            'listadoObjetivos': {css:"css"},
        };
    })
    
    app.form.fillFromData('#my-form', formData);*/
    $$('.convert-form-to-data').on('click', function(){
        var formData = app.form.convertToData('#my-form');
        console.log(formData);
        var data = {
            certificacion: formData.certificacion,
            cupo : formData.cupo,
            tematica : formData.tematica,
            name : formData.name,
            abono : formData.abono,
        };

        updateAtributeCourse(idCurso, '/alumnos/inscriptos/names', alumnos);
        updateAtributeCourse(idCurso, '/data', data);
        updateAtributeCourse(idCurso, '/objetivos/inscriptos/names', objetivos);
        
    }); 
});

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
    var largo = nombresCursosDisponibles;
    console.log("abierto desde gestor");
    var itemsAcordeonPanelLeft = $$('#acordionCursosList');
    for(var i = 0; i<largo.length; i++){
        var nombreCurso = largo[i];
        var currentA = $$('<a>');
        currentA.addClass("button panel-close");
        currentA.text(nombreCurso);
        currentA.attr('href', '/cursos/');
        itemsAcordeonPanelLeft.append(currentA);
    }
});
