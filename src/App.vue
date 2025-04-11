<template>
  <div class="container py-4">
    <h1 class="text-center">{{ $t('common.titlePage') }}</h1>
    <div class="d-flex justify-content-end mb-3">

      <LanguageSelector />
    </div>
    
    <PokemonList />
  </div>
</template>

<script setup>

  import PokemonList from './components/PokemonList.vue';
  import LanguageSelector from './components/LanguageSelector.vue';
  
</script>
