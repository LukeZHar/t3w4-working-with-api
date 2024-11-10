console.log("Pokemon journey begins!");

const encounterButton = document.getElementById("pokemonEncounterButton");
const pokemonRenderArea = document.getElementById("encounteredPokemonArea");
const pokemonContainerDiv = document.getElementById("pokemonContainer");
const encounterGroupButton = document.getElementById("pokemonGroupEncounterButton");

function renderPokemonData(pokemonData){
    if (!pokemonData.name){
        return;
    }
    pokemonContainerDiv.classList += "PokemonCardEntry"

    
    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonTypeHeading = document.createElement("h3");
    pokemonTypeHeading.innerText = "Types: ";
    pokemonContainerDiv.appendChild(pokemonTypeHeading);

    let pokemonTypeList = document.createElement("ul");
    // Loop through the array of pokemonData
    pokemonData.type.forEach((item) => {
        // Create an li for each type
        let pokemonTypeListItem = document.createElement("li");
        // Add name to li
        pokemonTypeListItem.innerText = item.type.name;
        // Append li to ul
        pokemonTypeList.appendChild(pokemonTypeListItem);
    })
    pokemonContainerDiv.appendChild(pokemonTypeList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play sound!";
    pokemonAudioButton.addEventListener("click", () => {
        let pokemonAudioObject = new Audio(pokemonData.sound);
        pokemonAudioObject.play();
    });
    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
}

function getRandomPokemonId() {
    // Random number between 1 and 1025 (Max number of Pokemon)
    return Math.ceil(Math.random() * 1025);
}

async function getPokemon() {
    console.log("Looking for a wild pokemon...");

    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
    let apiData = await apiResponse.json();

    // Fetch name, type, image and cry
    // let pokemonName = apiData.name;

    return {
        name: apiData.name,
        type: apiData.types,
        image: apiData.sprites.other.home.front_default,
        sound: apiData.cries.latest
    }
}

// encounterButton.addEventListener("click", (event) => getPokemon(event));

// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click",async (event) => {
    console.log("Doing something...");

    let pokemonResult = await getPokemon();

    console.log(pokemonResult);

    renderPokemonData(pokemonResult);
});

encounterGroupButton.addEventListener("click",async (event) => {
    pokemonRenderArea.innerText = "";
    // From what we've learnt so far, we can do this:
    // for (let i = 0; i < 6; i++) {
    //     let pokemonResult = await getPokemon();
    //     console.log(pokemonResult);
    //     renderPokemonData(pokemonResult);
    // }

    let multiplePokemonResult = await Promise.all([
        getPokemon(), 
        getPokemon(), 
        getPokemon(), 
        getPokemon(), 
        getPokemon(), 
        getPokemon()]);

    console.log(multiplePokemonResult);
    
    multiplePokemonResult.forEach(renderPokemonData);
});
