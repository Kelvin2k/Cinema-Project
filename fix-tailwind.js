const fs = require("fs");
const path = require("path");

const outputCssPath = path.join(__dirname, "src", "output.css");

try {
  let css = fs.readFileSync(outputCssPath, "utf8");

  // Replace infinity with 9999px for border-radius
  css = css.replace(
    /border-radius:\s*calc\(infinity\s*\*\s*1px\);/g,
    "border-radius: 9999px;"
  );

  fs.writeFileSync(outputCssPath, css, "utf8");
  console.log("✓ Fixed Tailwind CSS infinity issue");
} catch (error) {
  console.error("Error fixing Tailwind CSS:", error);
  process.exit(1);
}
