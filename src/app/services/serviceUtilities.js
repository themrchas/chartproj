(function () {

'use strict';

angular.module('BlurAdmin.services',['BlurAdmin.services.raw'])

.factory('serviceUtilities', ['$q', 'WARTracker', function ($q,WARTracker) {

  //  WARTracker.getBlah() .then()
 // .factory('serviceUtilities', ['$q', function ($q) {

    //  WARTracker.getBlah() .then()
  
  function printIt() {
      console.log('in serviceUtilities');
      WARTracker.printFromRaw();
  }

  return {
      'printIt':printIt
  };

}]);

})();