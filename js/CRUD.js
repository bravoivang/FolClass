  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAc1lu7RaXTzv0-0kK1G3hC__zWeZHUAkU",
    authDomain: "bravofolclass.firebaseapp.com",
    databaseURL: "https://bravofolclass.firebaseio.com",
    projectId: "bravofolclass",
    storageBucket: "bravofolclass.appspot.com",
    messagingSenderId: "115386585030"
  };
firebase.initializeApp(config);

//¿quien genera el path? => el que lo llama
//¿quien parsea el obj? => nadie, se guarda entero. El que lo pide despues lo filtra ;)

const fbdb = firebase.database();
const ROOTref = firebase.database().ref();

var preload;

perfilUpdate = function () { //mudar a gestor
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

function firstCharge (){
    fbdb.ref('usuarios/'+currentUser.user.uid).once('child_added', function (snap) {
        preload = snap.val();
    });
}

