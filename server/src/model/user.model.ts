import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, {
  Document,
  type CallbackWithoutResultAndOptionalError,
} from "mongoose";
import CONFIG from "../config/config";

interface IUser extends Document {
  name: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  isPasswordCorrect(password: string): Promise<Boolean>;
  generateToken(): string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "name field is require"],
  },
  email: {
    type: String,
    required: [true, "email field is require"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
});

userSchema.pre<IUser>(
  "save",
  async function (this: IUser, next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    { id: this._id, email: this.email },
    CONFIG.ACCESS_TOKEN_SECRET,
    { expiresIn: Number(CONFIG.ACCESS_TOKEN_EXPIRY) }
  );
};

const UserModel = mongoose.model<IUser>("user", userSchema);

export { UserModel, type IUser };
