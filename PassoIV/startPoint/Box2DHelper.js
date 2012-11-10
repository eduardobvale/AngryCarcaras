
function Box2DHelper () {
    
}

Box2DHelper.CreateBody = function( world, position, size, static, sensor, isCircle, density){

    var b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

    var bodyDef = new b2BodyDef();
    bodyDef.type = static ? b2Body.b2_staticBody : b2Body.b2_dynamicBody ;    
    bodyDef.position.Set(position.x, position.y);
    bodyDef.bullet = true;

    playerBody = world.CreateBody(bodyDef);


    if ( isCircle ) {
        var dynamicShape = new b2CircleShape();
        dynamicShape.SetRadius(size.x/2);
    }
    else {
        var dynamicShape = new b2PolygonShape();
        dynamicShape.SetAsBox(size.x/2, size.y/2);
    }
    
    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicShape;
    fixtureDef.density = 1.5;
    fixtureDef.friction = 0.3;
    fixtureDef.restitution = 0.7;
    fixtureDef.isSensor = sensor ? true : false;
    playerBody.CreateFixture(fixtureDef);

    return playerBody;
};

Box2DHelper.CreateDynamicBox = function( world, position, size){

    return Box2DHelper.CreateBody(world, position, size, false, false, false);
};

Box2DHelper.CreateStaticBox = function( world, position, size){

    return Box2DHelper.CreateBody(world, position, size, true, false, false);
};

Box2DHelper.CreateDynamicCircle = function( world, position, size){

    return Box2DHelper.CreateBody(world, position, size, false, false, true);
};

