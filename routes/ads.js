import express from "express";
import Ad from "../models/Ad.js";

const router = express.Router();

//Get all ads
router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Get ad by id
router.get("/:id", async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) res.json(ad);
    else res.status(404).json({ error: "Ad not found" });
  } catch (err) {
    res.status(500).json({ error: "Invalid ID" });
  }
});

//Create new ad
router.post("/", async (req, res) => {
  try {
    const ad = new Ad(req.body);
    const savedAd = await ad.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

//Delete ad
router.delete('/:id', async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

//Ad impression
router.post('/:id/view', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { impressions: 1 } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'View update failed' });
  }
});

//Ad click
router.post('/:id/click', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 }, $push: { clicksTimestamps: now } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Click update failed' });
  }
});

// Get ad by location
router.get("/by-location", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat/lng parameters" });
  }

  try {
    const ads = await Ad.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 50000
        }
      }
    });

    if (ads.length === 0) {
      return res.status(404).json({ error: "No ads found near your location" });
    }

    res.json(ads[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;