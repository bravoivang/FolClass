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
    
    alumnos: ["1111","2222","3333","4444","5555","6666","7777","1111","2222","3333","4444","5555","6666","6666","7777"],
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

$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  
  cardDrawing (contenidoDashboard,"card-basic");
});

$$(document).on('page:init', '.page[data-name="objetivos"]', function (e) {
  var content = currentCourse.objetivos;
  cardDrawing (content,"card-basic");
});

$$(document).on('page:init', '.page[data-name="alumnos"]', function (e) {
  var content = currentCourse.alumnos; //la db deberia ser como objetivos. para alumnos tendria que menterme en .alumnos
  cardDrawing (content,"card-basic");
});

$$(document).on('page:init', '.page[data-name="cursos"]', function (e) {
  var content = currentUser; //idem para ver los id cursos tendria que menterme en .alumnos
  cardDrawing (content,"card-basic");
});


//se encarga de dibujar los slot de cards con sus respectivas rows según inscriptos en la DB
function cardDrawing (content,cssCard) {
  var divNum = 4;
  var rows = Math.ceil(content.inscriptos.meta.cantidad / divNum);
  var names = content.inscriptos.names;
  var array = [];
  var objLenght = 0;
  for (var key in names){
    array.push(names[key]);
    objLenght++;
    console.log(names[key]);
  }
  var cardZone = $$('.cardZone'); 
  var aux = 0;
  
  for (var i = 0; rows>i; i++)// cont->card->row->dashboard
  {  
    var currentRow = $$('<div>'); 
    currentRow.addClass("row");

    for (var j = 0; divNum>j; j++,aux++)
    {
      //creo columna
      var currentCol = $$('<div>');  
      currentCol.addClass("col-30.tablet-30.desktop-30"); 
      //creo card
      if(objLenght-aux < 1)
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-null card-content card-content-padding"+" "+cssCard);
        currentCard.append("");
      }
      else 
      {
        var currentCard = $$('<div>');
        currentCard.addClass("card-content card-content-padding"+" "+cssCard);
        currentCard.append(array[aux]); /*aca estoy poniendo solo los nombres
                                                pero iria toda la data. Lo cual tiene que ser una funcion
                                                externa para cada caso*/
      }
      //inserto card a columna      
      currentCol.append(currentCard);
      //inserto columna a row
      currentRow.append(currentCol);
    }
    //inserto row a dashboard
    cardZone.append(currentRow);
  }
}


function addEditCard (view){ //rediseñar
  var cardZone = $$('.cardZone'); 
  var currentRow = $$('<div>'); 
  currentRow.addClass("row");
  var currentCol = $$('<div>');  
  currentCol.addClass("col-30.tablet-30.desktop-30"); 
  var currentCard = $$('<div>');
  currentCard.addClass("card-content card-content-padding"+" "+"card-add");
  currentCard.append(view);
  currentCol.append(currentCard);
  currentRow.append(currentCol);
  cardZone.append(currentRow);
}
