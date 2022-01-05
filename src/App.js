const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('./modules/socket')

const app = express();
const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

const server = http.createServer(app);

socket.init(server);

server.listen(8000,()=>{
  // eslint-disable-next-line no-console
  console.log('Server Started at Port, 8000');
});
