export const jsGenerator = ({ objectName, properties = [], hasMethods }) => {
  // handle built-in Emoji shortcut
  if (objectName === "Emoji") {
    return `
    class Emoji 
    {
        constructor(eyecolor,facecolor,mood){
            this.eyecolor = eyecolor;
            this.facecolor = facecolor;
            this.mood = mood;
        }

        speak(){
          if(this.mood === "happy")
          {
              console.log("I am a happy emoji!");
          }
          else if(this.mood === "sad")
          {
              console.log("I am a sad emoji!");
          }
        }
    }`;
  }

  const params = properties.join(", ");
  const props = properties
    .map((p) => `this.${p} = ${p};`)
    .join("\n    ");
  let methods = "";

  if (hasMethods) {
    methods = `\n  describe() { console.log("This is a ${objectName} object created"); }`;
  }

  return `
class ${objectName} {
  constructor(${params}) {
    ${props}
  }${methods}
}
`;
};
