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

    return deferred.promise;
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



    function getData(url) {

        console.log('url in dataServce.getData is',url);

        var deferred = $q.defer();

     //   getDigest().then(function (digest) {
    
            $http({

                // url: "/hq/cmdgrp/_api/Web/Lists/GetByTitle('WAR')/items",
               // url: "http://sp-dev-sp/sites/dev/site1/_api/Web/Lists/GetByTitle('RestList')/items",
                url:url,
               dataType: 'json',
                method: 'GET',
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                    //  "X-RequestDigest" : $('#_REQUESTDIGEST').val()
                  //  "X-RequestDigest" : digest
                }
            })

                .success(function (data) {

                    var test = [];
                   var item;
                    
                 //  data.d.forEach(function(el) {
                    _.forEach(data.d.results, function(val) {
                //data.d.results.map(function(el) {}

                item = {};
                item.name = val.name;
                item.followers = val.Followers;

                    //var item = '{ name:'+val.name+', followers:'+val.Followers+'}';
                 //   item['name'] = val.name;
                 //   item['followers'] = val.Followers;

                    test.push(item)

                        console.log('value in dataService is ',val);
                        console.log('item in dataService is ',item);
 
                    });

                    deferred.resolve(test);
                })

                .error(function (err) {
                    deferred.reject(err);
                });


      //  });

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