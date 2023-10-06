import app from '../src/app.js';
import connectFirebase from './firebase.js';

connectFirebase()

const port = 3000;
app.listen(port, () => {
  console.log("Servidor en el puerto", port);
});

