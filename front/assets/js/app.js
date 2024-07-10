
import { apiBaseUrl } from "./config.js";

document.addEventListener('DOMContentLoaded', () => {

  const addTeamBtn = document.getElementById('add-team-btn');
  const teamModal = document.getElementById('team-modal');
  const pokemonModal = document.getElementById('pokemon-modal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const teamForm = document.getElementById('team-form');
  const pokemonList = document.querySelector('.pokemon-list .grid');
  const editTeamForm = document.getElementById('edit-team-form');
  const editTeamModal = document.getElementById('edit-team-modal');
  document.getElementById('add-pokemon-to-team-modal')
  document.getElementById('add-pokemon-to-team-form').reset();
  const titleTeams = document.getElementById('teams-btn');
  const titleTypes = document.getElementById('types-btn');
  const titlePokemons = document.getElementById('pokedex-btn');
  const asideTeams = document.querySelector('aside.teams');
  const pokemontypes = document.querySelector('.pokemon-types');
  const sectionpokemons = document.querySelector('section.pokemon-list');





  fetchTeams();
  fetchPokemons();
  fetchPokemonTypes();
  initializeSortable();
  submitPokemonToTeam()


  function initializeSortable() {
    const teamList = document.querySelector('.team-list');
    const pokemonTypesList = document.querySelector('.pokemon-types .pokemon-types-list');


  
    Sortable.create(teamList, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (event) => {
        const newOrder = Array.from(teamList.children).map((child, index) => ({
          id: child.id.replace('team-', ''),
          order: index + 1
        }));
        console.log('New order (teams):', newOrder);
  
        updateTeamOrderOnServer(newOrder);
      }
    });
  
    Sortable.create(pokemonTypesList, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (event) => {
        const newOrder = Array.from(pokemonTypesList.children).map((child, index) => ({
          id: child.id.replace('type-', ''),
          order: index + 1
        }));
        console.log('New order (types):', newOrder);
  
        updateTypeOrderOnServer(newOrder);
      }
    });
  }

  function toggleOpacity(element) {
    if (element.style.opacity === '1') {
      element.style.opacity = '0';
      element.style.pointerEvents = 'none';
    } else {
      element.style.opacity = '1';
      element.style.pointerEvents = 'auto';
    }
  }

  // Ajouter des écouteurs d'événements aux titres
  titleTeams.addEventListener('click', () => {
    toggleOpacity(asideTeams);
  });
  
  titleTypes.addEventListener('click', () => {
    toggleOpacity(pokemontypes);
  });
  
  titlePokemons.addEventListener('click', () => {
    toggleOpacity(sectionpokemons);
  });


  function updateTeamOrderOnServer(newOrder) {
    fetch(`${apiBaseUrl}/teams/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(response => response.json())
      .then(data => console.log('Order updated:', data))
      .catch(error => console.error('Error updating order:', error));
  }

  function updateTypeOrderOnServer(newOrder) {
    fetch(`${apiBaseUrl}/types/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(response => response.json())
      .then(data => console.log('Order updated:', data))
      .catch(error => console.error('Error updating order:', error));
  }



  addTeamBtn.addEventListener('click', () => {
    teamModal.style.display = 'block';
  });


  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal ').style.display = 'none';
      
    });
  });

  function deleteTeam(teamId) {
    fetch(`${apiBaseUrl}/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        document.getElementById(`team-${teamId}`).remove();
      })
      .catch(error => console.error('Error deleting team:', error));
  }

  teamForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const teamName = document.getElementById('team-name').value;
    const teamDescription = document.getElementById('team-description').value;
    const teamPokemon = document.getElementById('team-pokemons').value;
    addTeam(teamName, teamDescription, teamPokemon);
    teamModal.style.display = 'none';
  });

  editTeamForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const teamId = document.getElementById('edit-team-id').value;
    const teamName = document.getElementById('edit-team-name').value;
    const teamDescription = document.getElementById('edit-team-description').value;
    updateTeam(teamId, teamName, teamDescription,);
    editTeamModal.style.display = 'none';
  });

  window.deleteTeam = deleteTeam;

  function fetchTeams() {
    fetch(`${apiBaseUrl}/teams`)
      .then(response => response.json())
      .then(data => {
        const teamList = document.querySelector('.team-list');
        teamList.innerHTML = '';
        data.forEach(team => {
          addTeamToUI(team);
        });

      })
      .catch(error => console.error('Error fetching teams:', error));
  }


  function addTeam(name, description, pokemons) {
    fetch(`${apiBaseUrl}/teams/;`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, pokemons })
    })
      .then(response => response.json())
      .then(data => {
        addTeamToUI(data);
      })
      .catch(error => console.error('Error adding team:', error));
  }

  function updateTeam(id, name, description) {
    fetch(`${apiBaseUrl}/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    })
      .then(response => response.json())
      .then(data => {
        const teamDiv = document.getElementById(`team-${data.id}`);
        teamDiv.innerHTML = `
        <i class="fas fa-pencil-alt edit-team-btn" onclick="editTeam(${data.id}, '${data.name}', '${data.description}')"></i>
        <i class="fas fa-info-circle details-team-btn" id="details-${data.id}"></i>
        <h3>${data.name}</h3>
        <p>${data.description}</p>
        <i class="fas fa-trash delete-team-btn" onclick="deleteTeam(${data.id})"></i>
        <ul></ul>
      `;

        const detailsBtn = document.getElementById(`details-${data.id}`);
        detailsBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          showPokemonbyTeam(data.id);
        });
      })
      .catch(error => console.error('Error updating team:', error));
  }

  function addTeamToUI(team) {
    const teamList = document.querySelector('.team-list');
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    teamDiv.id = `team-${team.id}`;
    teamDiv.innerHTML = `
      <i class="fas fa-pencil-alt edit-team-btn" onclick="editTeam(${team.id}, '${team.name}', '${team.description}')"></i>
      <i class="fas fa-info-circle details-team-btn" id="details-${team.id}"></i>
      <h3>${team.name}</h3>
      <p>${team.description}</p>
      <i class="fas fa-trash delete-team-btn" onclick="deleteTeam(${team.id})"></i>
      <ul></ul>
    `;
    teamList.appendChild(teamDiv);

    const detailsBtn = document.getElementById(`details-${team.id}`);
    detailsBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      showPokemonbyTeam(team.id);
    });
  }

  window.editTeam = (id, name, description,) => {
    document.getElementById('edit-team-id').value = id;
    document.getElementById('edit-team-name').value = name;
    document.getElementById('edit-team-description').value = description;
    editTeamModal.style.display = 'block';
  };


  function fetchPokemons() {
    fetch(`${apiBaseUrl}/pokemons`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched pokemons:', data);
        pokemonList.innerHTML = '';
        data.forEach((pokemon, index) => {
          const imgPath = `assets/img/${index + 1}.webp`;
          console.log('Image path:', imgPath);
          const div = document.createElement('div');
          div.className = 'pokemon-card';
          div.innerHTML = `
            <img src="${imgPath}" alt="${pokemon.name}" class="pokemon-image">
            <p>${pokemon.name}</p>
          `;
          div.addEventListener('click', () => {
            showPokemonDetails(pokemon.id);


          });
          pokemonList.appendChild(div);
        });
      })
      .catch(error => console.error('Error fetching pokemons:', error));
  }


  function showPokemonDetails(pokemonId) {
    fetch(`${apiBaseUrl}/pokemons/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        const pokemonDetails = document.getElementById('pokemon-details');
        const imgPath = `assets/img/${pokemonId}.webp`;
        pokemonDetails.innerHTML = `
        <div class="pokemon-details-container">
        <div class="pokemon-details-text">
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>HP:</strong> ${data.hp}</p>
          <p><strong>Attaque:</strong> ${data.atk}</p>
          <p><strong>Défense:</strong> ${data.def}</p>
          <p><strong>Attaque Spéciale:</strong> ${data.atk_spe}</p>
          <p><strong>Défense Spéciale:</strong> ${data.def_spe}</p>
          </div>
          <img src="${imgPath}" alt="${data.name}" class="pokemon-detail-image">
          </div>
        `;
        pokemonModal.style.display = 'block';
        document.getElementById('addToTeam').addEventListener('click', () => {
          openAddPokemonToTeamModal(data.id);
        });
        
      })
      .catch(error => console.error('Error fetching pokemon details:', error));
  }
  


  function openAddPokemonToTeamModal(pokemonId) {
    const addPokemonToTeamModal = document.getElementById('add-pokemon-to-team-modal');

    document.getElementById('add-pokemon-to-team-form').reset();
     
    addPokemonToTeamModal.style.display = 'block';
    
    const teamSelect = document.getElementById('team-select');
    teamSelect.innerHTML = ''; 
    fetch(`${apiBaseUrl}/teams`)
      .then(response => response.json())
      .then(data => {
        data.forEach(team => {
          const option = document.createElement('option');
          option.value = team.id;
          option.textContent = team.name;
          teamSelect.appendChild(option);
          
        });
      })
      .catch(error => console.error('Error fetching teams:', error));

    
    document.getElementById('pokemon-id-to-add').value = pokemonId;
    
    
  }



  function showPokemonbyTeam(teamId) {
    document.getElementById('pokemon-team-modal').style.display = 'block';
    fetch(`${apiBaseUrl}/teams/${teamId}/pokemons`)
      .then(response => response.json())
      .then(data => {
        const pokemonList = document.getElementById('pokemon-team-details');
        if (!pokemonList) { 
          return;
        }
        pokemonList.innerHTML = '';
        const pokemons = data.pokemons;
        pokemons.forEach(pokemon => {
          const imgPath = `assets/img/${pokemon.id}.webp`;
          const div = document.createElement('div');
          div.className = 'pokemon-card';
          div.innerHTML = `
          <img src="${imgPath}" alt="${pokemon.name}" class="pokemon-image">
          <p>${pokemon.name}</p>
        `;
          div.addEventListener('click', () => {
            document.getElementById('pokemon-team-modal').style.display = 'none';
            showPokemonDetails(pokemon.id);
          });
          pokemonList.appendChild(div);
        });
      })
      .catch(error => console.error('Erreur lors de la récupération des Pokémon par équipe:', error));
  }


  document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('pokemon-team-modal').style.display = 'none';
  });

function showTypeDetails(typeId) {
  const typeModal = document.getElementById('type-modal');
  const typeDetails = document.querySelector('.type-details');
  fetch(`${apiBaseUrl}/types/${typeId}`)
    .then(response => response.json())
    .then(data => {
      typeDetails.classList.add('type-grid');
      typeDetails.innerHTML = `
        <p>Détails du type: ${data.name}</p>
        <p>Couleur : <span class="color-circle" style="background-color: #${data.color};"></span></p>
      `;
      typeModal.style.display = 'block';
      
      fetch(`${apiBaseUrl}/types/${typeId}/pokemons`)
        .then(response => response.json())
        .then(pokemonData => {
          const pokemonList = document.getElementById('type-details');
          const existingPokemonCards = pokemonList.querySelectorAll('.pokemon-card');
          existingPokemonCards.forEach(card => card.remove());
          pokemonData.forEach(pokemon => {
            const imgPath = `assets/img/${pokemon.id}.webp`;
            const div = document.createElement('div');
            div.className = 'pokemon-card';
            div.innerHTML = `
              <img src="${imgPath}" alt="${pokemon.name}" class="pokemon-image">
              <p>${pokemon.name}</p>
            `;
            div.addEventListener('click', () => {
              document.getElementById('type-modal').style.display = 'none';
              showPokemonDetails(pokemon.id);
              
            });

            pokemonList.appendChild(div);
          });
        })
        .catch(error => console.error('Error fetching pokemons by type:', error));
    })
    .catch(error => console.error('Error fetching type details:', error));
}


  function fetchPokemonTypes() {
    const pokemonTypes = document.querySelector('.pokemon-types .pokemon-types-list');
    fetch(`${apiBaseUrl}/types`)
      .then(response => response.json())
      .then(data => {
        pokemonTypes.textContent = '';
        data.forEach(type => {
          const div = document.createElement('div');
          div.classList.add('pokemon-type');
          div.textContent = `${type.name}`;

          div.addEventListener('click', () => {
            showTypeDetails(type.id);
            getPokemonsByType(type.id);

          });
          pokemonTypes.appendChild(div);

        });
      })
      .catch(error => console.error('Error fetching pokemon types:', error));
  }



});


function submitPokemonToTeam() {
  const teamId = document.getElementById('team-select').value;
  const pokemonId = document.getElementById('pokemon-id-to-add').value;

  fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ teamId })

  }).then(response => response.json())

  .then(data => {
    console.log('Pokemon added to team:', data);
    getPokemonsByType(typeId);
  })
  .catch(error => console.error('Error adding pokemon to team:', error));


}




















