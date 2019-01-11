/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('BarChartCtrl', BarChartCtrl);

  /** @ngInject */
  function BarChartCtrl($scope, baConfig, $element, layoutPaths,$q) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    
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
     dataProvider: loadData1().then(function(msg) {  console.log('made it to the then'); barChart.dataProvider = msg;   barChart.validateData();} ),
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Visitors from country',
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
          valueField: 'visits'
        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'country',
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

    function loadData()   {

     // var deferred = $q.defer();
  
      setInterval(function() {

        
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
         // deferred.resolve(theData);

         console.log('data is', theData );
         barChart.dataProvider = theData;
         barChart.validateData();
        // return theData;
      }
      ,5000);

     // return deferred.promise;
    
    }

    function loadData1()   {

       var deferred = $q.defer();
   
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

           setInterval(function() {
                console.log('data is', theData );
                deferred.resolve(theData);
           }, 
           5000);
          

     
 
      return deferred.promise;
     
     }
 


  
  }

  
  //loadData()
   //   .then(function(msg) { return msg } );
  
  
})();
