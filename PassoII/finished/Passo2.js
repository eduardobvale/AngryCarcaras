PTM_RATIO  = 30;
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


        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {

            if (b.GetUserData() != null) {

                var currentSprite = b.GetUserData();
                currentSprite.setPosition(cc.p(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                currentSprite.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
            
            }
        }
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

        //cria um body
         var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
            , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      
       //definições do body
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(12,5);
        bodyDef.userData = cc.Sprite.create("../../img/box.png");

        this.addChild(bodyDef.userData);

        var body = this.world.CreateBody(bodyDef);

        //definições da fixture
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(3,3);
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        fixtureDef.restitution = 0.9;
        body.CreateFixture(fixtureDef);


        //definições do body
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(10,15);
        bodyDef.userData = this.playerSprite;

        var body = this.world.CreateBody(bodyDef);

        //definições da fixture
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = new b2CircleShape();
        fixtureDef.shape.SetRadius(3);
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        fixtureDef.restitution = 0.9;
        body.CreateFixture(fixtureDef);

        this.playerBody = body;

        //cria um body statico

        //definições do body
        var staticBodyDef = new b2BodyDef();
        staticBodyDef.type = b2Body.b2_staticBody;
        staticBodyDef.position.Set(10,0);

        //definições da fixture
        var staticFixtureDef = new b2FixtureDef();
        staticFixtureDef.shape = new b2PolygonShape();
        staticFixtureDef.shape.SetAsBox(20,1);
        staticFixtureDef.density = 1.0;
        staticFixtureDef.friction = 0.3;

        this.world.CreateBody(staticBodyDef).CreateFixture(staticFixtureDef);

        

    },
    createGround: function(size){

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.6;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(10, 0);
        
        var chaoBody = this.world.CreateBody(bodyDef);
        chaoBody.CreateFixture(fixDef);
        chaoBody.SetAngle(0.1);
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

