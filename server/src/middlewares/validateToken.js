import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1]; // Obtén solo el token, omitiendo 'Bearer'
    // const token = req.cookies.token;
    console.log("Tokencito " , token);
    if (token === 'null') {
        return res.status(401).json({message: "No token, authorization denied"});
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return  res.status(403).json({message: "Invalid token"})

        req.user = user;
        next()
    })

}

export const authRequiredCompany = (req, res, next) => {
    const {tokenCompany} = req.cookies;
    console.log(tokenCompany);

    if(!tokenCompany) return res.status(401).json({
        message: "No token, suthorization denied"
    })

    jwt.verify(tokenCompany, TOKEN_SECRET, (err, company) => {
        if(err) return  res.status(403).json({message: "Invalid token"})

        req.company = company;
        next()
    })

}