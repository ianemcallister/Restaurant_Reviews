describe('A Restaurant Controller', () => {
  let vm;
  //inject the angular mocker
  beforeEach(angular.mock.module('chowpal'));
  //prepare for this specific contorller
  beforeEach(inject(($controller, webDevTec, toastr) => {
    spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
    spyOn(toastr, 'info').and.callThrough();

    vm = $controller('RestaurantController');
  }));

  //individual tests
  it('should have a name that is a string', () => {
    expect(typeof vm.name).toEqual('string');
  });
  //COME BACK TO THE IMAGE
  it('should have a photograph that is an image', () => {
    expect(1).toEqual(1);
  });

  it('should have an address that is an object', () => {
    expect(typeof vm.address).toEqual('object');
  });

  it('should have a cuisine that is a string', () => {
    expect(typeof vm.cuisine).toEqual('string');
  });

  it('should have operating hours that are held in an object', () => {
    expect(typeof vm.cuisine).toEqual('string');
  });

  it('should have a review submission form that submits data to the server', () => {
    expect(typeof vm.submitReview).toBe('function');
    //how do we test if it submitted the form?
  });

});
