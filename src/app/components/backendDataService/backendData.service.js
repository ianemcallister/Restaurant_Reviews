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
	}

	_get(url) {
		return fetch(url);
	}

	_getJSON(url) {
		return this._get(url).then(response => {
			return response.json();
		});
	}

	loadAModel(path, file) { /*'assets/json/restaurantList.json'*/
		//use the local methods to pass back the value
		return this._getJSON(path + file);
		
	}
}

BackendDataService.$inject = ['$http', '$log', '$q'];

export { BackendDataService }