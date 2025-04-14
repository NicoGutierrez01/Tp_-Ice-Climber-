export function PajaroBonus(scene, y) {
    const pajaro = scene.physics.add.sprite(1150, y, 'pajarobonus').setScale(1);
    pajaro.play('pajaro');
    pajaro.setImmovable(true);
    pajaro.body.allowGravity = false;

    let tweenPajaro;

    const moverPajaro = () => {
        pajaro.x = 1150;
        tweenPajaro = scene.tweens.add({
            targets: pajaro,
            x: -100,
            duration: 5000,
            ease: 'Linear',
            onComplete: moverPajaro
        });
    };

    moverPajaro();

    const overlap = scene.physics.add.overlap(scene.player, pajaro, () => {
        if (!scene.scenePaused && scene.player && pajaro) {
            scene.scenePaused = true;

            scene.physics.pause();
            scene.player.anims.pause();
            pajaro.anims.pause();
            if (tweenPajaro) tweenPajaro.stop();

            scene.time.delayedCall(2000, () => {
                scene.scene.start('GameOver');
            });

            overlap.destroy();
        }
    });
}
