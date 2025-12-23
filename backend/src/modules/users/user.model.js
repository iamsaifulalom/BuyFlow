import { Schema, model } from 'mongoose';

// ENUMS
const UserRole = ['ADMIN', 'CUSTOMER'];
const AuthProvider = ['LOCAL', 'GOOGLE'];

// ==================== User Schema ====================
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  chats: [{ type: Schema.Types.ObjectId, ref: 'AIChatLog' }],
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  termsAccepted: { type: Boolean, default: false },
  verifyToken: { type: String },
  verificationSentAt: { type: Date },
  role: { type: String, enum: UserRole, default: 'CUSTOMER' },
  provider: { type: String, enum: AuthProvider, default: 'LOCAL' },
}, { timestamps: true });


export const User = model("User", UserSchema)