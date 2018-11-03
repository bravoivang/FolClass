routes = [
    {
      name: "home",
      path: '/',
      url: './index.html',
      on: {
        pageBeforeIn: function (event, page) {
            $$('#navbar-home-currentCourse').text(currentCourse.data["nombre"]);       
        },
      },
      once : {
        pageInit: function (event, page) {
          $$('#navbar-home-currentCourse').text(currentCourse.data["nombre"]);       
      },
      }
    },
    
    {
      name: 'access',
      path: '/access-screen/',
      url: './pages/access-screen.html',
    },
    {
      path: '/about/',
      url: './pages/about.html',
    },
    {
      name: 'objetivos',
      path: '/objetivos/',
      url: './pages/objetivos.html',
      on: {
        pageBeforeIn: function (event, page) {
            $$('#navbar-objetivos-currentCourse').text(currentCourse.data["nombre"]);       
        },
      },
    },
    {
      path: '/cursos/',
      url: './pages/cursos.html',
    },
    {
      path: '/add-course/',
      url: './pages/add-course.html',
    },
    {
      path: '/mod-course/',
      url: './pages/mod-course.html',
      on: {
        pageBeforeIn: function (event, page) {
            $$('#navbar-mod-course-currentCourse').text(currentCourse.data["nombre"]);       
        },
      },
    },
    {
      name: 'alumnos',
      path: '/alumnos/',
      url: './pages/alumnos.html',
      on: {
        pageBeforeIn: function (event, page) {
            $$('#navbar-alumnos-currentCourse').text(currentCourse.data["nombre"]);       
        },
      },
    },
    {
      name: 'alumno',
      path: '/alumno/',
      url: './pages/alumno.html',
      on: {
        pageBeforeIn: function (event, page) {
            $$('#navbar-alumno-currentCourse').text(currentCourse.data["nombre"]);       
        },
      },
    },
    {
      path: '/add-student/',
      url: './pages/add-student.html',
    },
    
    {
      path: '/perfil/',
      url: './pages/perfil.html',
    },
    // Left View Pages 
/*    {
      path: '/left-page-1/',
      url: './pages/left-page-1.html',
    },   
    {
      path: '/left-page-2/',
      url: './pages/left-page-2.html',
    },
*/    
    // Page Loaders & Router
    {
      path: '/page-loader-template7/:user/:userId/:posts/:postId/',
      templateUrl: './pages/page-loader-template7.html',
    },
    {
      path: '/page-loader-component/:user/:userId/:posts/:postId/',
      componentUrl: './pages/page-loader-component.html',
    },
    {
      path: '/request-and-load/user/:userId/',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;
  
        // Show Preloader
        app.preloader.show();
  
        // User ID from request
        var userId = routeTo.params.userId;
  
        // Simulate Ajax Request
        setTimeout(function () {
          // We got user data from request
          var user = {
            firstName: 'Vladimir',
            lastName: 'Kharlampidi',
            about: 'Hello, i am creator of Framework7! Hope you like it!',
            links: [
              {
                title: 'Framework7 Website',
                url: 'http://framework7.io',
              },
              {
                title: 'Framework7 Forum',
                url: 'http://forum.framework7.io',
              },
            ]
          };
          // Hide Preloader
          app.preloader.hide();
  
          // Resolve route to load page
          resolve(
            {
              componentUrl: './pages/request-and-load.html',
            },
            {
              context: {
                user: user,
              }
            }
          );
        }, 1000);
      },
    },
    // Default route (404 page). MUST BE THE LAST
    {
      path: '(.*)',
      url: './pages/404.html',
    },
  ];