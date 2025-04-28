export class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.bloquesRotos = data.bloquesRotos || 0;
    this.pajarosMatados = data.pajarosMatados || 0;
    this.berenjenasRecolectadas = data.berenjenasRecolectadas || 0;
    this.baseScore = data.score || 0;
    this.level = data.level || 1;
    this.bonusResult = data.bonusResult || 'lives';

    this.musicwin = this.sound.add('StageClear', { volume: 0.5 });
    this.musicloser = this.sound.add('StageFail', { volume: 0.5 });
    // Puntos de bonus por nivel
    this.bonusScore = data.bonusScore != null
      ? data.bonusScore
      : (this.level === 1 ? 3000 : 5000);

    this.unitHielo = data.unitHielo != null ? data.unitHielo : 400;
    this.unitBird = data.unitBird != null ? data.unitBird : 800;
    this.unitBlock = data.unitBlock != null ? data.unitBlock : 10;
    this.unitBerenjena = data.unitBerenjena != null ? data.unitBerenjena : 300;

    this.finalScore = this.baseScore + this.bonusScore;
  }

  create() {
    // Fondo y título
    this.cameras.main.setBackgroundColor('#000000');
    this.add.image(300, 400, 'gameover').setScale(1.5);

    // Animación de personaje
    const spriteKey = this.bonusResult === 'won' ? 'pjgano' : 'pjperdio';
    const personaje = this.add.sprite(210, 240, spriteKey).setScale(1.5);
    this.anims.create({ key: 'win', frames: this.anims.generateFrameNumbers('pjgano', { start: 0, end: 1 }), frameRate: 3, repeat: -1 });
    this.anims.create({ key: 'loser', frames: this.anims.generateFrameNumbers('pjperdio', { start: 0, end: 1 }), frameRate: 3, repeat: -1 });
    personaje.play(this.bonusResult === 'won' ? 'win' : 'loser');

    // Imagen de bonus
    if (this.bonusResult === 'won') {
      this.musicwin.play();
      this.add.image(350, 240, 'winnerbonus').setScale(1.5);
    } else if (this.bonusResult === 'timeout') {
      this.musicloser.play();
      this.add.image(350, 240, 'nobonus').setScale(1.5);
    }

    // Texto informativo de puntos unitarios
    this.add.text(290, 437, `${this.unitBird}`, { fontSize: '24px', fill: '#ffffff' })
      .setOrigin(0.5)
      .setScale(1.5);
    this.add.text(290, 484, `${this.unitBlock}`, { fontSize: '24px', fill: '#ffffff' })
      .setOrigin(0.5)
      .setScale(1.5);
    this.add.text(290, 341, `${this.unitBerenjena}`, { fontSize: '24px', fill: '#ffffff' })
      .setOrigin(0.5)
      .setScale(1.5);
    this.add.text(290, 389, `${this.unitHielo}`, { fontSize: '24px', fill: '#ffffff' })
      .setOrigin(0.5)
      .setScale(1.5);

    // Definir líneas de puntuaciones
    const lines = [
      {
        icon: null,
        xIcon: 0, y: 0,
        xLabel: 375, y: 280,
        value: this.bonusScore
      },
      {
        icon: null,
        xIcon: 0, y: 0,
        xLabel: 370, y: 605,
        value: this.finalScore
      },
      {
        icon: 'berenjena',
        xIcon: 210, y: 341,
        xLabel: 430, y: 341,
        value: this.berenjenasRecolectadas
      },
      {
        icon: 'piconieve',
        xIcon: 210, y: 389,
        xLabel: 430, y: 389,
        value: 0
      },
      {
        icon: 'pajaroover',
        xIcon: 210, y: 437,
        xLabel: 430, y: 437,
        value: this.pajarosMatados
      },
      {
        icon: 'bloquecito',
        xIcon: 210, y: 484,
        xLabel: 430, y: 484,
        value: this.bloquesRotos
      }
    ];

    // Crear íconos y textos ocultos
    lines.forEach(line => {
      if (line.icon) {
        line.iconImage = this.add.image(line.xIcon, line.y, line.icon)
      .setScale(1.5)
      .setAlpha(0);
      }
      line.valueText = this.add.text(line.xLabel, line.y, '0', { fontSize: '24px', fill: '#ffffff' })
      .setOrigin(1, 0.5)
      .setAlpha(0)
      .setScale(1.5);
    });

    // Función recursiva para animar cada línea
    const showLine = i => {
      if (i >= lines.length) {
        // Al terminar, iniciar siguiente nivel con datos acumulados
        this.time.delayedCall(500, () => {
          this.musicloser.stop();
          this.musicwin.stop();
          this.scene.start('Nivel2', {
            level: this.level + 1,
            bloquesRotos: this.bloquesRotos,
            pajarosMatados: this.pajarosMatados,
            berenjenasRecolectadas: this.berenjenasRecolectadas,
            score: this.finalScore
          });
        });
        return;
      }
      const line = lines[i];
      const targets = [line.valueText];
      if (line.iconImage) targets.unshift(line.iconImage);

      // Mostrar icono y valor
      this.tweens.add({
        targets,
        alpha: 1,
        duration: 200,
        onComplete: () => {
          // Contar de 0 a valor
          this.tweens.addCounter({
            from: 0,
            to: line.value,
            duration: 1000,
            onUpdate: t => line.valueText.setText(Math.floor(t.getValue())),
            onComplete: () => showLine(i + 1)
          });
        }
      });
    };

    showLine(0);
  }
}
