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

    //local variable
    let aNewReview = $state.params['time'];

    //view model variables
    vm.id = $state.params['id'];
    vm.aNewReview = false;
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

        //
        if(typeof aNewReview !== 'undefined') vm.aNewReview = true;
        
        //LOGGER.get(this).log(vm.shop);
        //LOGGER.get(this).log(vm.reviews);
        //LOGGER.get(this).log('vm.aNewReview', vm.aNewReview);
    });

    INIT.get(this)();
    
    ////LOGGER.get(this).log(REVIEWSSVC.get(this).buildRecordId(9003671680, 'Ian McAllister'));
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
    
    if(!vm.aNewReview) {
      //turn on the box
      vm.aNewReview = true;
      
      //calculate a review id
      let reviewTime = REVIEWSSVC.get(this).buildTempRecordId();

      STATE.get(this).go('.newReview', {time: reviewTime});      
    } else {
      //turn off the box
      vm.aNewReview = false;
      //go back to the state without the review
      STATE.get(this).go('restaurant', {id: vm.id});
    }

  }

  backToList() {
    STATE.get(this).go('list', {sort:'restaurant'});
  }

}

RestaurantController.$inject = ['$log', "$state",'$stateParams', 'frontendDataSvc', 'reviewsSvc', 'restaurant', 'reviews'];

export { RestaurantController }