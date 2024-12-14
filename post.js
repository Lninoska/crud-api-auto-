const { write } = require('fs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

async function agregarAuto(req, res) {
    try {
        let archivoOriginales = {};
        try {
            archivoOriginales = await fs.readFile('autos.txt', 'utf-8');
        } catch (error) {
        }
        const datos = JSON.parse(archivoOriginales);
        const id = uuidv4();
        req.on('data', async (data) => {
            try {
                const datosAutos = JSON.parse(data);
                datos[id] = datosAutos;

                await fs.writeFile('autos.txt', JSON.stringify(datos, null, 2));
                res.write('Auto agregado exitosamente');
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

async function AgregarComics(req, res) {
    try {
        let archivoOriginales = {};
        try {
            archivoOriginales = await fs.readFile('comics.txt', 'utf-8');
        } catch (error) {
        }
        const datos = JSON.parse(archivoOriginales);
        const id = uuidv4();

        req.on('data', async (data) => {
            try {
                const datosAutos = JSON.parse(data);
                datos[id] = datosAutos;

                await fs.writeFile('autos.txt', JSON.stringify(datos, null, 2));
                res.write('Comic agregado exitosamente');
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
    agregarAuto,
    AgregarComics
}
