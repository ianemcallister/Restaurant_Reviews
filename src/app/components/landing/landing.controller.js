/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */
 
const INIT = new WeakMap();
const LOGGER = new WeakMap();
const FRONTENDDATA = new WeakMap();
const STATE = new WeakMap();

class LandingController {
  constructor ($log, $state, frontendDataSvc) {
    'ngInject';
    //declare local variables
    var vm = this;
    vm.state = $state.current.name;
    vm.seachBy = { name: "", cuisine: "", city: "", zip: ""};
    
    //log the state
    $log.log(vm.state);
    
    //setup constants
    STATE.set(this, $state);
    LOGGER.set(this, $log);
    FRONTENDDATA.set(this, frontendDataSvc);                       
    INIT.set(this, () => {

      //load models from the server
      FRONTENDDATA.get(this).loadFrontendModels(['restaurants', 'reviews']);

    });

    //run initialization
    INIT.get(this)();

  }

  buildParams(terms) {
    let returnObject = {};
    
    //set the default sort as restaurant
    returnObject.sort = 'restaurant';
    
    //let routeParams = name&city&zip&cuisine&reviews&rating
    if(terms.name !== '') returnObject.name = terms.name;
    if(terms.cuisine !== '') returnObject.cuisine = terms.cuisine;    
    if(terms.city !== '') returnObject.city = terms.city;
    if(terms.zip !== '') returnObject.zip = terms.zip;

    return returnObject;
  }

  seachNow(terms) {
    LOGGER.get(this).log(terms);
    
    //build the paramaters object
    let parametersObject = this.buildParams(terms);

    //prompt the frontend Dataservice to query the server
    FRONTENDDATA.get(this).loadData(parametersObject);

    //move to the list view, default to alpha sort
    STATE.get(this).go('list', parametersObject);
  }

}

LandingController.$inject = ['$log', '$state', 'frontendDataSvc', 'backendDataSvc'];

export { LandingController }