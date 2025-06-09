import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  profileImage?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  kycDocumentUrl?: string;
  isDisabled: boolean;
  comparePassword(password: string): Promise<boolean>;
}


const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    phone:     { type: String, required: true },
    password:  { type: String, required: true },
    profileImage: { type: String, default: '' },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified',
    },
    kycDocumentUrl: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);


userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
