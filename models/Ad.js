import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  thumbnailUrl: String,
  advertiser: String,
  category: String,
  duration: Number,
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  clickTimeStamps: {type: [Date], default: []},
  createdAt: { type: Date, default: Date.now },
});

const Ad = mongoose.model("Ad", adSchema);
export default Ad;