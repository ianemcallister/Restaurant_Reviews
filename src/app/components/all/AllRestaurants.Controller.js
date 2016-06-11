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
    vm.order = {start: $state.params['sort'], new:'', options: {all:{'Restaurant':true, 'Total Reviews':true, 'Star Rating':true, 'Cuisine':true}, available:[]} };
    vm.showFilters = false;
    vm.allRestaurants = restaurants;                        //load the restaurants
    vm.sortProps = FRONTENDDATA.get(this).getSortProps();   //define the sort props

    //load the sort order
    vm.sortProps.defineSort(vm.order);

    //init on page load
    INIT.set(this, () => {

        //sort the list of restaurant as required
        vm.restaurantList = this.sortBy(vm.allRestaurants, vm.order.start);

        //only use the list of options that you need
        vm.order.options.available = vm.consolidateSortOptions(vm.order.start, vm.order.options.all);

    });

    //run initialization
    INIT.get(this)();

    //setup watchers
    SCOPE.get(vm).$watch(function watchSort() {
            return vm.order.new;
        }, function(newVal, oldVal) {
        
        //LOGGER.get(vm).log(newVal, oldVal);

        if(typeof newVal !== 'undefined' && newVal !== '') {

            //convert text to title case 
            var upperCaseValue = vm.toTitleCase(newVal);
        
            //LOGGER.get(vm).log(vm.order.options.all, upperCaseValue, vm.order.options.all[upperCaseValue]);
            //check if the new value is a valid option
            if(vm.order.options.all[upperCaseValue]) LOGGER.get(vm).log('found', newVal);
        }

    });

  }

  toTitleCase(newString) {
    var returnString = '';

    //if it is multiple words, split on spaces
    var wordsArray = newString.split(' ');

    //LOGGER.get(this).log('number of words:', wordsArray.length);

    //then change the first letter of each word;
    var wordNumber = 0;
    wordsArray.forEach(function(word) {
        wordNumber++;
        var length = word.length;

        returnString = returnString + word[0].toUpperCase() + word.slice(1,length);

        //if there's another word add the space back in
        if(wordNumber < wordsArray.length) returnString = returnString + ' ';
    });

    //LOGGER.get(this).log('returnign this uppercase: ', returnString);

    return returnString;
  }

  consolidateSortOptions(current, all) {
    var returnList = []

    Object.keys(all).forEach(function(option) {
        
        if(option.toLowerCase() !== current) returnList.push(option);
    });

    return returnList;
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
    LOGGER.get(this).log(this.restaurantList[key].id);

    //redirect to that page
    STATE.get(this).go('restaurant', {id: this.restaurantList[key].id});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', '$scope', 'restaurants', 'frontendDataSvc', 'listSorterSvc'];

export { AllRestaurantsController }