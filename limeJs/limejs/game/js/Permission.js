/**
 * Created with JetBrains PhpStorm.
 * User: mshehab
 * Date: 3/5/13
 * Time: 9:47 AM
 * To change this template use File | Settings | File Templates.
 */
goog.provide('game.Permission');


goog.require('Box2D.Collision.Shapes.b2PolygonShape');
goog.require('Box2D.Dynamics.b2BodyDef');
goog.require('Box2D.Dynamics.b2FixtureDef');

game.Permission.perms = {
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


game.Permission = function(perm, layer, world){
    this.permission = perm;
    this.permission_photo = game.Permission.perms[perm] || "";
    this.layer = layer;
    this.world = world;
}


game.Permission.createBox = function (x, y, width, rotation, options){
    var box = (new lime.Sprite)
        .setFill(this.permission_photo)
        .setSize(width, width);
    this.layer.appendChild(box);

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

    var body = this.world.CreateBody(body_def);
    var fixture = body.CreateFixture(fix_def);

    this.body = body;
    this.box = box;

    box._body = body;
    box._permission = this;
    return box;
}