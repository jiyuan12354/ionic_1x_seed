// app
var app = angular.module('app', ['ionic', 'ngCordova', 'app.routes', 'app.commonservices', 'app.directives', 'templates'], function($httpProvider){

	// 调整angularjs默认的ajax
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	for(name in obj) {
		value = obj[name];

		if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
			subValue = value[i];
			fullSubName = name + '[' + i + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
		}
		}
		else if(value instanceof Object) {
		for(subName in value) {
			subValue = value[subName];
			fullSubName = name + '[' + subName + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
		}
		}
		else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}

	return query.length ? query.substr(0, query.length - 1) : query;
	};
	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];

})

.run(function($ionicPlatform, $rootScope, $state,
	 $location, $timeout, $ionicHistory,
	 $cordovaToast, UTIL_USER, UTIL_URL,
	 $ionicNavBarDelegate, $sqliteService,APPCONFIG) {

	// 记录用户登录状态
	$rootScope.EXT = {
		user: {
			isLogin: null
		}
	};
	// 平台准备完成
	$ionicPlatform.ready(function() {

		// cordova插件配置
		if (window.cordova && window.cordova.plugins) {

			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		//初始化数据库
		$sqliteService.db();

		//启动画面
		if(navigator.splashscreen){
			navigator.splashscreen.hide();
		}

		//后退按钮事件
		$ionicPlatform.registerBackButtonAction(function (e) {
			//判断处于哪个页面时双击退出
			if ($location.path() == '/index') {
				if ($rootScope.backButtonPressedOnceToExit) {
					ionic.Platform.exitApp();
				} else {
					$rootScope.backButtonPressedOnceToExit = true;
					$cordovaToast.showShortTop('再按一次退出系统');
					setTimeout(function () {
						$rootScope.backButtonPressedOnceToExit = false;
					}, 2000);
				}
			}
			else if ($ionicHistory.backView()) {
				if ($cordovaKeyboard.isVisible()) {
					$cordovaKeyboard.close();
				} else {
					$ionicHistory.goBack();
				}
			} else {
				$rootScope.backButtonPressedOnceToExit = true;
				$cordovaToast.showShortTop('再按一次退出系统');
				setTimeout(function () {
					$rootScope.backButtonPressedOnceToExit = false;
				}, 2000);
			}
			e.preventDefault();
			return false;
		}, 101);

		// 初始化用户登录状态
		if(!APPCONFIG.IS_WEB){
			UTIL_USER.isLogin().then(function(data){
				$rootScope.EXT.user.isLogin = data;
			});
		}

	});

	//需要登录的页面
	var filterStates = [
		"my"
	];
	//监听页面切换-开始-判断页面是否需要登录
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){

		if(toState.name == 'login' || toState.name == 'notlogin')
			return;// 如果是进入登录界面则允许
		if(fromState.name == '') return;

		for(var idx in filterStates){
			var filterState = filterStates[idx];
			if(filterState == toState.name){
				var isLogin = $rootScope.EXT.user.isLogin;
				if(!isLogin){
					e.preventDefault();
					$state.go(//跳转到登录界面
						"login",
						{from: fromState.name,
						fromParams: fromParams,
						to: toState.name,
						toParams: toParams});
				}

			}
		}
	});

	//监听页面切换-完毕
	$rootScope.$on('$stateChangeSuccess', function(event){
	$ionicNavBarDelegate.showBar(true);
	$ionicNavBarDelegate.showBackButton(true);
	});
})

//自定义ionic配置
app.config(function($ionicConfigProvider, APPCONFIG, $urlRouterProvider) {

	//tabs位置
	$ionicConfigProvider.tabs.position("bottom");
	//原生滚动
	$ionicConfigProvider.scrolling.jsScrolling(true);

});

//常量
app.constant('APPCONFIG', {
	IS_WEB: false,// 是否web发布（影响部分web不支持的功能）
	//服务端接口地址
	// 本地
	SERVER_URL_PRE: "http://localhost:8100/api",
	// 发布
	//SERVER_URL_PRE: "https://api.thinkpage.cn/v3",

	PAGE_SIZE: 10,
	//本地数据库
	DB_FILE: "appoint.db"
});

app.controller("NavBarCtrl", function($scope, $state ,$ionicHistory) {
	$scope.getPreviousTitle = function() {
		return $ionicHistory.backTitle();
	};
})