
var Carcara = cc.Sprite.extend({
    body: null,
    ctor: function(p_body){

        this.initWithFile("../../img/carcara-peq.png");
        
        this.body = p_body;
        this.body.SetUserData(this)

    }
});

