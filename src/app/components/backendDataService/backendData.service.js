const HTTP = new WeakMap();
const PROMISE = new WeakMap();
const LOGGER = new WeakMap();

class BackendDataService {
	constructor ($http, $q, $log) {
		'ngInject';
		//define service
		HTTP.set(this, $http);
		PROMISE.set(this, $q);
		LOGGER.set(this, $log);
		//this._apiCall();
	}

	_get(url) {
		return fetch(url);
	}

	_getJSON(url) {
		return this._get(url).then(response => {
			return response.json();
		});
	}

	_apiCall() {
		/*HTTP.get(this).get('/api/set/1234').then(response => {
			LOGGER.get(this).log(response.data);
		});*/
	}

	loadAModel(path, file) { /*'assets/json/restaurantList.json'*/
		//LOGGER.get(this).log(path, file);
		//use the local methods to pass back the value
		return this._getJSON(path + file);
		
	}

	saveNewReview(newReview) {
		let bds = this;

		//return a promise for async work
		return new Promise(function(resolve, rej) {

			var postPath = '/api/newReview';

			var params = angular.toJson(newReview);

			HTTP.get(bds).post(postPath, params).then(response => {
				
				//log and return
				LOGGER.get(bds).log('got this back', response.data);
				resolve(response.data);
			
			}).catch(error => {
				//pass the error back
				rej(error);
			});

		});

	}
}

BackendDataService.$inject = ['$http', '$q', '$log'];

export { BackendDataService }