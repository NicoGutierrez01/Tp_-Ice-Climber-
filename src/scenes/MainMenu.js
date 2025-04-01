import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.image(512, 300, 'logo').setScale(0.2);

        const buttonplayer1 =this.add.text(512, 460, '1 player game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonplayer2 =this.add.text(512, 500, '2 player game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonplayer1.setInteractive();
        buttonplayer2.setInteractive();

        buttonplayer1.on('pointerdown', () => {

            this.scene.start('Game');

        });

        buttonplayer2.on('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
