const HTTP = new WeakMap();
const LOGGER = new WeakMap();

class ReviewManager {
	constructor ($http, $log) {
		'ngInject';
		//define service
		HTTP.set(this, $http);
		LOGGER.set(this, $log);

		//define local model
	}

	

}

ReviewManager.$inject = ['$http', '$log'];

export { ReviewManager }