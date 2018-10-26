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

const REF = firebase.database().ref('/');

var dataJSON = {};


loadData = function () {
    dataJSON = {
        id: externalCount,
        name: $$('#name')[0].value,
        email: $$('#email')[0].value,
        password: $$('#password')[0].value,
        date: $$('#date')[0].value,
        toggle: $$('#toggle')[0].checked,
        slider: $$('#slider')[0].value,
        checkbox: $$('#checkbox')[0].checked,
    };
    var path = REF_usuarios+"/"+externalCount;
    externalCount++;
    saveData(path);
}
/*
// Get a reference to the /users/ada node
var adaRef = firebase.database().ref("users/ada");
// The above is shorthand for the following operations:
//var rootRef = firebase.database().ref();
//var adaRef = rootRef.child("users/ada");
*/

saveData = function (path){
   // path+=externalCount;
   // firebase.database().ref("docentes/" + uid).set({name: "yo"});
//firebase.database().ref('usuarios/'+externalCount).set(dataJSON);
    firebase.database().ref(path).set(dataJSON);
    console.log("se cargó en: "+path+" el dataJSON");
}
var a; 
var ref;
firebase.database().ref('usuarios/').on("child_added", function (snap) {
    a = snap.val();
    console.log("watchChanges activated");
    console.log(a);
    
});

