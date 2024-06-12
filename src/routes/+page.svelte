<script>
    import Counter from './Counter.svelte';
    import welcome from '$lib/images/svelte-welcome.webp';
    import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { onMount } from 'svelte';

    let prompt = '';
    let messages = [];

    async function handleSubmit(event) {
        event.preventDefault();
        const userMessage = { role: 'user', content: prompt };
        messages = [...messages, userMessage]; 

        const formData = new FormData(event.target);
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            const assistantMessage = { role: 'assistant', content: data.data };
            messages = [...messages, assistantMessage];
            prompt = '';
        } else {
            const error = await response.json();
            console.error('Error:', error.message);
        }
    }

    onMount(() => {
        console.log('Component mounted');
    });
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h1>
        <span class="welcome">
            <picture>
                <source srcset={welcome} type="image/webp" />
                <img src={welcome_fallback} alt="Welcome" />
            </picture>
        </span>
        to your new<br />SvelteKit app
    </h1>

    <h2>
        try editing <strong>src/routes/+page.svelte</strong>
    </h2>

    <Counter />

    <div class="chat-container">
        {#each messages as message}
            <div class={`message ${message.role}`}>
                <div class="message-content">{message.content}</div>
            </div>
        {/each}
    </div>

    <form on:submit={handleSubmit} class="chat-form">
        <label for="prompt" class="sr-only">Prompt:</label>
        <textarea name="prompt" rows="2" bind:value={prompt} placeholder="Type your message..."></textarea>
        <button type="submit">Send</button>
    </form>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
        width: 100%;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }

    .chat-container {
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .message {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        max-width: 75%;
    }

    .message.user {
        align-self: flex-end;
        background-color: #dcf8c6;
    }

    .message.assistant {
        align-self: flex-start;
        background-color: #f1f0f0;
    }

    .message-content {
        word-wrap: break-word;
    }

    .chat-form {
        width: 100%;
        max-width: 600px;
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .chat-form textarea {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        resize: none;
    }

    .chat-form button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }

    .chat-form button:hover {
        background-color: #0056b3;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>
