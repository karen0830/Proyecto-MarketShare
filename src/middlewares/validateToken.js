import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';
import { VerifyIdToken } from '../firebase.js';

export const authRequired = async (req, res, next) => {
    const idToken = req.cookies.token;

    if (!idToken) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }

    try {
        // Verificar el token de Firebase Authentication
        const decodedToken = await VerifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

export const authRequiredCompany = (req, res, next) => {
    const { tokenCompany } = req.cookies;
    console.log(tokenCompany);

    if (!tokenCompany) return res.status(401).json({
        message: "No token, suthorization denied"
    })

    jwt.verify(tokenCompany, TOKEN_SECRET, (err, company) => {
        if (err) return res.status(403).json({ message: "Invalid token" })

        req.company = company;
        next()
    })

}