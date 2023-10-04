import instance from "./axios";

export const registerRequest = async user => {
  try {
    console.log(user);
    const response = await instance.post(`/register`, user);
    console.log("http response = " + response);
    return response;
  } catch (ex) {
    console.log("error.status:", ex);
  }
}

export const registerCompanyRequest = async company => {
  try {
    const response = await instance.post(`/registerC`, company);
    console.log("http response = " + response.data);
  } catch (ex) {
    console.log("error.status:", ex);
  }
}

export const loginRequest = async user => {
  try {
    const response = await instance.post(`/login`, user);
    return response
  } catch (ex) {
    console.log("error.status:", ex);
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

export const handleUpload = async () => {
  try {
    const response = await instance.post('/profileImage');
    console.log('Respuesta: ', response);
    return response;
  } catch (error) {
    console.log('Error:', error);
  }
};

  
  // const formData = new FormData();
  // formData.append('file', selectedFile);
  // try {
  //   const response = await instance.post('/profile', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     params: user,
  //   });
  //   console.log(response);
  //   console.log('Archivo subido con éxito');
  //   return response;
  // } catch (error) {
  //   console.error('Error al subir el archivo', error);
  //   // Puedes hacer más cosas con el error si lo deseas, como lanzar una excepción personalizada o notificar al usuario.
  // }



