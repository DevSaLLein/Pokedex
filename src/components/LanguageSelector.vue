<template>
  <select v-model="selected" @change="changeLocale" class="form-select w-auto">
    <option value="pt">Português</option>
    <option value="en">English</option>
    <option value="es">Español</option>
  </select>
</template>

<script setup>

  import { computed } from 'vue';

  import { useStore } from 'vuex';
  
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();
  const store = useStore();

  const selected = computed({

    get: () => store.getters.currentLanguage,

    set: (value) => {

      store.dispatch('changeLanguage', value);
      locale.value = value;
    },
  });

  locale.value = store.getters.currentLanguage;
</script>
