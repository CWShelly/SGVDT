module.exports = function(app) {
  app.directive('uiGmapGoogleMaps', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/maps/views/map_view.html',
      scope: {
          map: '='
      },

      link: function(scope, element, attrs, controller) {
          // examine this at some point
        scope.remove = controller.removeMug;
      }
    };
  });
};


 // app.directive('uiGmapGoogleMap', function() {
