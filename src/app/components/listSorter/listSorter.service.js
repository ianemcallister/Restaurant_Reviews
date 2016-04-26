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
		var list = collection
		//sort the collection alphbetically 
		
		list.sort(function(a, b) { 
			if(a.name > b.name) { return 1 }
			if(a.name < b.name) { return -1 }
			return 0;
		});

		if (reverse) list.reverse();
		
		return list;
	}

	sortByCuisine(collection, reverse) {
		var list = collection
		//sort the collection by cuisine 
				
		list.sort(function(a, b) { 
			if(a.cuisine > b.cuisine) { return 1 }
			if(a.cuisine < b.cuisine) { return -1 }
			return 0;
		});

		if (reverse) list.reverse();
		
		return list;
	}

	sortByReivews(collection, reverse) {
		var list = collection
		//sort the collection by cuisine 
				
		list.sort(function(a, b) { 
			if(a.noOfReviews > b.noOfReviews) { return 1 }
			if(a.noOfReviews < b.noOfReviews) { return -1 }
			return 0;
		});

		if (reverse) list.reverse();
		
		return list;
	}

	sortByRating(collection, reverse) {
		var list = collection
		//flip the reverse value
		reverse = !reverse;
		
		//sort the collection by cuisine 
				
		list.sort(function(a, b) { 
			if(a.rating > b.rating) { return 1 }
			if(a.rating < b.rating) { return -1 }
			return 0;
		});

		if (reverse) list.reverse();
		
		return list;
	}

	selectSort(method, reverse, collection) {

		var local = this;
		var sort = SortOrder[method];

		switch (sort) {
			case 0:
				return local.sortByAlpha(collection, reverse);
			case 1:
				return local.sortByCuisine(collection, reverse);
			case 2:
				return local.sortByReivews(collection, reverse);
			case 3:
				return local.sortByRating(collection, reverse);
		}

	}

	static listSorterFactory() {
		return new ListSorterService();
	}

}

ListSorterService.$inject = ['$log'];

export { ListSorterService }