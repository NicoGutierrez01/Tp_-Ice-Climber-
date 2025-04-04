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

        const filas2 = [
            { y: -540, tipo: 'azul2', patrones: [9, 3, 9, 3, 9, 3, 9, 3] }, // Ejemplo: 3 bloques, espacio de 2, 2 bloques, espacio de 3
            { y: -680, tipo: 'azul2', patrones: [-2, 10, 5, 6, 7, 6, 5, 5] },     // Otro ejemplo con diferente patrón
            { y: -980, tipo: 'azul2', patrones: [0, 25, 6, 20] },
            { y: -1004, tipo: 'azul2', patrones: [0, 6, 9, 200] },
            { y: -1113, tipo: 'azul2', patrones: [0, 30, 4, 200] },
            { y: -1137, tipo: 'azul2', patrones: [0, 15, 10, 200] },
            { y: -1413, tipo: 'azul2', patrones: [0, 23, 5, 200] },
            { y: -1438, tipo: 'azul2', patrones: [0, 10, 4, 200] },
            { y: -1521, tipo: 'azul2', patrones: [0, 26, 3, 200] },
            { y: -1573, tipo: 'azul2', patrones: [0, 17, 3, 200] },
            { y: -1659, tipo: 'azul2', patrones: [0, 20, 4, 200] },
            { y: -1793, tipo: 'azul2', patrones: [0, 8, 12, 4, 11,200] },
        ];
        
        const crearFilaConEspacios = (y, tipo, patrones) => {
            let sprite = `bloque${tipo}`;
            let xInicial = 12; // Margen izquierdo
            let espacioBloque = 16 * 1.5; // Tamaño del bloque con escala 1.5
        
            patrones.forEach((cantidad, index) => {
                if (index % 2 === 0) {
                    // Es un grupo de bloques
                    for (let i = 0; i < cantidad; i++) {
                        let bloque = this.plataformas.create(xInicial + i * espacioBloque, y, sprite).setScale(1.5);
                        bloque.setFrame(0);
                    }
                }
                // Mover la posición inicial sumando los espacios y bloques ya colocados
                xInicial += cantidad * espacioBloque;
            });
        
            // Llenar el resto con bloques
            while (xInicial < 1024 - 50) {
                let bloque = this.plataformas.create(xInicial, y, sprite).setScale(1.5);
                bloque.setFrame(0);
                bloque.setImmovable(true);
                xInicial += espacioBloque;
            }
        };
        
        // Crear filas con los patrones definidos
        filas2.forEach(fila => crearFilaConEspacios(fila.y, fila.tipo, fila.patrones));

        const filas = [
            { y: 740, tipo: 'verde', cantidad: 33 },
            { y: 580, tipo: 'verde', cantidad: 100 },
            { y: 420, tipo: 'marron', cantidad: 100 },
            { y: 260, tipo: 'marron', cantidad: 100 },
            { y: 100, tipo: 'marron', cantidad: 100 },
            { y: -60, tipo: 'azul', cantidad: 100 },
            { y: -220, tipo: 'azul', cantidad: 100 },
            { y: -380, tipo: 'azul', cantidad: 100 },
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
        this.add.image(42, -648, 'bloquehielo').setScale(1.7);
        this.add.image(983, -648, 'bloquehielo').setScale(1.7);
        this.add.image(42, -648, 'bloquehielo').setScale(1.7);
        this.add.image(75, -839, 'bloquehielo').setScale(1.7);
        this.add.image(948, -839, 'bloquehielo').setScale(1.7);
        this.add.image(103, -1030, 'bloquehielo').setScale(1.7);
        this.add.image(921, -1030, 'bloquehielo').setScale(1.7);
        this.add.image(131, -1221, 'bloquehielo').setScale(1.7);
        this.add.image(893, -1221, 'bloquehielo').setScale(1.7);
        this.add.image(171, -1412, 'bloquehielo').setScale(1.7);
        this.add.image(853, -1412, 'bloquehielo').setScale(1.7);
        this.add.image(204, -1603, 'bloquehielo').setScale(1.7);
        this.add.image(820, -1603, 'bloquehielo').setScale(1.7);
        this.add.image(234, -1740, 'bloquehielo2').setScale(1.7);
        this.add.image(790, -1740, 'bloquehielo2').setScale(1.7);


        const crearNube = (y) => {
            // Crear la nube con físicas pero sin gravedad
            const nube = this.physics.add.image(-100, y, 'nubelarga').setScale(1.7);
            nube.setImmovable(true);
            nube.body.allowGravity = false;
        
            // Moverla con tween y hacer que reinicie el movimiento
            const moverNube = () => {
                nube.x = -100;
                this.tweens.add({
                    targets: nube,
                    x: 1150,
                    duration: 6000,
                    ease: 'Linear',
                    onComplete: moverNube
                });
            };
        
            moverNube();
        
            // Agregar colisión con el jugador
            this.physics.add.collider(this.player, nube);
        };
        
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

        this.player = this.physics.add.sprite(512, 680, 'player').setScale(2);

        crearNube(-843); 
        crearNube(-1280); 

        this.physics.add.collider(this.player, this.suelo);
        this.physics.add.collider(this.player, this.plataformas);

        this.cameras.main.setBounds(0, -10000, 800, 10780); 

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, -100);

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W, 
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE 
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
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 6 }),
            frameRate: 10,
            repeat: 1
        });

        const ataque =this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('ataque', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(ataque);

        this.anims.create({
            key: 'bloqueverde',
            frames: this.anims.generateFrameNumbers('bloqueverdeanim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        });
        
        this.anims.create({
            key: 'bloquemarron',
            frames: this.anims.generateFrameNumbers('bloquemarronanim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        });
        
        this.anims.create({
            key: 'bloqueazul',
            frames: this.anims.generateFrameNumbers('bloqueazulanim', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        });
    }

    update() {
        // Movimiento del jugador con A y D
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.anims.play('walk', true);
            this.player.setFlipX(true);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(200);
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
            let playerY = this.player.y - 30; 

            this.player.anims.play('attack');
        
            let bloques = this.plataformas.getChildren();
        
            for (let i = 0; i < bloques.length; i++) {
                let bloque = bloques[i];
        
                if (!bloque) continue;
        
                if (Phaser.Math.Distance.Between(playerX, playerY, bloque.x, bloque.y) < 30) {
                    bloque.vida--;
        
                    if (bloque.vida <= 0) {
                        let animKey = 'bloqueverde'; 
                        if (bloque.texture.key.includes('marron')) {
                            animKey = 'bloquemarron';
                        } else if (bloque.texture.key.includes('azul')) {
                            animKey = 'bloqueazul';
                        }
                    
                        const itemAnimado = this.add.sprite(bloque.x, bloque.y, animKey).setScale(1.5).setDepth(100).play(animKey);

                        let randomX = Phaser.Math.Between(-70, 70);
                    
                        this.tweens.add({
                            targets: itemAnimado,
                            props: {
                                x: { value: `+=${randomX}`, ease: 'Power1', duration: 300 },
                                y: { value: '-=80', ease: 'Power1', duration: 300 }
                            },
                            onComplete: () => {
                                this.tweens.add({
                                    targets: itemAnimado,
                                    props: {
                                        x: { value: `+=${randomX}`, ease: 'Power1', duration: 400 },
                                        y: { value: '+=120', ease: 'Power1', duration: 400 }
                                    },
                                    onComplete: () => {
                                        itemAnimado.destroy();
                                    }
                                });
                            }
                        });
                        bloque.destroy(); 
                    }                    
                    break;
                }
            }
        });
    }
}
