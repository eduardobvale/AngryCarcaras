var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
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

        // turn on display FPS
        //director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        // director.setAnimationInterval(1.0 / this.config['frameRate']);

        // create a scene. it's an autorelease object

        // run
        director.runWithScene(new this.startScene());

        return true;
    }
});
var myApp = new cocos2dApp(Passo1Scene);

  