//se encarga de modificar datos de las pantallas segun
//estado de user
//es quien utiliza DOM7 para selecionar segun pantalla objetos HTML

//access-screen/

$$(document).on('page:init', '.page[data-name="access"]', function () {
    console.log("cargué pagina acces");
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
    accObj.el_accButtonBack.on('click', () =>{
        accRest(accObj);
    });
    accObj.el_accButtonGo.on('click',() =>{
        var data = accTakeData();
        register (data);
        console.log("User: "+data.email+ "Password: "+data.password + "Repass: "+ data.repassword +" Nick: "+data.nick);
    });
}

function accTakeData (){
    var accData = {};
    accData.email = $$('#acc-email').val(); 
    accData.password = $$('#acc-password').val();
    accData.nick = $$('#acc-nick').val();
    accData.repassword = $$('#acc-repassword').val();
    return accData;
}
