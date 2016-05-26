/**TODO: UPDATE THIS INFORMATION
 * @ngdoc function
 * @name transitApp.controller:TrainscheduleCtrl
 * @description
 * # TrainscheduleCtrl
 * Controller of the transitApp
 */

const LOGGER = new WeakMap();
const STATE = new WeakMap();

class ReviewController {
	constructor ($state, $log) {
		'ngInject';
		let rc = this;

		rc.id = $state.params['id'];

		LOGGER.set(this, $log);
		STATE.set(this, $state);

		LOGGER.get(this).log('in the ReviewController');
		this.test = 1;
	}

	submitForm() {
		let rc = this;

		LOGGER.get(this).log(rc.firstName, rc.lastName, rc.date, rc.ratingNum, rc.reviewMessage);

		STATE.get(this).go('restaurant', {id: rc.id});
	}	

}

ReviewController.$inject = ['$state', '$log'];

export { ReviewController };