/**
 * @ngdoc function
 * @name chowPal.controller:RestaurantController
 * @description
 * # RestaurantController
 * Controller of the chowPalApp
 */

const INIT = new WeakMap();
const SERVICE = new WeakMap();

class RestaurantController {
  constructor ($log, $stateParams, restaurantProfileSvc) {
    'ngInject';
    //local variables
    var vm = this;
    var id = $stateParams.id;

    //view model variables
    vm.model = {}
    vm.id = id;

    //run services
    SERVICE.set(this, restaurantProfileSvc);
    INIT.set(this, () => {

      //get specific restaurant
      SERVICE.get(this).getRestaurantProfile()
      .then(response => {
        $log.log(response);
        vm.model = response[id];
        //$log.log(vm.model);
      });

    });

    INIT.get(this)();
    
  }

  submitReview () {

  }

}

RestaurantController.$inject = ['$log', '$stateParams', 'restaurantProfileSvc'];

export { RestaurantController }