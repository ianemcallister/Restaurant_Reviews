const LOGGER = new WeakMap();
const DATASVC = new WeakMap();

class RestaurantProfileService {
	constructor ($log, backendDataSvc) {
		'ngInject';
		//define service
		LOGGER.set(this, $log);
		DATASVC.set(this, backendDataSvc);
		//define local model
		this.restaurantList = [];
		this.searchCriteria = { name: "", cuisine: "", city: "", zip: ""};
	}

	getRestaurantList() {
		return DATASVC.get(this).loadAModel('assets/json/', 'restaurantList.json');
		//return HTTP.get(this).get().then(response => response.data);
	}	

	getSortedList() {
		return this.restaurantList;
	}
	
	setRestaurantList(collection) {
		this.restaurantList = collection;
	}

	getRestaurantProfile(id) {
		let rps = this;

		//check for it locally first
		if(rps.restaurantList.length > 0) {
			//if we have it locally return it immediately as a resolved promise
			return new Promise(function(resolve) {
				resolve(rps.restaurantList[id]);
			});
		} else {
			//if not,get it and return
			//return HTTP.get(this).get('assets/json/restaurantList.json').then(response => response.data);
		}
	}

	getSearchCriteria() {
		return this.searchCriteria;
	}

	setSearchCriteria(newSearch) {
		this.searchCriteria = newSearch;
	}

	loadModel() {
		//HTTP.get(this).get('assets/json/restaurantList.json').then(response => {
		//	//console.log(response.data);
		//	this.restaurantList = response.data;
		//})
		//.catch(e => { //console.log('there was an error: ' + e); });
	}
}

RestaurantProfileService.$inject = ['$log', 'backendDataSvc'];

export { RestaurantProfileService }