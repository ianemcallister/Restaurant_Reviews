/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */
export class RestaurantController {
  constructor ($log/*, address, Hours*/) {
    'ngInject';
    var vm = this;
    
    //declare and initialize the vm variables
    vm.model = {
        name: '',
        imageSrc: '',
        address: {},    //new address();    //TODO: Add a constructor
        cuisine: '',
        hours: {}   //new Hours();  //TODO: add a constructor
    };

    $log.info('in the restaurant controller');
    vm.loadModel();
  }

  submitReview () {

  }

  loadModel () {
    //this should go out to the service and get the model
  }

}
