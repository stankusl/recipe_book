angular.module('application').factory('HomeServices', function($http, $log, $q, $rootScope) {

    var factory = {};

    var recipesEndpoint = $rootScope.WebAPI +  '/recipes';

    return {
      getAllRecipes: getAllRecipes
    };


    function getAllRecipes() {

        var deferred = $q.defer();
        $http({
            method: "GET",
            url: recipesEndpoint,
        })
        .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (response) {
                $log.error('Error retrieving current user data: ' + status);
                return $q.reject('Error retrieving current user data');
            });
        return deferred.promise;
    };

});