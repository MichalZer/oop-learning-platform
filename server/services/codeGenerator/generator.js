export function generateJS({ objectName, properties, hasMethods }) {
  // Generate constructor parameters
  const constrauctorParams = properties.join(", ");

  //map every property to a line in the constructor body
  const props = properties
    .map((prop) => `this.${prop} = ${prop};`)
    .join("\n    ");
  let methods = "";

  // If the object has methods, add a describe method that logs a message to the console
  if (hasMethods) {
    methods = `describe() {console.log("This is a ${objectName} object created");}`;
  }
  return `class ${objectName} { constructor(${constrauctorParams}){${props}}${methods}}`;
}

// Similar to the JS generator, but with Python syntax
 export function generatePython({ objectName, properties }) {
    const params= properties.join(", "); 
    const props = properties.map((prop) => `self.${prop} = ${prop}`).join("\n        ");
    return `class ${objectName}:\n    def __init__(self, ${params}):\n        ${props}`;
 }