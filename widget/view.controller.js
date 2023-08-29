/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('recordSummaryCard100Ctrl', recordSummaryCard100Ctrl);

  recordSummaryCard100Ctrl.$inject = ['$scope', '$rootScope', 'PagedCollection', '$timeout'];

  function recordSummaryCard100Ctrl($scope, $rootScope, PagedCollection, $timeout) {
    $scope.runCommand = runCommand;
    $scope.widgetData = [];
    var _config = $scope.config;

    __init()
    function __init() {
      $scope.currentTheme = $rootScope.theme.id;
      if ($scope.currentTheme === 'light') {
        var textElements = document.getElementsByClassName("node-details-style-dark");
        for (var i = 0; i < textElements.length; i++) {
          textElements[i].style.color = '#151515';
        }
        var backgroundColourElements = document.getElementsByClassName("global-card-dark display-inline-block");
        for (var i = 0; i < backgroundColourElements.length; i++) {
          backgroundColourElements[i].setAttribute('class', 'global-card-light display-inline-block');
        }
        var backgroundColourElements = document.getElementsByClassName("record-card-title-dark");
        for (var i = 0; i < backgroundColourElements.length; i++) {
          backgroundColourElements[i].setAttribute('class', 'record-card-title-light');
        }
      }
      fetchJsonData();
    }


    function fetchJsonData() {
      var filters = {
        query: _config.query
      };
      var pagedTotalData = new PagedCollection(_config.customModule, null, null);
      pagedTotalData.loadByPost(filters).then(function () {
        if (pagedTotalData.fieldRows.length === 0) {
          return;
        }
        for (let i = 0; i < pagedTotalData.fieldRows.length; i++) {
          //checking if custom module field is given 
          var data = pagedTotalData.fieldRows[i][_config.customModuleField].value;
          if (data) {
            if (_config.keyForCustomModule) {
              // if the key is card.value.data, to get the value of 'data' splitting the key by . and looping over the keys
              var nestedKeysArray = _config.keyForCustomModule.split('.');
              nestedKeysArray.forEach(function (value) {
                data = data[value];
                if(data === undefined){
                  return;
                }
              })
            }
            if (data != undefined && data.hasOwnProperty('data')) {
              data['@id'] = pagedTotalData.fieldRows[i]['@id'].value;
              $scope.widgetData.push(data);
            }
          }
        }
        $timeout(function() {
          if (_config.broadcastEvent && $scope.widgetData.length > 0) {
            runCommand(0);
          }
        });

      })
    }

    function runCommand(index) {
      if (_config.broadcastEvent) {
        $rootScope.$broadcast("widget:" + _config.eventName, $scope.widgetData[index]['@id']
        );
      }
      for (var i = 0; i < $scope.widgetData.length; i++) {
        var element = document.getElementById("globalCard-" + i);
        if (i === index) {
          element.classList.add("card-active");
        }
        else {
          element.classList.remove("card-active");
        }
      }
    }
  }
})();
