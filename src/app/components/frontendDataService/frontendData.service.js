
const LOGGER = new WeakMap();
const BACKEND = new WeakMap();
const SORTPROPS = new WeakMap();
const INIT = new WeakMap();

class FrontendDataService {
	constructor ($log, backendDataSvc, SortPropsGenerator) {
		'ngInject';

		//define local variables
		let frontendData = this;

		//define services
		LOGGER.set(this, $log);
		BACKEND.set(this, backendDataSvc);
		SORTPROPS.set(this, SortPropsGenerator);
		INIT.set(this, () => {

			//set the default objects
			frontendData._setDefaultObjects();

		});

		//run initialization
		INIT.get(this)();
	}

	_setDefaultObjects() {
		this.allReviews = {};
		this.allRestaurants = {};
		this.reviewsByRestaurant = {};
		//define local variables
		this.localModels = { 'restaurants':this.allRestaurants, 'reviews':this.allReviews };
		this.assetsPath = 'api/get/';
		this.backendModels = {'restaurants':'allRestaurants.json', 'reviews':'allReviews.json' };		
		this.sortProps = SORTPROPS.get(this);
	}

	//local functions
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
	getSortProps() { return this.sortProps }

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
					////LOGGER.get(this).log(response);

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

	loadData(params) {
		//let vm = this;

		//log the params		TAKE THIS OUT LATER
		//LOGGER.get(this).log('loading these params', params);

		//request the data from the model
		return new Promise(resolve => {
			BACKEND.get(this).requestList(params).then(response => {

				resolve(response);
			}).catch(error => {
				LOGGER.get(this).log('Error: ', error);
			});

		});

	}

	loadFrontendModels(models) {

		//loop through the requested models
		models.forEach(model => {
			//get the data
			this.getData(model).then(response => {
				this.localModels[model] = response;
			});

		});
		////LOGGER.get(this).log('this was loaded', this.localModels);
	}

	//SETTER METHODS
	setNewRemoteReview(newReview) {
		let fds = this;

		//let restaurantId = newReview.restaurant;

		//return a promise for async work
		return new Promise(function(resolve, reject) {

			//pass it the the server and return the respone
			BACKEND.get(fds).saveNewReview(newReview).then(function(response) {
				let newReviewId = response.recordId;
				//let newTotals = response.total;
				let returnObject = {};

				//LOGGER.get(fds).log('in FDS, setNewRemoteReview', response);

				returnObject[newReviewId] = newReview;

				//LOGGER.get(fds).log('in FDS2', returnObject);
				
				//add the new totals to the approprite record
				returnObject['allRating'] = response.total.average;
				returnObject['noOfReviews'] = response.total.totalReviews;

				//LOGGER.get(fds).log('sending this back to aReview', returnObject);
				
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

		//LOGGER.get(this).log(newReview);

		reviewId = newReview.id;
		restaurantId = newReview.data.restaurant;
	
		//LOGGER.get(this).log('new values', reviewId, restaurantId);

		//add the new review to the allreviews object
		this.localModels.reviews[reviewId] = newReview;

		//add the reveiw to the specific restaurant it is associated with
		this.localModels.restaurants[restaurantId].reviews.push(reviewId);

		//log the results
		////LOGGER.get(this).log(restaurantId);
		////LOGGER.get(this).log(this.localModels.restaurants);
		////LOGGER.get(this).log(this.localModels.reviews);
	}

}

FrontendDataService.$inject = ['$log', 'backendDataSvc', 'SortPropsGenerator'];

export { FrontendDataService }