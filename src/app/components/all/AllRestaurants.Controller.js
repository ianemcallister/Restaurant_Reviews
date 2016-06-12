/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const INIT = new WeakMap();
const LOGGER = new WeakMap();
const STATE = new WeakMap();
const SCOPE = new WeakMap();
//const SERVICE = new WeakMap();
const FRONTENDDATA = new WeakMap();
const SORTER = new WeakMap();

class AllRestaurantsController {
  constructor ($log, $state, $scope, restaurants, frontendDataSvc, listSorterSvc) {
    'ngInject';
    let vm = this;

    //define local variables
    let allPossibleRestaurants = restaurants;       //TODO: this should reach out to the server for a list

    //define local services
    LOGGER.set(this, $log);
    STATE.set(this, $state);
    SCOPE.set(this, $scope);
    FRONTENDDATA.set(this, frontendDataSvc);
    SORTER.set(this, listSorterSvc)
    INIT.set(this, () => {

        //setup all the state values
        vm.setStateValues($state.params);

        //define the filters
        vm.filters = this.filterDefaults();

        //sort the list of restaurant as required
        vm.restaurantList = this.sortBy(allPossibleRestaurants, vm.order.options.all[vm.order.start]);

        //only use the list of options that you need
        vm.order.options.available = vm.consolidateSortOptions(vm.order.start, vm.order.options.all);

        //setup Watchers
        vm.setupWatchers();

    });

    //run initialization
    INIT.get(this)();

  }

  paramStringToUXString(string) {
    let stringHash = {'restaurant':'Restaurant', 'reviews':'Total Reviews', 'rating':'Star Rating', 'cuisine':'Cuisine'};
    return stringHash[string];
  }

  uxStringToParamString(string) {
    let stringHash = {'Restaurant':'restaurant', 'Total Reviews':'reviews', 'Star Rating':'rating', 'Cuisine':'cuisine'};
    return stringHash[string];
  }

  setStateValues(params) {
    let vm = this;

    LOGGER.get(vm).log('State Params:', params); //TAKE THIS OUT LATER

    //set the list order
    vm.order = vm.sortDefaults(this.paramStringToUXString(params.sort));

    //define the filter box state
    if(params.filters == 'undefined') vm.showExtendedFilters = false;
    else vm.showExtendedFilters = (params.filters == 'true');

  }

  setupWatchers() {
    let vm = this;

    SCOPE.get(vm).$watch(function watchSort() {
            return vm.order.new;
        }, function(newVal/*, oldVal*/) {
        
        //LOGGER.get(vm).log(newVal, oldVal);

        if(typeof newVal !== 'undefined' && newVal !== '') {

            //convert text to title case 
            var upperCaseValue = vm.toTitleCase(newVal);
        
            //LOGGER.get(vm).log(vm.order.options.all, upperCaseValue, vm.order.options.all[upperCaseValue]);
            
            //check if the new value is a valid option
            if(typeof vm.order.options.all[upperCaseValue] !== 'undefined') {

                //if so, reload the page with the correct state route
                STATE.get(vm).go('list', {sort: vm.order.options.all[upperCaseValue]});

            } 

        }

    });

    /*SCOPE.get(vm).$watch(function filtersBox() {
        return vm.showExtendedFilters;
    }, function(newVal) {
        let currentSort = STATE.get(vm).params.sort;
        //if the filt box is visible, reflect it in the url
        STATE.get(vm).go('list', {sort: currentSort, filters: vm.showExtendedFilters});
    });*/
  }

  toggleFiltersBox() {
    let vm = this;
    let currentSort = STATE.get(vm).params.sort;

    //flip the state
    vm.showExtendedFilters = !vm.showExtendedFilters;

    //log the current state
    LOGGER.get(this).log(vm.showExtendedFilters);

    //reload the page to maintain state
    STATE.get(vm).go('list', {sort: currentSort, filters: vm.showExtendedFilters});
  }

  logStateParms(params) {
    LOGGER.get(this).log(params);
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
    var returnList = [];

    Object.keys(all).forEach(function(option) {
        
        if(option.toLowerCase() !== current.toLowerCase()) returnList.push(option);
    });

    return returnList;
  }

  //sort the list based on the user preference
  sortBy(collection, method, reverse) {
    //LOGGER.get(this).log(collection, method, reverse);
    //if reverse is not defined set it to false
    if(typeof reverse == 'undefined') reverse = false;

    //sort the model
    let sorted = SORTER.get(this).selectSort(collection, method, reverse);
    
    //set the view model values
    return sorted

  }

  filterDefaults() {
    return {cuisine: {Mexican: true, American: true, Japanese: true}, totalReviews: null, starRating: null };
  }

  resetFilters() {
    let vm = this;
    vm.filters = this.filterDefaults();
    //SCOPE.get(this).$apply();
  }

  buildStateParams(allFilters) {
    let vm = this;
    let returnObject = {};

    LOGGER.get(vm).log("allFilters", allFilters);
    LOGGER.get(vm).log("vm.order", vm.order);

    //set the sort property
    if(vm.order.new !== 'undefined') returnObject['sort'] = 'restaurant';//UPDATE THIS LATER vm.order.new;
    else returnObject['sort'] = 'restaurant'; //UPDATE THIS LATER vm.order.start;

    LOGGER.get(vm).log(returnObject);

    return returnObject;
  }

  reFilter() {
    let vm = this;

    //build the state params from the vm.filter values
    let stateParams = this.buildStateParams(vm.filters);

    //load the new url to maintain state
    STATE.get(vm).go('list', stateParams);
  }

  sortDefaults(sort) {
    return {start: sort, new:'', options: {all:{'Restaurant':'restaurant', 'Total Reviews':'reviews', 'Star Rating':'rating', 'Cuisine':'cuisine'}, available:[]} };
  }

  viewRestaurant(key) {
    //console.log(key);
    //log the findings
    //LOGGER.get(this).log(this.restaurantList[key].id);

    //redirect to that page
    STATE.get(this).go('restaurant', {id: this.restaurantList[key].id});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', '$scope', 'restaurants', 'frontendDataSvc', 'listSorterSvc'];

export { AllRestaurantsController }