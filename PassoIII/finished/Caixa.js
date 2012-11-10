
var Caixa = cc.Sprite.extend({
    body: null,
    ctor: function(p_body){

        this.initWithFile("../../img/box-peq.png");
        
        this.body = p_body;
        this.body.SetUserData(this)

    }
});

