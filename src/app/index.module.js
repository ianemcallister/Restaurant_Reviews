/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AllRestaurantsController } from './components/all/AllRestaurants.Controller';
import { RestaurantController } from './components/aRestaurant/aRestaurant.Controller';
import { ReviewController } from './components/aReview/aReview.Controller'
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { AddressService } from '../app/components/address/address.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('chowpal', ['ngAnimate', 'ngTouch', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('venueAddress', AddressService)
  .controller('MainController', MainController)
  .controller('AllRestaurantsController', AllRestaurantsController)
  .controller('RestaurantController', RestaurantController)
  .controller('ReviewController', ReviewController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
