/**
 * WebGL stencil shadow demo
 *
 * Copyright:
 * Arno van der Vegt, 2011
 *
 * Contact:
 * legoasimo@gmail.com
 *
 * Licence:
 * Creative Commons Attribution/Share-Alike license
 * http://creativecommons.org/licenses/by-sa/3.0/
 *
 * The WebGL setup code was provided by: http://learningwebgl.com
**/
class Demo extends Engine {
    constructor() {
        super();
        let renderer = this._renderer;
        let floorTexture = new FloorTexture({ renderer: renderer });
        let waterTexture = new WaterTexture({ renderer: renderer });
        let pineTreeTexture = new PineTreeTexture({ renderer: renderer });
        let boxTexture = new BoxTexture({ renderer: renderer });
        let starTexture = new StarTexture({ renderer: renderer });
        this._fontCharacters = new FontCharacters({ renderer: renderer, texture: new Texture({ renderer: renderer, src: 'images/font.png' }) });
        this
            .addShape(new Floor({ renderer: renderer, mode: MODE_TEXTURE_PHONG, texture: floorTexture, sizeX: 40, sizeY: 1, sizeZ: 40 }), false)
            .addShape(new Water({ renderer: renderer, mode: MODE_TEXTURE_ALPHA, texture: waterTexture, sizeX: 40, sizeY: 1, sizeZ: 40 }), false)
            .addShape(new PineTree({ renderer: renderer, mode: MODE_TEXTURE_FLAT, texture: pineTreeTexture, sizeX: 2, sizeY: 10, sizeZ: 2 }), true)
            .addShape(new PineTree({ renderer: renderer, mode: MODE_TEXTURE_FLAT, texture: pineTreeTexture, sizeX: 2.5, sizeY: 12, sizeZ: 2.5 }), true)
            .addShape(new PineTree({ renderer: renderer, mode: MODE_TEXTURE_FLAT, texture: pineTreeTexture, sizeX: 1.5, sizeY: 8, sizeZ: 1.5 }), true)
            .addShape(new Box({ renderer: renderer, mode: MODE_TEXTURE_FLAT, texture: boxTexture, sizeX: 2, sizeY: 2, sizeZ: 2 }), true)
            .addShape(new Star({ renderer: renderer, mode: MODE_TEXTURE_FLAT, texture: starTexture, sizeX: 1, sizeY: 1, sizeZ: 0.25 }), true);
    }
    ;
    /**
     * Render all objects and their shadows...
    **/
    render() {
        let a = Date.now() / -400;
        this._shapeInstances.push({ shape: 1, location: [0.0, 0.0, 0.0], angle: [0, 0, 0], alpha: 0.5 }, { shape: 0, location: [0.0, 0.0, 0.0], angle: [0, 0, 0], alpha: 1.0 }, { shape: 2, location: [1.0, 1.5, 2.0], angle: [0, 0, 0], alpha: 1.0 }, { shape: 2, location: [3.0, 1.5, -2.0], angle: [0, 0, 0], alpha: 1.0 }, { shape: 3, location: [-2.0, 1.5, 3.0], angle: [0, 0, 0], alpha: 1.0 }, { shape: 4, location: [-1.0, 1.5, -2.0], angle: [0, 0, 0], alpha: 1.0 }, { shape: 5, location: [4.0, 1.5, 3.0], angle: [0, 1, 0], alpha: 1.0 }, { shape: 5, location: [-4.5, 1.5, 4.0], angle: [0, 2, 0], alpha: 1.0 }, { shape: 6, location: [-4.0, 5.0, -3.0], angle: [0, a, 0], alpha: 1.0 });
        super.render();
        this._fontCharacters
            .setHAlign(FONT_HALIGN_CENTER)
            .setVAlign(FONT_VALIGN_CENTER)
            .setScaleX(0.5)
            .setScaleY(0.5)
            .render(50, 12.5, 'SHADOW DEMO');
    }
    ;
    updateCamera() {
        let worldAngle = Date.now() / 100;
        let lightAngle = Date.now() / 2000;
        let mvMatrix = this._renderer.identity();
        mat4.translate(mvMatrix, mvMatrix, [0, -8, -this._zoom]);
        mat4.rotateX(mvMatrix, mvMatrix, 0.4);
        mat4.rotateY(mvMatrix, mvMatrix, worldAngle * 0.01);
        this._light.update(lightAngle);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new Demo();
});
