import instance from "./axios";

export const registerRequest = async user => {
  try {
    console.log(user);
    const response = await instance.post(`/registerUser`, user);
    console.log(response);
    console.log("http response = " + response);
    return response;
  } catch (ex) {
    console.log("error.status:", ex);
    return ex
  }
}

export const registerCompanyRequest = async company => {
  try {
    const response = await instance.post(`/registerC`, company);
    console.log("http response = " + response.data);
  } catch (ex) {
    console.log("error.status:", ex);
    return ex
  }
}

export const loginRequest = async user => {
  try {
    const response = await instance.post(`/loginUser`, user);
    return response
  } catch (ex) {
    console.log("error.status:", ex);
    return ex
  }
}


export const verityTokenRequest = async user => {
  try {
    const response = await instance.get(`/verify`, user);
    return response
  } catch (ex) {
    console.log("error.status:", ex);
  }
}

export const logoutUser = async user => {
  try {
    const response = await instance.post(`/logoutUser`, user);
    return response
  } catch (ex) {
    console.log("error.status:", ex);
  }
}

export const getImage = async file => {
  try {
    const formData = new FormData();
    formData.append('miArchivo', file); // Agregar el archivo al objeto FormData
    console.log(formData.get('miArchivo'));
    const response = await instance.post(`/imageProfile`, formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getProfileImage = async () => {
  try {
    const response = await instance.get(`/getProfileImage`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUpdateStories = async file => {
  try {
    const formData = new FormData();
    formData.append('miArchivo', file); // Agregar el archivo al objeto FormData
    console.log(formData.get('miArchivo'));
    const response = await instance.post(`/addStories`, formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUpdateUser = async () => {
  try {
    const response = await instance.get(`/profileUser`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const sendPublications = async (file, Hola) => {
  try {
    const formData = new FormData();
    formData.append('publication', file); // Agregar el archivo al objeto FormData
    formData.append('Hola', Hola); // Agregar el texto al objeto FormData
    console.log(formData.get('miArchivo'));
    console.log(formData.get('Hola'));

    const response = await instance.post("/publications", formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getPublications = async () => {
  try {
    const response = await instance.get('/getPublications');
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
}

const deleteStories = async () => {
  try {
    const response = await instance.put('/deleteStories')
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export const reactionLike = async (reaction) => {
  try {
    const response = await instance.post('/reactionLike', reaction)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getAllPublications = async () => {
  try {
    const response = await instance.get('/getAllPublications');
    return response;
  } catch (error) {
    console.log(error);
  }
}


export const getProfile = async username => {
  const postData = {
    username: username,
    // Otros datos que deseas enviar
  };

  try {
    const response = await instance.post('/getProfile', postData);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    throw error; // Lanzar el error nuevamente o manejarlo de otra manera
  }
}