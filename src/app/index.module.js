/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { LandingController } from './components/landing/landing.controller';
import { AllRestaurantsController } from './components/all/AllRestaurants.Controller';
import { RestaurantController } from './components/aRestaurant/aRestaurant.Controller';
import { ReviewController } from './components/aReview/aReview.Controller'
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { FrontendDataService } from '../app/components/FrontendDataService/frontendData.service';
import { ReviewsService } from '../app/components/ReviewsService/reviews.service';
import { BackendDataService } from '../app/components/BackendDataService/backendData.service';
import { RestaurantProfileService } from '../app/components/restaurantProfile/restaurantProfile.service';
import { ListSorterService } from '../app/components/listSorter/listSorter.service';
import { SortPropsGenerator } from '../app/components/sortProps/SortProps.Generator';
import { ReviewManager } from '../app/components/reviewManager/reviewManager.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { StarPanelDirective } from '../app/components/starPanel/starPanel.directive';
import { FocusMeDirective } from '../app/components/focusMe/focusMe.directive.js';

angular.module('chowpal', ['ngAnimate', 'ngTouch', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('backendDataSvc', BackendDataService)
  .service('frontendDataSvc', FrontendDataService)
  .service('reviewsSvc', ReviewsService)
  .service('restaurantProfileSvc', RestaurantProfileService)
  .service('reviewMngrSvc', ReviewManager)
  .factory('listSorterSvc', ListSorterService.listSorterFactory)
  .factory('SortPropsGenerator', SortPropsGenerator.sortPropsFactory)
  .controller('LandingController', LandingController)
  .controller('AllRestaurantsController', AllRestaurantsController)
  .controller('RestaurantController', RestaurantController)
  .controller('ReviewController', ReviewController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('starPanel', StarPanelDirective)
  .directive('focusMe', FocusMeDirective);
