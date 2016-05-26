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
      url: '/list/:sort',
      templateUrl: 'app/components/all/allRestaurants.html',
      controller: 'AllRestaurantsController',
      controllerAs: 'list',
      resolve: {
        restaurants: function(frontendDataSvc) {
          return frontendDataSvc.getData('restaurants');
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
      url: '/newReview/:revId',
      templateUrl: 'app/components/aReview/newReview.html',
      controller: 'ReviewController',
      controllerAs: 'review'
    })
    ;

  $urlRouterProvider.otherwise('/');
}
