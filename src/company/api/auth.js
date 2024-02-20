import instance from "../../common/api/axios";

export const registerCompany = async (user) => {
    try {
        const response = instance.post("/registerCompany", user);
        return response;
    } catch (error) {
        console.log(error);
    }
}