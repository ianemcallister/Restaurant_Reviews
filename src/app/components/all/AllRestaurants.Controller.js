/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */
export class AllRestaurantsController {
  constructor ($log) {
    'ngInject';
    var vm = this;

    //define the model
    vm.restaurantList = {}

    //log that we're in the controller
    $log.info('in the AllRestaurantsController');
  }
}