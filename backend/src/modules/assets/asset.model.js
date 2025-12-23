import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["image", "video", "pdf", "audio", "doc"],
      index: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number, // bytes
      required: true,
      min: 1,
    },

    originalName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      trim: true,
    },

    altText: {
      type: String,
      trim: true,
    },

    duration: {
      type: Number, // seconds (video/audio)
      min: 0,
    },

    width: {
      type: Number,
      min: 1,
    },

    height: {
      type: Number,
      min: 1,
    },

    pages: {
      type: Number, // PDF pages
      min: 1,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);

export const Asset = mongoose.model("Asset", assetSchema);
