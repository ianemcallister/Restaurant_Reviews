
const INIT = new WeakMap();
const LOGGER = new WeakMap();

class ListFilterController {
	constructor($log) {

		//define local services
		LOGGER.set(this, $log);
		INIT.set(this, () => {});

		//LOGGER.get(this).log('in the List Filter Controller');
	}
}

ListFilterController.$inject = ['$log'];

export { ListFilterController }