/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const INIT = new WeakMap();
const FRONTENDDATA = new WeakMap();
//const SERVICE = new WeakMap();
const STATE = new WeakMap();
const LOGGER = new WeakMap();
const SORTER = new WeakMap();

class AllRestaurantsController {
  constructor ($log, $state, restaurants, frontendDataSvc, listSorterSvc) {
    'ngInject';
    let vm = this;

    //define local variables
    vm.state = $state.current.name;
    vm.order = $state.params['sort'];
    vm.allRestaurants = restaurants;           //load the 
    
    //define local services
    LOGGER.set(this, $log);
    STATE.set(this, $state);
    FRONTENDDATA.set(this, frontendDataSvc);
    //SERVICE.set(this, restaurantProfileSvc);
    SORTER.set(this, listSorterSvc)

    //init on page load
    INIT.set(this, () => {

        //sort it as required
        vm.restaurantList = this.sortBy(vm.allRestaurants, 'alpha');

        //LOGGER.get(this).log(vm.restaurantList);

    });

    //run initialization
    INIT.get(this)();

  }

  //sort the list based on the user preference
  sortBy(collection, method, reverse) {

    //if reverse is not defined set it to false
    if(typeof reverse == 'undefined') reverse = false;

    //sort the model
    let sorted = SORTER.get(this).selectSort(collection, method);

    //set the view model values
    return sorted.list;
  }

  viewRestaurant(key) {
    //console.log(key);
    //log the findings
    //LOGGER.get(this).log(this.restaurantList[key].id);

    //redirect to that page
    STATE.get(this).go('restaurant', {id: this.restaurantList[key].id});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', 'restaurants', 'frontendDataSvc', 'listSorterSvc'];

export { AllRestaurantsController }