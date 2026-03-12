import mongoose, { Model, model, models, Schema} from "mongoose";

enum UserRole {
    USER= "USER",
    ADMIN = "ADMIN",
}

    type User= {
    _id?:string;
    email: string;
    password: string
    phoneNumber: string;
    address: string;
    role: UserRole;
    name: string;
    isVerified: boolean;
    ttl?: Date;
    verificationToken?: string;
    refreshToken: string,
    resetPasswordOtp?: string; 
    resetPasswordExpires?: Date;
    // orderedFoods: mongoose.Types.ObjectId[];
    };


    const UserSchema= new Schema<User>({
     _id: { type: Schema.Types.ObjectId },
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: Object.values(UserRole), default: UserRole.USER},
    isVerified: { type: Boolean, default: false, required: false},
    ttl: { type: Date, required: false },
    verificationToken: { type: String },
    phoneNumber: {type: String},
    address: {type: String, required: true},
    refreshToken: { type:String },
    resetPasswordOtp: { type: String },
    resetPasswordExpires: { type: Date },
    // orderedFoods: { type: Schema.Types.ObjectId[] },
   },
   {timestamps: true},
  );

  UserSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export const UserModel:Model<User>= models["User"] || model("User", UserSchema);