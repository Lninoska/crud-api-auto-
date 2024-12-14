const fs = require('fs/promises');
const { v4:uuidv4 } = require('uuid')

const crearComic = async (nuevoComic) => {
    const archivoOriginal = await fs.readFile('comics.txt', 'utf-8');
    const datosOriginales = JSON.parse(archivoOriginal);
    const id = uuidv4();

    datosOriginales[id] = nuevoComic;
    await fs.writeFile('comics.txt', JSON.stringify(datosOriginales, null, 2))

}

module.exports = { crearComic: crearComic }