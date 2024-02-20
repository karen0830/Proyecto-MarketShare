import instance from "./axios";

const ruta_protegida = () => {
  // Recuperar el token del localStorage
  const token = localStorage.getItem('tokenCompany');
  if (token) {
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    return clienteAxios;
  }else{
    const clienteAxios = instance.create({
      headers: {
        'authorization': `Bearer null`
      }
    });
    return clienteAxios;
  }
}


export const registerCompanyRequest = async company => {
  try {
    const response = await instance.post(`/registerCompany`, company);
    return response;
  } catch (ex) {
    return ex
  }
}

export const loginRequestCompany = async company => {
  try {
    const response = await instance.post(`/loginCompany`, company)
    return response;
  } catch (error) {
    return error;
  }
}

export const verityTokenRequestCompany = async () => {
  // Recuperar el token del localStorage

  try {
    // Realizar la solicitud al servidor usando el cliente Axios configurado
    const response = await ruta_protegida().get('/verifyCompany');

    // Si la solicitud tiene éxito, puedes hacer lo que necesites con la respuesta

    // Puedes devolver la respuesta si es necesario
    return response;
  } catch (error) {
    // Si ocurre un error durante la solicitud, lo manejas aquí
    console.error('Error al llamar a la ruta protegida:', error);

    // Puedes hacer lo que necesites en caso de error, como mostrar un mensaje al usuario o realizar alguna acción adicional
    // Si quieres devolver algo en caso de error, también puedes hacerlo aquí
  }
}