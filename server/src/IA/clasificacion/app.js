import API_KEY_GEMINI from "../config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
async function malasPalabras(frase) {
  try {
    let prompt = `Evalúa si el siguiente comentario sobre un producto es relevante, respeta las normas de conducta sin utilizar malas palabras en esta parte evalua palabra por palabra. en ningún idioma, y está enfocado en la calidad, experiencia o características del producto, independientemente del idioma: "${frase}". Devuelve "true" en minúsculas si el comentario es apropiado y centrado en el producto, ya sea positivo o negativo, y "false" en minúsculas si el comentario es irrelevante, contiene malas palabras en cualquier idioma, no respeta las normas de conducta o no se centra en el producto.
    `;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text, " text");
    const resultBoolean = text.trim().toLowerCase() === 'true';
    return resultBoolean;
  } catch (error) {
    // Otro tipo de error
    console.error("Error en la búsqueda de malas palabras:", error);
    // Manejar el error y devolver un resultado adecuado
    // En este caso, podrías retornar true para indicar que el comentario no es adecuado
    return false;
  }
}


export async function classify_text(frase, req) {
  try {
    const resultBoolean = await malasPalabras(frase);
    req.malasPalabras = resultBoolean;
    req.Token = req.Token;
  } catch (error) {
    req.malasPalabras = false
    return error
  }
}

let frase = "eres un"
