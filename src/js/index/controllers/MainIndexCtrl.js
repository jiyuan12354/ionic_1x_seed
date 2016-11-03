//首页
app.controller('MainIndexCtrl', function($scope, $state, NewsService, UserService, UTIL_USER, $ionicPopup, APPCONFIG) {

	$scope.viewLogin = function(){

		//web发布，不能退出
		if(APPCONFIG.IS_WEB) return;

		UTIL_USER.isLogin().then(function(isLogin){
			if(isLogin){
				var confirmPopup = $ionicPopup.confirm({
					title: '提示',
					template: '您已登录，确认退出？',
					okText: "确认",
					okType: "button-balanced",
					cancelText: "取消",
					cancelType: "button-balanced"
				});
				confirmPopup.then(function(res) {
					if(res) {
						UserService.logout().then(function(){
							$state.go("login");
						});
					}
				});
			}else{
				$state.go("login");
			}
		});
	};

})