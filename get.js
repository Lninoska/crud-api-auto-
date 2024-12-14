const fs = require('fs/promises');

async function obtenerAutos(req, res) {
    try {
        const lecturaArchivo = await fs.readFile('autos.txt', 'utf-8');
        res.write(lecturaArchivo || "El archivo está vacío");
    } catch (error) {
        res.write('El archivo no existe o no se puede leer');
    }
    res.end();
}

async function obtenerComics(req, res) {
    try {
        const lecturaArchivo = await fs.readFile('comics.txt', 'utf-8');
        res.write(lecturaArchivo || "El archivo está vacío");
    } catch (error) {
        res.write('El archivo no existe o no se puede leer');
    }
    res.end();
}

module.exports = {obtenerAutos, obtenerComics }