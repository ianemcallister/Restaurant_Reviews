export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
  //TODO: Change this first one to landing
    .state('home', {	
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    //
    .state('list', {
      url: '/list/:sort',
      templateUrl: 'app/components/all/allRestaurants.html',
      controller: 'AllRestaurantsController',
      controllerAs: 'restaurantsList'
    })
    .state('restaurant', {
      url: '/restaurant/:id',
      templateUrl: 'app/components/aRestaurant/restaurantProfile.html',
      controller: 'RestaurantController',
      controllerAs: 'restaurant'
    })
    .state('restaurant.postedReview', {
      url: '/:id',
      templateUrl: 'app/components/aReview/postedReview.html',
      controller: 'RestaurantController',
      controllerAs: 'restaurant'
    })
    .state('restaurant.newReview', {
      url: '/new/:id',
      templateUrl: 'app/components/aReview/newReview.html',
      controller: 'ReviewController',
      controllerAs: 'review'
    })
    ;

  $urlRouterProvider.otherwise('/');
}
