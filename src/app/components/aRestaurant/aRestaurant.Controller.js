/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */
export class RestaurantController {
  constructor ($log/*, Address, Hours*/) {
    'ngInject';
    var vm = this;
    //log a test
    $log.info('in the RestaurantController');

    //declare and initialize local variables
    vm.name = '';
    //TODO: ADD THE IMAGE HERE
    vm.address = {};//new Address();	//TODO: Add a constructor
    vm.cuisine = '';
    vm.hours = {}; //new Hours();	//TODO: add a constructor

    //vm methods
    vm.submitReview = function() {
       //this function submits the form
    };

  }
}
