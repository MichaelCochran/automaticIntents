import {BotName, getGroqBot, getOpenAIBot, getUninsatiatedBotError} from "../bots.js";
import OpenAI from "openai";
const Groq = require("groq-sdk"); // Jest can't pull this in with "import"

describe("bots.js unit tests", () => {
    const originalEnv = process.env;

    beforeEach(() =>{
        jest.resetModules();

        process.env = {
            ...originalEnv,
        }
    })

    describe("getOpenAIBot", () => {
        describe("when api key is", () => {
            describe('empty string', () => {
                it("should return 'undefined'", () => {
                    process.env.OPENAI_API_KEY = "";

                    const openaiBot = getOpenAIBot();
                    expect(openaiBot).toEqual(undefined);
                })
            })

            describe('NOT empty string', () => {
                it("should return an instantiated OpenAIBot", () => {
                    process.env.OPENAI_API_KEY = "fakeApiKey";

                    const openAIBot = getOpenAIBot();
                    expect(openAIBot).toBeInstanceOf(OpenAI);
                });

                it("sends correct environment variable", () => {
                    const fakeApiKey = "fakeApiKey";
                    process.env.OPENAI_API_KEY = fakeApiKey;

                    const openAIBot = getOpenAIBot();
                    expect(openAIBot.apiKey).toEqual(fakeApiKey);
                })
            })
        });
    });

    describe("getGroqBot", () => {
        describe("when api key is", () => {
            describe('empty string', () => {
                it("should return 'undefined'", () => {
                    process.env.GROQ_API_KEY = "";

                    const openaiBot = getGroqBot();
                    expect(openaiBot).toEqual(undefined);
                })
            })

            describe('NOT empty string', () => {
                it("should return an instantiated GroqBot", () => {
                    process.env.GROQ_API_KEY = "fakeGroqApiKey";

                    const groqBot = getGroqBot();
                    console.log(groqBot.constructor.name)
                    expect(groqBot).toBeInstanceOf(Groq);
                });

                it("sends correct environment variable", () => {
                    const fakeApiKey = "fakeApiKey";
                    process.env.GROQ_API_KEY = fakeApiKey;

                    const groqBot = getGroqBot();
                    // console.log(JSON.stringify(groqBot))
                    expect(groqBot.apiKey).toEqual(fakeApiKey);
                })
            })
        });
    });

    describe("getUninsatiatedBotError", () => {
        describe("OpenAI", () => {
            it('returns correct error message', () => {
                const errorMessage = getUninsatiatedBotError(BotName.OPENAI);
                expect(errorMessage).toEqual("OpenAI model was not instantiated. Did you supply an OPENAI_API_KEY?");
            })
        })

        describe("Groq", () => {
            it('returns correct error message', () => {
                const errorMessage = getUninsatiatedBotError(BotName.GROQ);
                expect(errorMessage).toEqual("Groq model was not instantiated. Did you supply an GROQ_API_KEY?");
            })
        })
    })

    describe("has invalid name passed in", () => {
        it('throws an error', () => {
            expect(() => getUninsatiatedBotError("InvalidBotName")).toThrow("Invalid bot name");
        })
    })

    describe("has invalid type passed in", () => {
        it('throws an error', () => {
            expect(() => getUninsatiatedBotError(666)).toThrow("Invalid bot name");
        })
    })
})
