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
        var data = accTakeData();
        login (data);
        console.log("User: "+data.email+"Password: "+data.password);
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
        var data = accTakeData();
        register (data);
        console.log("User: "+data.email+ "Password: "+data.password + "Repass: "+ data.repassword +" Nick: "+data.nick);
    });
}

function accTakeData (){
    var currentData = {};
    currentData.email = $$('#acc-email').val(); 
    currentData.password = $$('#acc-password').val();
    currentData.nick = $$('#acc-nick').val();
    currentData.repassword = $$('#acc-repassword').val();
    currentData.date = "";
    currentData.toggle = "";
    currentData.slider = "";
    currentData.checkbox = "";
    return currentData;
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
}


function couTakeData (){
    var dataJSON = {};
    dataJSON = {
        name: $$('#name').val(),
        tematica: $$('#tematica').val(),
        certificacion: $$('#certificacion').val(),
        cupo: $$('#cupo').val(),
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
    update(pathUid, dataJSON);
    update(pathUid+"/objetivos/inscriptos/names" , dataJSON.objetivos.inscriptos.names);
    update('usuarios/'+currentUser.uid+'/inscriptos/names/',{ [currentCourse.meta.uid]: dataJSON.name}); //ECMA6
}