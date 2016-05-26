export function StarPanelDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        starRating: '='
    },
    templateUrl: 'app/components/starPanel/starPanel.html',
    link: linkFunc,
    controller: StarPanelController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  function linkFunc(/*scope, el, attr, vm*/) {
  }

}

class StarPanelController {
  constructor ($log) {
    'ngInject';

    this.$log = $log;
    this.contributors = [];

    $log.log(this.starRating);

    //build stars into an array
    this.starsArray = this._buildStarsArray(this.starRating);

    $log.log(this.starsArray);
  }

  _buildStarsArray(rating) {
    let remaing = rating;
    let returnObject = [];

    while(remaing > 0) {
      //add the proper term
      if(remaing >= 1) returnObject.push('full');
      else if(remaing < 1 && remaing >= 0.75) returnObject.push('threeQuarter');
      else if(remaing < 0.75 && remaing >= 0.50) returnObject.push('half');
      else if(remaing < 0.50 && remaing >= 0.25) returnObject.push('oneQuarter');
      else if(remaing < 0.25 && remaing >= 0) returnObject.push('sliver');
      remaing--;
    }
    

    return returnObject;
  }
}
