// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  swipe: 'left',
  pushState: true,
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    //leftBreakpoint: 960, clava el panel left como parte de la pagina y no como una solapa por encima    
  },
    
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

//cree el panel
var panelLeft = app.panel.create ({
  el: '.panel-left',
  side: 'left'

});
/*
function nonan(panel){
  alert("panel : open");

 panel.close();  
}
panelLeft.on('open', nonan)
////
*/

panelLeft.on('open', function (panel) {
  alert ("panel open con eventos para objetos instanciados");
  console.log("on devuelve para el callback 'panel' que es el objeto instanciado, por lo que se lo puede manipular");
  setTimeout(function () {
    panel.close(true);
  },3000);
});
panelLeft.on('close', function () {
  console.log("panel cerrado <==");
});


//var entorno = true;
if (!entorno){
  mainView.router.navigate('/login-screen/');
  console.log("no estas logeado");
    
  
  
} 
/*
app.on('click', function () {
  mainView.router.navigate("/login-screen/"); //router.navigate se usa para navegar entre pages
                                              //en parametros se le puede mandar un objeto con las especificaciones
                                              //{path:'/login-screen/',name:'login'}
                                              //y si tenes mas boludeces para mandar tambien
  console.log("cargué");
});
*/

$$(document).on('page:init', '.page[data-name="login"]', function () {
  // Login Screen funcion de login click
  $$('#singIn').on('click', function () {
    var username = $$('[data-name="login"] [name="username"]').val(); 
    var password = $$('[data-name="login"] [name="password"]').val();
    // Alert username and password
    app.dialog.alert("User: "+username+"</br>"+"Password: "+password);
      //redirecting
    mainView.router.back({
      animate : true,
      pushState : false,
      ignoreCache: true,
    }); 
    
  });
});



$$(document).on('page:init', '.page[data-name="alumnos"]', function (e) {
  console.log(e.name);
  console.log("recarga");

  dibujadorAlumnos (contenidoAlumnos);
});





$$(document).on('page:init', '.page[data-name="cursos"]', function (e) {
  console.log(e.name);
  console.log("recarga");

  dibujadorCursos (contenidoCursos);
});

$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  console.log(e.name);
  console.log("recarga");

  /*if(!entorno){

  }*/

  dibujadorDashboard (contenidoDashboard);
});

//contenido viene de BD
{
var entorno = false;
var contenidoAlumnos = {
  
  alumnos: ["alumno1","alumno2","alumno3","alumno4","alumno5","alumno6","alumno7"],
  cantidadTotal: "6",
  asissAlumn1: "5",//ej para alumno 1

}
var contenidoCursos = {
  
  cursos: ["curso1","curso2","curso3","curso4","curso5"],
  cantidadTotal: "5",
}

var contenidoDashboard = {
  
  totalAlumnos: contenidoAlumnos.cantidadTotal,
  totalPagos: "$15000",
  statusMilestone: "3/5",

  feed: {
    js: false,
    html: true,
    css: true,
  },
  asistencias: contenidoAlumnos.asissAlumn1,

}
}
//dibujador de cards Alumnos
function dibujadorAlumnos (contenido) {

  var rows = Math.ceil(contenido.alumnos.length / 4);
  var arrayAlumnos = contenido.alumnos.reverse();
  var dashboard = $$('[data-name="alumnos"] .dashboard'); console.log(dashboard);
  //var loopAux = 4;
  //var restAux = contenido.alumnos.length % 4;

  
  for (var i = 0; 2>i; i++)
  {  
    var currentRow = $$('<div>'); 
    currentRow.addClass("row");

    for (var j = 0; 4>j; j++)
    {
      //creo columna
      var currentCol = $$('<div>');  
      currentCol.addClass("col-30.tablet-30.desktop-30"); 
      //creo card
      if(arrayAlumnos.length < 1)
      {
        //card vacia. solo espacio de columna para compretar el 100% con 4 espacios
        // card Style empy para alumno
      }
      else 
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-content.card-content-padding");
        currentCard.append(arrayAlumnos.pop());
      }
      //inserto card a columna      
      currentCol.append(currentCard);
      //inserto columna a row
      currentRow.append(currentCol);
    }
    //inserto row a dashboard
    dashboard.append(currentRow);
  }

}

//dibujador de cards Cursos
function dibujadorCursos (contenido) {

  var rows = Math.ceil(contenido.cursos.length / 4);
  var arrayCursos = contenido.cursos.reverse();
  var dashboard = $$('[data-name="cursos"] .dashboard'); console.log(dashboard);
  //var loopAux = 4;
  //var restAux = contenido.alumnos.length % 4;

  
  for (var i = 0; rows>i; i++)
  {  
    var currentRow = $$('<div>'); 
    currentRow.addClass("row");

    for (var j = 0; 2>j; j++)
    {
      //creo columna
      var currentCol = $$('<div>');  
      currentCol.addClass("col-50.tablet-50.desktop-50"); 
      //creo card
      if(arrayCursos.length < 1)
      {
        //card vacia. solo espacio de columna para compretar el 100% con 4 espacios
        // card Style empy para curso
      }
      else 
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-content.card-content-padding");
        currentCard.append(arrayCursos.pop());
      }
      //inserto card a columna      
      currentCol.append(currentCard);
      //inserto columna a row
      currentRow.append(currentCol);
    }
    //inserto row a dashboard
    dashboard.append(currentRow);
  }

}

//dibujador de cards Dashboard
function dibujadorDashboard (contenido) {

  dibujadorMiniCards(contenido);
  dibujadorMaxiCards(contenido);

  //dibujador de mini cards Dashboard
  function dibujadorMiniCards (contenido){

    var rows = 1;
    var displayCont = [contenido.totalAlumnos,contenido.totalPagos,contenido.statusMilestone].reverse();
    var dashboard = $$('[data-name="home"] .dashboard'); console.log(dashboard);
    //var loopAux = 4;
    //var restAux = contenido.alumnos.length % 4;
    
    for (var i = 0; rows>i; i++)
    {  
      var currentRow = $$('<div>'); 
      currentRow.addClass("row");

      for (var j = 0; 4>j; j++)
      {
        //creo columna
        var currentCol = $$('<div>');  
        currentCol.addClass("col-30.tablet-30.desktop-30"); 
        //creo card
        if(displayCont.length < 1)
        {
          //card vacia. solo espacio de columna para compretar el 100% con 4 espacios
          // card Style empy para curso
        }
        else 
        {
          var currentCard = $$('<div>');
          currentCard.addClass("card-content.card-content-padding");
          currentCard.append(displayCont.pop());
        }
        //inserto card a columna      
        currentCol.append(currentCard);
        //inserto columna a row
        currentRow.append(currentCol);
      }
      //inserto row a dashboard
      dashboard.append(currentRow);
    }

  }

  function dibujadorMaxiCards (contenido){

    var rows = 1;
    var displayCont = [contenido.feed.toString(),contenido.asistencias].reverse();
    var dashboard = $$('[data-name="home"] .dashboard'); console.log(dashboard);
    //var loopAux = 4;
    //var restAux = contenido.alumnos.length % 4;
    
    for (var i = 0; rows>i; i++)
    {  
      var currentRow = $$('<div>'); 
      currentRow.addClass("row");

      for (var j = 0; 2>j; j++)
      {
        //creo columna
        var currentCol = $$('<div>');  
        currentCol.addClass("col-50.tablet-50.desktop-50"); 
        //creo card
        if(displayCont.length < 1)
        {
          //card vacia. solo espacio de columna para compretar el 100% con 4 espacios
          // card Style empy para curso
        }
        else 
        {
          var currentCard = $$('<div>');
          currentCard.addClass("card-content.card-content-padding");
          currentCard.append(displayCont.pop());
        }
        //inserto card a columna      
        currentCol.append(currentCard);
        //inserto columna a row
        currentRow.append(currentCol);
      }
      //inserto row a dashboard
      dashboard.append(currentRow);
    }

  }
}
  

