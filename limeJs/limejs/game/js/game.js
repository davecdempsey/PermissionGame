//set main namespace
goog.provide('game');

//goog.require('game.Permission');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Dynamics.b2Body');
goog.require('Box2D.Dynamics.b2FixtureDef');
goog.require('Box2D.Dynamics.b2Fixture');
goog.require('Box2D.Dynamics.b2World');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Dynamics.Joints.b2MouseJointDef');
goog.require('Box2D.Dynamics.Joints.b2RevoluteJointDef');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Collision.b2AABB');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Polygon');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');


game.WIDTH = 600;
game.HEIGHT = 400;

game.perms = {
    "check-in" : "imgs/perms/check-in.png",
    "education" : "imgs/perms/education.png",
    "email" : "imgs/perms/email.png",
    "events" : "imgs/perms/events.png",
    "friendlists" : "imgs/perms/friendlists.png",
    "hometown" : "imgs/perms/hometown.png",
    "likes" : "imgs/perms/likes.png",
    "location" : "imgs/perms/location.png",
    "newsfeed" : "imgs/perms/newsfeed.png",
    "photos" : "imgs/perms/photos.png",
    "profile-picture" : "imgs/perms/profile-picture.png",
    "publish-on-your-wall" : "imgs/perms/publish-on-your-wall.png",
    "relationship-status" : "imgs/perms/relationship-status.png",
    "status" : "imgs/perms/status.png",
    "videos" : "imgs/perms/videos.png",
    "work-history" : "imgs/perms/work-history.png",
    "birthday" : "imgs/perms/birthday.png"
};

// entrypoint
game.start = function(){
    game.director = new lime.Director(document.body, game.WIDTH, game.HEIGHT);
    game.director.makeMobileWebAppCapable();

    var gamescene = new lime.Scene();
    var layer = new lime.Layer;
    layer.setPosition(0, 0);
    gamescene.appendChild(layer);

    // set active scene
    game.director.replaceScene(gamescene);

    var bounds = new Box2D.Collision.b2AABB();
    bounds.lowerBound = new Box2D.Common.Math.b2Vec2(-game.WIDTH, -game.HEIGHT);
    bounds.upperBound = new Box2D.Common.Math.b2Vec2(2*game.WIDTH,2*game.HEIGHT);


    var gravity = new Box2D.Common.Math.b2Vec2(0, 100.00);
    var world = new Box2D.Dynamics.b2World(gravity, true);


    var defaultOptions = {
        'density' : 1.0,
        'friction' : 0.5 ,
        'restitution' : 0.5,
        'type' : Box2D.Dynamics.b2BodyDef.b2_dynamicBody
    };

    function createBox(x, y, width, height, rotation, options){
        var box = (new lime.Sprite).setFill(0,100,0).setSize(width, height);
        layer.appendChild(box);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( width/2 , height/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    function createPermissionBox(x, y, width, rotation, options, perm){
        var file = game.perms[perm] || "";

        var box = (new lime.Sprite)
            .setFill(file)
            .setSize(width, width);
        layer.appendChild(box);

        makePermissionClickable(box);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( width/2 , width/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    function createDustPieces(){
        var dust = [];
        for(var i=0; i<20; i++){
            var x = goog.math.uniformRandom(0,game.WIDTH);
            var y = game.HEIGHT - goog.math.uniformRandom(20,30);

            var box = new lime.Polygon().setPoints(0,0,5,0,2.5,2.5).setFill(0, 51, 102);//(94,94,94);
            layer.appendChild(box);

            var body_def = new Box2D.Dynamics.b2BodyDef();
            body_def.position.Set(x , y);
            body_def.type = defaultOptions.type;
            //body_def.type = Box2D.Dynamics.b2BodyDef.b2_staticBody;
            var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.density = 1000;
            fixtureDef.friction = defaultOptions.friction;
            fixtureDef.restitution = defaultOptions.restitution;
            fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            var points = [
                new Box2D.Common.Math.b2Vec2(0,0),
                new Box2D.Common.Math.b2Vec2(5,0),
                new Box2D.Common.Math.b2Vec2(2.5,2.5)
            ];

            fixtureDef.shape.SetAsArray(points,points.length);
            var body = world.CreateBody(body_def);
            var fixture = body.CreateFixture(fixtureDef);

            box._body = body;
            dust.push(box);
        }
        return dust;
    }

    function makePermissionClickable(perm){

        goog.events.listen(perm,['mousedown','touchstart'],function(e){

            e.swallow(['mouseup','touchend','touchcancel'],function(){
                this.setHidden(true);
                world.DestroyBody(this._body);
            });
        });

    }

    function createFloor(x, y, width, height){
        var floorOptions = {
            'density' : 1.0 ,
            'friction' : 0.5 ,
            'restitution' : 0.2,
            'type' : Box2D.Dynamics.b2BodyDef.b2_staticBody
        };
        return createBox(x, y, width, height, 0, floorOptions);
    }

    function createCarBase(x, y, width, height, length, handle, rotation, options){
        var box = new lime.Polygon().setPoints(0,0, 0, height/2, width/2, height/2, width/2, -length - height/2, width/2 - height ,-length - height/2, width/2 - height, -height/2, -width/2+height , -height/2, -width/2+height, -length- height/2, -width/2-handle, -length- height/2,-width/2-handle, -length+ height/2, -width/2, -length+ height/2, -width/2, height/2, 0, height/2).
            setPosition(100,100).setFill(0, 51, 102);//(94,94,94);

        layer.appendChild(box);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fix_def.shape.SetAsBox( width/2 , height/2 );

        body_def.position.Set(x , y);
        body_def.angle = -rotation / 180 * Math.PI;
        body_def.type = options.type;

        var body = world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    function createCar(x, y, width, height, radius){
        var overAllCar = {bodyParts:[]};

        var length = width/2;
        var handle = 2*height;
        //var carBox = createBox(x, y, width, height, 0, defaultOptions); //x, y, width, height, rotation, options
        var carBox = createCarBase(x, y, width, height, length, handle, 0, defaultOptions);
        overAllCar.bodyParts.push(carBox);
        overAllCar.carBox = carBox;

        var offset = 0;
        //Left Wheel
        var cx = x - (width/2) + offset*width, cy = y + height/2;
        var leftWheelCircle = createWheel(cx, cy, radius, defaultOptions);
        overAllCar.bodyParts.push(leftWheelCircle);

        //Right Wheel
        cx = x + (width/2) - offset*width, cy = y + height/2;
        var rightWheelCircle = createWheel(cx, cy, radius, defaultOptions);
        overAllCar.bodyParts.push(rightWheelCircle);

        //create revolute joint between Left Wheel and Car Lower Body
        var joint_def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        joint_def.bodyA = leftWheelCircle._body;
        joint_def.bodyB = carBox._body;

        //connect the centers - center in local coordinate - relative to body is 0,0
        joint_def.localAnchorA = new Box2D.Common.Math.b2Vec2(0, 0);
        joint_def.localAnchorB = new Box2D.Common.Math.b2Vec2(- ((width/2) - offset*width),  height/2);

        joint_def.maxMotorTorque = 500100.0;
        joint_def.motorSpeed = 0;
        joint_def.enableMotor = true;

        var leftJoint = world.CreateJoint(joint_def);
        overAllCar.leftJoint = leftJoint;

        //create revolute joint between Right Wheel and Car Lower Body
        var joint_def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        joint_def.bodyA = rightWheelCircle._body;
        joint_def.bodyB = carBox._body;

        //connect the centers - center in local coordinate - relative to body is 0,0
        joint_def.localAnchorA = new Box2D.Common.Math.b2Vec2(0, 0);
        joint_def.localAnchorB = new Box2D.Common.Math.b2Vec2(((width/2) - offset*width),  height/2);
        joint_def.maxMotorTorque = 500100.0;
        joint_def.motorSpeed = 0;
        joint_def.enableMotor = true;
        var rightJoint = world.CreateJoint(joint_def);
        overAllCar.rightJoint = rightJoint;


        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.density = defaultOptions.density;
        fixtureDef.friction = defaultOptions.friction;
        fixtureDef.restitution = defaultOptions.restitution;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(-width/2,-length-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2+height,-length-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2+height,-height/2),
            new Box2D.Common.Math.b2Vec2(-width/2,-height/2)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);


        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(width/2-height,-length-height/2),
            new Box2D.Common.Math.b2Vec2(width/2,-length-height/2),
            new Box2D.Common.Math.b2Vec2(width/2,-height/2),
            new Box2D.Common.Math.b2Vec2(width/2-height,-height/2)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);


        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        var points = [
            new Box2D.Common.Math.b2Vec2(-width/2 - handle, -height/2-length),
            new Box2D.Common.Math.b2Vec2(-width/2, -height/2-length),
            new Box2D.Common.Math.b2Vec2(-width/2, -length),
            new Box2D.Common.Math.b2Vec2(-width/2 - handle, -length)
        ];
        fixtureDef.shape.SetAsArray(points,points.length);
        carBox._body.CreateFixture(fixtureDef);
        return overAllCar;
    }

    function createPermissions(width){
        var permCircles = [];

        for (var key in game.perms) {
            var b1= createPermissionBox(goog.math.uniformRandom(1,10)+150, -goog.math.uniformRandom(1,10) + 290, width, 0, defaultOptions, key);
            permCircles.push(b1);
        }
        return permCircles;
    }

    function createWheel(x, y, radius, options){
        /*
        var circle = (new lime.Circle)
            .setFill(new lime.fill.LinearGradient().addColorStop(0.49,200,0,0).addColorStop(.5,0,0,250))
            .setSize(radius*2, radius*2);
        */

        var circle = (new lime.Circle)
            .setFill("imgs/wheel.png")
            .setSize(radius*2, radius*2);

        layer.appendChild(circle);

        var body_def = new Box2D.Dynamics.b2BodyDef();
        var fix_def = new Box2D.Dynamics.b2FixtureDef();

        fix_def.density = options.density;
        fix_def.friction = options.friction;
        fix_def.restitution = options.restitution;

        var shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
        fix_def.shape = shape;

        body_def.position.Set(x , y);
        body_def.linearDamping = 0.5;
        body_def.angularDamping = 0.5;

        body_def.type = options.type;

        var body = world.CreateBody( body_def );
        body.CreateFixture(fix_def);

        circle._body = body; // just a reference, no API logic
        return circle;
    }

    function makeDraggable(shape){ // only use for physics based dragging
        goog.events.listen(shape, ['mousedown', 'touchstart'], function(e){
            var pos = this.localToParent(e.position); //need parent coordinate system
            //var pos = this.localToParent(e.target.getPosition());
            var mouseJointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
            mouseJointDef.bodyA = world.GetGroundBody();
            mouseJointDef.bodyB = shape._body; // using ref created above
            mouseJointDef.target.Set(pos.x, pos.y);
            mouseJointDef.maxForce = 5000 * shape._body.m_mass;
            //mouseJointDef.collideConnected = true;
            //mouseJointDef.dampingRatio = 0;

            var mouseJoint = world.CreateJoint(mouseJointDef);

            e.swallow(['mouseup', 'touchend'], function(e){
                world.DestroyJoint(mouseJoint);
            });
            e.swallow(['mousemove', 'touchmove'], function(e){
                var pos = this.localToParent(e.position);
                mouseJoint.SetTarget(new Box2D.Common.Math.b2Vec2(pos.x, pos.y));
            });
        })
    }

    function updateFromBody(shape){
        var pos = shape._body.GetPosition();
        var rot = shape._body.GetAngle();
        shape.setRotation(-rot / Math.PI * 180);
        shape.setPosition(pos.x, pos.y);
    }

    var groundBox = createFloor(game.WIDTH/2, game.HEIGHT, game.WIDTH, 10).setFill('#8B3E2F'); //(x, y, width, height, rotation)
    var leftGround = createFloor(0,game.HEIGHT/2, 10, game.HEIGHT).setFill('#8B3E2F'); //(x, y, width, height, rotation)
    var rightGround = createFloor(game.WIDTH,game.HEIGHT/2, 10, game.HEIGHT).setFill('#8B3E2F'); //(x, y, width, height, rotation)

    //game.dust = createDustPieces();

    game.car = createCar(150, game.HEIGHT*0.9, 160, 10, 15); //x, y, width, height, radius

    game.perms = createPermissions(22);

    game.perms.forEach(function(element, index, array){
        updateFromBody(element);
    });

    game.car.bodyParts.forEach(function(element, index, array){
        updateFromBody(element);
    });

    game.car.SPEED_LOW = -0.5;
    game.car.SPEED_HIGH = -2;

    game.car.speedUp = function(){
        game.car.leftJoint.SetMotorSpeed(game.car.SPEED_HIGH);
        game.car.rightJoint.SetMotorSpeed(game.car.SPEED_HIGH);
    }

    game.car.speedDown = function(){
        game.car.leftJoint.SetMotorSpeed(game.car.SPEED_LOW);
        game.car.rightJoint.SetMotorSpeed(game.car.SPEED_LOW);
    }

    game.car.stop = function(){
        game.car.leftJoint.SetMotorSpeed(0);
        game.car.rightJoint.SetMotorSpeed(0);
        game.car.leftJoint.EnableMotor(false);
        game.car.rightJoint.EnableMotor(false);
        game.car.leftJoint.SetMaxMotorTorque(-10);
        game.car.rightJoint.SetMaxMotorTorque(-10);
    }

    updateFromBody(groundBox);
    updateFromBody(leftGround);
    updateFromBody(rightGround);
    lime.scheduleManager.schedule(function(dt) {
        if(dt>100) dt=100; // long delays(after pause) cause false collisions
        world.Step(dt / 1000, 8, 3);
        world.ClearForces();
        game.car.bodyParts.forEach(function(element, index, array){
            updateFromBody(element);
        });

        game.perms.forEach(function(element, index, array){
            updateFromBody(element);
        });
/*
        game.dust.forEach(function(element, index, array){
            updateFromBody(element);
        });
*/
    },this);
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('game.start', game.start);