/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editRecordSummaryCard100Ctrl', editRecordSummaryCard100Ctrl);

    editRecordSummaryCard100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', 'Entity', 'modelMetadatasService'];

    function editRecordSummaryCard100Ctrl($scope, $uibModalInstance, config, appModulesService, Entity, modelMetadatasService) {
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.config = config;
        $scope.config.eventName = $scope.config.eventName ? $scope.config.eventName : "";
        $scope.config.broadcastEvent = $scope.config.broadcastEvent ? $scope.config.broadcastEvent : false;
        $scope.loadAttributesForCustomModule = loadAttributesForCustomModule;
        $scope.jsonObjModuleList = [];
        $scope.toggleArrow = toggleArrow;

        init();
        function init() {
            appModulesService.load(true).then(function (modules) {
                $scope.modules = modules;
                //Create a list of modules with atleast one JSON field
                modules.forEach((module, index) => {
                    var moduleMetaData = modelMetadatasService.getMetadataByModuleType(module.type);
                    for (let fieldIndex = 0; fieldIndex < moduleMetaData.attributes.length; fieldIndex++) {
                        //Check If JSON field is present in the module
                        if (moduleMetaData.attributes[fieldIndex].type === "object") {
                            $scope.jsonObjModuleList.push(module);
                            break;
                        }
                    }
                })
            })
        }
        if ($scope.config.customModule) {
            $scope.loadAttributesForCustomModule();
        }

        function toggleArrow(){
            $scope.toggle = $scope.toggle === undefined ? true : !$scope.toggle;
        }

        function loadAttributesForCustomModule() {
            $scope.fields = [];
            $scope.fieldsArray = [];
            $scope.objectFields = [];
            var entity = new Entity($scope.config.customModule);
            entity.loadFields().then(function () {
                for (var key in entity.fields) {
                    //filtering out JSON fields 
                    if (entity.fields[key].type === "object") {
                        $scope.objectFields.push(entity.fields[key]);
                    }
                }
                $scope.fields = entity.getFormFields();
                angular.extend($scope.fields, entity.getRelationshipFields());
                $scope.fieldsArray = entity.getFormFieldsArray();
            });
        }
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if ($scope.editRecordSummaryCard.$invalid) {
                $scope.editRecordSummaryCard.$setTouched();
                $scope.editRecordSummaryCard.$focusOnFirstError();
                return;
            }
            $uibModalInstance.close($scope.config);
        }

    }
})();
