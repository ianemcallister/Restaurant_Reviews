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

    //define global variables
    vm.allCuisines = ["Mexican", "American", "Japanese"];

    //define local services
    LOGGER.set(this, $log);
    STATE.set(this, $state);
    SCOPE.set(this, $scope);
    FRONTENDDATA.set(this, frontendDataSvc);           //TODO: remove this
    SORTER.set(this, listSorterSvc)
    INIT.set(this, () => {

        //setup all the state values
        vm.setStateValues($state.params);

        //define the filters
        vm.filters = this._initializeFilters(); //this.filterDefaults();

        //if an error occured, extract it before submitting the list
        if(typeof allPossibleRestaurants.error !== 'undefined') {

            //save the error
            vm.searchError = allPossibleRestaurants.error;

            //remove it from the list
            delete allPossibleRestaurants.error;
        }

        //sort the list of restaurant as required
        vm.restaurantList = this.sortBy(allPossibleRestaurants, vm.order.options.all[vm.order.start]);

        //filter out restaurants that don't qualify
        vm.restaurantList = this._filterRestaurants(vm.restaurantList, vm.filters);

        //only use the list of options that you need
        vm.order.options.available = vm.consolidateSortOptions(vm.order.start, vm.order.options.all);

        //count the number of restaurants
        vm.noOfRestaurants = vm.restaurantList.length;

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

    //LOGGER.get(vm).log('State Params:', params, params.city, vm.searchError); //TAKE THIS OUT LATER

    //define the city
    if(params.city !== 'undefined' && typeof vm.searchError == 'undefined') 
      vm.city = params.city;

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
        
        ////LOGGER.get(vm).log(newVal, oldVal);

        if(typeof newVal !== 'undefined' && newVal !== '') {

            //convert text to title case 
            var upperCaseValue = vm.toTitleCase(newVal);
        
            ////LOGGER.get(vm).log(vm.order.options.all, upperCaseValue, vm.order.options.all[upperCaseValue]);
            
            //check if the new value is a valid option
            if(typeof vm.order.options.all[upperCaseValue] !== 'undefined') {

                //if so, reload the page with the correct state route
                STATE.get(vm).go('list', {sort: vm.order.options.all[upperCaseValue]});

            } 

        }

    });

  }

  _filterCuisine(object, standards) {
    //let vm = this;
    let returnList = [];

    //loop through standards
    Object.keys(standards).forEach(function(type) {

      //if we don't want this cuisine explore each restaurant
      if(!standards[type]) {

        //check each restaurant for that cuisine
        Object.keys(object).forEach(function(record) {
          let restaurantCuisine = object[record].data.cuisine;

          if(restaurantCuisine == type) object[record].valid = false;
        });

      }

    });

    //no that the invalid records have been identified, add only the valid ones to the list
    Object.keys(object).forEach(function(key) {

      if(object[key].valid) returnList.push(object[key].data);

    });

    return returnList;
  }

  _buildListObject(list) {
    let i = 0;
    let listObject = {};

    list.forEach(function(rest) {
      listObject[i] = {
        valid: true,
        data: rest
      };
      i++;
    });

    return listObject;
  }

  _checkAgainstStandard(listObject, filter, standard) {
    let vm = this;
    let returnList = [];

    if(filter == 'cuisine') {
      returnList = vm._filterCuisine(listObject, standard)
      return returnList; 
    }

    //refine value
    standard = parseInt(standard);

    if(filter == 'starRating') filter = 'rating';
    if(filter == 'totalReviews') filter = 'reviews';

    //loop through the entries
    Object.keys(listObject).forEach(function(entry) {

      //check for valid comparable
      if(listObject[entry].data[filter] !== null) {
        let valueToCheck = listObject[entry].data[filter];

        //make sure value is greater than the standard
        if(valueToCheck > standard)
        returnList.push(listObject[entry].data);
      }

    });

    return returnList; 
  }

  _applyFilter(list, filter, standard) {
    let vm = this;
    let listObject = vm._buildListObject(list);
    let returnList = [];

    //check if restaurants have valid values
    returnList = vm._checkAgainstStandard(listObject, filter, standard);

    return returnList;
  }

  _filterRestaurants(list, filters) {
    let vm = this;
    let returnList = list;

    //loop through all the filters
    Object.keys(filters).forEach(function(filter) {

      if(filters[filter] !== null) {
        returnList = vm._applyFilter(returnList, filter, filters[filter]);
      }

    });

    return returnList;
  }

  toggleFiltersBox() {
    let vm = this;
    let currentSort = STATE.get(vm).params.sort;

    //flip the state
    vm.showExtendedFilters = !vm.showExtendedFilters;

    //log the current state
    ////LOGGER.get(this).log(vm.showExtendedFilters);

    //reload the page to maintain state
    STATE.get(vm).go('list', {sort: currentSort, filters: vm.showExtendedFilters});
  }

  logStateParms(/*params*/) {
    ////LOGGER.get(this).log(params);
  }

  toTitleCase(newString) {
    var returnString = '';

    //if it is multiple words, split on spaces
    var wordsArray = newString.split(' ');

    ////LOGGER.get(this).log('number of words:', wordsArray.length);

    //then change the first letter of each word;
    var wordNumber = 0;
    wordsArray.forEach(function(word) {
        wordNumber++;
        var length = word.length;

        returnString = returnString + word[0].toUpperCase() + word.slice(1,length);

        //if there's another word add the space back in
        if(wordNumber < wordsArray.length) returnString = returnString + ' ';
    });

    ////LOGGER.get(this).log('returnign this uppercase: ', returnString);

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
    ////LOGGER.get(this).log(collection, method, reverse);
    //if reverse is not defined set it to false
    if(typeof reverse == 'undefined') reverse = false;

    //sort the model
    let sorted = SORTER.get(this).selectSort(collection, method, reverse);
    
    //set the view model values
    return sorted

  }

  _rebuildCuisineFilter(string) {
    let vm = this;
    let returnObject = {};
    let prefixes = {'all': 1, 'only': 2, 'except':3, 'none':4 };
    let segments = string.split('-');

    //clean
    let i=0;
    segments.forEach(function(segment) {
      segments[i] = segment.replace(",","");
      i++;
    });

    switch(prefixes[segments[0]]) {
      case 1: //all
        //loop through all the types of cuisines and set them to checked
        vm.allCuisines.forEach(function(type) {
          returnObject[type] = true;
        });
        break;
      case 2: //only
        //loop through the filters first
        segments.forEach(function(key) {

          if(key !=='only') {

            //loop through all possibles
            vm.allCuisines.forEach(function(type) {

              if(type == key) returnObject[type] = true;
              else returnObject[type] = false
                
            });

          }

        });
        break;
      case 3: //except
        //loop through the filters first
        segments.forEach(function(key) {

          if(key !=='except') {

            //loop through all possibles
            vm.allCuisines.forEach(function(type) {

              if(type == key) returnObject[type] = false;
              else returnObject[type] = true;
                
            });

          }

        });
        break;
      case 4: //none
        //loop through all the types of cuisines and set them to checked
        vm.allCuisines.forEach(function(type) {
          returnObject[type] = false;
        });
        break;
    }  

    return returnObject;
  }

  _distilParams() {
    let vm = this;
    let allParams = STATE.get(this).params;
    let returnObject = {};
    //if we're here then we have to interpet the url params as they apply to the filter
    
    //interpret cuisine
    if(typeof allParams.cuisine !== 'undefined') {
      returnObject['cuisine'] = vm._rebuildCuisineFilter(allParams.cuisine);
    }

    //interpret reviews
    if(typeof allParams.reviews !== 'undefined') {
      returnObject['totalReviews'] = allParams.reviews;
    }

    //interpret rating
    if(typeof allParams.rating !== 'undefined') {
      returnObject['starRating'] = allParams.rating;
    } 

    return returnObject;
  }

  _initializeFilters() {
    //let vm = this;
    let paramsToCheck = STATE.get(this).params;
    let foundParam = false;

    //check for any params passed in, except sort
    if( typeof paramsToCheck.cuisine !== 'undefined' ||
        typeof paramsToCheck.reviews !== 'undefined' ||
        typeof paramsToCheck.rating !== 'undefined' ) foundParam = true;

    if(!foundParam) {
      return this._filterDefaults(); 
    } else return this._distilParams();

  }

  _filterDefaults() {
    let vm = this;
    let cuisines = {};

    //build all cuisines
    vm.allCuisines.forEach(function(type) {
      cuisines[type] = true;
    });

    return {cuisine: cuisines, totalReviews: null, starRating: null };
  }

  resetFilters() {
    let vm = this;
    //let stateParams = vm.filters;
    vm.filters = this._filterDefaults();

    //load the new url to maintain state
    STATE.get(vm).go('list', {name:undefined, city:undefined,zip:undefined, cuisine:undefined, reviews:undefined, rating:undefined, filters:true});
  }

  buildStateParams(section, newValue) {
    let vm = this;
    let returnObject = {};

    if(section == 'totalReviews') section = 'reviews';
    if(section == 'starRating') section = 'rating';

    
    //get the current params
    ////LOGGER.get(vm).log(STATE.get(vm));
    Object.keys(STATE.get(vm).params).forEach(function(param) {
      if(typeof STATE.get(vm).params[param] !== 'undefined')
        returnObject[param] = STATE.get(vm).params[param];
    });

    //then add the new param
    returnObject[section] = newValue;

    return returnObject;
  }

  _buildCuisineFilterString() {
    let vm = this;
    let cuisineString = '';
    let countCuisines = {all: 0, selected: 0};
    let selected = [];
    let notSelected = [];

    //can be all, only (if less than half selected), execpt (if more than half)
    Object.keys(vm.filters.cuisine).forEach(function(type) {
      //count this cuisine
      countCuisines.all++;

      //if this is true
      if(vm.filters.cuisine[type] == true) { 
        
        //update selected counter
        countCuisines.selected++;

        //add it to the the selected hash
        selected.push(type);
      } else {

        //if not add it to the notSelected hash
        notSelected.push(type);
      }

    });

    //evaluate the findings
    if((countCuisines.all - countCuisines.selected) == 0) {
      //all are selected   
      cuisineString = 'all';

    } else if(countCuisines.selected > (countCuisines.all / 2)) {
      //most are selected
      cuisineString = 'except-';

      let totalNotSelected = notSelected.length;
      let i = 0;

      notSelected.forEach(function(type) {
        i++
        if(i<totalNotSelected) cuisineString += (type + ',');
        else cuisineString += (type + ',');
      });

    } else if(selected.length == 0) {
      //none are selected
      cuisineString = 'none';

    } else if(countCuisines.selected < (countCuisines.all / 2)) {
      //some are selected
      cuisineString = 'only-';

      let totalSelected = selected.length;
      let i = 0;

      selected.forEach(function(type) {
        i++
        if(i<totalSelected) cuisineString += (type + ',');
        else cuisineString += (type + ',');
      });

    } 

    return cuisineString;
  }

  reFilter(section, attribute) {
    let vm = this;
    let stateParams = null;
    
    //if it has an attribute then it is a cusine, format accordintly
    if(typeof attribute !== 'undefined') {
      
      //build the params
      stateParams = this.buildStateParams(section, vm._buildCuisineFilterString()); 

    } else stateParams = this.buildStateParams(section, vm.filters[section]);

    //load the new url to maintain state
    STATE.get(vm).go('list', stateParams);
  }

  sortDefaults(sort) {
    return {start: sort, new:'', options: {all:{'Restaurant':'restaurant', 'Total Reviews':'reviews', 'Star Rating':'rating', 'Cuisine':'cuisine'}, available:[]} };
  }

  viewRestaurant(key) {

    //redirect to that page
    STATE.get(this).go('restaurant', {id: this.restaurantList[key].id});
  }

}

AllRestaurantsController.$inject = ['$log', '$state', '$scope', 'restaurants', 'frontendDataSvc', 'listSorterSvc'];

export { AllRestaurantsController }