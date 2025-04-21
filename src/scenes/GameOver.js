export class GameOver extends Phaser.Scene {
    constructor() {
      super('GameOver');
    }
  
    init(data) {
      this.finalScore = data.score || 0;
    }
  
    create() {
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;
  

      this.add.text(centerX, centerY, `Tu puntaje fue: ${this.finalScore}`, {
        fontSize: '32px',
        fill: '#ffffff'
      }).setOrigin(0.5);
  
      this.add.text(centerX, centerY + 100, 'Presioná ESPACIO para reiniciar', {
        fontSize: '20px',
        fill: '#cccccc'
      }).setOrigin(0.5);
  
      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('Game');
      });
    }
  }
  