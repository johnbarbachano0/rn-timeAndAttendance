require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const baseUrl = process.env.POSITIONSTACK_BASEURL;
const key = process.env.POSITIONSTACK_API_KEY;

//Geocoding type: 1 = forward || 2 = reverse
router.get("/", async (req, res, next) => {
  const { type, lat, lon } = req.query;
  const geocodingType = type === 1 ? "forward" : "reverse";
  const url = `${baseUrl}/${geocodingType}?access_key=${key}&query=${lat},${lon}&output=json`;
  fetch(url)
    .then((response) => response.json())
    .then(({ data }) => res.send(data[0]))
    .catch((error) => res.send({}));
});

module.exports = router;
