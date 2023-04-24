function chatGPT(frase){
    alert('jaja')
    const apiKey = "Bearer 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";
    const url = "https://api.openai.com/v1/engine/davinci-codex/completions";
    const pregunta = frase
    const params = {
    prompt: pregunta,
    model: "davinci-codex",
    temperature: 0.5,
    max_tokens: 60,
    n: 1,
    stop: "\n"
    };

    fetch(url, {
    method: "POST",
    headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    
}