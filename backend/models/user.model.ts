import mongoose, {Document, Model} from "mongoose";

export interface IUser {
    fullname: string;
    email: string;
    password: string;
    address: string;
    state: string;
    city: string;
    country: string;
    admin: boolean;
    lastLogin?: Date;
    isverified?: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpiresAt?: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
}

export interface IUserDocument extends IUser, Document{
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: "Enter your address"
    },
    state: {
        type: String,
        default: "Enter your state"
    },
    city: {
        type: String,
        default: "Enter your city"
    },
    country: {
        type: String,
        default: "Enter your country",
    },

    admin: {
        type: Boolean,
        default: false
    },

    // advanced authentication
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isverified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, {timestamps: true});

export const User : Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);
