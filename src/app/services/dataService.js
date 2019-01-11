
'use strict';

angular.module('BlurAdmin.servicess')

.factory('WARTracker', ['$http','$q', function WARTrackerFactory($http,$q) {


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
    })
}

function getDigest() {
    var deferred = $q.defer();

    var url = "https://socafrica.sof.socom.mil/hq/cmdgrp/_api/contextinfo";

    $http({

        url:url,
        method: 'POST', //GET
        headers : {
            "Accept": "application/json;odata=verbose"
        }
    })

    .success(function(data) {
        deferred.resolve(data.d.GetContextWebInformation.FormDigestValue);

    })

    .error (function(err) {
        deferred.reject(err);
    })
}

function getData() {

    var deferred = $q.defer();

    $http({

        url: "/hq/cmdgrp/_api/Web/Lists/GetByTitle('WAR')/items",
        dataType: 'json',
        method: 'GET',
        headers : {
            "Accept": "application/json;odata=verbose",
            "Content-Type" : "application/json;odata=verbose",
            "X-RequestDigest" : $('#_REQUESTDIGEST').val()
        }
    })

    .success(function(data) {
        deferred.resolve(data.d.GetContextWebInformation.FormDigestValue);

    })

    .error (function(err) {
        deferred.reject(err);
    })


}

return {
    'getGenericCall': getGenericCall,
    'getDigest': getDigest
}

}]);