import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor("000000");
        this.add.image(512, 300, 'logo').setScale(0.2);

        const buttonplayer1 =this.add.text(512, 460, '1 player game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(512, 520, '2 player game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonplayer1.setInteractive();

        buttonplayer1.on('pointerdown', () => {

            this.scene.start('Nivel2');

        });

    }
}
