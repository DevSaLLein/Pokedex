<template>

  <div class="container my-4">

    <!-- Filtros -->
    <div class="row mb-3">

      <div class="col-12 col-md-3 mb-2 mb-md-0" v-for="(field, key) in filterFields" :key="key">

        <input
          v-model="filters[key]"
          :type="field.type"
          :placeholder="$t(field.placeholder)"
          class="form-control"
        />
      </div>
    </div>

    <!-- Lista de Pokémon -->
    <div class="row">

      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="col-12 col-md-6 col-lg-4 mb-3"
      >

        <div class="card h-100" @click="openModal(pokemon.name)">

          <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name" />

          <div class="card-body">

            <h5 class="card-title text-capitalize">

              {{ pokemon.name }}
              <small class="text-muted"> {{ $t('pokemon.id', { id: pokemon.id }) }} </small>
            </h5>

            <p class="card-text">

              <strong>{{ $t('pokemon.types', { types: pokemon.types.join(', ') }) }}</strong> <br />
              <strong>{{ $t('pokemon.species', { species: pokemon.species }) }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Infinite Scroll -->
    <div ref="infiniteScrollTrigger" class="py-3 text-center">
      <span v-if="loading">{{ $t('loading') }}</span>
    </div>

    <!-- Modal de Detalhes -->
    <PokemonDetail
      v-if="selectedPokemon"
      :pokemonName="selectedPokemon"
      @close="closeModal"
    />
  </div>
</template>

<script setup>

  import { ref, computed, onMounted } from 'vue';

  import { useStore } from 'vuex';

  import PokemonDetail from './PokemonDetailModal.vue';

  const store = useStore();

  const selectedPokemon = computed(() => store.getters.selectedPokemon);

  const pokemons = ref([]);
  const offset = ref(0);
  const limit = 20;
  const loading = ref(false);

  const filters = ref({ name: '', id: '', type: '', species: '', });
  const filterFields = {

    name: { type: 'text', placeholder: 'filter.name' },
    id: { type: 'number', placeholder: 'filter.id' },
    type: { type: 'text', placeholder: 'filter.type' },
    species: { type: 'text', placeholder: 'filter.species' },
  };

  const filteredPokemons = computed(() => {

    return pokemons.value.filter(({ name, id, types, species }) => {

      const form = filters.value;

      return (

        !form.name || name.toLowerCase().includes(form.name.toLowerCase())) &&
        (!form.id || id === Number(form.id)) &&
        (!form.type || types.some(t => t.toLowerCase().includes(form.type.toLowerCase()))) &&
        (!form.species || species.toLowerCase().includes(form.species.toLowerCase())
      );
    });
  });

  const fetchPokemons = async () => {

    loading.value = true;

    try {

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset.value}`);
      const data = await res.json();

      const details = await Promise.all(data.results.map(fetchPokemonDetails));

      pokemons.value.push(...details);

      offset.value += limit;
    } 
    
    catch (err) { console.error('Erro ao buscar pokémons:', err); } 
    
    finally { loading.value = false; }
  }

  const fetchPokemonDetails = async ({ url }) => {

    const detail = await (await fetch(url)).json();

    const species = await (await fetch(detail.species.url)).json();

    return {

      id: detail.id,
      name: detail.name,
      image: detail.sprites.other['official-artwork'].front_default || detail.sprites.front_default,
      types: detail.types.map(t => t.type.name),
      species: species.genera.find(g => g.language.name === 'en')?.genus || species.name,
    };
  }

  const infiniteScrollTrigger = ref(null);
  let observer = null;

  onMounted(() => {

    fetchPokemons();

    observer = new IntersectionObserver(([entry]) => {

      if (entry.isIntersecting && !loading.value) fetchPokemons();
    })

    if (infiniteScrollTrigger.value) observer.observe(infiniteScrollTrigger.value);
  })

  const openModal = (name) => store.dispatch('selectPokemon', name);
  const closeModal = () => store.dispatch('selectPokemon', null);
  
</script>

<style scoped>

  .card {

    min-height: 350px;
    transition: transform 0.2s ease;
  }

  .card:hover {

    transform: scale(1.02);
    cursor: pointer;
  }
  
</style>
