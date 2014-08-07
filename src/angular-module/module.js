angular.module('diagrammatica', []);

angular.module('diagrammatica').factory('diagrammatica', [function () {
    'use strict';
    // insert d3 code here
    if (window.diagrammatica === undefined) {
        console.log('The Diagrammatica library is required.');
    }
    return window.diagrammatica;
}]);

angular.module('diagrammatica').directive('dmaHeatMap', ['$window', 'diagrammatica', function ($window, diagrammatica) {
    'use strict';
    return {
        scope: {
            data: '=dmaHeatMap'
        },
        link: function (scope, element) {
            var chart = diagrammatica.heatMap(element[0], scope.data).width(element.width());
            $window.onresize = function () {
                scope.$apply();
            };
            scope.$watch(function () {
                return angular.element($window)[0].innerWidth;
            }, function () {
                chart.width(element.width())();
            });
            scope.$watch('data', function () {
                chart(scope.data);
            });
        }
    };
}]);