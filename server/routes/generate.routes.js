import express from "express";
import {
  generateJS,
  generatePython,
} from "../services/codeGenerator/generator.js";
import {
  generateEmojiJS,
  generateEmojiPython,
} from "../services/codeGenerator/emojiGenerator.js";

const router = express.Router();

router.post("/generate", (req, res) => {
  try {
    const { Language, objectName, properties, hasModes } = req.body;
    let code;
    if (objectName === "Emoji") {
      code = Language === "python" ? generateEmojiPython() : generateEmojiJS();
    } else {
      code =
        Language === "python"
          ? generatePython({ objectName, properties, hasModes })
          : generateJS({ objectName, properties, hasModes });
    }
    res.json({ code: code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
