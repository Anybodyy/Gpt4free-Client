// Thanks to the @xtekky. I was inspired by his project and created this one based on gpt4free

// Imports
const axios = require('axios');
const { Readable } = require('stream');

class Completion {
    /**
     * Create chat completion with big AI models for free
     */
    static async create({
        model = 'gpt-4-0613',
        temperature = 0.7,
        systemPrompt = 'You are powerful AI assistant\n',
        messages = [],
        stream = false
    }) {
        /**
         * Send question and get answer from model
         *
         * @param {string} model - optional (default='gpt-4-0613'), the name of the AI model to use
         * @param {float} temperature - optional (default=0.7), the temperature for generating responses
         * @param {string} system_prompt - optional (default='You are powerful AI assistant'), the system prompt to use
         * @param {Array} messages - a list of messages for the chat. Example: [{"role": "system", "messages": "hello world"}]
         * @returns {Promise<string>} - the generated answer from the model
         */

        // Check `messages` type
        if (!Array.isArray(messages)) {
            throw new Error('`Messages` must be an array');
        }

        // Check `messages` length
        if (messages.length === 0) {
            throw new Error('`Messages` cannot be empty');
        }

        const responseStream = new Readable({
            read() {}
        });

        // Create and send request
        const response = await axios.post(
            'https://openchat.team/api/chat',
            {
                model: {
                    id: 'openchat_v3.2_mistral',
                    name: model,
                },
                messages: messages,
                prompt: systemPrompt,
                temperature: temperature
            },
            {
                responseType: stream ? 'stream' : 'json'
            }
        );

        if (stream) {
            // Stream response mode
            response.data.on('data', chunk => {
                responseStream.push(chunk);
            });

            response.data.on('end', () => {
                responseStream.push(null);
            });

            return responseStream;
        } else {
            // Non-stream response mode
            return response.data;
        }
    }

module.exports = Completion;

// TODO: create function to get all available models