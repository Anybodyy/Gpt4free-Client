# Gpt4free-Client

The Gpt4free-Client is a Node.js library that allows you to interact with many artificial intelligence models for free text generation. This library is inspired by gpt4free, developed by @xtekky and created by @Anybody.

![Banner](assets/banner.png)

## Installation

npm install Gpt4free-Client

## Usage
```JavaScript
const GptClient = require('Gpt4free-Client');

async function generateText() {
    // Create chat completion
    const completion = await GptClient.create({
        model: 'gpt-4-0613',
        temperature: 0.7,
        systemPrompt: 'You are powerful AI assistant\n',
        messages: [
            {
                role: 'system',
                messages: 'hello world'
            }
        ]
    });
    
    // Get generated text
    const generatedText = await completion;
    
    console.log(generatedText);
}

generateText();
```

## API

### GptClient.create(options)

Creates a chat completion with the specified options.

- model: optional (default='gpt-4-0613'), the name of the AI model to use.
- temperature: optional (default=0.7), the temperature for generating responses.
- systemPrompt: optional (default='You are powerful AI assistant'), the system prompt to use.
- messages: a list of messages for the chat. Each message is an object with role (either 'system' or 'user') and message properties.
- stream: optional (default=false), whether to use streaming mode for the response.

Returns a Promise that resolves to the generated answer from the model.

## API usage
#### Using a different model

```JavaScript
const completion = await GptClient.create({
    model: 'openchat',
    temperature: 0.7,
    systemPrompt: 'You are powerful AI assistant\n',
    messages: [
        {
            role: 'system',
            messages: 'hello world'
        }
    ]
});

console.log(completion); // answer
```

Setting new temperature

```JavaScript
const completion = await GptClient.create({
    model: 'gpt-4-0613',
    temperature: 1,
    systemPrompt: 'You are powerful AI assistant\n',
    messages: [
        {
            role: 'system',
            messages: 'hello world'
        }
    ]
});

console.log(completion); // answer
```

Using custom system prompt

```JavaScript
const completion = await GptClient.create({
    model: 'gpt-4-0613',
    temperature: 0.7,
    systemPrompt: 'You're AI copy of DaniilSV, the best brawl stars mods creator',
    messages: [
        {
            role: 'system',
            messages: 'hello world'
        }
    ]
});

console.log(completion); // answer
```

Using context mode

const completion = await GptClient.create({
    model: 'gpt-4-0613',
    temperature: 0.7,
    systemPrompt: 'You are powerful AI assistant\n',
    messages: [
        {
            role: 'system',
            messages: 'what is Gpt-Clinet?'
        },
        {
            role: 'system',
            messages: 'repeat your answer'
        },
        {
            role: 'system',
            messages: 'Thanks you!'
        }
    ]
});

console.log(completion); // answer
```

Using streaming mode

```JavaScript
const completionStream = await GptClient.create({
    model: 'gpt-4-0613',
    temperature: 0.7,
    systemPrompt: 'You are powerful AI assistant\n',
    messages: [
        {
            role: 'system',
            messages: 'hello world'
        }
    ],
    stream: true
});

completionStream.on('data', (chunk) => {
    console.log(chunk);
});

completionStream.on('end', () => {
    console.log('Completed!');
});
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

[MIT](LICENSE)
