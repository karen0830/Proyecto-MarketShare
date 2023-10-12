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

  export const logoutUser= async user => {
    try {
      const response = await instance.post(`/logoutUser`, user);
      return response
    } catch (ex) {
      console.log("error.status:", ex);
    }
  }

