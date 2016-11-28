(function() {
    'use strict';
    angular.module('application').controller('HomeController', function($rootScope, $window, $scope, $log, $q, $state, $stateParams, HomeServices) {
        self = this;
        $rootScope.pageTitle = 'Home';

        self.recipes = {};
        self.recipe = {};
        self.data = {};

        self.backButton = function() {
          console.log('this works!');
        }

        self.showNextPage = function() {
          var currentPage = !$stateParams.pageId ? 1 : $stateParams.pageId;
          var nextPage = parseInt(currentPage)+1;
          $window.location.href = '/'+nextPage;
        }

        self.showPreviousPage = function() {
          var currentPage = !$stateParams.pageId ? 1 : $stateParams.pageId;
          var nextPage = parseInt(currentPage)-1;
          $window.location.href = '/'+nextPage;
        }

        switch ($state.current.name) {

            case 'homepage':

                HomeServices.getAllRecipes($stateParams.pageId).then(
                    function(result) {
                        self.data = result;

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
