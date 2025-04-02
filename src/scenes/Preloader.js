import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        this.load.image('suelo', 'suelo.png');
        this.load.image('paredverderight', 'paredverderight.png');
        this.load.image('paredverdeleft', 'paredverdeleft.png');
        this.load.image('paredmarronleft', 'paredmarronleft.png');
        this.load.image('paredmarronright', 'paredmarronright.png');
        this.load.image('paredazulleft', 'paredazulleft.png');
        this.load.image('paredazulright', 'paredazulright.png');
        this.load.image('1', '1.png');
        this.load.image('2', '2.png');
        this.load.image('3', '3.png');
        this.load.image('4', '4.png');
        this.load.image('5', '5.png');
        this.load.image('6', '6.png');
        this.load.image('7', '7.png');
        this.load.image('8', '8.png');
        this.load.image('bloqueverde2', 'bloqueverde2.png');
        this.load.image('bloqueazul2', 'bloqueazul2.png');
        this.load.image('bloquemarro2', 'bloquemarro2.png');


        this.load.spritesheet('player', 'player.png', {
            frameWidth: 31,
            frameHeight: 40
        });

        this.load.spritesheet('bloqueverde', 'bloqueverde.png', {
            frameWidth: 96,
            frameHeight: 16
        });
        this.load.spritesheet('bloqueazul', 'bloqueazul.png', {
            frameWidth: 96,
            frameHeight: 16
        }); 
        this.load.spritesheet('bloquemarro', 'bloquemarro.png', {
            frameWidth: 96,
            frameHeight: 16 
           });
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
