import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {

        this.cameras.main.setBackgroundColor("000000");

        this.suelo = this.physics.add.staticGroup();
        this.suelo.create(512, 768, 'suelo').setScale(1).refreshBody();

        this.plataformas = this.physics.add.staticGroup();

        const filas = [
            { y: 740, tipo: 'verde', cantidad: 100 },
            { y: 580, tipo: 'verde', cantidad: 100 },
            { y: 420, tipo: 'marro', cantidad: 100 },
            { y: 260, tipo: 'marro', cantidad: 100 },
            { y: 100, tipo: 'marro', cantidad: 100 },
            { y: -60, tipo: 'azul', cantidad: 100 },
            { y: -220, tipo: 'azul', cantidad: 100 },
            { y: -380, tipo: 'azul', cantidad: 100 },
            { y: -540, tipo: 'azul2', cantidad: 5 },
            { y: -700, tipo: 'azul2', cantidad: 5 }
        ];
        
        const crearFila = (y, cantidad, tipo) => {
            let anchoTotal = cantidad * 24;
            let xInicial = (1024 - anchoTotal) / 2;
            let sprite = `bloque${tipo}`;
        
            for (let i = 0; i < cantidad; i++) {
                let bloque = this.plataformas.create(xInicial + i * 24, y, sprite).setScale(1.5);
                bloque.setFrame(0);
                if (tipo !== 'azul2') {
                    bloque.vida = 1;
                }
            }
        };
        
        // Crear todas las filas usando un bucle
        filas.forEach(fila => crearFila(fila.y, fila.cantidad, fila.tipo));
        
        this.add.image(54, 660, 'paredverdeleft').setScale(1.7); 
        this.add.image(969, 660, 'paredverderight').setScale(1.7); 
        this.add.image(54, 500, 'paredverdeleft').setScale(1.7); 
        this.add.image(969, 500, 'paredverderight').setScale(1.7); 
        this.add.image(68, 340, 'paredmarronleft').setScale(1.7); 
        this.add.image(956, 340, 'paredmarronright').setScale(1.7); 
        this.add.image(68, 180, 'paredmarronleft').setScale(1.7); 
        this.add.image(956, 180, 'paredmarronright').setScale(1.7); 
        this.add.image(68, 20, 'paredmarronleft').setScale(1.7); 
        this.add.image(956, 20, 'paredmarronright').setScale(1.7); 
        this.add.image(88, -140, 'paredazulleft').setScale(1.7); 
        this.add.image(936, -140, 'paredazulright').setScale(1.7);
        this.add.image(88, -300, 'paredazulleft').setScale(1.7); 
        this.add.image(936, -300, 'paredazulright').setScale(1.7); 
        this.add.image(88, -460, 'paredazulleft').setScale(1.7); 
        this.add.image(936, -460, 'paredazulright').setScale(1.7); 


    
        // Agregar el número en el centro de la montaña
        this.numeroNivel = this.add.image(42, 674, '1').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(983, 674, '1').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(42, 514, '2').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(983, 514, '2').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(68, 354, '3').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(956, 354, '3').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(68, 194, '4').setScale(1.5).setOrigin(0.5, 0.5);        
        this.numeroNivel = this.add.image(956, 194, '4').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(68, 34, '5').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(956, 34, '5').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(95, -126, '6').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(930, -126, '6').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(95, -286, '7').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(930, -286, '7').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(95, -446, '8').setScale(1.5).setOrigin(0.5, 0.5);
        this.numeroNivel = this.add.image(930, -446, '8').setScale(1.5).setOrigin(0.5, 0.5);

        // Agregar jugador con físicas
        this.player = this.physics.add.sprite(512, 680, 'player').setScale(2);

        this.physics.add.collider(this.player, this.suelo);
        this.physics.add.collider(this.player, this.plataformas);

        // 🔹 Ajustar los límites de la cámara para que pueda subir infinitamente
        this.cameras.main.setBounds(0, -10000, 800, 10780); // Altura gigante para que nunca se limite

        // 🔹 Configurar cámara para que siga al jugador sin restricciones
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, -100);

        // Capturar las teclas de movimiento (WASD)
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,  // Salto con W
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE // Tecla de ataque
        });

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'attack',
        //     frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        
    }

    update() {
        // Movimiento del jugador con A y D
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-100);
            this.player.anims.play('walk', true);
            this.player.setFlipX(true);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(100);
            this.player.anims.play('walk', true);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.up) && this.player.body.onFloor()) {
            this.player.setVelocityY(-300);
            this.player.anims.play('jump');
        }

        this.input.keyboard.on('keydown-SPACE', () => {
            let playerX = this.player.x;
            let playerY = this.player.y - 30; // Golpe hacia arriba
        
            let bloques = this.plataformas.getChildren();
        
            for (let i = 0; i < bloques.length; i++) {
                let bloque = bloques[i];
        
                if (!bloque) continue;
        
                if (Phaser.Math.Distance.Between(playerX, playerY, bloque.x, bloque.y) < 30) {
                    bloque.vida--;
        
                    if (bloque.vida === 1) {
                        bloque.setFrame(1); // Frame de bloque agrietado
                    } else if (bloque.vida <= 0) {
                        bloque.destroy(); // Eliminar el bloque cuando se rompe por completo
                    }
        
                    break; // 🔹 Detener el bucle después de afectar un solo bloque
                }
            }
        });
    }
}
