# htmx-ai

HTMX-AI allows you to create AI generated webdesign by just providing a prompt via the `hx-ai` attribute.

**You can see a [live demo here](https://htmx-ai.bufferhead.com/)**

[![Youtube Video about how this project was made](http://img.youtube.com/vi/NP6hpM5YLRo/0.jpg)](http://www.youtube.com/watch?v=NP6hpM5YLRo 'Build your Website with HTMX powered by AI')

**You can learn more about how it works and how i made it [here](http://www.youtube.com/watch?v=NP6hpM5YLRo)**

```html
<button hx-ai="Generate a website design for a coffee shop"></button>
```

You can use hx-target just like you would in any other HTMX application to specify where the response should be inserted.

```html
<button hx-ai="Generate a website design for a coffee shop" hx-target="#design"></button>
<div id="design"></div>
```

## Configuration

HTMX-AI uses the OpenAI APi in the background. You need to provide an API key in the `.env` file.

```env
OPENAI_API_KEY=your-api-key
```

To enable the htmx-ai extension on a page you need to initialize it on one parent element like this:

```html
<body hx-ext="ai">
```

If you want to use anything other than the default api endpoint at htmx-ai.test, you can set a custom endpoint

```html
<body hx-ext="ai" hx-ai-endpoint="https://super-secure-ai-api.com">
```

## Run with reverse proxy

First you need to configure traefik as a reverse proxy. (like described [here](https://github.com/korridor/reverse-proxy-docker-traefik)).

Afterwards you can start the service with the following command:

```bash
docker-compose up -d
```

## Run with bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run server.ts
```