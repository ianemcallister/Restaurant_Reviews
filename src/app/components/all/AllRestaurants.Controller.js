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
const SCOPE = new WeakMap();
const LOGGER = new WeakMap();
const SORTER = new WeakMap();

class AllRestaurantsController {
  constructor ($log, $state, $scope, restaurants, frontendDataSvc, listSorterSvc) {
    'ngInject';
    let vm = this;

    //define local services
    LOGGER.set(this, $log);
    STATE.set(this, $state);
    SCOPE.set(this, $scope);
    FRONTENDDATA.set(this, frontendDataSvc);
    SORTER.set(this, listSorterSvc)

    //define local variables
    vm.state = $state.current.name;
    vm.order = $state.params['sort'];
    vm.allRestaurants = restaurants;                        //load the restaurants
    vm.sortProps = FRONTENDDATA.get(this).getSortProps();   //define the sort props

    //load the sort order
    vm.sortProps.defineSort(vm.order);
    //SCOPE.get(this).

    //init on page load
    INIT.set(this, () => {

        //sort it as required
        vm.restaurantList = this.sortBy(vm.allRestaurants, 'restaurant');

    });

    //run initialization
    INIT.get(this)();

  }

  //sort the list based on the user preference
  sortBy(collection, method, reverse) {
    
    //if reverse is not defined set it to false
    if(typeof reverse == 'undefined') reverse = false;

    //sort the model
    let sorted = SORTER.get(this).selectSort(collection, method, reverse);
    
    //set the view model values
    return sorted

  }

  changeSort(category) {
    let local = this;

    //set the prop values
    local.sortProps.setActiveSort(category);

    //update the sort
    local.restaurantList = local.sortBy(local.allRestaurants, category, local.sortProps[category].reverse);
  }

  viewRestaurant(key) {
    //console.log(key);
    //log the findings
    //LOGGER.get(this).log(this.restaurantList[key].id);

    //redirect to that page
    STATE.get(this).go('restaurant', {id: this.restaurantList[key].id});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', '$scope', 'restaurants', 'frontendDataSvc', 'listSorterSvc'];

export { AllRestaurantsController }