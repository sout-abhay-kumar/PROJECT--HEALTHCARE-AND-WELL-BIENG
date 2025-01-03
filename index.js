const http = require("http");
const fs = require("fs");
const path = require("path");
const publicFolder = path.join(__dirname);

// Create the server
const myServer = http.createServer((req, res) => {

// Log new request
console.log(`New Request: ${req.url}`);

// Resolve the requested file path
let filePath = path.join(
  publicFolder,
  req.url === "/" ? "index.html" : req.url
);

// Determine the content type based on the file extension
const extname = String(path.extname(filePath)).toLowerCase();
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const contentType = mimeTypes[extname] || "application/octet-stream";

// Read and serve the file
fs.readFile(filePath, (err, content) => {
  if (err) {
    if (err.code === "ENOENT") {
      // File not found
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>", "utf-8");
    } else {
      // Server error
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`, "utf-8");
    }
  } else {
    // Serve the file
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Start the server
myServer.listen(3000, "0.0.0.0", () => {
  console.log("Server Started!");
});
