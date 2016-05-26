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
const REVIEWSSVC = new WeakMap();
const STATE = new WeakMap();

class RestaurantController {
  constructor ($log, $state, $stateParams, frontendDataSvc, reviewsSvc, restaurant, reviews) {
    'ngInject';
    //local variables
    let vm = this;
    //let id = $stateParams.id;

    //view model variables
    vm.id = $state.params['id'];
    vm.shop = restaurant;
    vm.reviews = reviews;

    //run services
    FRONTENDDATA.set(this,frontendDataSvc); 
    REVIEWSSVC.set(this, reviewsSvc);
    STATE.set(this, $state);
    LOGGER.set(this, $log);
    INIT.set(this, () => {
        //format the times
        vm.shop.hours = vm._formatAllTimes(vm.shop.hours);
        //format the reviews
        vm.reviews = REVIEWSSVC.get(this).pullSelects(vm.reviews, vm.shop.reviews);
    });

    INIT.get(this)();
    
    //LOGGER.get(this).log(vm.shop);
    //LOGGER.get(this).log(vm.reviews);
    //LOGGER.get(this).log(REVIEWSSVC.get(this).buildRecordId(9003671680, 'Ian McAllister'));
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

  writeReview () {
    let vm = this;
    
    //as long as we're not already in the review section add a new review
    //TODO: TEST FOR STATE
    
    //calculate a review id
    let reviewId = REVIEWSSVC.get(this).buildRecordId(vm.id, 'anonymous');

    STATE.get(this).go('.newReview', {revId: reviewId});
  }

}

RestaurantController.$inject = ['$log', "$state",'$stateParams', 'frontendDataSvc', 'reviewsSvc', 'restaurant', 'reviews'];

export { RestaurantController }