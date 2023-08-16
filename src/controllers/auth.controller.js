import CompanyModel from '../models/company.models.js'
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import  {createAcccessToken} from '../libs/jwt.js'

export const registerCompany =  async (req, res) => {
    const { companyName, legalEntity, companyAddress, activityDescription, phoneNumber, email, taxIdentity, password} = req.body;
    try{
        const hash = await bcrypt.hash(password, 10);
        const newCompany = new CompanyModel({
            companyName,
            legalEntity,
            companyAddress,
            activityDescription,
            phoneNumber,
            email,
            taxIdentity,
            password: hash
        })

        const companySaved = await newCompany.save()
        const tokenCompany = await createAcccessToken({id: companySaved._id})
        res.cookie("tokenCompany", tokenCompany)
        res.json({
            id: companySaved._id,
            companyName: companySaved.companyName,
            legalEntity: companySaved.legalEntity,
            companyAddress: companySaved.companyAddress,
            activityDescription: companySaved.activityDescription,
            phoneNumber: companySaved.phoneNumber,
            email: companySaved.email,
            taxIdentity: companySaved.taxIdentity,
            password: companySaved.password
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
export const register = async (req, res) => {
    const { email, username, password} = req.body;
    try {
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hash,
        })

        const userSaved = await newUser.save();
        const token = await createAcccessToken({id: userSaved._id})

        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
// Hola

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const companyFound = await CompanyModel.findOne({ email });

        if (!companyFound) {
            return res.status(400).json({ message: "User not found" });
        } 

        const isMatch = await bcrypt.compare(password, companyFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const tokenCompany = await createAcccessToken({ id: companyFound._id });
        console.log(tokenCompany);
        res.cookie("tokenCompany", tokenCompany);
        res.json({
            id: companyFound._id,
            companyName: companyFound.companyName,
            email: companyFound.email,
            createdAt: companyFound.createdAt,
            updatedAt: companyFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "User or password incorrect" });
        }

        const token = await createAcccessToken({ id: userFound._id });

        res.cookie("token", token);
        console.log(token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const logoutC = (req, res) => {
    res.cookie('tokenCompany', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile  = async (req, res) => {
    const userFound =  await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json({
        message: "User not found"
    })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.creatdAte,
        updatedAt: userFound.updatedAt,
    })
}

export const profileCompany  = async (req, res) => {
    const companyFound = await CompanyModel.findById(req.company.id);
    
    if(!companyFound) return res.status(400).json({
        message: "User not found"
    })

    return res.json({
        id: companyFound._id,
        companyName: companyFound.companyName,
        email: companyFound.email,
        createdAt: companyFound.creatdAte,
        updatedAt: companyFound.updatedAt,
    })
}

