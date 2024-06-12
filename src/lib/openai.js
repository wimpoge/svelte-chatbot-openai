// src/routes/api/chat.js

import { createApi } from 'openai';

const openai = createApi(process.env.OPENAI_API_KEY);

export async function post(req, res) {
  const { prompt } = req.body;
  try {
    const response = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 150
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ completion: response.data.choices[0].text.trim() }));
  } catch (error) {
    console.error(error);
    res.status(500).end(JSON.stringify({ error: 'An error occurred while fetching completion' }));
  }
}
