import express from 'express';
import fs from 'fs';
import { openWebPage } from './miarchivo.js';

const app = express();
//const port = 3001;

// Servir archivo HTML
app.get('/', (req, res) => {
    const htmlContent = fs.readFileSync('./resultado.html', 'utf8');
    res.send(htmlContent);
});

// Endpoint para obtener los datos del RUC
app.get('/scrape', async (req, res) => {
    const numRuc = req.query.numRuc;
    if (!numRuc) {
        return res.status(400).send('Por favor, proporcione un RUC válido.');
    }

    try {
        const result = await openWebPage(numRuc);
        res.send(result);
    } catch (error) {
        console.error("Error al consultar RUC:", error);
        res.status(500).send('Ocurrió un error al consultar el RUC.');
    }
});

/*
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/
app.listen(process.env.PORT||3001)
console.log('server listo, corriendo puerto',process.env.PORT||3001)
