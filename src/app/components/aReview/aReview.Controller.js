/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const STATE = new WeakMap();
const LOGGER = new WeakMap();
const SCOPE = new WeakMap();
const FRONTENDDATA = new WeakMap();
const REVIEWSSVC = new WeakMap();

class ReviewController {
	constructor ($state, $log, $scope, frontendDataSvc, reviewsSvc) {
		'ngInject';
		let rc = this;

		//define services
		STATE.set(this, $state);
		LOGGER.set(this, $log);
		SCOPE.set(this, $scope);
		FRONTENDDATA.set(this, frontendDataSvc);
		REVIEWSSVC.set(this, reviewsSvc);
		
		//define scope values
		rc.id = $state.params['id'];
		rc.parentReviews = SCOPE.get(rc).restaurant.reviews;
		//this.test = 1;

		//log required states
		//LOGGER.get(this).log('in the ReviewController');
		//LOGGER.get(this).log(SCOPE.get(rc));
		//LOGGER.get(this).log(SCOPE.get(rc).restaurant.reviews);
	}

	_distillResponse(response) {
		let reviewId = null;

		Object.keys(response).forEach(function(key) {
			reviewId = key;
		});

		return response[reviewId];
	}

	submitForm() {
		let rc = this;

		//define local variables
		let dateString = REVIEWSSVC.get(this).getSecondsTime();

		//build the review object
		let newReview = {
			restaurant: 900484800,
			name: {
				first: rc.firstName,
				last: rc.lastName
			},
			date: dateString,
			rating: rc.ratingNum,
			comments: rc.reviewMessage
		}

		//pass this review back to 
		FRONTENDDATA.get(this).setNewRemoteReview(newReview).then(response => {

			let newReview = rc._distillResponse(response);

			//add the new review to the local model
			FRONTENDDATA.get(rc).setNewLocalReview(response);

			//update the value in the parent scope
			rc.parentReviews.push(newReview);

			//reload the page
			STATE.get(rc).go('restaurant', {id: rc.id});

		});

	}	

}

ReviewController.$inject = ['$state', '$log', '$scope', 'frontendDataSvc', 'reviewsSvc'];

export { ReviewController };