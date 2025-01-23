
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback( new error('no permitido'))
    }
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});



routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler)




app.listen(port, () => {
  console.log(`Mi Server Corriendo en el puerto ${port}`)
});
