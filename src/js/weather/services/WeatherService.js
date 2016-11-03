// 天气服务
app.service('WeatherService', function(UTIL_HTTP, $q){

	var ZONE_LIST = [
		{zone: "beijing", desc: "北京"},
		{zone: "shanghai", desc: "上海"},
		{zone: "guangzhou", desc: "广州"},
		{zone: "shenzhen", desc: "深圳"}
	];

	return {
		// 获取地区列表
		getZones: function(params){
			var deferred = $q.defer();
			// 模拟延迟加载数据
			setTimeout(function(){
				deferred.resolve(ZONE_LIST);
			}, 1000);
			return deferred.promise;
		},
		// 获取指定地区天气
		getWeatherByZone: function(zone){
			return UTIL_HTTP.get({
				url: "/weather/now.json?key=tf0hutxug1ocqdll&location="
					+ zone + "&language=zh-Hans&unit=c",
				// 此参数为演示用，正常情况不需要传入
				isValidResult: false
			});
		}
	};

})