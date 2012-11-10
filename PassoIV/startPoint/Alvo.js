
var Alvo = cc.Sprite.extend({
    body: null,
    ctor: function(p_body){

        this.initWithFile("../../img/alvo.png");
        this.setTag('alvo');
        this.body = p_body;
        this.body.SetUserData(this)

    }
});

