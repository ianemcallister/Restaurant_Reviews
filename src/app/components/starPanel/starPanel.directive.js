export function StarPanelDirective(malarkey) {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        starRating: '='
    },
    templateUrl: 'starPanel.html',
    link: linkFunc,
    controller: StarPanelController,
    controllerAs: 'vm'
  };

  return directive;

  function linkFunc(scope, el, attr, vm) {
    let watcher;
    let typist = malarkey(el[0], {
      typeSpeed: 40,
      deleteSpeed: 40,
      pauseDelay: 800,
      loop: true,
      postfix: ' '
    });
    console.log(scope.starRating);
    el.addClass('acme-malarkey');

    angular.forEach(scope.extraValues, (value) => {
      typist.type(value).pause().delete();
    });

    watcher = scope.$watch('vm.contributors', () => {
      angular.forEach(vm.contributors, (contributor) => {
        typist.type(contributor.login).pause().delete();
      });
    });

    scope.$on('$destroy', () => {
      watcher();
    });
  }

}

class StarPanelController {
  constructor ($log, githubContributor) {
    'ngInject';

    this.$log = $log;
    this.contributors = [];

    this.activate(githubContributor);
    $log.log(this.starRating);
  }

  activate(githubContributor) {
    return this.getContributors(githubContributor).then(() => {
      this.$log.info('Activated Contributors View');
    });
  }

  getContributors(githubContributor) {
    return githubContributor.getContributors(10).then((data) => {
      this.contributors = data;

      return this.contributors;
    });
  }
}
