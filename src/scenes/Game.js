import { Scene } from 'phaser';
import { PajaroBonus } from '../objetos/PajarosBonus';
import { Nubes } from '../objetos/Nubes';
import { HileraBloques } from '../objetos/HileraBloques';
import { Yeti } from '../objetos/Yeti';
import { PajaroEnemigo } from '../objetos/PajaroEnemigo';
import { Berenjena } from '../objetos/Berenjena';
import { InputManager } from '../components/InputManager';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.maxLives = 3;
        this.score = 0;
        this.bloquesRotos = 0;
        this.pajarosMatados = 0;
        this.berenjenasRecolectadas = 0;
    }
    init(data) {
        this.totalScore = data.score || 0;
        this.bloquesRotos = data.bloquesRotos || 0;
        this.pajarosMatados = data.pajarosMatados || 0;
        this.berenjenasRecolectadas = data.berenjenasRecolectadas || 0;
    }
    create() {

        this.anims.remove('yeti-walk');
        this.anims.remove('pajaro');
        this.anims.remove('enemy-bird-fly');
        this.anims.remove('walk');
        this.anims.remove('idle');
        this.anims.remove('jump');
        this.anims.remove('attack');
        this.anims.remove('attack2');

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

        // ancho y alto deseados
        const newWidth  = 10;
        const newHeight = 40;

        // medidas originales
        const originalWidth  = this.player.body.width;
        const originalHeight = this.player.body.height;

        // offsets para centrar la hitbox
        const offsetX = (originalWidth  - newWidth)  / 2;
        const offsetY = (originalHeight - newHeight) / 2;

        // aplico nuevo tamaño y posición
        this.player.body.setSize(newWidth, newHeight);
        this.player.body.setOffset(offsetX, offsetY * 2); 

        Nubes(this, -175);
        Nubes(this, -430);

        this.anims.create({
            key: 'pajaro',
            frames: this.anims.generateFrameNumbers('pajarobonus', { start: 1, end: 4 }),
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
        this.yetiManager.yetis.getChildren().forEach(yeti => {
            this.physics.add.overlap(this.player, yeti, this.hitEnemy, null, this);
        });
        
        map.createLayer("ParedVerde",  paredverde, 256, -1300);
        map.createLayer("ParedVerdes", paredverdes,256, -1300);
        map.createLayer("ParedMarron", paredmarron,256, -1300);
        map.createLayer("ParedAzul",   paredazul,  256, -1300);
        map.createLayer("Numeros",     numeros,    256, -1300);
        map.createLayer("Numeros2",    numeros2,   256, -1300);
        map.createLayer("Copo",        copos,      256, -1300);
        map.createLayer("Copo2",       copos2,     256, -1300);

        this.add.image(325, -390, 'timer').setScale(1.6);
        this.add.image(325, -835, 'timer').setScale(1.6);

        this.cameras.main.setZoom(2);
        this.cameras.main.setBounds(0, -10000, 800, 10780);

        this.lives = this.maxLives;
        this.lifeIcons = [];
        const startX = this.cameras.main.scrollX + 340;  
        const startY = this.cameras.main.scrollY + 220;

        for (let i = 0; i < this.maxLives; i++) {
            const icon = this.add.image(startX + i * 15, startY, 'vidas')
                .setScrollFactor(0)
                .setScale(0.7);  
            this.lifeIcons.push(icon);
        }

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.F,
            attack2: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.attackHitboxes = this.physics.add.group({
            allowGravity: false,
            immovable: true
          });

          this.physics.add.overlap(
            this.attackHitboxes,
            this.yetiManager.yetis,
            (hitbox, yeti) => {

              const dir = yeti.body.velocity.x >= 0 ? -1 : +1;

              const twin = this.physics.add.sprite(yeti.x, yeti.y, 'yeti-death');
              twin.play('yeti-death');

              twin.setVelocityX(100 * dir);
              twin.body.setAllowGravity(false);

              yeti.destroy();
              hitbox.destroy();
            },
            null,
            this
        );

        this.physics.add.overlap(
            this.attackHitboxes,
            this.enemyBirds,
            (hitbox, bird) => {

              const twin = this.physics.add.sprite(bird.x, bird.y, 'bird-death');
              twin.body.setAllowGravity(true);
              twin.play('bird-death');
              twin.setVelocityY(50);
          
              bird.destroy();
              hitbox.destroy();
            },
            null,
            this
        );
          
        this.inputManager = new InputManager(this);
        this.inputManager.setup();

        this.prevAttackPad1 = false;
        this.prevAttackPad2 = false;

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 5}),
            frameRate: 15
        });
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 12 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 9 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('player', { start: 11, end: 12 }),
            frameRate: 25
        });

        this.anims.create({
            key: 'enemy-bird-fly',
            frames: this.anims.generateFrameNumbers('pajaroenemigo', { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'bird-death',
            frames: this.anims.generateFrameNumbers('pajaroenemigo', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'yeti-death',
            frames: this.anims.generateFrameNumbers('yeti', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.time.addEvent({
            delay: 8000,           
            callback: () => {
                const bird = PajaroEnemigo(this, 100, 300, 80, 1);
                this.enemyBirds.add(bird); 
            }
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

                    this.bloquesRotos++;
                    this.score += 10;
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
        this.bonusText2 = this.add.text(0, 0, '', {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.bonusText.setVisible(false);

        this.bonusText.setDepth(1000);
        this.bonusText2.setVisible(false);

        this.bonusText2.setDepth(1000);

        this.berenjenas = new Berenjena(this, this.bloques, this.player);

        this.physics.add.overlap(
            this.player,
            this.berenjenas.group,
            this.collectBerenjena,
            null,
            this
          );

        this.enemyBirds = this.physics.add.group({
            allowGravity: true,
            immovable: false
        });
    
        this.time.addEvent({
            delay: 8000,
            callback: () => {
              const bird = PajaroEnemigo(this, 100, 300, 80, 1);
              this.physics.add.overlap(
                this.player,
                this.enemyBirds,
                this.onPlayerHitsBird,  
                null,
                this
              );
            },
            loop: true
        });
        
        this.deathTwins = this.add.group();

    }

    onPlayerHitsBird(player, bird) {
        const twin = this.physics.add.sprite(bird.x, bird.y, 'bird-death');
        twin.body.setAllowGravity(true);
        twin.setVelocityY(100);
        twin.play('bird-death');
      
        bird.destroy();
        this.pajarosMatados++;
        this.score += 800;
      
        this.time.addEvent({
          delay: 3000,         
          callback: () => twin.destroy()
        });
    }

    collectBerenjena(player, berenjena) {
        berenjena.destroy();
        this.berenjenasRecolectadas++;
        this.score += 400;
    }

    hitEnemy(player, enemySprite) {
        enemySprite.disableBody(true, true);
    
        this.lives -= 1;
    
        const icono = this.lifeIcons.pop();
        if (icono) {
            icono.destroy();
        }
        if (this.lives <= 0) {
            this.scene.start('GameOver', { 
                bloquesRotos: this.bloquesRotos,
                pajarosMatados: this.pajarosMatados,
                berenjenasRecolectadas: this.berenjenasRecolectadas,
                score: this.score,
             });
        }
    }
    
    activateBonus() {
        this.lifeIcons.forEach(icono => icono.setVisible(false));
        this.bonusActive = true;
        this.bonusStartTime = this.time.now;
        this.bonusText.setVisible(true);
        this.bonusText2.setVisible(true);

        const coords = [
            { x: 370, y: -100 },
            { x: 590, y: -276 },
            { x: 460, y: -372 }
          ];
        this.berenjenas.spawnAtPositions(coords);
    
        this.bonusTimer = this.time.delayedCall(this.bonusTimeLeft, () => {
            this.endBonus(false);
        });
    
        console.log("BONUS ACTIVADO");
    }
    
    endBonus(success) {
        this.bonusActive = false;
        this.bonusText.setVisible(false);
        this.bonusText2.setVisible(true);
    
        if (this.bonusTimer) {
            this.bonusTimer.remove();
        }
    
        if (success) {
            console.log("¡Bonus completado!");
        } else {
            console.log("¡Game Over por no completar el bonus!");
            this.scene.start('GameOver', { 
                score: this.score,
                bonusResult: 'timeout'
             });
        }
    }

    performAirAttack() {
        let bloqueCercano = null;
        let menorDistancia = Infinity;
    
        this.bloques.forEach(bloque => {
            if (bloque.y >= this.player.y) {
                return;
            }
    
            const d = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                bloque.x, bloque.y
            );
            const cerca = d < 40;
            const direccionOK = this.player.flipX
                ? bloque.x < this.player.x
                : bloque.x > this.player.x;
    
            if (cerca && direccionOK && bloque.getData('rompible') && d < menorDistancia) {
                menorDistancia = d;
                bloqueCercano = bloque;
            }
        });
    
        if (bloqueCercano) {
            const tipo = bloqueCercano.getData('tipo');
            const x = bloqueCercano.x, y = bloqueCercano.y;
            bloqueCercano.destroy();
    
            const fx = this.add.sprite(x, y, `${tipo}anim`);
            fx.play(`${tipo}-break`);
            fx.once('animationcomplete', () => fx.destroy());
            this.bloquesRotos++;
            this.score += 10;
        }
    }  
    
    spawnAttackHitbox() {
        const offsetX = this.player.flipX ? -20 : +20;
        const x = this.player.x + offsetX;
        const y = this.player.y + 10;    
      
        const zone = this.add.zone(x, y).setSize(10, 20);
        this.physics.world.enable(zone);
      
        this.attackHitboxes.add(zone);
      
        this.time.delayedCall(100, () => {
          zone.destroy();
        });
    }
    
    update() {
        this.inputManager.update();
        this.yetiManager.update();

        const jumpPad = this.inputManager.pad?.buttons?.[0]?.pressed ?? false;

        if (this.isAttacking) {
            const targetY = this.player.y - this.cameras.main.height / 2;
            return;
        }

        let targetY = this.player.y - this.cameras.main.height / 2;
        if (targetY < this.maxReachedY) {
            this.maxReachedY = targetY;
        }
        this.cameras.main.scrollY += (this.maxReachedY - this.cameras.main.scrollY) * 0.1;

        if (this.player.y > this.cameras.main.scrollY + this.cameras.main.height) {
            this.scene.start('GameOver', {
                bloquesRotos: this.bloquesRotos,
                pajarosMatados: this.pajarosMatados,
                berenjenasRecolectadas: this.berenjenasRecolectadas,
                score: this.score,
                bonusResult: 'no bonus'
            });
            return;
        }

        const onFloor = this.player.body.onFloor();

        const { x: moveX, y: moveY } = this.inputManager.getMovement();
    
        const pad = this.inputManager.pad;

        const nowAttackPad1 = pad?.buttons?.[2]?.pressed ?? false;
        const nowAttackPad2 = pad?.buttons?.[1]?.pressed ?? false;

        const justDownPad1 = nowAttackPad1 && !this.prevAttackPad1;
        const justDownPad2 = nowAttackPad2 && !this.prevAttackPad2;

        this.prevAttackPad1 = nowAttackPad1;
        this.prevAttackPad2 = nowAttackPad2;
    
        if (!this.jumpKeyDown && ((jumpPad && onFloor) || (this.keys.up.isDown && onFloor))) {
            this.jumpKeyDown = true;
            this.isJumping  = true;
            this.player.setVelocityY(-200);
            this.player.anims.play('jump', true);
        }
        if (this.keys.up.isUp && !jumpPad) {
            this.jumpKeyDown = false;
        }
        if (this.isJumping && onFloor && this.player.body.velocity.y === 0) {
            this.isJumping = false;
            this.player.setFrame(0);
        }
    
        if (moveX !== 0) {
            this.player.setVelocityX(moveX * 100);
            this.player.setFlipX(moveX < 0);
            if (!this.isJumping) this.player.anims.play('walk', true);
        } else if (this.keys.left.isDown || this.keys.right.isDown) {
            const dir = this.keys.left.isDown ? -1 : 1;
            this.player.setVelocityX(dir * 100);
            this.player.setFlipX(dir < 0);
            if (!this.isJumping) this.player.anims.play('walk', true);
        } else {
            this.player.setVelocityX(0);
            if (!this.isJumping) this.player.setFrame(0);
        }
    
        if (!this.isAttacking && (justDownPad1 || Phaser.Input.Keyboard.JustDown(this.keys.attack))) {
            this.isAttacking = true;
            this.player.setVelocityX(0);
            this.player.anims.play('attack', true);
            this.spawnAttackHitbox();
        }
        else if (!this.isAttacking && (justDownPad2 || Phaser.Input.Keyboard.JustDown(this.keys.attack2))) {
            this.isAttacking = true;
            this.player.setVelocityX(0);
            this.player.anims.play('attack2', true);
            this.performAirAttack();
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
            this.bonusText.setPosition(294, -390);
            this.bonusText.setScale(1.3);
            this.bonusText.setColor('#ff8473');

            this.bonusText2.setText(`${seconds}`);
            this.bonusText2.setPosition(294, -835);
            this.bonusText2.setScale(1.3);
            this.bonusText2.setColor('#ff8473');
        }

        this.deathTwins.getChildren().forEach(twin => {
            if (twin.y > this.cameras.main.scrollY + this.cameras.main.height + twin.displayHeight) {
              twin.destroy();
            }
            if (twin.x < -twin.displayWidth || twin.x > this.cameras.main.width + twin.displayWidth) {
              twin.destroy();
            }
        });
    }
}