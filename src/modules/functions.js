import OpenAI from "openai";
const openai = new OpenAI();
import {Groq} from 'groq-sdk';
//import main from "./chat.js";

//import { config } from 'config.js';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


//When openAI finds user prompts with greeetings, it calls this.

function createFunctionsFromOptions(options) {

    const functionMap = {}; // To store the dynamically created functions

    for (const option of options) {
        const pageName = option.nextSlideId;
        functionMap[pageName] = (details) => { // Create the function dynamically
            console.log(option.nextSlideId, 'called', details);
            return JSON.stringify({
                details: details,
                pageName: pageName
            });
        };
    }

    return functionMap; // Return the array of functions
}



async function runConversation(userInput, optionData, model) {

    const userQuery = userInput.toString();
    console.log('log:', model, optionData[0], optionData.length)


    // Create functions

    function createOption(name, text, slot) {
        const option = {
            type: "function",
            function: {
                name: name,
                description: text,
                parameters: {
                    type: "object",
                    properties: {
                        details: {
                            type: "string",
                            description: text
                        }
                    },
                    required: ["details"]
                }
            }
        };

        // Add the slot property if it's provided
        if (slot !== undefined) {
            option.function.parameters.properties.slot = {
                type: "string",
                description: slot
            };

            // Update the required array if necessary
            option.function.parameters.required.push("slot");
        }

        return option;
    }

    let some = [];
    optionData.forEach((opt) => {
        // If there's an extra property extra add it
        let extra = (opt.hasOwnProperty('extra')) ? opt.hasOwnProperty('extra') : " ";
        let optionDescription = `${opt.option} ; ${extra} `
        some.push(createOption(opt.nextSlideId, optionDescription, opt.slot));
        console.log("---", optionDescription);
    });
  
    const tools = some;
    //literal no content: `You are a conversation engine with natural language.  Look for the best match among the functions provided. If you dont find a good match, do not generate an answer, use the fallback function   `
    //If there are no matches and there is a function called fallback, use that.
    //       content: "You are a helpful assistant that matches user responses to the closest valid option. Even if there's no exact match, choose the option that's most similar in meaning."
    //content: "You are a conversation engine. Find the function where the details contain words or sentiment in description are closest to the user content. The user content may contain only parts of the details. Find the closest match" },
    const sysPrompt = "You are a classifier with concepts.Matching of the user prompt to the details variable in the functions. Look for the best match.  Select the function with the highest degree of  similarity or sentiment. Consider both the sentiment first, then literal words used and  synoyms and partial matches. Examples: A:'I like coffee' B:I am going to the cafe. 'I like coffee with cream' ,'java','latte' all match A. 'place to eat', 'I\'m going to lunch' match B."
    const finalPrompt =  sysPrompt;
    const messages = [
        {
            role: "system",
            content: finalPrompt
       //     content: `You are a classifier with concepts.Matching of the user prompt to the details variable in the functions. Look for the best match.  Select the function with the highest degree of  similarity or sentiment. Consider both the sentiment first, then literal words used and  synoyms and partial matches. Examples: A:'I like coffee' B:I am going to the cafe. 'I like coffee with cream' ,'java','latte' all match A. 'place to eat', 'I\'m going to lunch' match B.`
            },

        {role: "user", content: `"${userInput}"`},
    ];
    let response;
    try {
        if (model.includes('gpt')) {
            response = await openai.chat.completions.create({
                model: model,
                messages: messages,
                tools: tools,
                tool_choice: "auto",
            });
        } else {
            response = await groq.chat.completions.create({
                messages: messages,
                model: model,
                temperature:0.9,
                tools: tools,
                tool_choice: "auto"
            });
        }

        console.log("->-", response.choices[0].message.tool_calls[0]);
        return response.choices[0].message.tool_calls[0];
    } catch (e) {
        console.log(e);
    }
}


export default runConversation
