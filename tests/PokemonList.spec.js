import { mount } from '@vue/test-utils';

import { describe, it, expect, vi } from 'vitest';

import { createStore } from 'vuex';

import PokemonList from '../src/components/PokemonList.vue';

// Pokémon fake
const fakePokemon = {

  id: 25,
  name: 'pikachu',
  image: 'https://url.to.image',
  types: ['electric'],
  species: 'Mouse Pokémon',
};

// Store mockado
const store = createStore({

  state: {},

  getters: { selectedPokemon: () => null },

  actions: { selectPokemon: vi.fn() },
});

global.IntersectionObserver = class {

  observe() { };
  disconnect() { };
};

describe('PokemonList.vue', () => {

  it('renderiza manualmente um Pokémon', async () => {

    const wrapper = mount(PokemonList, {

      global: {

        plugins: [store],

        mocks: {

          $t: (key, values) => {

            if (key === 'pokemon.species') return values.species;

            if (key === 'pokemon.types') return values.types;

            if (key === 'pokemon.id') return `#${values.id}`;

            return key;
          },
        },
      },
    });

    wrapper.vm.pokemons = [fakePokemon];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('pikachu');
    expect(wrapper.text()).toContain('Mouse Pokémon');
  });
});
