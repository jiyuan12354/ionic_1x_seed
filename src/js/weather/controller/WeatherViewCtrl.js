 //天气查看
app.controller('WeatherViewCtrl', function($scope, $stateParams, WeatherService) {

	// 获取传入地区参数
	var zone = $stateParams.zone;

	// 获取天气数据
	WeatherService.getWeatherByZone(zone).then(function(data){
		if(data && data.results){
			$scope.item = data.results[0];
		}
	});

});