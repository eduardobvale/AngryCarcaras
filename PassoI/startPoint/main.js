var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    ctor:function (scene) {
        
        this._super();
        
        this.startScene = scene;
        
        cc.setup(this.config['tag']);

        cc.Loader.shareLoader().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };

        cc.Loader.shareLoader().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };

        cc.Loader.shareLoader().preload([
        ]);
    },
    applicationDidFinishLaunching:function () {
        
        var director = cc.Director.getInstance();

        director.runWithScene(new this.startScene());

        return true;
    }
});

var passo1Application = new cocos2dApp(Passo1Scene);

  