import {z} from "zod";

export const CompanyShema = z.object({
    companyName: z.string({
        required_error: 'companyName is reqquired'
    }),
    legalEntity: z.string({
        required_error: 'Legal entity is required'
    }),
    companyAddress: z.string({
        required_error: 'company Address is required'
    }),
    activityDescription: z.string({
        required_error: 'activity Description is required'
    }),
    phoneNumber: z.number({
        required_error: "Phone number is required"
    }),
    email:  z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Email is invalid',
    }),
    taxIdentity: z.number({
        required_error: "tax Identity is required"
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characteres',
    })
})

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Usename is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characteres',
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Email is Not Valid",
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characteres',
    })
})

export const loginCompanyShema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Invalid email",
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characteres',
    })
})