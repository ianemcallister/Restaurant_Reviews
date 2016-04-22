export class AddressService {
  //return {
  constructor () {
    'ngInject';
    //define the properites
    this.street1 = '';
    this.street2 = '';
    this.street3 = '';
    this.unit = '';
    this.city = '';
    this.state = '';
    this.zip = 0;
    this.getAddress();
    //if an address was passed in set it
    /*if (currentAddress) {
      //loop over the keys and set the local values
      Object.keys(currentAddress).forEach(function(key) {
        this[key] = currentAddress[key];
      });
    }*/

  }

  getAddress() {
    return {
      street1 : this.street1,
      street2 : this.street2,
      street3 : this.street3,
      unit : this.unit,
      city : this.city,
      state : this.state,
      zip : this.zip
    };
  }
}
