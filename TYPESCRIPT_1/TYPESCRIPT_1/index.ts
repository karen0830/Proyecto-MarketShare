//tipo de dato numerico
let edad:number = 20;
//tipo boolean
let estado:boolean = false;
//tipo string
let nombre: string = "ADSO 321";
let mensaje = `Hola   ${nombre} tu edad es ${edad}`;
console.log(mensaje);
//tipo any(la usamos solo si se desconoce el tipo de dato que se guardara)
let peso: any = 30;
//condicional
if (peso >= 30){
  console.log("Ud pesa por lo menos 30");
}else{
  console.log("Ud pesa menos de 30");
}
peso = "treinta";
//arreglo de solo numeros
let arregloN: number[] = [2, 8, 9];
//arreglos
let arregloMixto:any = [true, "HOLA", 15, 10.7];
//lectura
console.log("-----", arregloMixto[1]);
//asignacion
arregloMixto[2] = 30;
//eliminacion
//aca eliminamos el elemnto de indice 0, y a partir
// de este solo eliminamos un elemento, es decir, él mismo
arregloMixto.splice(0, 1);
//agregacion
arregloMixto.push(400);
//copia independiente
let copiaArreglo = arregloMixto.slice();
console.log("arreglo copia sin modificar", copiaArreglo);
arregloMixto.splice(1, 1);
console.log("arreglo copia modificado el original", copiaArreglo);
//recorrido con forEach
console.log("----------------__");
arregloMixto.forEach((elemento: any) => {
  console.log(elemento);
})
//Objetos (llave-valor)
let diasSemana = {lunes: "Lunes", martes: "Martes", miercoles: "Miercoles", 2: "dos"};
//lectura
console.log(diasSemana.martes);
console.log(diasSemana["miercoles"]);
console.log(diasSemana[2]);
//escritura
diasSemana["lunes"] = "LUNES";
//eliminacion
delete diasSemana["lunes"];
console.log(diasSemana);
//asignacion
diasSemana["sabado"] = "Sabado";
//recorrido
console.log("----------+++++++");
for (const llave in diasSemana) {
    console.log(llave);
    console.log(diasSemana[llave]);
    console.log("-----------------");
}









