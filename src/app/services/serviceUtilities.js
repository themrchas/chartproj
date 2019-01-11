'use strict';

angular.module('myApp')

.factory('servicesUtilities', ['$q', 'WARTracker', function servicesUtilitiesFactory($q,WARTracker) {

    WARTracker.getBlah() .then()

}])