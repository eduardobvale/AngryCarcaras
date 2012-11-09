
var Passo1Layer = cc.Layer.extend({   
    ctor:function(){
    	
    	
    	//Adicionando Label
    	var label = cc.LabelTTF.create( "Cocos2D ☺ Html5", "Helvetica", 64 );
       
        label.setPosition( cc.p( 300, 450 ) );

        this.addChild(label);

        //Adicionando Sprite
        var sprite = cc.Sprite.create("../../img/carcara.png");

        sprite.setPosition( cc.p( 300, 250 ) );

        this.addChild(sprite);

        //Manipulando o Sprite
        sprite.schedule(function(){

	        this.setRotation( this.getRotation() + 3);
        });

    }
});

Passo1Scene = cc.Scene.extend({
	onEnter:function(){
		
		this._super();


		var lazyLayer = new cc.Layer.create();

		this.addChild(lazyLayer);

		var backgroundSprite = cc.Sprite.create("../../img/bg.png");

		backgroundSprite.setPosition(cc.p(300,250));

		lazyLayer.addChild(backgroundSprite, 0);


		var layer = new Passo1Layer();

		layer.init();

		this.addChild(layer);



		

	}
})

