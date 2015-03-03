/**
 * Created with JetBrains PhpStorm.
 * User: daviddempsey
 * Date: 2/8/13
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */


//set main namespace
goog.provide('fb_game.Player');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');

fb_game.Player = function(){

    lime.Sprite.call(this);

    this..setPosition(fb_game.size.WIDTH *.5,fb_game.size.HEIGHT * 0.9).setSize(144, 274).setFill('Sprites/sec_guy.png').setRenderer(lime.Renderer.CANVAS);

};

goog.inherits(fb_game.Player, lime.Sprite);

fb_game.Player.prototype.followCursor = function (){

};