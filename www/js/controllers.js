angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DatesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('MenuCtrl', function($scope) {
	
	if(Parse.User.current() != null) {
		alert("not null");
		$scope.username = Parse.User.current().getUsername();
		$scope.logout = function() {
			Parse.User.logOut();
			alert("ausgeloggt");
		}
	} else {
			alert("null");
	}
})

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {
	
	$scope.data = {};
	
	$scope.testFunction = function() {
		alert("testFunction aufgerufen");
	};
	
	$scope.signupEmail = function() {
	
		//Create a new user on Parse
		var user = new Parse.User();
		user.set("username", $scope.data.username);
		user.set("password", $scope.data.password);
		user.set("email", $scope.data.email);
 
		// other fields can be set just like with Parse.Object
		user.set("somethingelse", "like this!");
 
		user.signUp(null, {
			success: function(user) {
				// Hooray! Let them use the app now.
				alert("success!");
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		});
 	};
 
	$scope.loginEmail = function(){
	  
		Parse.User.logIn($scope.data.username, $scope.data.password, {
			success: function(user) {
				// Do stuff after successful login.
				console.log(user);
				alert("success!");
			},
			error: function(user, error) {
				// The login failed. Check error to see why.
				alert("error!");
			}
		});
	};

	$scope.loginFacebook = function(){
	
		//Browser Login
		if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
			
			Parse.FacebookUtils.logIn(null, {
				success: function(user) {
					console.log(user);
					alert("error!");
					if (!user.existed()) {
						alert("User signed up and logged in through Facebook!");
					} else {
						alert("User logged in through Facebook!");
					}
				},
				error: function(user, error) {
					alert("User cancelled the Facebook login or did not fully authorize.");
				}
			});
		}
		//Native Login
		else {
	
			$cordovaFacebook.login(["public_profile", "email"]).then(function(success){
 
				console.log(success);
	
				//Need to convert expiresIn format from FB to date
				var expiration_date = new Date();
				expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
				expiration_date = expiration_date.toISOString();
	
				var facebookAuthData = {
					"id": success.authResponse.userID,
					"access_token": success.authResponse.accessToken,
					"expiration_date": expiration_date
				};
 
				Parse.FacebookUtils.logIn(facebookAuthData, {
					success: function(user) {
						console.log(user);
						if (!user.existed()) {
							alert("User signed up and logged in through Facebook!");
						} else {
							alert("User logged in through Facebook!");
						}
					},
					error: function(user, error) {
						alert("User cancelled the Facebook login or did not fully authorize.");
					}
				});
	
			}, function(error){
				console.log(error);
			});
		}
	};
});
