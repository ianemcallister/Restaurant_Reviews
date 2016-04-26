/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const INIT = new WeakMap();
const SERVICE = new WeakMap();
const STATE = new WeakMap();
const LOGGER = new WeakMap();

class AllRestaurantsController {
  constructor ($log, $state, restaurantProfileSvc) {
    'ngInject';
    var vm = this;
    vm.state = $state.current.name;
    vm.order = $state.params['sort'];
    vm.restaurantList;

    //log the state
    //$log.log(vm.order);

    LOGGER.set(this, $log);
    STATE.set(this, $state);
    SERVICE.set(this, restaurantProfileSvc);
    INIT.set(this, () => {

		//get the search criteria
		//$log.log(SERVICE.get(this).getSearchCriteria());
		//get specific restaurant
		SERVICE.get(this).getRestaurantList()
		.then(response => {
        //$log.log(response);
        vm.model = response;
        //$log.log(vm.model);

      });

    });

    //run initialization
    INIT.get(this)();

  }

  //sort the list based on the user preference
  sortBy() {

  }

  viewRestaurant(key) {
    //log the findings
    //LOGGER.get(this).log(key);

    //redirect to that page
    STATE.get(this).go('restaurant', {id: key});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', 'restaurantProfileSvc'];

export { AllRestaurantsController }