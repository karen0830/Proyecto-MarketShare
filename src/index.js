import app from '../src/app.js';
import connectDB from './db.js';
import connectFirebase from './firebase.js';

connectFirebase()
connectDB();

const port = 3000;
app.listen(port, () => {
  console.log("Servidor en el puerto", port);
});

