const HTTP = new WeakMap();
const PROMISE = new WeakMap();

class RestaurantProfileService {
	constructor ($http, $q) {
		'ngInject';
		//define service
		HTTP.set(this, $http);
		PROMISE.set(this, $q);
		//define local model
		this.restaurantList = [];
		this.searchCriteria = { name: "", cuisine: "", city: "", zip: ""};
	}

	getRestaurantList() {
		return HTTP.get(this).get('assets/json/restaurantList.json').then(response => response.data);
	}	

	getSortedList() {
		return this.restaurantList;
	}
	
	setRestaurantList(collection) {
		this.restaurantList = collection;
	}

	getRestaurantProfile() {
		//check for it locally first
		if(angular.isObject(this.restaurantList)) {
			//if we have it locally return it immediately as a resolved promise
			return new Promise(function(resolve) {
				resolve(this.restaurantList);
			});
		} else {
			//if not,get it and return
			return HTTP.get(this).get('assets/json/restaurantList.json').then(response => response.data);
		}
	}

	getSearchCriteria() {
		return this.searchCriteria;
	}

	setSearchCriteria(newSearch) {
		this.searchCriteria = newSearch;
	}

	loadModel() {
		HTTP.get(this).get('assets/json/restaurantList.json').then(response => {
			console.log(response.data);
			this.restaurantList = response.data;
		})
		.catch(e => { console.log('there was an error: ' + e); });
	}
}

RestaurantProfileService.$inject = ['$http', '$log', '$q'];

export { RestaurantProfileService }