// Dom7
var $$ = Dom7;
var today = new Date();
// Framework7 App main instance
var app  = new Framework7({
  
  picker: {
    
    containerEl: '#demo-picker-date-container',
    openIn : 'popover',
    closeByOutsideClick: true,
    inputEl: '#demo-picker-date',
    toolbar: false,
    rotateEffect: true,
    value: [
        today.getMonth(),
        today.getDate(),
        today.getFullYear(),
    ],
    formatValue: function (values, displayValues) {
        return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
    },
    cols: [
        // Days
        {
        values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
        // Months
        {
        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
        displayValues: ('January February March April May June July August September October November December').split(' '),
        textAlign: 'left'
        },
        // Years
        {
        values: (function () {
            var arr = [];
            for (var i = 1950; i <= 2030; i++) { arr.push(i); }
            return arr;
        })(),
        },
        // Space divider
        {
        divider: true,
        content: '&nbsp;&nbsp;'
        },
    ],
    on: {
        change: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
        }
        },
    },
  },
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
  on: {
    init: function () {
      currentUser= defaultUser;
      currentCourse= defaultCourse;
    },
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
    pushError: function (error){
      //app["lastError"].push(error);
      //console.log("error disponible en app.lastError"); 
      console.log(error);
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
/*
panelLeft.on('open', function (panel) {
  console.log("panel open con eventos para objetos instanciados");
 
 /* console.log("on devuelve para el callback 'panel' que es el objeto instanciado, por lo que se lo puede manipular");
  setTimeout(function () {
    panel.close(true);
  },3000);
});
*/
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
var arrayDeGaougesObjetivos = [];
$$(document).once('page:init', '.page[data-name="home"]', function (e) {
  // var demoGauge = app.gauge.create({
  //   el: '#dos',
  //   type: 'circle',
  //   value: 0.5,
  //   size: 250,
  //   borderColor: '#2196f3',
  //   borderWidth: 10,
  //   valueText: '50%',
  //   valueFontSize: 41,
  //   valueTextColor: '#2196f3',
  //   labelText: 'amount of something',
  // });
  console.log("cargue home");

  // Change demo gauge on button click
  
  
  // cardDrawing (content,page,"card-basic");
});

function accionGauge(i){
  var value = 10;
  arrayDeGaougesObjetivos[i].update({
    value: value / 100,
    valueText: value + '%'
  });
}

$$(document).on('page:afterin', '.page[data-name="objetivos"]', function (e) {
  for (var i = 0; i<cantidadObjetivosActual ; i++){ 
    var gaugeObjetivos = app.gauge.get(`#gauge${i}`);
    arrayDeGaougesObjetivos[i]= gaugeObjetivos;
  }
});

$$(document).on('page:init', '.page[data-name="objetivos"]', function (e) {
  dibujarCartasObjetivos ();
});

$$(document).on('page:init', '.page[data-name="alumnos"]', function (e) {
  var content = currentCourse.alumnos; //la db deberia ser como objetivos. para alumnos tendria que menterme en .alumnos
  var page  = "alumnos";
  dibujarGrilla (content,page,"card-basic");
});

$$(document).on('page:init', '.page[data-name="cursos"]', function (e) {
  var content = currentUser; //idem para ver los id cursos tendria que menterme en .alumnos
  var page  = "cursos";
  dibujarGrilla (content,page,"card-basic");
});


function dibujarCartasObjetivos () {
  var objetivos = currentCourse.objetivos;
  var divNum = 4;
  var cantidadDeObjetivos = objetivos['cantidad'];
  var rows = Math.ceil(cantidadDeObjetivos / divNum);
  
  var cardZone = $$('.cardZone'); 
  
  for (var i = 0,aux=0; rows>i; i++)// contenido->card->row->cardZone
  {  
    //creo fila
    var currentRow = $$('<div>'); 
    currentRow.addClass("row");

    for (var j = 0; divNum>j; j++)
    {
      //creo columna
      var currentCol = $$('<div>');  
      currentCol.addClass("col-30.tablet-30.desktop-30"); 
      //creo card
      var currentCard;
      if(cantidadDeObjetivos-j < 1)
      {
        currentCard = $$('<div>');
        currentCard.addClass("card-null card-content card-content-padding");
        currentCard.append("");
      }
      else 
      {
        currentCard = crearCardObjetivo(j); 
      }
      aux++;
      //inserto card a columna      
      currentCol.append(currentCard);
      //inserto columna a row
      currentRow.append(currentCol);
    }
    //inserto row a dashboard
    cardZone.append(currentRow);
  }
}

function crearCardObjetivo (i){
  //var currentObjetivo = currentCourse.objetivos;
  var nombre = nombresObjetivosCursoActual[i];
  var descripcion = descripcionesObjetivosCursoActual[i];

  var cardHeader = $$('<div>').addClass('card-header');
  cardHeader.text(nombre);
  var cardFooter = $$('<div>').addClass('card-footer');
  cardFooter.text(descripcion);
  var cardContent = $$('<div>').addClass('card-content card-content-padding');
  var col = $$('<div>').addClass('col-25 block block-strong text-align-center minCard-obj');
  var gauge = $$('<div>').addClass('gauge gauge-init');
  gauge.attr({
    class:"gauge gauge-init",
    id:`gauge${i}`,
    onclick:`accionGauge(${i})`,
    "data-value":"0.44",
    "data-type":"circle",
    "data-value-text":"44%",
    "data-value-text-color":"#ff9800",
    "data-border-color":"#ff9800",
  });
  
  var card = $$('<div>').addClass("card");
  card.append(cardHeader);
  col.append(gauge);
  cardContent.append(col);
  card.append(cardContent);
  card.append(cardFooter);
  return card;
}


//se encarga de dibujar los slot de cards con sus respectivas rows según inscriptos en la DB
function dibujarGrilla (content) {
  var divNum;
  var rows;
  var names = [];
  var array = [];
  var objLenght;

  switch (page){
    case "dashboard": {
      break;
    };

    case "objetivos": {
      for (var int in nombresObjetivosCursoActual){
          names.push(content[int].nombre);
      }
      divNum = 4;
      rows = Math.ceil(content['cantidad'] / divNum);
      objLenght = getObjLength(names);
      break;
    };

    case "alumnos": {
      for (var key in content){
        if (key != "cantidad"){
          names.push(content[key].nombre);
        }
      }
      divNum = 4;
      rows = Math.ceil(content['cantidad'] / divNum);
      objLenght = getObjLength(names);
      break;
    };

    case "cursos": {
      divNum = 4;
      rows = Math.ceil(content.cursos['cantidad'] / divNum);
      names = nombresCursosDisponibles;
      objLenght = getObjLength(names);
      break;
    };

    case "default":{
      //null case
      break;
    }
  }

  for (var key in names){
    array.push(names[key]);
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
        var currentCard = crearCardObjetivo(i); /*aca estoy poniendo solo los nombres
                                                pero iria toda la data. Lo cual tiene que ser una funcion
                                                externa para cada caso*/
          //append va a llamar a una funcion con paramtro idsObjetivoPusheadoCursoActual[i]
          //la funcion va a devolver un html object creado con .html("string") 
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


//helper
function getObjLength (obj){
	var cont = 0;
	for (var key in obj){
		cont++;
	}
return cont;
}

