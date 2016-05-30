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

	_currentTime() {
		let newTime = new Date();
		let hours = newTime.getHours();
		let mins = newTime.getMinutes();
		let seconds = newTime.getSeconds();
		let secondsOnly = ((hours * 360) + (mins * 60) + seconds);

		return secondsOnly;
	}

	getSecondsTime() {
		return this._currentTime();
	}

	buildTempRecordId(restaurantId, userName) {
		let rs = this;

		//get the current time
		let currentTime = rs._currentTime();

		let recordId = restaurantId + rs._utf8_to_b64(userName) + currentTime;

		//convert to b64 and return
		//return rs._utf8_to_b64(recordId);
		return recordId;
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