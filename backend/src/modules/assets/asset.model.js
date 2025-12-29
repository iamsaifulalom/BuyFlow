import 'dotenv/config';
import mongoose from "mongoose";

const AssetStatus = Object.freeze(["TEMP", "USED"]);
const AssetType = Object.freeze(["image", "video", "pdf"]);

const assetSchema = new mongoose.Schema({
  filePath: { type: String, required: true, trim: true }, // relative path of s3 bucket
  type: { type: String, enum: AssetType, required: true },
  size: { type: Number, required: true, min: 1 },
  key: { type: String, required: true, min: 1, trim: true },

  originalName: { type: String, required: true, trim: true },
  altText: { type: String, trim: true },

  duration: { type: Number, min: 0 },
  width: { type: Number, min: 1 },
  height: { type: Number, min: 1 },
  pages: { type: Number, min: 1 },

  status: { type: String, enum: AssetStatus, default: "TEMP", index: true },
  usedByIds: { type: [String], default: [] }
}, { timestamps: true, versionKey: false });

assetSchema.virtual("url").get(function () {
  if (!process.env.CDN_BASE_URL) return this.filePath;
  return `${process.env.CDN_BASE_URL}/${this.filePath}`;
});

assetSchema.set("toJSON", {
  virtuals: true, versionKey: false, transform: (doc, ret) => {
    delete ret.id; // remove the automatic id virtual
    return ret;
  }
});

assetSchema.set("toObject", {
  virtuals: true, versionKey: false, transform: (doc, ret) => {
    delete ret.id; // same for toObject
    return ret;
  }
});

export const Asset = mongoose.model("Asset", assetSchema);
