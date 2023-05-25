"use strict";
// ● Dos variables lógicas
// ● Dos variables numéricas
// ● Dos variables any
// ● Dos variables string
// ● Cree una plantilla de strings para mostrar un mensaje de bienvenida al usuario luego de
// registrarse en nuestro sitio, por ejemplo. “Bienvenida Paula Pérez a nuestro sitio web, gracias por
// registrarte”. Este template debe usar dos variables, nombres y apellidos
let trues = true;
let falses = false;
let numero1 = 23234;
let numero2 = 34;
let nombres = null;
let apellidos = null;
if (nombres == null && apellidos == null) {
    console.log("Usted no se ha registrado");
}
else
    console.log(`Bienvenido ${nombres} ${apellidos} a nuestro sitio web`);
// Declare e inicialice:
// ● Una variable array de números que contenga cinco elementos e imprima cada uno de sus
// elementos.
// ● Una variable array de strings que contenga cinco elementos e imprima cada uno de sus
// elementos.
// ● Recorra cada array creado usando for-of e imprimiendo cada uno de sus elementos
// Investigue: cómo eliminar elementos de un array, agregar elementos, leer y actualizar elementos.
// Implemente ejemplos prácticos.
let array;
array = [1, 2, 4, 5, 6];
console.log(array[0]);
console.log(array[1]);
console.log(array[2]);
console.log(array[3]);
console.log(array[4]);
console.log("-------------------");
let numberEliminar = 2;
// eliminar
array.splice(3, 0);
// agregar con metodo push también se puede agregar pero al final
//  con el metodo unshift se agregn elemntos al principio del arreglo
array.splice(2, 0, 3);
for (let index of array) {
    console.log(index);
}
// ● Una variable tipo objeto cuyos valores sean los días de la semana
// ● Una variable tipo objeto cuyos valores sean los números del 0 al 9
// ● Recorra cada objeto creado usando for-in e imprimiendo cada uno de sus valores
let object = {
    dia1: "Domingo",
    dia2: "Lunes",
    dia3: "Martes",
    dia4: "Miercoles",
    dia5: "Jueves",
    dia6: "Viernes",
    dia7: "Sabado",
};
let objectNumeros = {
    numero1: 0,
    numero2: 1,
    numero3: 2,
    numero4: 3,
    numero5: 4,
    numero6: 5,
    numero7: 6,
    numero8: 7,
    numero9: 8,
    numero10: 9,
};
// ciclo for - in
for (let variable in object) {
    console.log(variable, ": ", object[variable]);
}
// ACTIVIDAD
// Cree una función con un paraḿetro opcional tipo boolean, uno por defecto tipo string, y uno obligatorio de
// tipo number. Haga el llamado a la función.
const funcionParametros = function (boolens, strings, numero = 3455) {
    boolens = numero >= 18;
    let mayor = "";
    if (boolens) {
        mayor = "mayor de edad";
    }
    else
        mayor = "menor de edad";
    console.log(`${strings} con la edad de: ${numero} es ${mayor} ${boolens}`);
};
funcionParametros(true, "karen", 13);
// Cree una variable tipo función que tenga como parámetros dos números y retorne su suma, haga el
// llamado a la función.
const suma = function (numero, numero1) {
    return numero + numero1;
};
console.log(suma(2, 23));
// Use setTimeOut para implementar un callback que se llame a los 5 segundos e imprima por consola el
// mensaje “HOLA ADSI”
const p = setTimeout(function (parameters) {
    console.log("HOLA ADSI");
}, 5000);
const funcionFlecha = () => console.log("Hola adso");
funcionFlecha();
// Cree una función flecha que tenga como parámetro edad y retorne un string que le diga al usuario cuál
// fue la edad pasada como argumento, imprima el valor devuelto por la función. Use paréntesis para el
// parámetro y omita la palabra reservada return.
const funcionF = (edad) => console.log(`la edad ingresada es: ${edad}`);
funcionF(23);
// Cree una función flecha que tenga como parámetros dos números y retorne el producto de éstos,
// imprima el valor devuelto por la función. Use paréntesis para agrupar los parámetros, no use la palabra
// reservada return.
const flecha = (numero1, numero2) => console.log(`producto de ${numero1} y ${numero2} es: ${numero1 * numero2}`);
flecha(2, 1);
// Cree una función flecha que tenga como parámetros dos números y retorne el módulo de éstos, imprima
// el valor devuelto por la función. La función debe tener dos instrucciones, una donde se declare e inicialice
// la variable módulo que contendrá el módulo de los dos números y la otra donde se retorne la variable
// módulo. Use paréntesis para agrupar los parámetros, use llaves para agrupar las dos instrucciones.
const fecha = (numero1, numero2) => {
    let modulo = numero1 % numero2;
    return console.log("modulo de: ", numero1, " y ", numero2, ": ", modulo);
    ;
};
fecha(8, 2);
// Investigue: Desestructuración de objetos y arreglos. Implemente 3 ejemplos prácticos diferentes a los
// planteados en la guía de Typescript
const persona = { nombre: 'Juan', edad: 30 };
const { nombre: nombrePersona, edad: edadPersona } = persona;
console.log(nombrePersona); // Resultado: 'Juan'
console.log(edadPersona); // Resultado: 30
// Desestructura el arreglo 'numeros' para obtener los valores 2 y 4 en variables separadas.
const numeros = [1, 2, 3, 4, 5];
// Tu código aquí
const [, a, , b, ,] = numeros;
console.log(a);
console.log(b);
//2
const estudiante = {
    nombre: 'María',
    edad: 21,
    carrera: 'Ingeniería'
};
// Desestructuración de objeto con anotaciones de tipo
const { nombre, edad, carrera } = estudiante;
console.log(nombre); // Resultado: 'María'
console.log(edad); // Resultado: 21
console.log(carrera); // Resultado: 'Ingeniería'
//3
const valores = [1, 2, 3, 4, 5];
// Tu código aquí
const [n, , , , o] = valores;
console.log(n); // Resultado: 1
console.log(o); // Resultado: 3
