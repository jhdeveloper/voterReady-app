// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('elections', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }


      // LOAD DATA FROM JSON FILE
      var windowApp = {
        data: {},
        init: function () {
          var self = this;
          jQuery.getJSON("http://gisapps.miamidade.gov/voterReady/Results/FileBytes", function (data) {
            self.data = data;
            self.loadAll();
          });
        },
        loadAll: function () {
          var self = this;
          // LOAD DATA INTO HTML SECTIONS
          self.loadContent('.disclaimerHeader', 'landingPage', 'disclaimerHeader');
          self.loadContent('.disclaimerBody', 'landingPage', 'disclaimerBody');
          self.loadContent('.disclaimerLinkText', 'landingPage', 'disclaimerLinkText');
          self.loadatr('.heroImage', 'src', 'landingPage', 'heroImage');
          self.loadatr('.imageImportantNews', 'src', 'landingPage', 'imageImportantNews');
          self.loadatr('.disclaimerLink', 'href', 'landingPage', 'disclaimerLink');
        },
        loadContent: function (selector, father, child) {
          var self = this;
          if (typeof (self.data[father]) !== "undefined") {
            if (typeof (self.data[father][child]) !== "undefined") {
              $(selector).html(self.data[father][child]);
            }
          }
        },
        loadatr: function (selector, atr, product, item) {
          var self = this;
          if (typeof (self.data[product]) !== "undefined") {
            if (typeof (self.data[product][item]) !== "undefined") {
              $(selector).attr(atr, self.data[product][item]);

            }
          }
        }
      };

      windowApp.init();
      windowApp.loadAll();

    });
  })
  .controller('mainCtrl', function ($scope) {
    $scope.open = function(){
      ionic.Platform.ready(function(){
        cordova.InAppBrowser.open('http://gisapps.miamidade.gov/voterReady/', '_blank', 'location=no,toolbar=no');
      });
    }
  });
