'use strict';

angular.module('BlurAdmin.servicess')

.factory('servicesUtilities', ['$q', 'WARTracker', function servicesUtilitiesFactory($q,WARTracker) {

  //  WARTracker.getBlah() .then()

  function printIt() {
      console.log('in serviceUtilities');
  }

  return {
      'printIt':printIt
  }

}])