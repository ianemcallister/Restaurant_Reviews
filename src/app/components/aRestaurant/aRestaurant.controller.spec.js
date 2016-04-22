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
    expect(typeof vm.model.name).toEqual('string');
  });
  //COME BACK TO THE IMAGE
  it('should have a photograph that the url to a photo', () => {
    expect(typeof vm.model.imageSrc).toEqual('string');
  });

  it('should have an address that is an address object', () => {
    expect(typeof vm.model.address).toEqual('object');
    //check that it is specifically an address object
  });

  it('should have a cuisine that is a string', () => {
    expect(typeof vm.model.cuisine).toEqual('string');
  });

  it('should have operating hours that are held in an object', () => {
    expect(typeof vm.model.cuisine).toEqual('string');
  });

  it('should have a review submission form that submits data to the server', () => {
    expect(typeof vm.submitReview).toBe('function');
    //how do we test if it submitted the form?
  });

  it('should have a loadModel method', () => {
    expect(typeof vm.loadModel).toBe('function');
    //how do we test if it submitted the form?
  });
  
  describe('loadModel method', () => {
    
    it('should be called when the page loads', () => {
      expect(1).toBe(1);
    });

    it('should obtain the restaurant model as an object', () => {
      expect(1).toBe(1);
    });
  });

});
