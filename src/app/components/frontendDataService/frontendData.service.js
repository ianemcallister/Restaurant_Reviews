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
		this.assetsPath = 'assets/json/';
		this.backendModels = {'restaurants':'allRestaurants.json', 'reviews':'allReviews.json' };		

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
		LOGGER.get(this).log(model, record);
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
		LOGGER.get(this).log('this was loaded', this.localModels);
	}

	//SETTER METHODS
	setData() {}

}

FrontendDataService.$inject = ['$log', 'backendDataSvc'];

export { FrontendDataService }