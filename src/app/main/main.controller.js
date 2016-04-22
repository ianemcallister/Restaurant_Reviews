export class MainController {
  constructor ($timeout, webDevTec, toastr/*, address*/) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1461276980608;
    this.toastr = toastr;

    this.activate($timeout, webDevTec/*, address*/);
  }

  activate($timeout, webDevTec/*, address*/) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
    //this.getAddress(address);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  /*getAddress(address) {
    //this.address = new address;
    //$log.info('test');
  }*/

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
