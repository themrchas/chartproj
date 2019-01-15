(function () {

'use strict';

angular.module('BlurAdmin.services',['BlurAdmin.services.raw'])

.factory('serviceUtilities', ['$q', 'DataService', function ($q, DataService) {

  //  DataService.getBlah() .then()
 // .factory('serviceUtilities', ['$q', function ($q) {

    //  DataService.getBlah() .then()
  
  function printIt() {
      console.log('in serviceUtilities');
      DataService.printFromRaw();
  }

  function getListData(url) {
    
    console.log('url in serviceUtilities.getListData is',url);

    var deferred = $q.defer();

    DataService.getData(url)
        .then(function(data) {

            console.log('DataService.getData is', data);
            deferred.resolve(data);

        });

        return deferred.promise;   

  } //getListData

  return {
      printIt:printIt,
      getListData:getListData
  };

}]);

})();