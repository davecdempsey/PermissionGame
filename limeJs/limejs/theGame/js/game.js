/**
 * Created with JetBrains PhpStorm.
 * User: daviddempsey
 * Date: 2/6/13
 * Time: 4:47 PM
 * To change this template use File | Settings | File Templates.
 */

//set main namespace
goog.provide('game');



//get requirements

goog.require('goog.math');
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.SpriteSheet');
goog.require('lime.Sprite');
goog.require('lime.transitions.Dissolve');



goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.Polygon');

goog.require('Box2D.Common.Math.b2Vec2');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Dynamics.b2Body');
goog.require('Box2D.Dynamics.b2FixtureDef');
goog.require('Box2D.Dynamics.b2Fixture');
goog.require('Box2D.Dynamics.b2World');
goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Collision.Shapes.b2CircleShape');
goog.require('Box2D.Dynamics.Joints.b2MouseJointDef');
goog.require('Box2D.Collision.Shapes.b2MassData');
goog.require('Box2D.Dynamics.Joints.b2RevoluteJointDef');
goog.require('Box2D.Collision.Shapes.b2Shape');
goog.require('Box2D.Collision.b2AABB');



game.size = {
    WIDTH: 1004,
    HEIGHT: 720
};

game.ballSize = {
    S_RADIUS: 12,
    M_RADIUS: 18,
    L_RADIUS: 22

}


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


game.createSplashScreen = function(){

    game.started = false;
    game.inGame = false;
    document.body.style.cursor = "wait";
    var menuScene = new lime.Scene(),

        layer = new lime.Layer().setPosition(game.size.WIDTH * 0.5, game.size.HEIGHT * 0.5),

        background = new lime.Sprite().setSize(game.size.WIDTH,game.size.HEIGHT).setFill('Sprites/bg.png');

    layer.appendChild(background);
    menuScene.appendChild(layer);

    return menuScene;

};


game.menu = function(){

    game.director = new lime.Director(document.body, game.size.WIDTH, game.size.HEIGHT);

    //game.director.setDisplayFPS(false);

    var splashScene = game.createSplashScreen();


    lime.scheduleManager.callAfter(function(dt){

        document.body.style.cursor = "auto";

        var target = new lime.Layer().setPosition(game.size.WIDTH * 0.7,game.size.HEIGHT * 0.9),

            circle = new lime.Circle().setSize(150,150).setFill('#080E73'),
            lbl = new lime.Label().setSize(160,25).setFontSize(30).setText('Start!');


        //add circle and label to target object
        target.appendChild(circle);
        target.appendChild(lbl);

        //add target and title to the menuScene
        splashScene.appendChild(target);


        //add menuScene interaction
        goog.events.listen(target,['mousedown','touchstart'],function(e){

            //animate
            target.runAction(new lime.animation.Spawn(
                new lime.animation.FadeTo(.8).setDuration(.2),
                new lime.animation.ScaleTo(1.5).setDuration(.8)

            ));

            //listen for end event
            e.swallow(['mouseup','touchend'],function(){
                target.runAction(new lime.animation.Sequence(
                    new lime.animation.FadeTo(0),
                    new lime.animation.ScaleTo(.03)
                ));


                lime.scheduleManager.callAfter(function(dt){

                    var gameScene = game.Game();

                    game.director.replaceScene(gameScene, lime.transitions.Dissolve);

                }, game.director, 1500);

            });


        });

    }, game.director, 2000);


    // set current scene active
    game.director.makeMobileWebAppCapable();
    game.director.replaceScene(splashScene);

};


// game.js code


game.Game = function(){

    game.inGame = true;

    game.gameScene = new lime.Scene();

    document.body.style.cursor = "crosshair";

    //Placing Background
    game.background = new lime.Sprite().setPosition(game.size.WIDTH * 0.5,game.size.HEIGHT * 0.5)
        .setSize(game.size.WIDTH, game.size.HEIGHT).setFill('Sprites/game_bg.png').setRenderer(lime.Renderer.CANVAS);


    //Placing Vendor/Vendor Booth
    game.vendorBooth = new lime.Sprite().setAnchorPoint(0.5,0.10).setPosition(game.size.WIDTH *.775,game.size.HEIGHT * 0.115)
        .setSize(260, 290).setFill('Sprites/vendor_booth.png').setRenderer(lime.Renderer.CANVAS);

    game.vendorLayer = new lime.Layer().setPosition(game.size.WIDTH *.785,game.size.HEIGHT * 0.277);
    game.vendorHead = new lime.Sprite().setAnchorPoint(0.5,0.9).setSize(70, 75).setFill('Sprites/vendor_guy.png').setRenderer(lime.Renderer.CANVAS);

    game.vendorLayer.appendChild(this.vendorHead);


    //Creating Deliveryman object
    game.deliverymanLayer = game.Deliveryman();

    //Creating Security Guy object
    game.sec_guy = new game.Player();

    //  box2d

    //setup physics world
    game.setupPhysics();

    //Creating Cart object
    game.cartLayer = game.Cart();

    //Creating Permission objects
    //game.permissionLayer = game.PermissionBalls();

    //Adding all layers and spirtes to scene
    game.gameScene.appendChild(game.background);
    game.gameScene.appendChild(game.vendorLayer);
    game.gameScene.appendChild(game.vendorBooth);
    game.gameScene.appendChild(game.deliverymanLayer);
    game.gameScene.appendChild(game.cartLayer);
    game.gameScene.appendChild(game.sec_guy);
    //game.gameScene.appendChild(game.permissionLayer);
    //game.gameScene.appendChild(game.ground);




    return game.gameScene;

};

game.setupPhysics = function(){

    var bounds = new Box2D.Collision.b2AABB();
    bounds.lowerBound = new Box2D.Common.Math.b2Vec2(-game.size.WIDTH, -game.size.HEIGHT);
    bounds.upperBound = new Box2D.Common.Math.b2Vec2(2*game.size.WIDTH,2*game.size.HEIGHT);

    var gravity = new Box2D.Common.Math.b2Vec2(0, 100.00);
    game.world = new Box2D.Dynamics.b2World(gravity, true);


};

game.cartDeliveryFunction = function(){
    if(game.inGame){
        game.deliverymanLayer.runAction(new lime.animation.MoveTo(game.size.WIDTH * 0.58, game.size.HEIGHT * 0.5).setSpeed(3).setEasing(lime.animation.Easing.LINEAR));
        game.cartLayer.runAction(new lime.animation.MoveTo(game.size.WIDTH * 0.8, game.size.HEIGHT * 0.57 - 45).setSpeed(3).setEasing(lime.animation.Easing.LINEAR));

    }
};


// player.js code
game.Player = function(){

    var sec_guy = new lime.Sprite().setPosition(game.size.WIDTH *.5,game.size.HEIGHT * 0.9).setSize(144, 274).setFill('Sprites/sec_guy.png').setRenderer(lime.Renderer.CANVAS);

    if(game.inGame)
    {
        goog.events.listen(game.gameScene,'mousemove',function(e){

            var pos = game.sec_guy.getPosition();
            game.sec_guy.runAction(new lime.animation.MoveTo(e.position.x, pos.y).setSpeed(1).setEasing(lime.animation.Easing.LINEAR));
        });

        goog.events.listen(game.gameScene,['mouseup','touchend'],function(e){

            var debrisLayer = new lime.Layer().setOpacity(0).setPosition(game.sec_guy.getPosition()).setAnchorPoint(.5,.5),
                debrisSprite = new lime.Sprite().setSize(45,45).setAnchorPoint(.5,.5).setRenderer(lime.Renderer.CANVAS);

            var randomNum = Math.floor((Math.random()*4)+1);

            switch(randomNum){
                case 1:
                    debrisSprite.setFill('Sprites/apple.png');
                    break;
                case 2:
                    debrisSprite.setFill('Sprites/banana.png');
                    break;
                case 3:
                    debrisSprite.setFill('Sprites/banana.png');
                    break;
                case 4:
                    debrisSprite.setFill('Sprites/apple.png');
                    break;
            }

            debrisLayer.appendChild(debrisSprite);
            game.gameScene.removeChild(game.sec_guy);
            game.gameScene.appendChild(debrisLayer);
            game.gameScene.appendChild(game.sec_guy);
            debrisLayer.runAction(game.thrwDbrs(e, debrisLayer, debrisSprite));

        });
    }
    return sec_guy;
};



game.thrwDbrs = function(e, debrisLayer, debrisSprite){
    this.throwDebris = new lime.animation.Spawn(
        new lime.animation.FadeTo(1).setDuration(.2),
        new lime.animation.ScaleTo(.8).setDuration(.8),
        new lime.animation.RotateTo(360),
        new lime.animation.MoveTo(e.position).setEasing(lime.animation.Easing.LINEAR));


    this.throwDebris.addEventListener(lime.animation.Event.STOP, function(e){

        game.checkPermissionCollisions(debrisLayer, debrisSprite);
        game.gameScene.removeChild(debrisLayer);
    });


    return this.throwDebris;
};



// deliveryman.js code

game.Deliveryman = function(){

    //creating deliveryman himself
    this.deliverymanLayer = new lime.Layer().setPosition(game.size.WIDTH * 0.0,game.size.HEIGHT * 0.5);
    this.deliverymanSprite = new lime.Sprite().setSize(180,180).setRenderer(lime.Renderer.CANVAS).setFill('Sprites/fb_guy.png');

    this.deliverymanLayer.appendChild(this.deliverymanSprite);

    return this.deliverymanLayer;
};



// cart.js code

game.Cart = function(){


    /*
     var cartBottom = new createBox(game.cartBottomStartX,game.cartBottomStartY,game.cartBottomSize,10,0,0); // (x, y, width, height, rotation, density)

     var cartLeftSide = new createBox(game.size.WIDTH *0.22 - 95,game.size.HEIGHT * 0.57 - 70,150,10,-75,0);

     var cartRightSide = new createBox(game.size.WIDTH *0.22 + 155,game.size.HEIGHT * 0.57 - 70,150,10,75,0);

     */

    //creating the cart object
    game.cartLayer = new lime.Layer();
    game.cartBottomSize = 160;
    game.cartBottomStartX = 150;
    game.cartBottomStartY = game.size.HEIGHT*0.9;


    var layer = new lime.Layer;
    layer.setPosition(0, 0);

    var defaultOptions = {
        'density' : 0.5,
        'friction' : 0.5 ,
        'restitution' : 0.5,
        'type' : Box2D.Dynamics.b2BodyDef.b2_dynamicBody
    };


    function createBox (x, y, width, height, rotation, options){
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

        var body = game.world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    function createFloor(x, y, width, height){
        var floorOptions = {
            'density' : 1.0 ,
            'friction' : 0.5 ,
            'restitution' : 0.2,
            'type' : Box2D.Dynamics.b2Body.b2_staticBody
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

        var body = game.world.CreateBody(body_def);
        var fixture = body.CreateFixture(fix_def);

        box._body = body;
        return box;
    }

    function createCar(x, y, width, height, radius){
        var overAllCar = {bodyParts:[]};

        var length = width/2;
        var handle = 2*height;
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

        var leftJoint = game.world.CreateJoint(joint_def);
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

        var rightJoint = game.world.CreateJoint(joint_def);
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

    function createWheel(x, y, radius, options){
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

        var body = game.world.CreateBody( body_def );
        body.CreateFixture(fix_def);

        circle._body = body; // just a reference, no API logic
        return circle;
    }

    game.groundBox = createFloor(game.size.WIDTH *0.5,game.size.HEIGHT * 0.63,game.size.WIDTH,10).setFill('#8B3E2F'); //(x, y, width, height, rotation)
    game.leftGround = createFloor(0,game.size.HEIGHT/2, 10, game.size.HEIGHT).setFill('#8B3E2F'); //(x, y, width, height, rotation)
    game.rightGround = createFloor(game.size.WIDTH,game.size.HEIGHT/2, 10, game.size.HEIGHT).setFill('#8B3E2F'); //(x, y, width, height, rotation)


    game.car = createCar(155, game.size.HEIGHT * 0.59, 200, 10, 15); //x, y, width, height, radius

    game.car.bodyParts.forEach(function(element, index, array){
        game.updateFromBody(element);
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



    game.updateFromBody(game.groundBox);
    game.updateFromBody(game.leftGround);
    game.updateFromBody(game.rightGround);

    lime.scheduleManager.schedule(function(dt) {
        if(dt>100) dt=100; // long delays(after pause) cause false collisions
        game.world.Step(dt / 1000, 8, 3);
        game.world.ClearForces();

        game.car.bodyParts.forEach(function(element, index, array){
            game.updateFromBody(element);
        });

        game.updateFromBody(game.groundBox);
        game.updateFromBody(game.leftGround);
        game.updateFromBody(game.rightGround);

    },this);


    return layer;
};




// permissionObjects.js code
game.PermissionBalls = function(){
    var ballLayer = new lime.Layer();
    game.cartBottomStartY = game.size.HEIGHT * 0.57;

    game.startingPoint = game.cartBottomStartY - 280;

    var nameBall = new permissionObject(0, true, getRandom(), game.startingPoint), //(securityId, basic, x, y)
        genderBall = new permissionObject(2, true, getRandom(), game.startingPoint),
        profilePicture = new permissionObject(1, true, getRandom(), game.startingPoint),
        network = new permissionObject(28, true, getRandom(), game.startingPoint),
        friends = new permissionObject(29, true, getRandom(), game.startingPoint),
        userIDBall = new permissionObject(3, true, getRandom(), game.startingPoint),
        emailBall = new permissionObject(4, true, getRandom(), game.startingPoint),
        birthdayBall = new permissionObject(23, true, getRandom(), game.startingPoint),
        likesBall = new permissionObject(5, true, getRandom(), game.startingPoint),
        location = new permissionObject(6, true, getRandom(), game.startingPoint),
        relationship = new permissionObject(7,true, getRandom(), game.startingPoint),
        checkins = new permissionObject(8, true, getRandom(), game.startingPoint),
        events = new permissionObject(9, true, getRandom(), game.startingPoint),
        photosBall = new permissionObject(10, true, getRandom(), game.startingPoint),
        statusupdates = new permissionObject(11, true, getRandom(), game.startingPoint),
        friendsBDayBall = new permissionObject(12,true, getRandom(), game.startingPoint),
        friendsLikesBall = new permissionObject(13, true, getRandom(), game.startingPoint),
        friendsLocations = new permissionObject(14, true, getRandom(), game.startingPoint),
        friendsWork = new permissionObject(15, true, getRandom(), game.startingPoint),
        storiesSharedCheckins = new permissionObject(16, true, getRandom(), game.startingPoint),
        storiesSharedEvents = new permissionObject(17, true, getRandom(), game.startingPoint),
        storiesSharedPhotos = new permissionObject(18, true, getRandom(), game.startingPoint),
        storiesSharedStatusUpdates = new permissionObject(19, true, getRandom(), game.startingPoint),

        postBall = new permissionObject(20, false, getRandom(), game.startingPoint),
        accessPosts = new permissionObject(21, false, getRandom(), game.startingPoint),
        accessCustomFriendsList = new permissionObject(22, false, getRandom(), game.startingPoint);



    game.firstFall = true;
    var i = 0;
    var startCart = false;

    game.ballLayer = new lime.Layer();
    game.ballLayer = ballLayer;

    game.position = [];


    while(i < ballLayer.getNumberOfChildren()){
        new droppingInCart(ballLayer.getChildAt(i++));

    }

    function droppingInCart(child)
    {
        var duration = (ballLayer.getChildIndex(child) + 1);
        var permissionCount = ballLayer.getNumberOfChildren();

        var show = new lime.animation.FadeTo(1).setDuration(2);

        if(!(child == null)){

            lime.scheduleManager.callAfter(function(dt){
                child.runAction(show);
            }, game.director, (duration * 2 * 300));

            goog.events.listen(show, lime.animation.Event.STOP, function() {


                new game.addBox2D(child);

                if(game.firstFall){
                    lime.scheduleManager.schedule(function(dt){
                        if(dt>100) dt=100; // long delays(after pause) cause false collisions
                        game.world.Step(dt / 1000, 8, 3);
                        game.world.ClearForces();

                        game.car.bodyParts.forEach(function(element, index, array){
                            game.updateFromBody(element);
                        });

                        game.updateFromBody(game.groundBox);
                        game.updateFromBody(game.leftGround);
                        game.updateFromBody(game.rightGround);

                        game.number = game.world.GetBodyCount();

                        for(var i = 0; i < game.world.GetBodyCount() - game.car.bodyParts.length - 4; i++)
                        {

                            game.updateFromBody(ballLayer.getChildAt(i));

                        }
                    },this);
                    game.firstFall = false;
                }


            });


        }

    }
    

    
    function permissionObject (securityId, basic, x, y)
    {
        this.basic = basic;
        this.accepted = true;

        switch(securityId){
            // basic info (name)
            case 0:
                this.size = 1;
                this.icon = 'name.png';
                break;
            // basic info (profile picture)
            case 1:
                this.size = 1;
                this.icon = 'profilePic.png';
                break;
            // basic info (gender)
            case 2:
                this.size = 1;
                this.icon = 'gender.png';
                break;
            // basic info (UserID)
            case 3:
                this.size = 1;
                this.icon = 'userId.png';
                break;
            // Email address
            case 4:
                this.size = 2;
                this.icon = 'email.png';
                break;
            // Likes
            case 5:
                this.size = 2;
                this.icon = 'likes.png';
                break;
            // Location
            case 6:
                this.size = 2;
                this.icon = 'location.png';
                break;
            // Relationship status
            case 7:
                this.size = 2;
                this.icon = 'relationship.png';
                break;
            // Check-ins
            case 8:
                this.size = 3;
                this.icon = 'checkIns.png';
                break;
            // Events;
            case 9:
                this.size = 3;
                this.icon = 'events.png';
                break;
            // Photos
            case 10:
                this.size = 3;
                this.icon = 'photos.png';
                break;
            // Status Updates
            case 11:
                this.size = 3;
                this.icon = 'statusUpdates.png';
                break;
            // Friend's Birthdays
            case 12:
                this.size = 2;
                this.icon = 'fBirtday.png';
                break;
            // Friends Likes
            case 13:
                this.size = 2;
                this.icon = 'fLikes.png';
                break;
            // Friends Locations
            case 14:
                this.size = 2;
                this.icon = 'fLocations.png';
                break;
            // Friends work histories
            case 15:
                this.size = 2;
                this.icon = 'fWork.png';
                break;
            // Stories shared with you (check-ins)
            case 16:
                this.size = 3;
                this.icon = 'sCheckIns.png';
                break;
            // Stories shared with you (events)
            case 17:
                this.size = 3;
                this.icon = 'sEvents.png';
                break;
            // Stories shared with you (photos)
            case 18:
                this.size = 3;
                this.icon = 'sPhotos.png';
                break;
            // Stories shared with you (status updates)
            case 19:
                this.size = 3;
                this.icon = 'sStatusUpdates.png';
                break;
            // Post on your behalf
            case 20:
                this.size = 3;
                this.icon = 'post.png';
                break;
            // Access posts in your news feed
            case 21:
                this.size = 3;
                this.icon = 'newsFeedPosts.png';
                break;
            // Access your custom friends list
            case 22:
                this.size = 2;
                this.icon = 'customF.png';
                break;
            // Your Birthday
            case 23:
                this.size = 2;
                this.icon = 'birthday.png';
                break;
            // Your Videos
            case 24:
                this.size = 3;
                this.icon = 'video.png';
                break;
            // Your Description
            case 25:
                this.size = 2;
                this.icon = 'description.png';
                break;
            // Your Education
            case 26:
                this.size = 2;
                this.icon = 'education.png';
                break;
            // Your Work
            case 27:
                this.size = 2;
                this.icon = 'work.png';
                break;
            // basic info (Network)
            case 28:
                this.size = 1;
                this.icon = 'network.png';
                break;
            // basic info (list of friends)
            case 29:
                this.size = 1;
                this.icon = 'listOfFriends.png';
                break;
            // Friends Videos
            case 30:
                this.size = 2;
                this.icon = 'fVideos.png';
                break;
            // Friends Status Updates
            case 31:
                this.size = 2;
                this.icon = 'fStatusUpdtates.png';
                break;
            // Friends education
            case 32:
                this.size = 2;
                this.icon = 'fEducation.png';
                break;
            // Friends Relationship status
            case 33:
                this.size = 2;
                this.icon = 'fRelationship.png';
                break;
            // Friends Description
            case 34:
                this.size = 2;
                this.icon = 'fDescription.png';
                break;
        }

        var color;

        if(basic){
            color = '#ccc';
        }
        else{
            color = '#FF0000';
        }

        var radius = getSize(this.size);

        // lime object
        var circle = (new lime.Circle).setFill(color).setSize(radius*2, radius*2);
        circle.setPosition(x,y);
        circle.setOpacity(0).setRenderer(lime.Renderer.CANVAS);
        ballLayer.appendChild(circle);

        function getSize(size){
            switch(size){
                case 1:
                    return game.ballSize.S_RADIUS;
                    break;
                case 2:
                    return game.ballSize.M_RADIUS;
                    break;
                case 3:
                    return game.ballSize.L_RADIUS;
                    break;
                default:
                    return game.ballSize.L_RADIUS;
            }
        }

        return circle;
    }

    function getRandom(){
        var randomNumber = goog.math.randomInt(game.cartBottomSize - game.ballSize.L_RADIUS) + game.cartBottomStartX - (game.cartBottomSize / 2) + game.ballSize.L_RADIUS;

        return randomNumber;
    }

    return ballLayer;

};



// adding box2d object to the lime object
game.addBox2D = function(circle){
    var x = circle.getPosition().x;
    var y = circle.getPosition().y;
    var radius = circle.getSize().width/2;

    // box2d object
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    var fixDef = new Box2D.Dynamics.b2FixtureDef();

    fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
    fixDef.density = 1.0;
    fixDef.restitution = 0.5;
    fixDef.friction = 1;

    bodyDef.angularDamping = 0.5;
    bodyDef.position.Set(x, y);
    bodyDef.type = Box2D.Dynamics.b2BodyDef.b2_dynamicBody;

    var body = game.world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);
    circle._body = body; // just a reference, no API logic

};


// mapping the lime object to the box2d object
game.updateFromBody = function(shape){
    var pos = shape._body.GetPosition();
    var rot = shape._body.GetAngle();
    shape.setRotation(-rot / Math.PI * 180);
    shape.setPosition(pos.x, pos.y);
}



//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('game.menu', game.menu);
