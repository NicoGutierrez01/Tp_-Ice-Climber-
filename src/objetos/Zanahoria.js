export class Zanahoria {
    /**
     * @param {Phaser.Scene} scene
     * @param {Phaser.GameObjects.Sprite} player
     */
    constructor(scene, player) {
      this.scene = scene;
      this.player = player;
  
      // Inicializa score en la escena si no existe
      if (this.scene.score === undefined) {
        this.scene.score = 0;
        this.scene.scoreText = this.scene.add.text(10, 10, 'Score: 0', {
          fontSize: '20px',
          fill: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4
        }).setScrollFactor(0);
      }
  
      // Grupo de físicas para las berenjenas
      this.group = this.scene.physics.add.group();
      this.scene.physics.add.overlap(
        this.player,
        this.group,
        this.collect,
        null,
        this
      );
    }
  
    /**
     * Genera 'cantidad' berenjenas dentro de un área rectangular definida
     * @param {number} cantidad  - número de berenjenas a generar
     * @param {number} xMin      - coordenada mínima en X
     * @param {number} xMax      - coordenada máxima en X
     * @param {number} yMin      - coordenada mínima en Y
     * @param {number} yMax      - coordenada máxima en Y
     */
    spawnInArea(cantidad = 5, xMin = 0, xMax = 800, yMin = 0, yMax = 600) {
      this.group.clear(true, true);
  
      for (let i = 0; i < cantidad; i++) {
        const worldX = Phaser.Math.Between(xMin, xMax);
        const worldY = Phaser.Math.Between(yMin, yMax);
        const zanahoria = this.group.create(worldX, worldY, 'zanahoria');
        zanahoria.body.setAllowGravity(false);
      }
    }
  
    /**
     * Genera berenjenas en posiciones exactas dadas
     * @param {Array<{x:number, y:number}>} positions - array de coordenadas exactas
     */
    spawnAtPositions(positions = []) {
      this.group.clear(true, true);
  
      positions.forEach(({ x, y }) => {
        const zanahoria = this.group.create(x, y, 'zanahoria');
        zanahoria.body.setAllowGravity(false);
      });
    }
  
    /**
     * Callback de recolección por overlap: desactiva zanahoria y suma puntos
     */
    collect(player, zanahoria) {
      zanahoria.disableBody(true, true);
      // Incrementa score y actualiza el texto
      this.scene.score += 1;
      this.scene.scoreText.setText(`Score: ${this.scene.score}`);
  
      // (Opcional) reproducir sonido de colección:
      // this.scene.sound.play('collectSound');
    }
  }
  