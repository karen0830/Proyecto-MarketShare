import app from '../src/app.js';
import connectDB from './db.js';

connectDB();

const port = 3000;
app.listen(port, () => {
  console.log("Servidor en el puerto", port);
});

