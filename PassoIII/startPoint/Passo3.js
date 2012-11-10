PTM_RATIO = 30;
var Passo3Layer = cc.Layer.extend({
	world: null,
    carcara: null,
    ctor:function(){

        // Box2D
        this.initBox2DWorld();

        var carcaraBody = Box2DHelper.CreateDynamicCircle(this.world,cc.p(2,2),cc.p(2,2));
        this.carcara = new Carcara(carcaraBody);
        this.addChild(this.carcara);

        // Criando Limites
        Box2DHelper.CreateStaticBox(this.world,cc.p(10,0),cc.p(20,0.5));
        Box2DHelper.CreateStaticBox(this.world,cc.p(0,0),cc.p(0.5,20));
        
        //Botao Replay
        this.incluirBotaoReplay();

        this.scheduleUpdate();

        //TODO criar caixas

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
    },
    incluirBotaoReplay: function(){

        var label = cc.LabelTTF.create( "Replay", "Helvetica", 32 );

        var menuitem = cc.MenuItemLabel.create( label, this, function(){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new Passo3Scene()));
        });

        var menu = cc.Menu.create(menuitem);

        menu.setPosition( cc.p( 530, 450 ) );
        this.addChild(menu,1,2);
    }
});

Passo3Scene = cc.Scene.extend({
	onEnter:function(){
		
		this._super();


		var lazyLayer = new cc.Layer.create();

		this.addChild(lazyLayer);

		var backgroundSprite = cc.Sprite.create("../../img/bg.png");

		backgroundSprite.setPosition(cc.p(300,250));

		lazyLayer.addChild(backgroundSprite, 0);


		var layer = new Passo3Layer();

		layer.init();

		this.addChild(layer);
	}
})

