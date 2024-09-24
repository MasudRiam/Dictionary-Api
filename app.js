let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn = document.querySelector ("button");

btn.addEventListener ("click", async () => {
    let inp = document.querySelector ("input").value;
    
    let inpEntry = await getWord (inp);

    console.log (inpEntry);

    showWord (inpEntry);
})





function showWord(inpEntry) {
    let list = document.querySelector("#list");
    list.innerHTML = ''; // Clear previous results

    inpEntry.forEach(entry => {
        entry.meanings.forEach(meaning => {
            const partOfSpeech = `<strong>Part of Speech:</strong> ${meaning.partOfSpeech}<br>`;
            const definitions = meaning.definitions
                .map(def => {
                    let definitionText = `<strong>Definition:</strong> ${def.definition}<br>`;
                    if (def.example) {
                        definitionText += `<strong>Example:</strong> ${def.example}<br>`;
                    }
                    if (def.synonyms && def.synonyms.length > 0) {
                        definitionText += `<strong>Synonyms:</strong> ${def.synonyms.join(", ")}<br>`;
                    }
                    return definitionText;
                })
                .join(''); // Join all definitions as a single string

            // Create and append list item with part of speech and definitions
            let li = document.createElement("li");
            li.innerHTML = partOfSpeech + definitions;
            list.appendChild(li);
        });
    });
}



async function getWord (inp) {
    try {
        let resWord = await axios.get (url + inp);
        return resWord.data;
    } catch (e) {
        console.log ("ERROR: ", e);
        return [];
    }
}









