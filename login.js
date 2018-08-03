var app = angular.module('AngularJSLogin', []);
app.controller('AngularLoginController', function($scope, $http) {
		this.loginForm = function() {
			var user_data='username=' +this.inputData.username+'&password='+this.inputData.password;
 
			$http({
				method: 'POST',
				url: 'php/login.php',
				data: user_data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data) {
			console.log(data);
				if ( data === 'correct') {
					window.location.href = 'music_player.html';
				} else {
					$scope.errorMsg = "Invalid Email and Password";
				}
			})
		}
 
	});