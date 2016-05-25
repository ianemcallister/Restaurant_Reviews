/**
 * @ngdoc function
 * @name chowPal.controller:RestaurantController
 * @description
 * # RestaurantController
 * Controller of the chowPalApp
 */

const INIT = new WeakMap();
//const SERVICE = new WeakMap();
const FRONTENDDATA = new WeakMap();
const LOGGER = new WeakMap();

class RestaurantController {
  constructor ($log, $stateParams, frontendDataSvc, restaurant) {
    'ngInject';
    //local variables
    let vm = this;
    let id = $stateParams.id;

    //view model variables
    vm.model = restaurant;
    vm.id = id;

    //run services
    FRONTENDDATA.set(this,frontendDataSvc); 
    //SERVICE.set(this, restaurantProfileSvc);
    LOGGER.set(this, $log);
    INIT.set(this, () => {
        

    });

    INIT.get(this)();
    
  }

  submitReview () {

  }

}

RestaurantController.$inject = ['$log', '$stateParams', 'frontendDataSvc', 'restaurant'];

export { RestaurantController }