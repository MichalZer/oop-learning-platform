import express from "express";
import { generateCode } from "../generators/index.js";

const router = express.Router();

router.post("/generate", (req, res) => {
  try {
    const {
      language,
      objectName,
      properties,
      hasModes,
      hasMethods,
    } = req.body;

    // basic input validation
    if (!language || !objectName) {
      return res
        .status(400)
        .json({ message: "language and objectName are required" });
    }

    const data = { objectName, properties, hasModes, hasMethods };
    const code = generateCode(language, data);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
