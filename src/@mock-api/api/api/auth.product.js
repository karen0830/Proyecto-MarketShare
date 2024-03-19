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
    } else {
        const clienteAxios = instance.create({
            headers: {
                'authorization': `Bearer null`
            }
        });
        return clienteAxios;
    }
}

export const addProduct = async dataProduct => {
   try {
    const response = ruta_protegida().push("/addProducts", dataProduct);
    return response
   } catch (error) {
    console.log(error);
   }
}

export const updateProductId = async dataProduct => {
    try {
        console.log("dataP", dataProduct);
     const response = ruta_protegida().put("/updateProduct", dataProduct);
     return response
    } catch (error) {
     console.log(error);
    }
 }