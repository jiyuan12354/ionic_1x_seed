/**
 * 应用路由
 */
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	//主页-首页
	.state('index', {
		url: '/index',
		templateUrl: 'index/views/main_index.html',
		controller: 'MainIndexCtrl'
	})

	// 天气-地区选择
	.state('weatherSelect', {
		url: '/weather',
		templateUrl: 'weather/views/weather_select.html',
		controller: 'WeatherSelectCtrl'
	})
	// 天气-查看
	.state('weatherView', {
		url: '/weather/:zone',
		params: {zone: null},
		templateUrl: 'weather/views/weather_view.html',
		controller: 'WeatherViewCtrl'
	})

	// 我的
	.state('my', {
		url: '/my',
		templateUrl: 'user/views/main_my.html',
		controller: 'MainMyCtrl'
	})

	//登录页
	.state('login', {
		url: '/login',
		params: {from: null, fromParams: null, to: null, toParams: null},
		templateUrl: 'user/views/login.html',
		controller: 'LoginCtrl'
	})
	//未登录页
	.state('notlogin', {
		url: '/notlogin',
		templateUrl: 'user/views/not_login.html'
	})

	.state("other", {
		url: "/other",
		abstract: true,
		controller: "OtherCtrl",
		template: "<ion-nav-view></ion-nav-view>",
		onEnter: function($rootScope, fromStateServ) {
			fromStateServ.setState(
				"other",
				$rootScope.fromState,
				$rootScope.fromParams);
		}
	})
	;

	$urlRouterProvider
		.otherwise('index')
	;

});
