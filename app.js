// server.js
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
// importing modules for each API example
import runConversation from "./src/modules/functions.js";

// Setting up local environment
const port = 3000;
const host = 'localhost';

// Setting up middleware
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json());

// Setting up Routes **

app.post('/create-file', (req, res) => {
    const { fileName, fileContents } = req.body;

    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, create it
            fs.writeFile('public/user/'+fileName, fileContents, (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    res.status(500).send('Error creating file');
                } else {
                    console.log('File created successfully!');
                    res.send('File created successfully');
                }
            });
        } else {
            // File exists, overwrite it
            fs.writeFile(fileName, fileContents, (err) => {
                if (err) {
                    console.error('Error overwriting file:', err);
                    res.status(500).send('Error overwriting file');
                } else {
                    console.log('File overwritten successfully!');
                    res.send('File overwritten successfully');
                }
            });
        }
    });
});

//Reads files from /user/<fileName>
app.get('/file', (req, res) => {
    const fileName = req.query.fileName;
    const filePath = path.join('/user', fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // Check for "File not found" error
                res.send('missing');
            } else {
                console.error(`Error reading file: ${err}`);
                res.status(500).send('Internal Server Error');
            }
            return;
        }

        res.send(data);
    });
});


// Using LLM's APIs to create and run intents

// Use models as middleware to find intent
app.post('/middleware', async (req, res) => {
    try {
        const { prompt, model, options } = req.body;
        console.log('---->', model);
        // Await the result of runConversation
        const result = await runConversation(prompt, options, model);

        // Now log the result
        console.log('---->', result);

        // Send the response
        res.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//Starting your http server
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
