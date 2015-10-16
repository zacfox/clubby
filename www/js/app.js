// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}

		Parse.initialize("vvvz4o7CcBGfI0yyIlpVBhrKWBDVO7ngD2mCW83Q", "r6UBazvd2nCr6ru9DTjjleUYDMj8zFnqI4uJMKfL");
		
		if (ionic.Platform.isAndroid()) {
			alert("Android");
		}
		
		if (ionic.Platform.isAndroid()) {
			alert("Android");
		}
	
		if(!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())){
			window.fbAsyncInit = function() {
				Parse.FacebookUtils.init({
					appId      : '1631969257079836',
					cookie     : true,
					xfbml      : true,
					version    : 'v2.5'
				});
			};
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	})
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  
  .state('tab.login', {
    url: '/login',
	views: {
		'login': {
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		}
	}
  })
  
  .state('tab.signup', {
    url: '/signup',
	views: {
		'login': {
			templateUrl: 'templates/signup.html',
			controller: 'LoginCtrl'	
		}	
	}
  })
  
  .state('tab.signin', {
    url: '/signin',
	views: {
		'login': {
			templateUrl: 'templates/signin.html',
			controller: 'LoginCtrl'			
		}
	}
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
