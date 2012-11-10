
var MenuLayer = cc.Layer.extend({   
    ctor:function(){
    	
    	var label = cc.LabelTTF.create( "Angry Carcarás", "Helvetica", 64 );

        var menuitem = cc.MenuItemLabel.create(label, this, function(){

                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5,new Passo3Scene()));
                
        });

        var menu = cc.Menu.create(menuitem);

        menu.setPosition( cc.p( 300, 250 ) );
        this.addChild(menu);
    }
});

MenuScene = cc.Scene.extend({
	onEnter:function(){
		
		this._super();

		var layer = new MenuLayer();

		layer.init();

		this.addChild(layer);
	}
})

