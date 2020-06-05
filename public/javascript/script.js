$(function() {
    let pokemonApiUrl = "https://pokeapi.co/api/v2/generation/1";
    let pokemonByName = "https://pokeapi.co/api/v2/pokemon/";

    $.getJSON(pokemonApiUrl).done(function(data) {
        $.each(data.pokemon_species, function(index, pokemon) {
            let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            let link = $("<a>").attr("id", pokemon.name).attr("href", "#").append($("<strong>").text(name));
            let par = $("<p>").html("Pokémon species number " + (index + 1) + " is ").append(link);
            
            link.click(function(event) {
                $.getJSON(pokemonByName + pokemon.name).done(function(details) {
                    var pokemonDiv = $("#pokemon-datails");
                    pokemonDiv.empty();
                    pokemonDiv.append("<img src='" + details.sprites.front_default + "'>'");
                    pokemonDiv.append("<img src='" + details.sprites.back_default + "'>'");
                    pokemonDiv.append("<img src='" + details.sprites.front_shiny + "'>'");
                    pokemonDiv.append("<img src='" + details.sprites.back_shiny + "'>'");
                });
            });

            par.appendTo(".content");
        });
    }).fail(function() {
        alert("The request to the Pokeapi has failed!");
    }).always(function() {
        console.log("Pokémon is awesome!");
    })
})