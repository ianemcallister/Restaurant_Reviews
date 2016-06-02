const standbyColor = 'gray';
const highlightColor = 'blue';

class SortPropsGenerator {
	constructor (categories) {

		//define local values
		let generator = this;
		generator.active = null;

		categories.forEach(category => {
			generator[category] = {
				active: null,
				reverse: null,
				class: {
					"pull-right":true, 
					"glyphicon":true, 
					"glyphicon-triangle-bottom":false, 
					"glyphicon-triangle-top":false
				},
				style: {
					"color": "black"
				}
			}
		});
	}

	_setAscending(property, trueOrFalse) {
		let generator = this;
		let ascending = trueOrFalse || true;
		console.log(property, 'trueOrFalse:', trueOrFalse);

		if(ascending) {
			generator[property].class["glyphicon-triangle-bottom"] = true;
			generator[property].class["glyphicon-triangle-top"] = false;
		} else {
			generator[property].class["glyphicon-triangle-bottom"] = false;
			generator[property].class["glyphicon-triangle-top"] = true;
		}

	}

	_setActiveProperty(property) {
		let generator = this;

		generator.active = property;
		generator[property].active = true;
	}

	_flipSign(category) {
		let generator = this;
		
		//flip the value
		generator[category].reverse = !generator[category].reverse;

		if(!generator[category].reverse) {
			generator[category].class["glyphicon-triangle-bottom"] = true;
			generator[category].class["glyphicon-triangle-top"] = false;
		} else {
			generator[category].class["glyphicon-triangle-bottom"] = false;
			generator[category].class["glyphicon-triangle-top"] = true;
		}
	}

	_changeSortCategory(category) {
		let generator = this;

		let oldSort = generator.active;
		//set the old sort to standbyColor
		generator[oldSort].style['color'] = standbyColor;
		//set the new sort to highlightColor
		generator[category].style['color'] = highlightColor;
	}

	defineSort(sort, reverse) {
		let generator = this;

		//loop through all the properties on this object
		Object.keys(generator).forEach(property => {
			
			if(property !== 'active') {

				//set the value on the first go around
				if(generator[property].reverse == null) generator[property].reverse = false;

				//if we're hitting this button again, flip the sort arrow
				
				if(sort == generator.active) reverse = !generator[property].reverse;

				//set arrow direction
				generator._setAscending(property, reverse);

				//define active value and style color
				if(sort == property) {		//if it is the sort category
					//set active states
					generator._setActiveProperty(property);
					//set style
					generator[property].style.color = highlightColor;
				} else {					//if it is NOT the sort category
					//set state to inactive
					generator[property].active = false;
					//set style
					generator[property].style.color = standbyColor;
				}

			}
			
		});
	}

	setActiveSort(category) {
		let generator = this;
		
		//if this category was already active flip the sort order
		if(generator.active == category) generator._flipSign(category);
		else generator._changeSortCategory(category); //if it is a new category, change styles
		
		//set active status
		generator._setActiveProperty(category);
	}

	static sortPropsFactory() {
		return new SortPropsGenerator(['restaurant', 'cuisine', 'reviews', 'rating']);
	}
}

SortPropsGenerator.$inject = [];

export { SortPropsGenerator }