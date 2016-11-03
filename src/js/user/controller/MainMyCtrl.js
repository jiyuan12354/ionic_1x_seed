//我的-首页
app.controller('MainMyCtrl', function($scope, $cordovaCamera, $state, APPCONFIG) {

	//上传头像
	$scope.clickTop = function(){
		if(APPCONFIG.IS_WEB) return;
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
			allowEdit: true,
			encodingType:Camera.EncodingType.JPEG,
			targetWidth: 200,
			targetHeight: 200,
			mediaType: 0,
			cameraDirection: 1,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};

		$cordovaCamera
			.getPicture(options)
			.then(function(imageData) {
				$scope.imageBase64 = "data:image/jpeg;base64," + imageData;
			});
	};

});