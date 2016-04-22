
describe('Restaurant List Controller', () => {
  let vm;
  //inject the angular mocker
  beforeEach(angular.mock.module('chowpal'));
  //prepare for this specific contorller
  beforeEach(inject(($controller, webDevTec, toastr) => {
    spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
    spyOn(toastr, 'info').and.callThrough();

    vm = $controller('AllRestaurantsController');
  }));

  //individual tests
  xit('should pass the route param to the list manager on load', () => {});

  //TODO: MOVE THESE TO A SEPERATE DIRECTIVE
  it('should have a list that is an object', () => {
    expect(typeof vm.restaurantList).toEqual('object');
  });

  xit('should load the list of restaurants on page load', () => {});
  xit('should sort by alphabetical order when requested', () => {});
  xit('should sort by cuisine when requested', () => {});
  xit('should sort by # of reviews when requested', () => {});
  xit('should sort by star rating when requested', () => {});
  //TIER 2 - xit('should sort by location when requested', () => {}); 
  xit('should have a method to change sort state', () => {});
  xit('should have a method to reverse sort order', () => {});
  
});
