import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  advertiser: String,
  category: String,
  duration: Number,
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  clickTimestamps: { type: [Date], default: [] },
  createdAt: { type: Date, default: Date.now },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
});

adSchema.index({ location: "2dsphere" });
const Ad = mongoose.model("Ad", adSchema);
export default Ad;
