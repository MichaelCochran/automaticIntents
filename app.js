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
            fs.writeFile('public/chat/examples/'+fileName, fileContents, (err) => {
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
    const filePath = path.join('/chat/examples/', fileName);
console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // Check for "File not found" error
                res.send('missing');
            } else {
                console.error(`Error reading file: ${err}`);
                res.status(500).send('Internal Server Error');
            }

        }
        else {

        res.send(data);
        //logToFile('Data:'+ data);
            }
    })
});


// Using LLM's APIs to create and run intents

// Use models as middleware to find intent
app.post('/middleware', async (req, res) => {
    try {
        const { prompt, model, options } = req.body;

        logThis('Model:'+ model);
        logThis('Prompt:'+ prompt);
        logThis('Options:'+ options);
        // Await the result of runConversation
        const result = await runConversation(prompt, options, model);

        // Now log the result JSON.stringify(result)
        logThis('Result:'+ JSON.stringify(result));
        // Send the response
        res.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        logThis("Error:",error)
        res.status(500).json({ error: "Internal Server Error" });
    }
});


function logThis(message) {

    const logFilePath = 'usage.log'; // Specify your log file path
    const logEntry = `[${new Date().toISOString()}] ${message}\n`; // Format the log entry

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error appending to log file:', err);
        }
    });
}


//Starting your http server
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
