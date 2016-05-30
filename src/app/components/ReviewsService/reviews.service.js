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
		/*let year = newTime.getYear();
		//let week = newTime.getWeek();
		let day = newTime.getDay();
		let hours = newTime.getHours();
		let mins = newTime.getMinutes();
		let seconds = newTime.getSeconds();
		let secondsOnly = ((year * 0) + (day * 360 * 24 *0) + (hours * 360) + (mins * 60) + seconds);
		*/
		return Date.parse(newTime);
		//return secondsOnly;
	}

	buildTempRecordId() {
		return this._currentTime();
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