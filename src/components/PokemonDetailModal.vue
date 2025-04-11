<template>

  <transition name="fade">

    <div class="modal fade show d-block" tabindex="-1" @click.self="closeModal">

      <div class="modal-dialog modal-xl slide-in">

        <div class="modal-content">

          <div class="modal-header">
            <h1 class="modal-title text-capitalize">{{ pokemonDetail.name }}</h1>
            <button type="button" class="btn-close" @click="closeModal" />
          </div>

          <div class="modal-body">

            <!-- SPRITES -->
            <h3> {{ $t('modal.sprites') }} </h3>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <img
                v-for="(sprite, key) in spriteList"
                :key="key"
                :src="sprite"
                :alt="`${pokemonDetail.name} ${key}`"
                class="img-thumbnail sprite-img bg-light w-full"
              />
            </div>

            <!-- EVOLUTIONS -->
            <section v-if="evolutionCards.length" class="mb-4">
              <h3> {{ $t('modal.evolutions') }} </h3>
              <div class="d-flex gap-3 flex-wrap">
                <div
                  class="card evolution-card"
                  v-for="evo in evolutionCards"
                  :key="evo.name"
                >
                  <img
                    :src="evo.image"
                    class="card-img-top img-thumbnail bg-light rounded p-2"
                    :alt="evo.name"
                  />
                  <div class="card-body p-2 text-center">
                    <p class="card-text text-capitalize mb-0">{{ evo.name }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- MOVES -->
            <h3> {{ $t('modal.moves') }} </h3>
            <div class="row g-2 mb-4">
              <div
                v-for="move in pokemonDetail.moves"
                :key="move.move.name"
                class="col-6 col-md-4 col-lg-3"
              >
                <div class="card h-100">
                  <div class="card-body p-2 bg-light">
                    <p class="card-text text-center text-capitalize mb-0">{{ move.move.name }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- GAMES -->
            <h3> {{ $t('modal.games') }} </h3>
            <div class="d-flex gap-3 flex-wrap">
              <div
                v-for="game in pokemonDetail.game_indices"
                :key="game.version.name"
                class="card game-card"
              >
                <div class="card-body p-2 text-center bg-light rounded">
                  <p class="card-text text-capitalize mb-0">{{ game.version.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>

  import { ref, reactive, watch, computed } from 'vue';

  const props = defineProps({ pokemonName: String });
  const emit = defineEmits(['close']);

  const pokemonDetail = reactive({
    name: '',
    sprites: {},
    moves: [],
    game_indices: [],
    species: { url: '' },
  });

  const evolutionNames = ref([]);
  const evolutionCards = ref([]);

  const spriteList = computed(() => {

    return Object.fromEntries (

      Object.entries(pokemonDetail.sprites)

        .filter(([_, value]) => typeof value === 'string' && value)
    );
  })

  async function fetchPokemonDetail() {

    try {

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonName}`);
      const data = await res.json();

      Object.assign(pokemonDetail, {

        name: data.name,
        sprites: data.sprites,
        moves: data.moves,
        game_indices: data.game_indices,
        species: data.species,
      });

      await fetchEvolutionChain(data.species.url);
    } 
    
    catch (err) { console.error('Erro ao buscar detalhes do Pokémon:', err); }
  }

  async function fetchEvolutionChain(speciesUrl) {

    try {

      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();

      if (!speciesData.evolution_chain?.url) return;

      const chainRes = await fetch(speciesData.evolution_chain.url);
      const chainData = await chainRes.json();

      const evolutions = [];

      function traverse(chain) {

        if (chain?.species) {

          evolutions.push(chain.species.name);
          chain.evolves_to.forEach(traverse);
        }
      }

      traverse(chainData.chain);
      evolutionNames.value = evolutions;

      evolutionCards.value = await Promise.all(evolutions.map(async (name) => {

        try {

          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();

          return {

            name,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
          };

        } 
        
        catch { return { name, image: '' }; }
      }))
    } 
    
    catch (err) { console.error('Erro ao buscar evolução:', err); }
  }

  function closeModal() { emit('close'); }

  watch(() => props.pokemonName, fetchPokemonDetail, { immediate: true })

</script>

<style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }

  .fade-enter-from, .fade-leave-to { opacity: 0; }

  .slide-in { animation: slideIn 0.4s ease-out; }

  @keyframes slideIn {

    from { transform: translateY(-20px); }
    to { transform: translateY(0); }
  }

  .modal { background: rgba(0, 0, 0, 0.5); }

  .sprite-img {

    width: 96px;
    transition: transform 0.2s ease;
  }

  .sprite-img:hover { transform: scale(1.1); }

  .evolution-card, .game-card {

    width: 100px;
    border: none;
    background-color: transparent;
  }

  .evolution-card img, .game-card img {
    
    width: 100%;
    border-radius: 8px;
    transition: transform 0.2s ease;
  }

  .evolution-card img:hover, .game-card img:hover { transform: scale(1.05); }
  
</style>
