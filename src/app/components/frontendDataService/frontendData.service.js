const LOGGER = new WeakMap();
const BACKEND = new WeakMap();

class FrontendDataService {
	constructor ($log, backendDataSvc) {
		'ngInject';
		//define services
		LOGGER.set(this, $log);
		BACKEND.set(this, backendDataSvc);
		//define local variables
		this.allReviews = {};
		this.allRestaurants = {};
		this.localModels = { 'restaurants':this.allRestaurants, 'reviews':this.allReviews };
		this.assetsPath = 'api/get/';
		this.backendModels = {'restaurants':'allRestaurants.json', 'reviews':'allReviews.json' };		

		//specalized lists
		this.reviewsByRestaurant = {};
	}

	_objectLength(object) {
		let length = 0;
		for( let key in object ) {
			if( object.hasOwnProperty(key) ) {
				++length;
			}
		}
		return length;
	}

	//GETTER METHODS
	getData(model, record) {
		let fdService = this;

		//if a request comes in for data, first look at the local variables
		if(this._objectLength(this.localModels[model]) > 0) {
			//if there are values in the local variable use those
			return new Promise(resolve => {
				
				if(typeof record !== 'undefined') resolve(this.localModels[model][record]);
				else resolve(this.localModels[model]);
			});
		} else {
			//if nothing is found locally, go to the backend service
			return new Promise(resolve => {
				BACKEND.get(this).loadAModel(this.assetsPath, this.backendModels[model])
				.then(response => {
					//notify the user of the record found
					//LOGGER.get(this).log(response);

					//add it to the local model
					fdService.localModels[model] = response;

					//pas it back
					if(typeof record !== 'undefined') resolve(response[record]);
					else resolve(response);
				}).catch(error => {
					LOGGER.get(this).log('Error: ', error);
				});
			});
		}
		
	}

	loadFrontendModels(models) {

		//loop through the requested models
		models.forEach(model => {
			//get the data
			this.getData(model).then(response => {
				this.localModels[model] = response;
			});

		});
		//LOGGER.get(this).log('this was loaded', this.localModels);
	}

	//SETTER METHODS
	setNewRemoteReview(newReview) {
		let fds = this;

		//return a promise for async work
		return new Promise(function(resolve, reject) {

			//pass it the the server and return the respone
			BACKEND.get(fds).saveNewReview(newReview).then(function(response) {
				let newReviewId = response.recordId;
				let returnObject = {};
				returnObject[newReviewId] = newReview;
				//let restaurantId = newReview.restaurant;

				//add the new review to the local model to reflect it now
				//fds.localModels.reviews[newReviewId] = newReview;

				

				//fds.localModels.restaurants[restaurantId].reviews.push(newReviewId);

				//pass the response back
				resolve(returnObject);
			
			}).catch(error => {
				//pass the error back
				reject(error);
			});

		});
		
	}

	setNewLocalReview(newReview) {
		let restaurantId = null;
		let reviewId = null;

		Object.keys(newReview).forEach(function(key) {
			reviewId = key;
			restaurantId = newReview[key].restaurant;
		});

		//add the new review to the allreviews object
		this.localModels.reviews[reviewId] = newReview;

		//add the reveiw to the specific restaurant it is associated with
		this.localModels.restaurants[restaurantId].reviews.push(reviewId);

		//log the results
		//LOGGER.get(this).log(restaurantId);
		//LOGGER.get(this).log(this.localModels.restaurants);
		//LOGGER.get(this).log(this.localModels.reviews);
	}

}

FrontendDataService.$inject = ['$log', 'backendDataSvc'];

export { FrontendDataService }