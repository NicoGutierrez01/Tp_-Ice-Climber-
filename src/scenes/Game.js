import { Scene } from 'phaser';
import { PajaroBonus } from '../objetos/PajarosBonus';
import { Nubes } from '../objetos/Nubes';
import { HileraBloques } from '../objetos/HileraBloques';
import { Yeti } from '../objetos/Yeti';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor("000000");
        const screenW = this.scale.width;

        this.scenePaused = false;

        this.bonusActive = false;
        this.bonusTimeLeft = 40000;
        this.bonusStartTime = 0;
        this.bonusTimer = null;

        const map = this.make.tilemap({ key: 'map' });
        const bloques    = map.addTilesetImage("bloques",    "bloques");
        const hielo      = map.addTilesetImage("hielo",      "hielo");
        const paredverde = map.addTilesetImage("paredverde", "paredverde");
        const paredverdes= map.addTilesetImage("paredverdes","paredverdes");
        const paredmarron= map.addTilesetImage("paredmarron","paredmarron");
        const paredazul  = map.addTilesetImage("paredazul",  "paredazul");
        const numeros    = map.addTilesetImage("numeros",    "numeros");
        const numeros2   = map.addTilesetImage("numeros2",   "numeros2");
        const copos      = map.addTilesetImage("copos",      "copos");
        const copos2     = map.addTilesetImage("copos2",     "copos2");



        const hielos = map.createLayer("Hielo", hielo, 256, -1300);
        hielos.setCollisionByProperty({ colision: true });

        this.plataformas = map.createLayer("Bloque", bloques, 256, -1300);
        this.plataformas.setCollisionByProperty({ colision: true });

        this.player = this.physics.add.sprite(512, 730, 'player').setScale(0.9);
        this.physics.add.collider(this.player, this.plataformas);
        this.physics.add.collider(this.player, hielos);

        Nubes(this, -175);
        Nubes(this, -430);

        this.anims.create({
            key: 'pajaro',
            frames: this.anims.generateFrameNumbers('pajarobonus', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        PajaroBonus(this, -880); 

        this.bloques = [];

        const hileras = [
            { x: 328, y: 660, cantidad: 24, tipo: 'bloqueverde' },
            { x: 328, y: 676, cantidad: 5, tipo: 'bloqueverde' },
            { x: 456, y: 676, cantidad: 2, tipo: 'bloqueverde' },
            { x: 552, y: 676, cantidad: 3, tipo: 'bloqueverde' },
            { x: 648, y: 676, cantidad: 3, tipo: 'bloqueverde' },
            { x: 440, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 408, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 488, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 536, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 600, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 632, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },
            { x: 696, y: 672, cantidad: 1, tipo: 'bloqueverdechico' },

            { x: 344, y: 372, cantidad: 22, tipo: 'bloquemarron' },
            { x: 344, y: 388, cantidad: 1, tipo: 'bloquemarron' },
            { x: 424, y: 388, cantidad: 3, tipo: 'bloquemarron' },
            { x: 520, y: 388, cantidad: 3, tipo: 'bloquemarron' },
            { x: 648, y: 388, cantidad: 3, tipo: 'bloquemarron' },
            { x: 360, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 408, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 472, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 504, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 568, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 632, y: 384, cantidad: 1, tipo: 'bloquemarronchico' },

            { x: 344, y: 468, cantidad: 22, tipo: 'bloquemarron' },
            { x: 360, y: 484, cantidad: 3, tipo: 'bloquemarron' },
            { x: 456, y: 484, cantidad: 2, tipo: 'bloquemarron' },
            { x: 552, y: 484, cantidad: 5, tipo: 'bloquemarron' },
            { x: 344, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},
            { x: 408, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},
            { x: 440, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},
            { x: 488, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},
            { x: 536, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},
            { x: 632, y: 480, cantidad: 1, tipo: 'bloquemarronchico'},

            { x: 344, y: 564, cantidad: 22, tipo: 'bloquemarron' },  
            { x: 392, y: 580, cantidad: 6, tipo: 'bloquemarron' },
            { x: 552, y: 580, cantidad: 7, tipo: 'bloquemarron' },
            { x: 376, y: 576, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 536, y: 576, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 664, y: 576, cantidad: 1, tipo: 'bloquemarronchico' },
            { x: 488, y: 576, cantidad: 1, tipo: 'bloquemarronchico' },

            { x: 360, y: 276, cantidad: 20, tipo: 'bloqueazul' },
            { x: 424, y: 292, cantidad: 1, tipo: 'bloqueazul' },
            { x: 488, y: 292, cantidad: 8, tipo: 'bloqueazul' },
            { x: 664, y: 292, cantidad: 1, tipo: 'bloqueazul' },
            { x: 360, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 408, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 440, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 472, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 616, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 648, y: 288, cantidad: 1, tipo: 'bloqueazulchico' },

            { x: 360, y: 180, cantidad: 20, tipo: 'bloqueazul' },
            { x: 424, y: 196, cantidad: 4, tipo: 'bloqueazul' },
            { x: 536, y: 196, cantidad: 2, tipo: 'bloqueazul' },
            { x: 616, y: 196, cantidad: 4, tipo: 'bloqueazul' },
            { x: 360, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 408, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 488, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 520, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 568, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 600, y: 192, cantidad: 1, tipo: 'bloqueazulchico' },

            { x: 360, y: 84, cantidad: 20, tipo: 'bloqueazul' },
            { x: 424, y: 100, cantidad: 1, tipo: 'bloqueazul' },
            { x: 488, y: 100, cantidad: 8, tipo: 'bloqueazul' },
            { x: 664, y: 100, cantidad: 1, tipo: 'bloqueazul' },
            { x: 360, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 408, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 440, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 472, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 616, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
            { x: 648, y: 96, cantidad: 1, tipo: 'bloqueazulchico' },
        ];

        hileras.forEach(({ x, y, cantidad, tipo, espaciado }) => {
            const hilera = espaciado !== undefined
                ? HileraBloques(this, x, y, cantidad, tipo, espaciado)
                : HileraBloques(this, x, y, cantidad, tipo);
        
            hilera.forEach(bloque => {
                bloque.body.setAllowGravity(false);
                bloque.setData('tipo', tipo);
                this.physics.add.collider(this.player, bloque);
                this.bloques.push(bloque);
            });
        });

        this.hileras = hileras;

        this.anims.create({
            key: 'yeti-walk',
            frames: this.anims.generateFrameNumbers('yeti', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
          });

          const spawnPoints = [
            { x: 750, y: 620 },
            { x: 250, y: 332 },
            { x: 750, y: 328 },
            { x: 250, y: 524 },
            { x: 750, y: 236 },
            { x: 750, y: 140 },
            { x: 250, y: 44 },
          ];
          
        this.yetiManager = new Yeti(this, spawnPoints, 1024, 224, 800);
        this.yetiManager.spawnYetis();
        
        map.createLayer("ParedVerde",  paredverde, 256, -1300);
        map.createLayer("ParedVerdes", paredverdes,256, -1300);
        map.createLayer("ParedMarron", paredmarron,256, -1300);
        map.createLayer("ParedAzul",   paredazul,  256, -1300);
        map.createLayer("Numeros",     numeros,    256, -1300);
        map.createLayer("Numeros2",    numeros2,   256, -1300);
        map.createLayer("Copo",        copos,      256, -1300);
        map.createLayer("Copo2",       copos2,     256, -1300);
        
        this.cameras.main.setZoom(2);
        this.cameras.main.setBounds(0, -10000, 800, 10780);

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.F,
            attack2: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 11 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 25
        });

        ['bloqueverde','bloqueazul','bloquemarron'].forEach(color => {
            this.anims.create({
              key: `${color}-break`,            
              frames: this.anims.generateFrameNumbers(`${color}anim`, { start: 0, end: 5 }),
              frameRate: 10,
              hideOnComplete: true
            });
        });

        ['bloqueverdechico','bloquemarronchico', 'bloqueazulchico'].forEach(color => {
            this.anims.create({
              key: `${color}-break`,            
              frames: this.anims.generateFrameNumbers(`${color}anim`, { start: 0, end: 5 }),
              frameRate: 10,
              hideOnComplete: true
            });
        });

        this.isAttacking = false;
        this.player.on('animationcomplete', anim => {
            if (anim.key === 'attack' || anim.key === 'attack2') {
                this.isAttacking = false;
            }
        });

        this.keys.attack.on('down', () => {
            if (!this.isAttacking) {
                this.isAttacking = true;
                this.player.setVelocityX(0);
                this.player.anims.play('attack', true);
            }
        });

        this.keys.attack2.on('down', () => {
            const onFloor = this.player.body.onFloor();
            if (!onFloor && !this.isAttacking) {
                this.isAttacking = true;
                this.player.setVelocityX(0);
                this.player.anims.play('attack2', true);
        
                let bloqueCercano = null;
                let menorDistancia = Infinity;
        
                this.bloques.forEach(bloque => {
                    const distancia = Phaser.Math.Distance.Between(this.player.x, this.player.y, bloque.x, bloque.y);
                    const cerca = distancia < 40;
        
                    const direccionCorrecta = this.player.flipX
                        ? bloque.x < this.player.x
                        : bloque.x > this.player.x;
        
                    if (cerca && direccionCorrecta && bloque.getData('rompible') && distancia < menorDistancia) {
                        menorDistancia = distancia;
                        bloqueCercano = bloque;
                    }
                });
        
                if (bloqueCercano) {
                    const tipo = bloqueCercano.getData('tipo');      
                    const x = bloqueCercano.x;
                    const y = bloqueCercano.y;
                
                    bloqueCercano.destroy();
                
                    const fx = this.add.sprite(x, y, `${tipo}anim`);
                    fx.play(`${tipo}-break`);
                    fx.once('animationcomplete', () => fx.destroy());
                  }
            }
        });
        
        this.isJumping = false;
        this.jumpKeyDown = false;

        this.maxReachedY = this.player.y - this.cameras.main.height / 2;

        this.bonusText = this.add.text(0, 0, '', {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.bonusText.setVisible(false);

        this.bonusText.setDepth(1000);
    }

    activateBonus() {
        this.bonusActive = true;
        this.bonusStartTime = this.time.now;
        this.bonusText.setVisible(true);
    
        this.bonusTimer = this.time.delayedCall(this.bonusTimeLeft, () => {
            this.endBonus(false);
        });
    
        console.log("BONUS ACTIVADO");
    }
    
    
    endBonus(success) {
        this.bonusActive = false;
        this.bonusText.setVisible(false);
    
        if (this.bonusTimer) {
            this.bonusTimer.remove();
        }
    
        if (success) {
            console.log("¡Bonus completado!");
        } else {
            console.log("¡Game Over por no completar el bonus!");
            this.scene.start('GameOver');
        }
    }
    
    
    update() {
        this.yetiManager.update();

        if (this.isAttacking) {
            const targetY = this.player.y - this.cameras.main.height / 2;
            this.cameras.main.scrollY += (targetY - this.cameras.main.scrollY) * 0.1;
            return;
        }

        let targetY = this.player.y - this.cameras.main.height / 2;
        if (targetY < this.maxReachedY) {
            this.maxReachedY = targetY;
        }
        this.cameras.main.scrollY += (this.maxReachedY - this.cameras.main.scrollY) * 0.1;

        if (this.player.y > this.cameras.main.scrollY + this.cameras.main.height) {
        }

        const onFloor = this.player.body.onFloor();

        if (this.keys.up.isDown && onFloor && !this.jumpKeyDown) {
            this.jumpKeyDown = true;
            this.isJumping = true;
            this.player.setVelocityY(-200);
            this.player.anims.play('jump', true);
        }
        if (this.keys.up.isUp) {
            this.jumpKeyDown = false;
        }

        if (this.isJumping && onFloor && this.player.body.velocity.y === 0) {
            this.isJumping = false;
            this.player.anims.stop();
            this.player.setFrame(0);
        }

        if (this.keys.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.setFlipX(true);
            if (!this.isJumping) {
                this.player.anims.play('walk', true);
            }
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(100);
            this.player.setFlipX(false);
            if (!this.isJumping) {
                this.player.anims.play('walk', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (!this.isJumping) {
                this.player.anims.stop();
                this.player.setFrame(0);
            }
        }

        if (!this.bonusActive && !this.bonusWasActivated && this.player.y <= 0) {
            this.bonusWasActivated = true;
            this.activateBonus();
        }

        if (this.bonusActive && this.player.y > this.cameras.main.scrollY + this.cameras.main.height) {
            this.endBonus();
        }

        if (this.bonusActive) {
            const elapsed = this.time.now - this.bonusStartTime;
            const remaining = Math.max(0, this.bonusTimeLeft - elapsed);
            const seconds = (remaining / 1000).toFixed(1);
        
            this.bonusText.setText(`${seconds}`);
            this.bonusText.setPosition(this.cameras.main.scrollX + 280, this.cameras.main.scrollY + 220);
        }
    }
}
