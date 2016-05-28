/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const LOGGER = new WeakMap();
const STATE = new WeakMap();
const FRONTENDDATA = new WeakMap();

class ReviewController {
	constructor ($state, $log, frontendDataSvc) {
		'ngInject';
		let rc = this;

		rc.id = $state.params['id'];

		LOGGER.set(this, $log);
		FRONTENDDATA.set(this, frontendDataSvc);
		STATE.set(this, $state);

		LOGGER.get(this).log('in the ReviewController');
		this.test = 1;
	}

	submitForm() {
		let rc = this;

		//build the review object
		let newReview = {
			reviewId: rc.id,
			restaurant: 900484800,
			name: {
				first: rc.firstName,
				last: rc.lastName
			},
			date: rc.date,
			rating: rc.ratingNum,
			comments: rc.reviewMessage
		}

		LOGGER.get(this).log(newReview);

		//pass this review back to 
		
		FRONTENDDATA.get(this).setNewReview(newReview).then(response => {
			
			//log the response
			LOGGER.get(this).log(response);
			
		});

		STATE.get(this).go('restaurant', {id: rc.id});
	}	

}

ReviewController.$inject = ['$state', '$log', 'frontendDataSvc'];

export { ReviewController };