const LOGGER = new WeakMap();

class ReviewsService {
	constructor($log) {
		'ngInject';
		//define services
		LOGGER.set(this, $log);

		//LOGGER.get(this).log('in the reviews service');
	}

	_utf8_to_b64(str) {
		return btoa(str);
	}

	_currentMilliSeconds() {
		let newTime = new Date();

		return Date.parse(newTime);
	}

	buildTempRecordId() {
		return this._currentMilliSeconds();
	}

	pullSelects(collection, neededReviews) {
		let returnObject = [];
		//loop through the needed reviews, add them to an array, and only return what is needed
		neededReviews.forEach(key => {
			returnObject.push(collection[key]);
		});

		return returnObject;
	}
}

ReviewsService.$inject = ['$log'];

export { ReviewsService }