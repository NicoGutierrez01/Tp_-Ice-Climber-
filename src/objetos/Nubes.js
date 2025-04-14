export function Nubes(scene, y) {
    const nube = scene.physics.add.image(1150, y, 'nubelarga').setScale(0.9);
    nube.setImmovable(true);
    nube.body.allowGravity = false;

    const moverNube = () => {
        nube.x = 880;
        scene.tweens.add({
            targets: nube,
            x: 200,
            duration: 5000,
            ease: 'Linear',
            onComplete: moverNube
        });
    };

    moverNube();

    scene.physics.add.collider(scene.player, nube);
}
