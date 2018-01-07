/*

stream-countdown-overlay : Countdown Overlay for Twitch Streams

Copyright (c) 2018 Queued Pixel <git@queuedpixel.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var width  = 4800;
var height = 2700;

var game;
var helloText;
var fpsText;

function start()
{
    game = new Phaser.Game( width, height, Phaser.AUTO, "", { preload: preload, create: create, update: update } );
};

function preload()
{
    window.onresize = resize;
};

function create()
{
    resize();

    game.time.advancedTiming = true;
    game.stage.disableVisibilityChange = true;

    var textProperties = { font: "500px Sans", fill: "#FFFFFF" };
    helloText = game.add.text( width / 2, height / 2, "Hello World", textProperties );
    helloText.anchor.set( 0.5, 0.5 );
    game.add.tween( helloText.scale ).to( { x: 0.9, y: 0.9 }, 1000, "Sine.easeInOut", true, 0, -1, true );

    textProperties = { font: "100px Monospace", fill: "#FFFFFF" };
    fpsText = game.add.text( 50, 50, null, textProperties );
    fpsText.anchor.set( 0, 0 );
};

function update()
{
    fpsText.text = game.time.fps;
};

function resize()
{
    game.scale.setGameSize( window.innerWidth, window.innerHeight );
    game.scale = new Phaser.ScaleManager( game, width, height );
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
};
