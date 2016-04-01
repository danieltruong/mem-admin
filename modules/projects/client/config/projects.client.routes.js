'use strict';

angular.module('projects').config (
	['$locationProvider', '$stateProvider', '$urlRouterProvider', '_',
	function ($locationProvider, $stateProvider, $urlRouterProvider, _) {

	$stateProvider
	// =========================================================================
	//
	// New Project Routes
	//
	// =========================================================================
	.state('projects', {
		url: '/',
		templateUrl: 'modules/projects/client/views/projects.abstract.html',
		resolve: {
			projects: function ($stateParams, ProjectModel) {
				return ProjectModel.getCollection ();
			}
		},
		controller: function ($scope, $stateParams, projects, ENV, Authentication) {
			$scope.projects = projects;
			$scope.environment = ENV;
			$scope.authentication = Authentication;
		}
	})
	// -------------------------------------------------------------------------
	//
	// the scheudle view for all projects
	//
	// -------------------------------------------------------------------------
	.state('projects.schedule', {
		data: {roles: ['admin','eao']},
		url: 'schedule',
		templateUrl: 'modules/projects/client/views/projects-partials/projects-schedule.html',
		controller: function ($scope, projects) {
			$scope.projects = projects;
			$scope.allPhases = _.sortBy(_.unique(_.flatten(_.map(projects, function(proj) {
				return _.map(proj.phases, 'name');
			}))));
		}
	});
}]);
