export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
  //TODO: Change this first one to landing
    .state('landing', {	
      url: '/',
      templateUrl: 'app/components/landing/landing.html',
      controller: 'LandingController',
      controllerAs: 'landing'
    })
    //
    .state('list', {
      url: '/list/:sort?name&city&zip&cuisine&reviews&rating&filters',
      templateUrl: 'app/components/all/allRestaurants.html',
      controller: 'AllRestaurantsController',
      controllerAs: 'list',
      resolve: {
        restaurants: function($stateParams, frontendDataSvc) {
          let searchParams = $stateParams;
          return frontendDataSvc.loadData(searchParams);
          //return frontendDataSvc.getData('restaurants');
        }
      }
    })
    .state('restaurant', {
      url: '/restaurant/:id',
      templateUrl: 'app/components/aRestaurant/restaurantProfile.html',
      controller: 'RestaurantController',
      controllerAs: 'restaurant',
      resolve: {
        restaurant: function(frontendDataSvc, $stateParams) {
          let id = $stateParams.id;

          return frontendDataSvc.getData('restaurants', id);
        },
        reviews: function(frontendDataSvc) {

          return frontendDataSvc.getData('reviews');
        }
      }
    })
    /*.state('restaurant.postedReview', {
      url: '/:id',
      templateUrl: 'app/components/aReview/postedReview.html',
      controller: 'RestaurantController',
      controllerAs: 'restaurant'
    })*/
    .state('restaurant.newReview', {
      url: '/newReview/:time',
      templateUrl: 'app/components/aReview/newReview.html',
      parent: 'restaurant',
      controller: 'ReviewController',
      controllerAs: 'review',
      resolve: {
        restaurant: function(frontendDataSvc, $stateParams) {
          let id = $stateParams.id;

          return frontendDataSvc.getData('restaurants', id);
        },
        reviews: function(frontendDataSvc) {

          return frontendDataSvc.getData('reviews');
        }
      }
    })
    ;

  $urlRouterProvider.otherwise('/');
}
