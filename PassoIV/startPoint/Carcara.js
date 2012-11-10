
var Carcara = cc.Sprite.extend({
    body: null,
    ctor: function(p_body){

        this.initWithFile("../../img/carcara-peq.png");
        
        this.body = p_body;
        this.body.SetUserData(this)

    },
    handleTouchMove: function(touchLocation){

    	var point = cc.p( touchLocation.x - this.getPositionX(), touchLocation.y - this.getPositionY() );
    	var angle = Math.atan2( point.x, point.y );
        this.body.SetAngle( -angle + Math.PI );
    },
    handleTouch: function(touchLocation){

    	var point = cc.p( touchLocation.x - this.getPositionX(), touchLocation.y - this.getPositionY() );
    	this.body.SetActive( true );
    	this.body.ApplyImpulse( cc.pMult( point, -0.8 ), this.body.GetPosition() );
    }
});

