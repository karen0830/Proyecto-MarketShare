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

export const sendPublications = async (publication) => {
  try {
    const response = await instance.post("/publications", publication);
    return response;
  } catch (error) {
    console.log("Error al crear la publicación:", error);
  }
};