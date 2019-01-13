(function () {

'use strict';

angular.module('BlurAdmin.services.raw',[])

.factory('DataService', ['$http','$q', function ($http,$q) {

function getGenericCall(url) {

    var deferred = $q.defer();

    $http({
        url:url,
        method: 'GET',
        headers: { 
            "Accept": "application/json;odata=verbose"
        }
    })

    .success(function(data) {
            deferred.resolve(data);

    })
    
    .error (function(err) {
        deferred.reject(err);
    });
}

function getDigest() {

    var deferred = $q.defer();

    var url = "http://sp-dev-sp/sites/dev/site1/_api/contextinfo";
   //var url = "http://sp-dev-sp/_api/contextinfo";

    $http({

        url:url,
        method: 'POST',
        headers : {
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json; odata=verbose"
        }
    })

    .success(function(data) {
        console.log('FormDigestValue is data');
        deferred.resolve(data.d.GetContextWebInformation.FormDigestValue);

    })

    .error (function(err) {
        console.log('err in getDigest is',err);
        deferred.reject(err);
    });

    return deferred.promise;
}



    function getData() {

        var deferred = $q.defer();

        getDigest().then(function (digest) {
    
            $http({

                // url: "/hq/cmdgrp/_api/Web/Lists/GetByTitle('WAR')/items",
                url: "http://sp-dev-sp/sites/dev/site1/_api/Web/Lists/GetByTitle('RestList')/items",
                dataType: 'json',
                method: 'GET',
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    //  "X-RequestDigest" : $('#_REQUESTDIGEST').val()
                    "X-RequestDigest" : digest
                }
            })

                .success(function (data) {
                    deferred.resolve(data);
                })

                .error(function (err) {
                    deferred.reject(err);
                });


        });

        return deferred.promise;
    }


function printFromRaw() {
    console.log('printed from dataService raw');
}

return {
    'getGenericCall': getGenericCall,
    getData: getData,
    'printFromRaw': printFromRaw
};

}]);

})();