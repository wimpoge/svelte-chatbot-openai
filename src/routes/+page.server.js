import { env } from "$env/dynamic/private";

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const prompt = form.get("prompt");
    const openai_key = env.OPENAI_KEY;

    const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openai_key}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const messages = data["choices"][0]["message"]["content"]
    console.log(messages);
    return messages

    return {
      status: 200,
      body: data,
    };
  },
};
