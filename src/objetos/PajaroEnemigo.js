export function PajaroEnemigo(scene, yMin, yMax, speed = 100, maxBirds = 1) {
  // Si no existe el grupo, lo creamos
  if (!scene.enemyBirds) {
    scene.enemyBirds = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });
  }

  // Controlar número máximo simultáneo
  if (scene.enemyBirds.getLength() >= maxBirds) {
    return;
  }

  const startX = Phaser.Math.Between(0, 1) ? -50 : scene.scale.width + 50;
  const speedX = startX < 0 ? speed : -speed;

  // Crear el sprite y añadirlo al grupo
  const pajaro = scene.physics.add.sprite(startX, yMin, 'pajaroEnemigo')
    .setScale(1)
    .setImmovable(true);
  pajaro.body.allowGravity = false;
  pajaro.play('enemy-bird-fly');
  pajaro.body.setVelocity(speedX, speed);

  scene.enemyBirds.add(pajaro);

  // Lógica de zig-zag en update
  const onUpdate = () => {
    if (!pajaro.body) return;
    pajaro.flipX = pajaro.body.velocity.x < 0;

    if (pajaro.y <= yMin)       pajaro.body.velocity.y = Math.abs(speed);
    else if (pajaro.y >= yMax)  pajaro.body.velocity.y = -Math.abs(speed);

    if (pajaro.x <= -50)              pajaro.body.velocity.x = Math.abs(speedX);
    else if (pajaro.x >= scene.scale.width + 50) 
                                      pajaro.body.velocity.x = -Math.abs(speedX);
  };
  scene.events.on('update', onUpdate);

  // Cuando el sprite se destruya, limpiamos el listener
  pajaro.on('destroy', () => {
    scene.events.off('update', onUpdate);
  });

  return pajaro;
}
