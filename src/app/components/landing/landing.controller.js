/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */
 
const INIT = new WeakMap();
const FRONTENDDATA = new WeakMap();
const BACKENDDATA = new WeakMap();                        //TAKE THIS OUT LATER
const STATE = new WeakMap();

class LandingController {
  constructor ($log, $state, frontendDataSvc, backendDataSvc) {
    'ngInject';
    //declare local variables
    var vm = this;
    vm.state = $state.current.name;
    vm.seachBy = { name: "", cuisine: "", city: "", zip: ""};
    
    //log the state
    $log.log(vm.state);
    
    //setup constants
    STATE.set(this, $state);
    FRONTENDDATA.set(this, frontendDataSvc);
    BACKENDDATA.set(this, backendDataSvc);                        //TAKE THIS OUT LATER
    INIT.set(this, () => {

      //load models from the server
      FRONTENDDATA.get(this).loadFrontendModels(['restaurants', 'reviews']);

    });

    //run initialization
    INIT.get(this)();

  }

  seachNow(/*terms*/) {
    //pass the values to the service
    //SERVICE.get(this).setSearchCriteria(terms);
    BACKENDDATA.get(this)._apiCall();                        //TAKE THIS OUT LATER
    //move to the list view, default to alpha sort
    STATE.get(this).go('list', {sort: "restaurant"});
  }

}

LandingController.$inject = ['$log', '$state', 'frontendDataSvc', 'backendDataSvc'];

export { LandingController }