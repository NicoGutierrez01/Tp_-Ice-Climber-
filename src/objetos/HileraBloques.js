export function HileraBloques(scene, xInicial, yInicial, cantidad, tipoBloque, espaciado) {
    const bloques = [];
    const espacio = espaciado !== undefined ? espaciado : 16;

    for (let i = 0; i < cantidad; i++) {
        const x = xInicial + i * espacio;
        const bloque = scene.physics.add.sprite(x, yInicial, tipoBloque).setImmovable(true).setPushable(false);
        bloque.setData('tipo', tipoBloque);
        bloque.setData('rompible', true);
        bloques.push(bloque);
    }

    return bloques;
}
