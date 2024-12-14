const fs = require('fs/promises')

async function actualizarAuto(req, res) {
    try {
        const datosArchivo = await fs.readFile('autos.txt', 'utf-8');
        const objetoArchivoOriginal = JSON.parse(datosArchivo);
        req.on('data', async (datos) => {
            try {
                const datosParamodificar = JSON.parse(datos);
                const { id } = datosParamodificar;
                const datosOriginal = objetoArchivoOriginal[id];
                if (datosOriginal) {
                    const autosActualizado = { ...datosOriginal, ...datosParamodificar };
                    objetoArchivoOriginal[id] = autosActualizado;
                    await fs.writeFile('autos.txt', JSON.stringify(objetoArchivoOriginal, null, 2));
                    res.write('Auto actualizado exitosamente');
                } else {
                    res.write('El auto con el id especificado no existe');
                }
                res.end();
            } catch (error) {
                res.write('Error al procesar los datos recibidos');
                res.end();
            }
        });
    } catch (error) {
        res.write('Error al procesar la solicitud');
        res.end();
    }
}

async function actualizarComic(req, res) {
    try {
        const datosArchivo = await fs.readFile('comics.txt', 'utf-8');
        const objetoArchivoOriginal = JSON.parse(datosArchivo);

        req.on('data', async (datos) => {
            try {
                const datosParamodificar = JSON.parse(datos);
                const { id } = datosParamodificar;
                const datosOriginal = objetoArchivoOriginal[id];
                if (datosOriginal) {
                    const comicsActualizado = { ...datosOriginal, ...datosParamodificar };
                    objetoArchivoOriginal[id] = comicsActualizado;
                    await fs.writeFile('Comics.txt', JSON.stringify(objetoArchivoOriginal, null, 2));
                    res.write('Comics actualizado exitosamente');
                } else {
                    res.write('El Comic con el id especificado no existe');
                }
                res.end();
            } catch (error) {
                res.write('Error al procesar los datos recibidos');
                res.end();
            }
        });
    } catch (error) {
        res.write('Error al procesar la solicitud');
        res.end();
    }
}

module.exports = {
    actualizarAuto,
    actualizarComic
}