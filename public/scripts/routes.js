app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
        templateUrl:'html/home.html',
    }).when('/Ebook',{
        templateUrl:'html/searchresult.html',
    }).when('/start',{
        templateUrl:'html/webcam.html',
    })
})