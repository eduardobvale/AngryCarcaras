
var Passo1Layer = cc.Layer.extend({   
    ctor:function(){
    	
    	var label = cc.LabelTTF.create( "Cocos2D ☺ Html5", "Helvetica", 64 );
       
        label.setPosition( cc.p( 300, 250 ) );

        this.addChild(label);
    }
});

Passo1Scene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new Passo1Layer();
		layer.init();
		this.addChild(layer);
	}
})

