const HTTP = new WeakMap();

class AddressService {
  //return {
  constructor ($http) {
    'ngInject';
    HTTP.set(this, $http);
    //define the properites
    /*this.street1 = '';
    this.street2 = '';
    this.street3 = '';
    this.unit = '';
    this.city = '';
    this.state = '';
    this.zip = 0;*/
  }

  getAnAddress() {
    
    return HTTP.get(this).get('/app/components/address/address.json')
      .then(result => result.data)
      .catch(e => console.log(e));/*{
      street1 : this.street1,
      street2 : this.street2,
      street3 : this.street3,
      unit : this.unit,
      city : this.city,
      state : this.state,
      zip : this.zip
    };*/
  }

  static serviceFactory($http) {
    return new AddressService($http);
  }
}

AddressService.serviceFactory.$inject = ['$http'];

export { AddressService }