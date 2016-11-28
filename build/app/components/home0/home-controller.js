(function() {
    'use strict';
    angular.module('application').controller('HomeController', function($rootScope, $scope, $log, $q, HomeServices) {
        self = this;
        $rootScope.pageTitle = 'Home';

        self.recipes = {};

        HomeServices.getAllRecipes().then(
           function(result) {
                  console.log(result);
                 self.recipes = result.data;
           },
           function(err) {
               console.log('Error saving to endpoint: ', err);
           }
       );

    });
})();