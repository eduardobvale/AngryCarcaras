
var Passo2Layer = cc.Layer.extend({
	playerSprite: null,   
	playerBody: null,
	wordl: null,
    ctor:function(){
    	
    	
    	//Adicionando Label
    	var label = cc.LabelTTF.create( "Cocos2D ☺ Html5", "Helvetica", 64 );
       
        label.setPosition( cc.p( 300, 450 ) );

        this.addChild(label);

        //Adicionando Sprite
        this.playerSprite = cc.Sprite.create("../../img/carcara.png");

        this.addChild(this.playerSprite);

        // Box2D
        this.initBox2DWorld();

        this.scheduleUpdate();

    },
    update: function(dt){
    	
    	var velocityIterations = 8;
        var positionIterations = 1;
		
		this.world.Step(dt, velocityIterations, positionIterations);
    },
    initBox2DWorld: function(){

        var b2Vec2          = Box2D.Common.Math.b2Vec2
        , b2BodyDef         = Box2D.Dynamics.b2BodyDef
        , b2Body            = Box2D.Dynamics.b2Body
        , b2FixtureDef      = Box2D.Dynamics.b2FixtureDef
        , b2World           = Box2D.Dynamics.b2World
        , b2PolygonShape    = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape     = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw       = Box2D.Dynamics.b2DebugDraw;

        //cria o b2World
     	this.world = new b2World(new b2Vec2(0, -10), true);
        this.world.SetContinuousPhysics(true);
    }
});

Passo2Scene = cc.Scene.extend({
	onEnter:function(){
		
		this._super();


		var lazyLayer = new cc.Layer.create();

		this.addChild(lazyLayer);

		var backgroundSprite = cc.Sprite.create("../../img/bg.png");

		backgroundSprite.setPosition(cc.p(300,250));

		lazyLayer.addChild(backgroundSprite, 0);


		var layer = new Passo2Layer();

		layer.init();

		this.addChild(layer);
	}
})

