const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Uploads directory to store the files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage });

// Serve static files from the "uploads" directory
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Static Hosting Platform</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            header {
                background: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            main {
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            form {
                display: flex;
                flex-direction: column;
            }
            input[type="file"] {
                margin-bottom: 10px;
            }
            button {
                padding: 10px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            button:hover {
                background: #45a049;
            }
            h2, h3 {
                margin: 10px 0;
            }
            footer {
                text-align: center;
                padding: 10px 0;
                background: #f4f4f4;
                position: relative;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Static Hosting Platform</h1>
        </header>
        <main>
            <form action="/upload" enctype="multipart/form-data" method="POST">
                <input type="file" name="file" accept=".html,.css,.js" required />
                <button type="submit">Upload File</button>
            </form>
            <div id="result"></div>
        </main>
        <footer>
            <p>&copy; 2024 Your Name. All rights reserved.</p>
        </footer>
        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('URL copied to clipboard!');
                }, () => {
                    alert('Failed to copy the URL.');
                });
            }
        </script>
    </body>
    </html>
  `);
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/static/${req.file.originalname}`;
  
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Uploaded</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            header {
                background: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            main {
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2, h3 {
                margin: 10px 0;
            }
            button {
                padding: 10px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            footer {
                text-align: center;
                padding: 10px 0;
                background: #f4f4f4;
                position: relative;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Static Hosting Platform</h1>
        </header>
        <main>
            <h2>File uploaded successfully:</h2>
            <button onclick="copyToClipboard('https://sriramhosting.serveo.net${fileUrl}')">Copy File URL</button>
            <h3><a href="${fileUrl}" target="_blank">View File</a></h3>
        </main>
        <footer>
            <p>&copy; 2024 Your Name. All rights reserved.</p>
        </footer>
        <script>
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('URL copied to clipboard!');
                }, () => {
                    alert('Failed to copy the URL.');
                });
            }
        </script>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
