 //登录
app.controller('LoginCtrl', function($scope, $state, $stateParams, UserService, $ionicHistory) {

	$scope.loginParams = {};

	$ionicHistory.nextViewOptions({
		disableBack: true
	});

	$scope.login = function(){
		UserService.loginDemo($scope.loginParams).then(function(){
			//登录成功返回目标页面
			var to = $stateParams["to"];
			if(to && to != "login"){
				$state.go(to, $stateParams["toParams"]);
			}else{
				$state.go("index");
			}
		});
	};
})
