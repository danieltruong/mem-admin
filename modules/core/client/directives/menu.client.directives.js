'use strict';

angular.module('core')

.directive ('tmplSystemMenu', function () {
  return {
    scope: {
      menuContext: '=',
      project: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/core/client/views/menu.client.view.html',
    controllerAs: 'menu',
    controller: function ($scope, $state, Authentication, Menus, $rootScope, _, ENV) {
      var menu            = this;
      menu.ENV            = ENV;
      menu.systemMenu     = Menus.getMenu ('systemMenu');
      menu.projectsMenu   = Menus.getMenu ('projectsMenu');
      menu.projectTopMenu = Menus.getMenu ('projectTopMenu');
      menu.projectMenu    = Menus.getMenu ('projectMenu');
      menu.$state         = $state;
      menu.authentication = Authentication;

      menu.isAdmin = (Authentication.user && Authentication.user.roles && Authentication.user.roles.indexOf ('admin') !== -1);
      if ($scope.project) {
        menu.isEAO = (Authentication.user && Authentication.user.roles && (!!~Authentication.user.roles.indexOf ($scope.project.code+':eao:member') || !!~Authentication.user.roles.indexOf ('admin')));
        menu.isNewProject = !$scope.project.code;
      }
      menu.isProjectAdmin = false;
      menu.isProponentAdmin = false;

      menu.goToPrevious = function() {
        $state.go($state.previous.state.name, $state.previous.params);
      };

      $scope.$watch('menuContext', function(newValue) {
        if (newValue) {
          menu.context = newValue;
        }
      });

      $scope.$watch('project', function(newValue) {
        if (newValue) {
          menu.project = newValue;
          menu.isProjectAdmin = (Authentication.user && Authentication.user.roles && Authentication.user.roles.indexOf (menu.project.adminRole) !== -1);
          menu.isProponentAdmin = (Authentication.user && Authentication.user.roles && Authentication.user.roles.indexOf (menu.project.proponentAdminRole) !== -1);
        }
      });
      menu.pageAnchors = function(id) {
        return false;
      };
    }
  };
})

;
