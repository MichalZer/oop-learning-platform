import { jsGenerator } from "./jsGenerator.js";
import { pythonGenerator } from "./pythonGenerator.js";

export const generateCode = (language, data) => {
  switch (language) {
    case "python":
      return pythonGenerator(data);
    case "js":
    default:
      return jsGenerator(data);
  }
};
