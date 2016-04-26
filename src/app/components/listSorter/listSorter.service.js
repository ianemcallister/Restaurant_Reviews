//const INIT = new WeakMap();
const LOGGER = new WeakMap();
const SortOrder = { "alpha": 0, "cuisine": 1, "total_reviews": 2, "rating": 3 };

class ListSorterService {
	constructor ($log) {
	'ngInject';
	
	//define dependencies
	LOGGER.set(this, $log);

	}

	sortByAlpha(collection, reverse) {
		//sort the collection alphbetically 
		
		collection.sort(function(a, b) { 
			if(a.name > b.name) { return 1 }
			if(a.name < b.name) { return -1 }
			return 0;
		});

		if (reverse) collection.reverse();
		
		return collection;
	}

	sortByCuisine(collection, reverse) {
		//sort the collection by cuisine 
				
		collection.sort(function(a, b) { 
			if(a.cuisine > b.cuisine) { return 1 }
			if(a.cuisine < b.cuisine) { return -1 }
			return 0;
		});

		if (reverse) collection.reverse();
		
		return collection;
	}

	sortByReivews(collection, reverse) {
		//sort the collection by cuisine 
				
		collection.sort(function(a, b) { 
			if(a.noOfReviews > b.noOfReviews) { return 1 }
			if(a.noOfReviews < b.noOfReviews) { return -1 }
			return 0;
		});

		if (reverse) collection.reverse();
		
		return collection;
	}

	sortByRating(collection, reverse) {
		//flip the reverse value
		reverse = !reverse;
		
		//sort the collection by cuisine 
				
		collection.sort(function(a, b) { 
			if(a.rating > b.rating) { return 1 }
			if(a.rating < b.rating) { return -1 }
			return 0;
		});

		if (reverse) collection.reverse();
		
		return collection;
	}

	selectSort(method, reverse, collection) {

		var local = this;
		var sort = SortOrder[method];

		switch (sort) {
			case 0:
				local.sortByAlpha(collection, reverse);
				break;
			case 1:
				local.sortByCuisine(collection, reverse);
				break;
			case 2:
				local.sortByReivews(collection, reverse);
				break;
			case 3:
				local.sortByRating(collection, reverse);
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