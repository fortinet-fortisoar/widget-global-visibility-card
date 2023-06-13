/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('globalVisibilityCard101Ctrl', globalVisibilityCard101Ctrl);

  globalVisibilityCard101Ctrl.$inject = ['$scope', '$rootScope', 'dynamicVariableService', 'PagedCollection'];

  function globalVisibilityCard101Ctrl($scope, $rootScope, dynamicVariableService, PagedCollection) {
    __init()
    $scope.runCommand = runCommand;
    $scope.widgetData = [];

    $scope.cards = [
      {
        "title": "UAE",
        "node_status": "28 June",
        "incident_count": 2400,
        "mttd": "1 min",
        "mttr": "2 mins",
        "total_customers": {
          "platinum": 3000,
          "gold": 4000,
          "diamond": 5000
        }
      },
      {
        "title": "Qatar",
        "node_status": "28 June",
        "incident_count": 2400,
        "mttd": "1 min",
        "mttr": "2 mins",
        "total_customers": {
          "platinum": 3000,
          "gold": 4000,
          "diamond": 5000
        }
      },
      {
        "title": "Saudi",
        "node_status": "28 June",
        "incident_count": 2400,
        "mttd": "1 min",
        "mttr": "2 mins",
        "total_customers": {
          "platinum": 3000,
          "gold": 4000,
          "diamond": 5000
        }
      },
      {
        "data": {
          "Alerts": "{{vars.alertsCount}}",
          "Incidents": "{{vars.incidentCount}}",
          "Indicators": "{{vars.indicatorsCount}}"
        },
        "title": "Total Requests",
        "value": "10,100"
      },
      {
        "data": {
          "Gold": "4000",
          "Diamond": "5000",
          "Platinum": "3000"
        },
        "title": "Total Customers",
        "value": "10,223"
      },
      {
        "title": "Overall Automation ROI",
        "value": "$113,122"
      }
    ];

    function __init() {
      dynamicVariableService.loadDynamicVariables().then(function (dynamicVariables) {
        var name = "EnableGlobalVisiblityBroadcast";
        $scope.globalVariables = getObjectById(dynamicVariables, name);
      });
      fetchJsonData();
    }

    function fetchJsonData() {
      var filters = {
        query: $scope.config.query
      };
      var pagedTotalData = new PagedCollection($scope.config.customModule, null, null);
      pagedTotalData.loadByPost(filters).then(function () {
        if (pagedTotalData.fieldRows.length === 0) {
          $scope.filterValidation = true;
          return;
      }
      for (let i = 0; i < pagedTotalData.fieldRows.length; i++) {
        if ($scope.config.customModuleField in pagedTotalData.fieldRows[i]) {
          $scope.widgetData.push(pagedTotalData.fieldRows[i][$scope.config.customModuleField].value);
        }
      }
    
      // $scope.widgetData = pagedTotalData.fieldRows[0][$scope.config.customModuleField].value;

      })
    }

    function getObjectById(data, name) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          if (data[i].value === "true") {
            return true;
          }
          else {
            return false;
          }
        }
      }
      return false; // return false if no object with the given id is found
    }

    function runCommand(value) {
      if ($scope.globalVariables) {
        $rootScope.$broadcast("GlobalVisiblityEvent", value);
      }
    }
  }
})();
