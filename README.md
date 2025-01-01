# Automatic Intents

## Overview

This is a repository for building and running AI-driven chats.  __This can be used as an engine for many interactive workflows ( surveys, lessons, quizzes, etc.).__
This connects to AI models from openAI or Groq (which includes open source options). 

The goal here is 
1. Separate chat mechanics (what happens when user does XYZ) into an easy-to-understand file 
2. These chat files also provide the AI model with the information needed to control the chat.

## Prerequisites

1. You will need a key  - some are currently free-  from Groq: https://console.groq.com/docs/quickstart and/or openAI https://platform.openai.com/api-keys

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
