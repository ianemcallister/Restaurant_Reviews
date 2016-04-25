const HTTP = new WeakMap();

class RestaurantProfileService {
	constructor ($http) {
		'ngInject';
		//define service
		HTTP.set(this, $http);
		//define local model
		this.restaurantList;
		this.searchCriteria = { name: "", cuisine: "", city: "", zip: ""};
	}

	getRestaurantList() {
		//check for it locally first
		//if(angular.isObject(this.restaurantList)) {
			//if we have it locally return it immediately as a resolved promise
		//	return new Promise(function(resolve) {
		//		resolve(this.restaurantList);
		//	});
		//} else {
			//if not,get it and return
			return HTTP.get(this).get('assets/json/restaurantList.json').then(response => response.data);
		//}
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

RestaurantProfileService.$inject = ['$http', '$log'];

export { RestaurantProfileService }