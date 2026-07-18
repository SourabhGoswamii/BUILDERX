import mongoose from "mongoose";

export interface IUser {
  uid: string;
  phoneno: string;
  name: string;
  password: string;
  image?: string;
  role: "user" | "doctor" | "admin";
  isVerified: boolean;
  isPresent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    uid: {
      type: String,
      unique: true,
      default: function (this: any) {
        return `${this.name?.toLowerCase().replace(/\s+/g, "_")}_${new mongoose.Types.ObjectId().toString().slice(-8)}`;
      },
    },
    phoneno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ["user", "doctor", "admin"], required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isPresent: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
