import express from 'express';

const app = express();
app.use(express.json());
const puerto = 8080;
const products = [];

//Inicializando el servidor.
const server = app.listen(puerto, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`);
})

//Si hay un error.
server.on('error', error => console.log(`Error en el servidor ${error}`))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Ocurrió un error. ${err.stack}`);
});

app.get('/api/productos/listar', (req, res) => {
    let response;
    if(products.length > 0)
        response = products;
    else
        response = { error : 'No hay productos cargados' }

    return res.json(response)
});

app.get('/api/productos/listar/:id', (req, res) => {
    let response;
    const id = parseInt(req.params.id);
    const product = products.filter(p => p.id === id);
    if(product.length > 0)
        response = product;
    else
        response = { error : 'Producto no encontrado' }
    
    return res.json(response)
});

app.post('/api/productos/guardar', (req, res) => {
    req.body.id = products.length + 1;
    products.push(req.body);
    return res.json(req.body);
});