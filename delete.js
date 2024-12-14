const fs = require('fs/promises')

async function eliminarauto(req, res) {
    try {
        const autosOriginales = await fs.readFile('autos.txt', 'utf-8');
        const objetoArchivoOriginal = JSON.parse(autosOriginales);
        const id = params.get('id');
        if (objetoArchivoOriginal[id]) {
            delete objetoArchivoOriginal[id];
            await fs.writeFile('autos.txt', JSON.stringify(objetoArchivoOriginal, null, 2));
            res.write('El auto ha sido eliminado exitosamente');
        } else {
            res.write('El auto con el id especificado no existe');
        }
        res.end();
    } catch (error) {
        res.write('Error al procesar la solicitud');
        res.end();
    }
}

async function eliminarComic(req, res) {
    try {
        const autosOriginales = await fs.readFile('comics.txt', 'utf-8');
        const objetoArchivoOriginal = JSON.parse(autosOriginales);
        const id = params.get('id');
        if (objetoArchivoOriginal[id]) {
            delete objetoArchivoOriginal[id];
            await fs.writeFile('Comics.txt', JSON.stringify(objetoArchivoOriginal, null, 2));
            res.write('El comic ha sido eliminado exitosamente');
        } else {
            res.write('El comic con el id especificado no existe');
        }
        res.end();
    } catch (error) {
        res.write('Error al procesar la solicitud');
        res.end();
    }
}

module.exports = {
    eliminarComic,
    eliminarauto
}