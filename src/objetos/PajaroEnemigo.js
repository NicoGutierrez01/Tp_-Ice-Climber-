export function PajaroEnemigo(scene, yMin, yMax, speed = 100, maxBirds = 1) {
    if (!scene.enemyBirds) scene.enemyBirds = [];
  
    if (scene.enemyBirds.length >= maxBirds) {
      return;
    }
  
    const startX = Phaser.Math.Between(0, 1) ? -50 : scene.scale.width + 50;
    const speedX = startX < 0 ? speed : -speed;
  
    // Crear sprite y configurar física
    const pajaro = scene.physics.add.sprite(startX, yMin, 'pajaroEnemigo')
      .setScale(1)
      .setImmovable(true);
    pajaro.body.allowGravity = false;
    pajaro.play('enemy-bird-fly');
    pajaro.body.setVelocity(speedX, speed);
  
    // Guardar referencia para contar y limpiar después
    scene.enemyBirds.push(pajaro);
  
    // Función de update para movimiento zig-zag y flip
    const onUpdate = () => {
      if (!pajaro.body) return;  // Ya fue destruido
  
      // Invertir el flip según la dirección X
      pajaro.flipX = pajaro.body.velocity.x < 0;
  
      // Rebote vertical en límites yMin / yMax
      if (pajaro.y <= yMin) {
        pajaro.body.velocity.y = Math.abs(speed);
      } else if (pajaro.y >= yMax) {
        pajaro.body.velocity.y = -Math.abs(speed);
      }
  
      // Rebote horizontal en bordes
      if (pajaro.x <= -50) {
        pajaro.body.velocity.x = Math.abs(speedX);
      } else if (pajaro.x >= scene.scale.width + 50) {
        pajaro.body.velocity.x = -Math.abs(speedX);
      }
    };
    scene.events.on('update', onUpdate);
  
    // Limpiar evento y array cuando se destruya
    pajaro.on('destroy', () => {
      scene.events.off('update', onUpdate);
      scene.enemyBirds = scene.enemyBirds.filter(b => b !== pajaro);
    });
  
    return pajaro;
  }
  