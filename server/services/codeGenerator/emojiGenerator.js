export function generateEmojiJS() {
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
            console.log("I am a sad emoji!");\
            }
    }`;
}

// Similar to the JS generator, but with Python syntax
export function generateEmojiPython() {
  return `class Emoji:
    def __init__(self, eyecolor, facecolor, mood):
        self.eyecolor = eyecolor
        self.facecolor = facecolor
        self.mood = mood`;
}
