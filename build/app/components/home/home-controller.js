(function() {
    'use strict';
    angular.module('application').controller('HomeController', function($rootScope, $window, $scope, $log, $q, $state, $stateParams, HomeServices) {
        self = this;
        $rootScope.pageTitle = 'Home';

        self.recipes = {};
        self.recipe = {};
        self.data = {};
        self.cart = [];

        self.showTotalAmount = function(cart) {
          var total = 0;
          angular.forEach(cart, function(ingredient){
          //  console.log(ingredient)
            total = total + parseInt(ingredient.price);
          });
          return total;
        }

        self.removeFromCart = function(index) {
          self.cart.splice(index, 1);
          localStorage.setItem('items', JSON.stringify(self.cart));
        }

        self.AddToCart = function(arrayOfItems) {
        //  console.log('works');
          angular.forEach(arrayOfItems, function(item) {
        //    console.log(item);
            self.cart.push(item);
          })

          localStorage.setItem('items', JSON.stringify(self.cart));
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
                      //  console.log(result);
                        self.recipes = result.data;
                    },
                    function(err) {
                        console.log('Error saving to endpoint: ', err);
                    });

                self.cart = JSON.parse(localStorage.getItem('items'));

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

                    angular.forEach(JSON.parse(localStorage.getItem('items')), function(item) {
                      self.cart.push(item);
                    })

                break;

            default:
        }

    });
})();