const fs = require("fs");
const path = require("path");

const directoryPath = path.join(
  __dirname,
  "src",
  "components",
  "landing-designs",
);

function processDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        let content = fs.readFileSync(fullPath, "utf8");
        let originalContent = content;

        // Remove Tailwind CSS delay classes like delay-100, delay-1000, delay-[1s], delay-[1.5s]
        const delayRegex = /\s*delay-(?:\[[a-zA-Z0-9.]+\]|\d+)\b/g;
        content = content.replace(delayRegex, "");

        // Speed up duration-500, duration-700, duration-1000 to duration-300
        content = content.replace(
          /\bduration-(?:500|700|1000)\b/g,
          "duration-300",
        );

        // Speed up custom animate syntax like animate-[fadeInUp_1s...] to 0.3s
        content = content.replace(
          /(_|\[)(\d+(?:\.\d+)?)s(_|\])/g,
          (match, p1, p2, p3) => {
            return `${p1}0.3s${p3}`;
          },
        );

        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, "utf8");
          console.log(`Processed ${entry.name}`);
        }
      }
    }
  } catch (err) {
    console.error("Error in directory:", dir, err);
    process.exit(1);
  }
}

console.log("Starting...");
processDirectory(directoryPath);
console.log("Finished processing.");
