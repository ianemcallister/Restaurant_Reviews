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
	constructor ($state, $log, $scope, $document, frontendDataSvc, reviewsSvc) {
		'ngInject';
		let rc = this;

		//define services
		STATE.set(this, $state);
		LOGGER.set(this, $log);
		SCOPE.set(this, $scope);
		FRONTENDDATA.set(this, frontendDataSvc);
		REVIEWSSVC.set(this, reviewsSvc);
		
		//define scope values
		rc.restaurantId = $state.params['id'];
		rc.time = $state.params['time'];
		rc.parentReviews = SCOPE.get(rc).restaurant.reviews;
		rc.parentRestaurant = SCOPE.get(rc).restaurant.shop;
		rc.parentReviewBox = SCOPE.get(rc).restaurant.aNewReview;
		//this.test = 1;
		//LOGGER.get(this).log('the parent restaurant is...',rc.parentRestaurant);
		//log required states
		//LOGGER.get(this).log(rc.restaurantId, rc.time);
		////LOGGER.get(this).log(SCOPE.get(rc));
		////LOGGER.get(this).log(SCOPE.get(rc).restaurant.reviews);

	}

	_distillResponse(response) {
		let reviewId = null;
		//let rc = this;

		Object.keys(response).forEach(function(key) {
			//LOGGER.get(rc).log(key);
			if(key !=='allRating' && key !== 'noOfReviews') reviewId = key;
		});

		//LOGGER.get(this).log(response[reviewId]);

		return {id: reviewId, data: response[reviewId]};
	}

	submitForm() {
		let rc = this;

		//build the review object
		let newReview = {
			restaurant: rc.restaurantId,
			name: {
				first: rc.firstName,
				last: rc.lastName
			},
			date: rc.time,
			rating: rc.ratingNum,
			comments: rc.reviewMessage
		}

		//pass this review back to 
		FRONTENDDATA.get(this).setNewRemoteReview(newReview).then(response => {

			let newReview = rc._distillResponse(response);

			//LOGGER.get(rc).log('the new review is', newReview);

			//add the new review to the local model
			FRONTENDDATA.get(rc).setNewLocalReview(newReview);

			//update the value in the parent scope
			rc.parentReviews.push(newReview.data);

			//LOGGER.get(this).log('in aReview This was the response', response);
			//save the new values that came through
			rc.parentRestaurant.rating = response.rating;
			rc.parentRestaurant.noOfReviews = response.noOfReviews;

			//LOGGER.get(rc).log('rc.parentReviewBox', rc.parentReviewBox);

			//hide the box again
			rc.parentReviewBox = false;

			//LOGGER.get(rc).log('rc.parentReviewBox', rc.parentReviewBox);

			//reload the page
			STATE.get(rc).go('restaurant', {id: rc.restaurantId});

		});

	}	

}

ReviewController.$inject = ['$state', '$log', '$scope', '$document', 'frontendDataSvc', 'reviewsSvc'];

export { ReviewController };