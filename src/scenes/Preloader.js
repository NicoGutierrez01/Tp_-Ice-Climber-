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
        this.cameras.main.setBackgroundColor("000000");

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
        this.load.image('bloques', 'bloques.png');

        this.load.image('vidas', 'Vidas.png');

        this.load.image('hielo', 'hielo.png');

        this.load.image('copos', 'copos.png');
        this.load.image('copos2', 'copos2.png');

        this.load.image('paredverde', 'paredverde.png');
        this.load.image('paredverdes', 'paredverdes.png');
        this.load.image('paredmarron', 'paredmarron.png');
        this.load.image('marronbonus', 'marronbonus.png');
        this.load.image('paredazul', 'paredazul.png');

        this.load.image('numeros', 'numeros.png');
        this.load.image('numeros2', 'numeros2.png');

        this.load.image('nubecorta', 'NubeCorta.png');
        this.load.image('nubemedia', 'NubeMedia.png');
        this.load.image('nubelarga', 'NubeLarga.png');

        this.load.image('bloqueverde', 'BloqueVerde.png');
        this.load.image('bloquemarron', 'BloqueMarron.png');
        this.load.image('bloqueazul', 'BloqueAzul.png');
        this.load.image('bloqueverdechico', 'BloqueVerdeChico.png')
        this.load.image('bloquemarronchico', 'BloqueMarronChico.png')
        this.load.image('bloqueazulchico', 'BloqueAzulChico.png')

        this.load.image('berenjena', 'Berenjena.png');
        this.load.image('zanahoria', 'Zanahoria.png');

        this.load.tilemapTiledJSON('map', 'Nivel1.json');
        this.load.tilemapTiledJSON('map2', 'Nivel2.json');

        this.load.image('logo', 'logo.png');


        this.load.image('nubelarga', 'nubelarga.png');


        this.load.spritesheet('player', 'Player.png', {
            frameWidth: 43,
            frameHeight: 53
        });
        
        this.load.spritesheet('bloqueverdechicoanim', 'BloqueVerdeChicoAnim.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('bloquemarronchicoanim', 'BloqueMarronChicoAnim.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('bloqueazulchicoanim', 'BloqueAzulChicoAnim.png', {
            frameWidth: 16,
            frameHeight: 16
          });

        this.load.spritesheet('bloqueverdeanim', 'BloqueVerdeAnim.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('bloquemarronanim', 'BloqueMarronAnim.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('bloqueazulanim', 'BloqueAzulAnim.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('yeti', 'yeti.png', {
            frameWidth: 32,
            frameHeight: 30
        });

        this.load.spritesheet('pajaroenemigo', 'Pajaro2.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('pajarobonus', 'PajaroBonus.png', {
            frameWidth: 64,
            frameHeight: 32
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