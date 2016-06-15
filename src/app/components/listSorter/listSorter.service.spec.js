//const INIT = new WeakMap();
const LOGGER = new WeakMap();
const SortOrder = { "alpha": 0, "cuisine": 1, "total_reviews": 2, "rating": 3 };

class ListSorterService {
	constructor ($log) {
	'ngInject';
	
	//define dependencies
	LOGGER.set(this, $log);

	}

	sortByAlpha(collection) {
		Object.keys(collection).forEach(function(key) {
			//LOGGER.get(this).log(key);
		});
	}

	sortByCuisine() {

	}

	sortByReivews() {

	}

	sortByRating() {

	}

	selectSort(method, collection) {
		var local = this;
		var sort = SortOrder[method];

		switch(sort) {
			case 0:
				local.sortByAlpha(collection);
				break;
			case 1:
				local.sortByCuisine(collection);
				break;
			case 2:
				local.sortByReivews(collection);
				break;
			case 3:
				local.sortByRating(collection);
				break;
			default:
				break;
		}

	}

	static listSorterFactory() {
		return new ListSorterService();
	}

}

ListSorterService.$inject = ['$log'];

export { ListSorterService }