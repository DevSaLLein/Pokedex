# 📘 Pokédex

Projeto desenvolvido como parte de um desafio técnico. Esta aplicação é uma Pokédex que consome a [PokeAPI](https://pokeapi.co/), exibindo uma listagem com filtros e permitindo visualizar detalhes completos dos Pokémon selecionados.

<div align="center">
  
![](https://github.com/user-attachments/assets/c95ffdec-9b7b-4b24-b692-a4208b9be293)
![](https://github.com/user-attachments/assets/3639bef2-c615-4169-b492-40245655ba43)
  
</div>

![](https://github.com/user-attachments/assets/b02f666d-a435-435a-87ff-801fa18540a2)




## 🚀 Tecnologias Utilizadas

- **Vue.js 3**   
- **Vuex** 
- **Vue i18n** 
- **Bootstrap** 
- **PokeAPI** 
- **Vitest** 
- **Vite**
- **Git**

## 📂 Estrutura de Pastas
```
/
├─ 📁 src/
│  ├── 📁 assets/               # Imagens
│  │
│  ├── 📁 components/          # Componentes reutilizáveis
│  │   ├── LanguageSelector.vue             # Componente do Selector resposável pelo idioma da página
│  │   └── PokemonDetailModal.vue           # Componente que serve de modal para o Pokémon selecionado
│  │   └── PokemonList.vue                  # Componente que aparece no index, onde fica a listagem de Pokémons
│  │      
│  ├── 📁 i18n/                # Diretório que armazena o script de internacionalização
│  │   └── i18n.js             # Script de internacionalização
|  |
│  ├── 📁 locates/             # Arquivos de tradução
│  │   ├── pt.json             # Português-BR
│  │   ├── en.json             # Inglês
│  │   └── es.json             # Espanhol
│  │
│  ├── 📁 store/               # Vuex (estado global)
│  │   └── index.js            # Configuração raiz
│  │
│  ├── App.vue                 # Componente raiz
│  └── main.js                 # Entrada principal do app
│
├─ 📁 tests/                   # Arquivo de testes
│  └── 📁 PokemonList.spec.js
|
├─ .gitignore
├─ index.html
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
└─ vite.config.js
```

## 🚀 Como executar essa aplicação

1. Clonar o repositório
```
git clone https://github.com/DevSaLLein/Pokedex.git
cd Pokedex
```
2. Executar a aplicação
```
npm run dev
```
3. Abrir no navegador: `localhost:5173`

## 🧪 Testes

Os testes automatizados foram implementados usando **Vitest**. Para rodá-los, utilize:

```
npx vitest
```

## 🌐 Funcionalidades
- Listagem de Pokémon com scroll infinito

- Filtros por nome, ID, tipo e espécie

- Modal com detalhes do Pokémon:

  - Sprites

  - Evoluções

  - Golpes (Moves)

  - Jogos em que aparece

- Suporte a múltiplos idiomas (pt-BR, en, es)

- Design responsivo

<img src="https://github.com/user-attachments/assets/21e54ac5-5b07-4800-aee6-c65b29dd44e2" width="100%">

