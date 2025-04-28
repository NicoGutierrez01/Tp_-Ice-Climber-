import { Scene } from 'phaser';
import { InputManager } from '../components/InputManager';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {   
        this.music = this.sound.add('StageSelect', { volume: 0.5 });
        this.music.play();
        this.cameras.main.setBackgroundColor("000000");
        this.add.image(512, 200, 'logo').setScale(1.5);
        this.add.image(420, 701, '1984').setScale(1.2);
        this.add.image(552, 700, 'nintendo').setScale(1.2);
        this.add.image(300, 400, 'martillo').setScale(1.5);

        const buttonplayer1 =this.add.text(512, 400, '1 PLAYER GAME', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(512, 460, '2 PLAYER GAME', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonplayer1.setInteractive();

        buttonplayer1.on('pointerdown', () => {
            this.music.stop();
            this.scene.start('Start');

        });

        this.input.gamepad.once('connected', (pad) => {
            this.pad = pad;
        });
    }

    update () {
        if (this.pad)
        {
            // El botón X en la mayoría de los joysticks es el botón 2
            if (this.pad.buttons[0].pressed)
            {
                this.music.stop();
                this.scene.start('Start');
            }
        }
    }
}
