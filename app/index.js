'use strict';

angular
	.module('peertapp', ['auth0', 'angular-storage','angular-jwt', 'ngMaterial', 'ui.router','ngResource'])
	.controller("mainController", mainController)
	.config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

		authProvider.init({
			domain: 'danielszeto.auth0.com',
			clientID: 'tUdYjW2Yp70OXPGzyClGTenR08M7vML5'
		});

		jwtInterceptorProvider.tokenGetter = function(store){
			return store.get('id_token');
		};

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'components/home/home.html'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'components/profile/profile.html',
				controller: 'profileController as user'
			})
			.state('main', {
				url: '/main',
				templateUrl: 'components/main/main.html',
				controller: 'mainController as main'
			})
			.state('event', {
				url: '/event',
				templateUrl: 'components/event/event.html'
			});

			function redirect($q, $injector, auth, store, $location) {
				return {
					reponseError: function(rejection) {

						if(rejection.status === 401) {
							auth.signout();
							store.remove('profile');
							store.remove('id_token');
							$location.path('/home');
						}

						return $q.reject(rejection);
					}
				};
			}

			$provide.factory('redirect', redirect);
			$httpProvider.interceptors.push('redirect');
			$httpProvider.interceptors.push('jwtInterceptor');
	})

	.run(function($rootScope, auth, store, jwtHelper, $location){

		$rootScope.$on('$locationChangeStart', function() {

			var token = store.get('id_token');
			if(token) {
				if (!jwtHelper.isTokenExpired(token)) {
					if (!auth.isAuthenticated) {
						auth.authenticate(store.get('profile'), token);
					}
				}
			} else {
				$location.path('/home');
			}
		});
	});


