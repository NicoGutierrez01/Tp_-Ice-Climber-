import { Scene } from 'phaser';

export class Start extends Scene
{
    constructor ()
    {
        super('Start');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('#000000');

        const map = this.make.tilemap({ key: 'map3' });
        const bloques    = map.addTilesetImage("bloques",    "bloques");
        const hielo      = map.addTilesetImage("hielo",      "hielo");
        const paredverde = map.addTilesetImage("paredverde", "paredverde");
        const paredmarron= map.addTilesetImage("paredmarron","paredmarron");
        const paredazul  = map.addTilesetImage("paredazul",  "paredazul");
        const numeros    = map.addTilesetImage("numeros",    "numeros");
        const numeros2   = map.addTilesetImage("numeros2",   "numeros2");
        const copos      = map.addTilesetImage("copos",      "copos");
        const copos2     = map.addTilesetImage("copos2",     "copos2");
        const timer      = map.addTilesetImage("timer2",      "timer2");


        map.createLayer("Bloque", bloques, 256, -1300);
        map.createLayer("Hielo", hielo, 256, -1300);
        map.createLayer("ParedVerde",  paredverde, 256, -1300);
        map.createLayer("ParedMarron", paredmarron,256, -1300);
        map.createLayer("ParedAzul",   paredazul,  256, -1300);
        map.createLayer("Numeros",     numeros,    256, -1300);
        map.createLayer("Numeros2",    numeros2,   256, -1300);
        map.createLayer("Copo",        copos,      256, -1300);
        map.createLayer("Copo2",       copos2,     256, -1300);
        map.createLayer("Timer",       timer,      256, -1330);

        this.cameras.main.setZoom(2);
        this.cameras.main.setBounds(0, -10000, 800, 10780);

        this.anims.create({
            key: 'pajaro',
            frames: this.anims.generateFrameNumbers('pajarostart', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        const spriteAnimado = this.add.sprite(512, 700, 'pajarostart');
        spriteAnimado.play('pajaro');

        this.cameras.main.startFollow(spriteAnimado);

        this.musica = this.sound.add('GameStart', { volume: 0.5 });
        this.musica.play();

        this.tweens.add({
            targets: spriteAnimado,
            y: -850,
            duration: 9000,
            ease: 'Power1',
            onComplete: () => {
                this.musica.stop();
                this.scene.start('Game');
            }
        });
    }
}