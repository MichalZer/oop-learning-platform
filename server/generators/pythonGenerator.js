export const pythonGenerator = ({ objectName, properties = [], hasMethods }) => {
  if (objectName === "Emoji") {
    return `class Emoji:
    def __init__(self, eyecolor, facecolor, mood):
        self.eyecolor = eyecolor
        self.facecolor = facecolor
        self.mood = mood`;
  }

  const params = properties.join(", ");
  const props = properties
    .map((p) => `self.${p} = ${p}`)
    .join("\n        ");

  return `
class ${objectName}:
    def __init__(self, ${params}):
        ${props}

obj = ${objectName}(${params})
print(obj)
`;
};
