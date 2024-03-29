const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./routes');

app.use(cors());

app.use('/api', router);

app.listen(8000,()=>{
  // eslint-disable-next-line no-console
  console.log('Server Started at Port, 8000');
});
 