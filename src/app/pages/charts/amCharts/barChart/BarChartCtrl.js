/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  
 angular.module('BlurAdmin.pages.charts.amCharts')
 // angular.module('BlurAdmin.pages.charts.amCharts', ['BlurAdmin.services'])
  //angular.module('BlurAdmin.pages.charts.amCharts', ['servicesUtilities'])
     .controller('BarChartCtrl', BarChartCtrl);
   // .controller('BarChartCtrl',['$scope','baConfig', '$element', 'layoutPaths','$q','servicesUtilities',
   // function ($scope, baConfig, $element, layoutPaths,$q, servicesUtilities) {

  /* @ngInject */
  //function BarChartCtrl($scope, baConfig, $element, layoutPaths,$q) {
    function BarChartCtrl($scope, baConfig, $element, layoutPaths,$q,serviceUtilities) {
    
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');

  //  serviceUtilities.printIt();
  //  serviceUtilities.getListData();
    
    var barChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
    /*  dataProvider: [
        {
          country: 'USA',
          visits: 3025,
          color: layoutColors.primary
        },
        {
          country: 'China',
          visits: 1882,
          color: layoutColors.danger

        },
        {
          country: 'Japan',
          visits: 1809,
          color: layoutColors.info
        },
        {
          country: 'Germany',
          visits: 1322,
          color: layoutColors.success
        },
        {
          country: 'UK',
          visits: 1122,
          color: layoutColors.warning
        },
        {
          country: 'France',
          visits: 1114,
          color: layoutColors.primaryLight
        }
      ], */

     // dataProvider: loadData(), //loadData().then(function(msg) { return msg } ),
     dataProvider: loadData1().then(function(msg) {  console.log('made it to the then with data', msg); barChart.dataProvider = msg;   barChart.validateData();} ),
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Twitter Followers',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      startDuration: 1,
      graphs: [
        {
          balloonText: '<b>[[category]]: [[value]]</b>',
          fillColorsField: 'color',
          fillAlphas: 0.7,
          lineAlpha: 0.2,
          type: 'column',
        //  valueField: 'visits'
        valueField: 'followers'

        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
     // categoryField: 'country',
     categoryField: 'name',
      categoryAxis: {
        gridPosition: 'start',
        labelRotation: 45,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
      },
      export: {
        enabled: true
      },
      creditsPosition: 'top-right',
      pathToImages: layoutPaths.images.amChart
    });

  
 
     function loadData1()   {

      console.log('in loadData1');

      var deferred = $q.defer();

      var url = "http://localhost:8080/sites/dev/site1/_api/Web/Lists/GetByTitle('RestList')/items";
      //var url = "http://localhost:8080/sites/dev/site1/_api/Web/Lists/GetByTitle('restTest')/items";

     console.log('url in loadData1 is', url);
     
      serviceUtilities.getListData(url).then( function(data) {

        console.log('returned data is ',data);
        deferred.resolve(data);
         

      });
  
     var theData =   [
          {
            country: 'USA',
            visits: 3025,
            color: layoutColors.primary
          },
          {
            country: 'China',
            visits: 1882,
            color: layoutColors.danger
  
          },
          {
            country: 'Japan',
            visits: 1809,
            color: layoutColors.info
          }];

     return deferred.promise;
    
    }

  
 

  
  //loadData()
   //   .then(function(msg) { return msg } );
  } 
  
})();
