PTM_RATIO = 30;
var Passo3Layer = cc.Layer.extend({
	world: null,
    carcara: null,
    preparingToShoot: false,
    hasShot: false,
    hasWon: false,
    ctor:function(){

        // Box2D
        this.initBox2DWorld();

        var carcaraBody = Box2DHelper.CreateDynamicCircle(this.world,cc.p(8,4),cc.p(2,2));
        carcaraBody.SetActive(false);
        this.carcara = new Carcara(carcaraBody);
        this.addChild(this.carcara);


        var alvoBody = Box2DHelper.CreateDynamicCircle(this.world,cc.p(28,4),cc.p(1.5,1.5));
        var alvo = new Alvo(alvoBody);
        this.addChild(alvo);

       
       
        //Botao Replay
        this.incluirBotaoReplay();

        this.criarLimites();

        this.inserirCaixas();

        this.setTouchEnabled(true);

        this.scheduleUpdate();

        var contactListener =  new ContactListener(this);

        this.world.SetContactListener(contactListener);

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
    onTouchesMoved:function(pTouch,pEvent){
        if(this.preparingToShoot){
            this.carcara.body.SetActive(false);
            this.carcara.handleTouchMove(pTouch[0].getLocation());
        }
    },
    onTouchesEnded:function (pTouch,pEvent){
        if(this.preparingToShoot)
            this.carcara.handleTouch(pTouch[0].getLocation());
        this.hasShot = true;
        this.preparingToShoot = false;
    },
    onTouchesBegan:function (pTouch,pEvent){
        if(this.hasShot == false)
            this.preparingToShoot = true;
    },
    onWin: function(){
        if(this.hasWon == false) {
            var label = cc.LabelTTF.create( "Você matou o pinto rapaz :(", "Helvetica", 32 );
            label.setColor({r:100,g:0,b:10});
            label.setPosition(cc.p(450,300));
            this.addChild(label);
        }
    },
    inserirCaixas: function(){

        var sideCaixa = (78/PTM_RATIO);

        for (var j = 1; j < 5; j++) {
            
            var bodyCaixa = Box2DHelper.CreateDynamicBox(this.world, cc.p(25, j*sideCaixa + j), cc.p(sideCaixa,sideCaixa));

            this.addChild( new Caixa(bodyCaixa));           
        };

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

        menu.setPosition( cc.p( 830, 450 ) );
        this.addChild(menu,1,2);
    },
    criarLimites: function(){
         // Criando Limites
        var sSize = cc.Director.getInstance().getWinSize();
        var sSizeMeters = { width: sSize.width/PTM_RATIO, height: sSize.height/PTM_RATIO };

        
        Box2DHelper.CreateStaticBox(this.world,cc.p(sSizeMeters.width,40/PTM_RATIO),cc.p(60,3));
        Box2DHelper.CreateStaticBox(this.world,cc.p(sSizeMeters.width,sSizeMeters.height),cc.p(60,0.5));
        
        Box2DHelper.CreateStaticBox(this.world,cc.p(0,sSizeMeters.height/2),cc.p(0.5,sSizeMeters.height));
        Box2DHelper.CreateStaticBox(this.world,cc.p(sSizeMeters.width,sSizeMeters.height/2),cc.p(0.5,sSizeMeters.height));
        
    }
});

Passo3Scene = cc.Scene.extend({
	onEnter:function(){
		
		this._super();


		var lazyLayer = new cc.Layer.create();

		this.addChild(lazyLayer);

		var backgroundSprite = cc.Sprite.create("../../img/bg.png");

		backgroundSprite.setPosition(cc.p(450,250));

		lazyLayer.addChild(backgroundSprite, 0);


		var layer = new Passo3Layer();

		layer.init();

		this.addChild(layer);
	}
})

