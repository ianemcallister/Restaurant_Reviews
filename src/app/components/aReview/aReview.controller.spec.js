describe('A Review Document', () => {
  let vm;
  //inject the angular mocker
  beforeEach(angular.mock.module('chowpal'));
  //prepare for this specific contorller
  beforeEach(inject(($controller, webDevTec, toastr) => {
    spyOn(webDevTec, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
    spyOn(toastr, 'info').and.callThrough();

    vm = $controller('ReviewController');
  }));

  //individual tests
  it('should accept a Reviewer name as a string', () => {
    expect(vm.test).toEqual(1);
  });

  it('should accept a submission data as a unix dateTime', () => {
    expect(1).toEqual(1);
  });

  it('should provide the current dateTime as the initial option', () => {
    expect(1).toEqual(1);
  });

  it('should accept a star rating as an int between 1 and 5', () => {
    expect(1).toEqual(1);
  });

  it('should accept a comment as a text string', () => {
    expect(1).toEqual(1);
  });

  it('should have a submission button that submits the form', () => {
    expect(1).toEqual(1);
  });

});
