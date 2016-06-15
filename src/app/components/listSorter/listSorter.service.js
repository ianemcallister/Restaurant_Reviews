//const INIT = new WeakMap();
const LOGGER = new WeakMap();
const SortOrder = { "restaurant": 0, "cuisine": 1, "reviews": 2, "rating": 3 };

class ListSorterService {
	constructor ($log) {
	'ngInject';
	
	//define dependencies
	LOGGER.set(this, $log);

	}

	_buildArrayFromObject(object) {
		let newArray = [];

		Object.keys(object).forEach(rest => {
			newArray.push(object[rest]);
		});

		return newArray;
	}

	_sortByAlpha(collection, reverse) {
		let list = collection;
		let reference = {}
		//sort the collection alphbetically 
		
		list.sort(function(a, b) { 
			if(a.name > b.name) { return 1 }
			if(a.name < b.name) { return -1 }
			return 0;
		});

		//run through the list and build a reference hash
		let i = 0;
		list.forEach(rest => {
			reference[i] = rest.id;
			i++;
		});

		if (reverse) list.reverse();
		
		return list;
		//return {list: list, ref: reference};
	}

	_sortByCuisine(collection, reverse) {
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

	_sortByReivews(collection, reverse) {
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

	_sortByRating(collection, reverse) {
		var list = collection
		//flip the reverse value
		reverse = !reverse;
		
		//sort the collection by rating 
				
		list.sort(function(a, b) { 
			if(a.rating > b.rating) { return 1 }
			if(a.rating < b.rating) { return -1 }
			return 0;
		});

		if (reverse) list.reverse();
		
		return list;
	}

	selectSort(collection, method, reverse) {

		let local = this;
		let sort = SortOrder[method];

		//convert the collection from an object to a list
		collection = local._buildArrayFromObject(collection);
		switch (sort) {
			case 0:
				////console.log('restaurant sort', reverse);
				return local._sortByAlpha(collection, reverse);
			case 1:
				////console.log('cuisine sort', reverse);
				return local._sortByCuisine(collection, reverse);
			case 2:
				////console.log('reviews sort', reverse);
				return local._sortByReivews(collection, reverse);
			case 3:
				////console.log('rating sort', reverse);
				return local._sortByRating(collection, reverse);
		}

	}

	static listSorterFactory() {
		return new ListSorterService();
	}

}

ListSorterService.$inject = ['$log'];

export { ListSorterService }