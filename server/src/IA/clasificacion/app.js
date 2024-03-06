import API_KEY_GEMINI from "../config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
async function malasPalabras(frase, req) {
  try {
    let prompt = `busca malas palabras en todos los paises (frase por frase) en la siguiente frase ${frase}, si las hay, manda true en minuscula y si no manda false en minuscula`
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const resultBoolean = text.trim().toLowerCase() === 'true';
    return resultBoolean;
  } catch (error) {
    // Otro tipo de error
    console.error("Error en la búsqueda de malas palabras:", error);
    // Manejar el error y devolver un resultado adecuado
    // En este caso, podrías retornar true para indicar que el comentario no es adecuado
    return true;
  }
}


export async function classify_text(frase, msg, req) {
  try {
    const resultBoolean = await malasPalabras(frase);
    console.log("Malas P", resultBoolean);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(msg);
    const response = await result.response;
    const text = response.text();
    const resultBooleanRelacion = text.trim().toLowerCase() === 'true';
    console.log("booleano", resultBooleanRelacion); // Salida: true o false según el texto devuelto
    console.log("IA", text);
    console.log("relacionado: ", text);
    req.malasPalabras = resultBoolean;
    req.relacion = resultBooleanRelacion;
    req.Token = req.Token;
  } catch (error) {
    return error
  }
}

let frase = "eres un"
