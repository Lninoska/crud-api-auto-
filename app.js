const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid')


http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);

    if (pathname == '/autos' && req.method == 'GET') {
        try {
            const lecturaArchivo = await fs.readFile('autos.txt', 'utf-8');
            res.write(lecturaArchivo || "El archivo esta vacio");
        } catch (error) {
            res.write('El archivo no existo o no se puede leer')
        }
        res.end();

    }
    if (pathname == '/autos' && req.method == 'POST') {
        try {
            let archivoOriginales = {};
            try {
                archivoOriginales = await fs.readFile('autos.txt', 'utf-8');
            } catch (error) {
            }
            const datos = JSON.parse(archivoOriginales)
            const id = uuidv4();

            req.on('data', async (data) => {
                try {
                    datosAutos = JSON.parse(data);
                    datos[id] = datosAutos

                    await fs.writeFile('autos.txt', JSON.stringify(datos, null, 2))
                    res.write('Auto agregado existosamente')
                    res.end();
                } catch (error) {
                    res.write('Error al procesar los datos reicibidos');
                    res.end();
                }
            })
        } catch (error) {
            res.write('Error al procesar la solicitud');
            res.end();
        }
    }
    if (pathname == '/autos' && req.method == 'PUT') {
        const datosArchivo = await fs.readFile('autos.txt', 'utf-8');
        const objetoArchivoOriginal = JSON.parse(datosArchivo);

        req.on('data', async (datos) => {
            const datosParamodificar = JSON.parse(datos);
            const { id } = datosParamodificar;
            const datosOriginal = objetoArchivoOriginal[id]
            const autosActualizado = { ...datosOriginal, ...datosParamodificar }

            res.write(JSON.stringify(autosActualizado, null, 2))
            res.end();
        })
        if (pathname == '/autos' && req.method == 'DELETE') {
            const autosOriginales = await fs.readFile('autos.txt', 'utf-8');
            const objetoArchivoOriginal = JSON.parse(autosOriginales);
            const id = params.get('id');

            if (objetoArchivoOriginal[id]) {
                delete objetoArchivoOriginal[id]
                await fs.writeFile('autos.txt', JSON.stringify(objetoArchivoOriginal, null, 2))
                res.write('El auto ha sido eliminado existosamente')
            } else {
                res.write('El auto con el id especificado no existe');
            }
            res.end()
        }
    }
})
    .listen(3000, function () {
        console.log('Servidor iniciando en puerto 3000')
    })