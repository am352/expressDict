const form = document.getElementById('search');
const input = document.getElementById('word');
const results = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (!word) return;

  results.innerHTML = `<p>Loading...</p>`;

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error('Word not found');
    const data = await res.json();

    displayResults(data);
  } catch (error) {
    results.innerHTML = `<p class="error"> ${error.message}</p>`;
  }
});

function displayResults(data) {
  const entry = data[0];
  let html = `<h2>${entry.word}</h2>`;

  entry.meanings.forEach(m => {
    html += `<div class="definition">
      <h3>${m.partOfSpeech}</h3>
      <ul>
        ${m.definitions.map(d => `<li>${d.definition}</li>`).join('')}
      </ul>
    </div>`;
  });

  results.innerHTML = html;
}
