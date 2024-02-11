import instance from "./axios";


const ruta_protegida = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('token');
  const clienteAxios = instance.create({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return clienteAxios;
}

const clientAxios = ruta_protegida();

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

export const verityTokenRequest = async () => {
  // Recuperar el token del localStorage

  try {
    // Realizar la solicitud al servidor usando el cliente Axios configurado
    const response = await clientAxios.get('/verify');

    // Si la solicitud tiene éxito, puedes hacer lo que necesites con la respuesta
    console.log(response.data); // Aquí puedes hacer lo que necesites con la respuesta

    // Puedes devolver la respuesta si es necesario
    return response;
  } catch (error) {
    // Si ocurre un error durante la solicitud, lo manejas aquí
    console.error('Error al llamar a la ruta protegida:', error);

    // Puedes hacer lo que necesites en caso de error, como mostrar un mensaje al usuario o realizar alguna acción adicional
    // Si quieres devolver algo en caso de error, también puedes hacerlo aquí
  }

}

export const logoutUser = async () => {
  try {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    const response = await instance.post(`/logoutUser`);
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
    const response = await clientAxios.post(`/imageProfile`, formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getProfileImage = async () => {
  try {
    const response = await clientAxios.get(`/getProfileImage`);
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
    const response = await clientAxios.post(`/addStories`, formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUpdateUser = async () => {
  try {
    const response = await clientAxios.get(`/profileUser`);
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

    const response = await clientAxios.post("/publications", formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getPublications = async () => {
  try {
    const response = await clientAxios.get('/getPublications');
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
}

const deleteStories = async () => {
  try {
    const response = await clientAxios.put('/deleteStories')
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export const reactionLike = async (reaction) => {
  try {
    const response = await clientAxios.post('/reactionLike', reaction)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const getAllPublications = async () => {
  try {
    const response = await clientAxios.get('/getAllPublications');
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
    const response = await clientAxios.post('/getProfile', postData);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes manejar el error según tus necesidades
    throw error; // Lanzar el error nuevamente o manejarlo de otra manera
  }
}

export const addPublicationsVideo = async (file, Hola) => {
  try {
    const formData = new FormData();
    formData.append('publication', file); // Agregar el archivo al objeto FormData
    formData.append('Hola', Hola); // Agregar el texto al objeto FormData
    console.log(formData.get('miArchivo'));
    console.log(formData.get('Hola'));

    const response = await clientAxios.post("/addPublicationVideo", formData);
    console.log(file);
    return response;
  } catch (error) {
    console.log(error);
  }
}


