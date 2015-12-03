YUI.add('aui-widget-transition-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-transition'),
        WidgetTransition = Y.Base.create('widgetTransition', Y.Widget, [Y.WidgetTransition]);

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetTransition Tests',

        'should not animate when rendered if "animated" is not set to true': function() {
            var widgetInstance = new WidgetTransition().render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 0,
                method: 'transition'
            });

            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        },

        'should animate when rendered if "animated" is set to true': function() {
            var widgetInstance = new WidgetTransition({
              animated: true
            }).render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 1,
                method: 'transition',
                args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
            });

            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        },

        'should not animate when widget is hidden if "animated" is not set to true': function() {
            var widgetInstance = new WidgetTransition().render();

            this.wait(function() {
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 0,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });

              widgetInstance.set('visible', false);
              this.wait(function() {
                Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 100);
        },

        'should animate when widget is hidden if "animated" is set to true': function() {
            var widgetInstance = new WidgetTransition({
              animated: true
            }).render();

            this.wait(function() {
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 1,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });

              widgetInstance.set('visible', false);
              this.wait(function() {
                Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 100);
        },

        'should animate when widget is hidden if "animated" is set to true after widget is rendered': function() {
            var widgetInstance = new WidgetTransition().render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 1,
                method: 'transition',
                args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
            });

            widgetInstance.set('animated', true);
            widgetInstance.set('visible', false);
            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-transition', 'base-build', 'test', 'widget']
});
