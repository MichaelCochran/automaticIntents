# Automatic Intents

## Overview

This is a repository for building and running AI-driven chats.  __A chat is simply an interactive workflow ( so the basis of surveys, lessons, quizes, etc).__
You can use AI models from openAI or via Groq. You will need a key, and some are currenlty free. 

## Technical Details 

Includes a node server and a web interface that interacts with openAI & Groq APIs for tools support

Chat mechanics are separated (JSON format) and are dynamically navigated by the model at runtime.

"Intents" map to pages/slides that can have timed or  be “interactive” 

Intents use a prompt and "extra" instruction (optional)

"Slots" are names and places in a user prompt you may use for processing.  Currently only one per chat message is returned.

Tools are built dynamically from the JSON chat template.

The medical center example can only respond to data in the example data file.

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
