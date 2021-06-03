import express from 'express';
import fs from 'fs';

const app = express();
const puerto = 8080;
let contadorItems = 0;
let contadorItemsRandom = 0;

//Inicializando el servidor.
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`);
})
//Si hay un error.
server.on('error', error => console.log(`Error en el servidor ${error}`))

app.get('/items', (req, res) => {
    contadorItems++;
    const products = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));    
    res.json({ items : products, cantidad: products.length })
});

app.get('/items-random', (req, res) => {
    contadorItemsRandom++;
    const products = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'));    
    let numRandom = Math.floor(Math.random() * (products.length));
    res.json({ item: products[numRandom] })
});

app.get('/visitas', (req, res) => {
    res.json({ visitas : { items : contadorItems, item: contadorItemsRandom } })
});