import {getOpenAIBot} from "../bots.js";
import OpenAI from "openai";

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
                it("should return an instantiated OpenAIBot", () => {
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
})
