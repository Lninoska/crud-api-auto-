const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

import { obtenerAutos, obtenerComics } from './get';
import { actualizarAuto, actualizarComic } from './put';
import { agregarAuto, AgregarComics } from './post';
import { eliminarComic, eliminarauto } from './delete';

import { crearComic } from './crear';

http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);

    if (pathname == '/autos') {
        if (req.method == 'GET') {
            obtenerAutos(req, res);
            obtenerComics(req, res);

        } else if (req.method == 'POST') {
            agregarAuto(req, res);
            AgregarComics(req, res);

            let datosComic;
            req.on('data', (data) => {
                datosComic = JSON.parse(data);
            })
            req.on('end', async  () => {
                await crearComic(datosComic);
                res.write("Comic agregado exitosamente");
                res.end()
            })

        } else if (req.method == 'PUT') {
            actualizarAuto(req, res);
            actualizarComic(req, res);

        } else if (req.method == 'DELETE') {
            eliminarComic(req, res);
            eliminarauto(req, res)
        }
    }
}).listen(3000, function () {
    console.log('Servidor iniciando en puerto 3000');
});
