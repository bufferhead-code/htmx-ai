import OpenAI from "openai";
import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'

const openai = new OpenAI();

const app = new Elysia()
    .use(cors())
    .post('/', async ({body}) => {
        const prompt = body.prompt.replace(/\\n/g, '\n');
        const systemPrompt = "You are an expert at writing HTML and CSS. " +
            "Your Task is to write new HTML and CSS Code for a web app, according to the provided task details. " +
            "The html code you write can make use of Tailwind classes for styling. " +
            "Your generated code will be directly written to innerHTML of an HTML Element and used in production.";

        const userPrompt = "" +
                `- CODE DESCRIPTION :\n` +
                "```\n" +
                prompt +
                "\n```\n\n" +
                "Answer with generated code only. DO NOT ADD ANY EXTRA TEXT DESCRIPTION OR COMMENTS BESIDES THE CODE. Your answer contains code only ! " +
                "Only include images if you are specifically asked for it. If asked to use images you can use https://source.unsplash.com/random/ as the image source. You can use one keyword to get a specific image by providing it like this https://source.unsplash.com/random/?keyword. " +
                "When using images make sure that they are not stretched by using object-cover or bg-cover on the image. " +
                "Write the full code for the new HTML and CSS for the web app. which uses tailwind classes if needed. you can use the svg icon code of heroicons directly if needed." +
                "The code that you write will be written directly into an HTML DOM Make sure that all html elements are closed properly and that your full code in enclosed with ```html blocks." +
                "Do not use libraries or imports except what is provided in this task; otherwise it would crash the component because not installed. Do not import extra libraries besides what is provided above !" +
                "Write the Code as the creative genius that you are - with good ui formatting.";

        const combinedPrompt = systemPrompt + userPrompt


        const completion = await openai.chat.completions.create({
            messages: [
                {
                role: "system",
                content: systemPrompt
            },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            // model: 'gpt-3.5-turbo-16k',
            model: "gpt-4-1106-preview",
        });

        const htmlCode = completion.choices[0].message.content.split("```html")[1].split("```")[0]

        return htmlCode;
    }, {
        body: t.Object({
            prompt: t.String()
        })
    })
    .listen(80)
