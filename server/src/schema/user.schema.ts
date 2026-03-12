import { models, model, Schema } from "mongoose";
 
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

interface User extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  resetPasswordOtp?:string;
  resetPasswordExpires? : Date,
  role: string;
  name: string;
  address: string;
  otpCode?: string;
  otpExpires?: Date;
  phoneNumber: string,
  userName: string,
  refreshToken: string,
  ttl?: Date;
}

const UserSchema = new Schema<User>({
    name: { type: String},
    email: { type: String, required: true, unique:true},
    password: { type: String, required: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: UserRole.USER },
    isVerified: { type: Boolean, default: false },
    address: { type: String},
    otpCode: { type: String },
    otpExpires: { type: Date },
    phoneNumber: {type: String},
    resetPasswordOtp: {type: String, required: false},
    resetPasswordExpires: {type: Date, required: false},
    userName: { type:String},
    refreshToken: { type:String },
     ttl: { type: Date, required: false },
}, 
{ timestamps: true });

export const UserModel = model<User>("User", UserSchema);