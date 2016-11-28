(function() {
    'use strict';
    angular.module('application').controller('HomeController', function($rootScope, $window, $scope, $log, $q, $state, $stateParams, HomeServices) {
        self = this;
        $rootScope.pageTitle = 'Home';

        self.recipes = {};
        self.recipe = {};

        self.backButton = function() {
          console.log('this works!');
         $window.history.back();
        }


        switch ($state.current.name) {

            case 'homepage':

                HomeServices.getAllRecipes().then(
                    function(result) {
                        console.log(result);
                        self.recipes = result.data;
                    },
                    function(err) {
                        console.log('Error saving to endpoint: ', err);
                    });
                break;


            case 'recipe':

                HomeServices.getRecipeById($stateParams.recipeId).then(
                    function(result) {
                        // console.log(result);
                        self.recipe = result[0];
                    },
                    function(err) {
                        console.log('Error saving to endpoint: ', err);
                    });
                break;

            default:
        }

    });
})();
