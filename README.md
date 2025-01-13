# Automatic Intents

## Overview

This is a repository for building and running AI-driven chats.  __This can be used as an engine for many interactive workflows ( surveys, lessons, quizzes, etc.).__
This connects to AI models from openAI or Groq (which includes open source options). 

The goal here is 
1. Separate chat mechanics (what happens when user does XYZ) into an easy-to-understand file 
2. These chat files also provide the AI model with the information needed to control the chat.

# Getting started

This project has been developed and tested
on macOS Monterey (12.5.1) and macOS Sequoia (15.2)
running node `20.5.1`.

## using `nvm`
We support `nvm` via `.nvmrc`. Once nvm is installed, run `nvm use`;
you may need to run `` nvm install `cat .nvmrc` `` first.

We provide a one-stop shop script (`setupProjectWithnvm.sh`)
that will install the correct version of `node` via `nvm`
if `node` is NOT already installed. 


## installing dependencies
`npm install`

### API Keys

#### groq
https://console.groq.com/login

#### OpenAI
https://platform.openai.com/api-keys

#### API Key Names
We use the default API key names for both `groq` and `openai`;
see `.env.example` for more details.

## Running the Project
To execute the project run `npm run start`

## Testing the Project
### Unit Tests
To run the unit test, run `npm run test`
### Developing Unit Tests
To run the unit test so that they continuously run
while developing the project, run `npm run test-watch`

## Updating `node` version
If you ever need to update the version of `node` the project
depends on, run `updateNodeVersionsInSupportFiles.sh`. This script
will update both `.node-version` and `.nvmrc`.

## Technical Details 

- This repo includes: a node server ; web interface that interacts with openAI & Groq APIs for tools APIs.

- Chat details are separate files (JSON format) and are dynamically navigated by the model at runtime. What the user says/types, dictates what happens according to the chat file. 

- Every new response is called a page. Pages can have images. 

- "Intents" are labels that are learned by a model and connected to a specific functionality in your code.  In this repo, intents point to a "page" and the page contains its configuration.

- Intents use a prompt and "extra" instruction (optional)

- "Slots" are optional names and places  the model figures out from the user prompt.  You may use them in reponses in chat. Currently only one per chat message is returned.


## Chat Details

Example 1: text element
```
 {
      "id": "startPage",
      "type": "story",
      "background": "",
      "text": "You are in a forest and stumble across a monster.",
      "timer": 3
    }
```
Example 2: options element
```
 {
      "id": "quizPage",
      "type": "options",
      "background": "<giphy background>",
      "text": "Who is Vincent Van Gough",
    },
"options": [
        {
          "option": "my mother",
          "slot": "name",
          "nextSlideId": "motherPage"
        },...
```
```
<story> ::= {
  "pages": [ <page> ] 
}

<page> ::= {
  "id": <string>,
  "type": ("story" | "options" | "end"), 
  "options": [ <option> ]?, 
  "background": <string>?,  
  "text": <string>,
  "timer": <number>?, 
  "fallback": <string>?, 
  "nextSlideId": <string>?,
  "slot": <string>? 
}

<option> ::= {
  "option": <string>,
  "extra": <string>?,  
  "nextSlideId": <string>?, 
  "slot": <string>?  
}

<string> ::= "…"  
<number> ::= 1 | 2 | 3 | ... 
```
