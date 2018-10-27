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
    pushError: function (error){
      app.lastError.push(error);
      console.log("error disponible en app.lastError");
    }
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    //leftBreakpoint: 960, clava el panel left como parte de la pagina y no como una solapa por encima    
  },
  lastError: [],
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


//contenido viene de BD
{
  var entorno = true;
  var contenidoAlumnos = {
    
    alumnos: ["1111","2222","3333","4444","5555","6666","7777","1111","2222","3333","4444","5555","6666","7777","6666","7777"],
    cantidadTotal: "7",
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

panelLeft.on('open', function (panel) {
  console.log("panel open con eventos para objetos instanciados");
 /* console.log("on devuelve para el callback 'panel' que es el objeto instanciado, por lo que se lo puede manipular");
  setTimeout(function () {
    panel.close(true);
  },3000);*/
});
panelLeft.on('close', function () {
  console.log("panel cerrado <==");
});

/*app.accordion.close(el) - close specified accordion item

item - HTMLElement or string (with CSS Selector) of accordion-item element (<div class="accordion-item">). Required
add class => color-red bg-color-black a curso seleccionado
*/

/*//ejemplo app event con router
app.on('click', function () {
  mainView.router.navigate("/about/"); //router.navigate se usa para navegar entre pages
                                              //en parametros se le puede mandar un objeto con las especificaciones
                                              //{path:'/login-screen/',name:'login'}
                                              //y si tenes mas boludeces para mandar tambien
  console.log("cargué");
});
*/
//ejemplo DOM 7 event para evento init de target page

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

  dibujadorDashboard (contenidoDashboard);
  addEditCard ();
});

//dibujador de cards Alumnos
function dibujadorAlumnos (contenido) {

  var rows = Math.ceil(contenido.alumnos.length / 4);
  var arrayAlumnos = contenido.alumnos;
  var dashboard = $$('[data-name="alumnos"] .dashboard'); console.log(dashboard);
  //var loopAux = 4;
  //var restAux = contenido.alumnos.length % 4;
  var aux = 0;
  console.log("Completo",arrayAlumnos)
  for (var i = 0; rows>i; i++)
  {  
    var currentRow = $$('<div>'); 
    currentRow.addClass("row");

    for (var j = 0; 4>j; j++,aux++)
    {
      //creo columna
      var currentCol = $$('<div>');  
      currentCol.addClass("col-30.tablet-30.desktop-30"); 
      //creo card
      if(arrayAlumnos.length-aux < 1)
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-content.card-content-padding");
        currentCard.append("none");
        //card vacia. solo espacio de columna para compretar el 100% con 4 espacios
        // card Style empy para alumno
      }
      else 
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-content.card-content-padding");
        console.log("El",arrayAlumnos[aux])
        currentCard.append(arrayAlumnos[aux]);
        console.log(i,j);
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
  
function addEditCard (){

}
