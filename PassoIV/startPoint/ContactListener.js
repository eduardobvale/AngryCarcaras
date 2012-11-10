var ContactListener = function(layer){

	var layer = layer;

	var self = this;
 
    Box2D.Dynamics.b2ContactListener.apply(this, arguments);
 
    this.BeginContact = function(contact) {

        var sprA = contact.GetFixtureA().GetBody().GetUserData();
        var sprB = contact.GetFixtureB().GetBody().GetUserData();

        var tagA = sprA ? sprA.getTag() : '';
        var tagB = sprB ? sprB.getTag() : '';

        if((tagA == 'alvo' && tagB == 'box') || (tagA == 'box' && tagB == 'alvo'))
        	layer.onWin();
    }

	this.EndContact = function(contact) {
	    
	}

	this.PostSolve = function(contact, impulse) {

	}

	this.PreSolve = function(contact, oldManifold) {
	    
	}
}