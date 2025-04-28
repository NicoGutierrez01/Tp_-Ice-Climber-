// src/escenas/YetiManager.js
import { HileraBloques } from '../objetos/HileraBloques';

export class Yeti {
  /**
   * @param {Phaser.Scene} scene
   * @param {Array<{ x:number, y:number, tipo?:string }>} spawnPoints
   * @param {number} screenW
   */
  constructor(scene, spawnPoints, screenW, minX = 500, maxX = 500) {
    this.scene       = scene;
    this.spawnPoints = spawnPoints;
    this.screenW     = screenW;
    this.minX        = minX;
    this.maxX        = maxX;
    this.yetis       = this.scene.physics.add.group();
    this.bloques     = scene.bloques;
    
    this.scene.physics.add.collider(this.yetis, this.bloques);
    this.scene.physics.add.collider(this.yetis, this.scene.plataformas);
  }
  

  spawnYetis() {
    const n = Phaser.Math.Between(3, 6);
    for (let i = 0; i < n; i++) {
      const { x, y, tipo } = Phaser.Utils.Array.GetRandom(this.spawnPoints);
      const goLeft = Phaser.Math.Between(0, 1) === 0;
      const dir    = goLeft ? 'left' : 'right';
      const speed  = 50;

      const yeti = this.yetis.create(x, y, 'yeti')
        .setData({ direction: dir, speed, rowY: y, rowTipo: tipo, wasOnFloor: true });

      // animación
      yeti.anims.play('yeti-walk', true)
      .setScale(0.8);

      // gravedad para que caiga sobre la plataforma
      yeti.body.setGravityY(300);

      // <-- 2) opcional: collider individual con bloques si querés
      // this.scene.physics.add.collider(yeti, this.bloques);

      yeti.setVelocityX(goLeft ? -speed : speed)
          .setFlipX(goLeft);
    }
  }

  update() {
    this.yetis.getChildren().forEach(yeti => {
      const dir   = yeti.getData('direction');
      const speed = yeti.getData('speed');
  
      // 1) Movimiento
      yeti.setVelocityX(dir === 'left' ? -speed : speed);
  
      // 2) Punto a chequear (adelante y justo debajo)
      const offsetX = dir === 'left'
        ? -yeti.width * 0.5
        :  yeti.width * 0.5;
      const checkX = yeti.x + offsetX;
      const checkY = yeti.y + yeti.height * 0.5 + 5;
  
      let foundSupport = false;
  
      // 3) Revisar bloques (array de Sprites)
      this.bloques.forEach(bloque => {
        if (!bloque || !bloque.body) return;
        const b = bloque.getBounds();
        if (
          checkX > b.left &&
          checkX < b.right &&
          checkY > b.top &&
          checkY < b.bottom
        ) {
          foundSupport = true;
        }
      });
  
      // 4) Si no halló bloque, revisar tilemap layer
      if (!foundSupport) {
        if (this.scene.plataformas.hasTileAtWorldXY(checkX, checkY)) {
          foundSupport = true;
        }
      }
  
      // 5) Si aún no hay suelo, invertimos
      if (!foundSupport) {
        if (dir === 'left') {
          yeti.setData('direction','right').setFlipX(false);
        } else {
          yeti.setData('direction','left').setFlipX(true);
        }
      }
  
      // 6) Límites horizontales personalizados
      if (yeti.x <= this.minX + yeti.width / 2) {
        yeti.setData('direction','right').setFlipX(false);
      } else if (yeti.x >= this.maxX - yeti.width / 2) {
        yeti.setData('direction','left').setFlipX(true);
      }
    });
  }
  
}
