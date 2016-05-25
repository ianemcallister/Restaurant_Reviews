/**
 * @ngdoc function
 * @name chowPal.controller:RestaurantController
 * @description
 * # RestaurantController
 * Controller of the chowPalApp
 */

const INIT = new WeakMap();
//const SERVICE = new WeakMap();
const FRONTENDDATA = new WeakMap();
const LOGGER = new WeakMap();

class RestaurantController {
  constructor ($log, $stateParams, frontendDataSvc, restaurant) {
    'ngInject';
    //local variables
    let vm = this;
    let id = $stateParams.id;

    //view model variables
    vm.model = restaurant;
    vm.id = id;

    //run services
    FRONTENDDATA.set(this,frontendDataSvc); 
    //SERVICE.set(this, restaurantProfileSvc);
    LOGGER.set(this, $log);
    INIT.set(this, () => {
        //format the times
        vm.model.hours = vm._formatAllTimes(vm.model.hours);

    });

    INIT.get(this)();
    
    LOGGER.get(this).log(vm.model);
  }

  _formatTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    var A = '';

    if(minutes > 719 && minutes < 1440) {
      A = " pm";
    } else {
      A = " am";
    }

    if(minutes > 779) {
      if(minutes < 1500) hours = hours - 12;
      else hours = hours - 24;
    }

    var readableTime = hours + ":";

    if(mins < 10) readableTime = readableTime + "0" + mins + A; 
    else readableTime = readableTime + mins + A; 

    return readableTime;
  }

  _formatAllTimes(timesObject) {
    let vm = this;
    let blockNum = 0;

    //loop through all blocks
    timesObject.forEach(block => {

      if(typeof block.always == 'undefined') {

        //then through each endpoint
        Object.keys(block).forEach(key => {

          timesObject[blockNum][key] = vm._formatTime(block[key]);
        });

      } 

      //incriment the counter
      blockNum++
    });

    return timesObject;
  }

  submitReview () {

  }

}

RestaurantController.$inject = ['$log', '$stateParams', 'frontendDataSvc', 'restaurant'];

export { RestaurantController }