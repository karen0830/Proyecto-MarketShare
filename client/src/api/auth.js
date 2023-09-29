import instance from "./axios";

export const registerRequest = async user => {
  try {
    const response = await instance.post(`/register`, user);
    console.log("http response = " + response.data);
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

