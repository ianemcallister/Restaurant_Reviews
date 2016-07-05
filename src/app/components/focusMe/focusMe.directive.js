export function FocusMeDirective($timeout, $parse) {
  'ngInject';

  let directive = {
    link: linkFunc
  };

  return directive;

  function linkFunc(scope, element, attrs) {
      let model = $parse(attrs.focusMe);
      
      scope.$watch(model, function(value) {
        //$log.info('value=',value);
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          })
        }

      });
      element.bind('blur',function() {
        //$log.info('blur');
        //scope.$apply(model.assign(scope, false));
      });
  }

}

FocusMeDirective.$inject = ['$timeout', '$parse'];
