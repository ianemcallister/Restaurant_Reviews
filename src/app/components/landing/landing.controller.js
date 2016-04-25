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

class LandingController {
  constructor ($log, $state, restaurantProfileSvc) {
    'ngInject';
    //declare local variables
    var vm = this;
    vm.state = $state.current.name;
    vm.seachBy = { name: "", cuisine: "", city: "", zip: ""};
    
    //log the state
    $log.log(vm.state);
    
    //setup constants
    STATE.set(this, $state);
    SERVICE.set(this, restaurantProfileSvc);
    INIT.set(this, () => {

      //get specific restaurant
      SERVICE.get(this).loadModel();

    });

    //run initialization
    INIT.get(this)();

  }

  seachNow(terms) {
    //pass the values to the service
    SERVICE.get(this).setSearchCriteria(terms);

    //move to the list view, default to alpha sort
    STATE.get(this).go('list', {sort: "alpha"});
  }

}

LandingController.$inject = ['$log', '$state', 'restaurantProfileSvc'];

export { LandingController }