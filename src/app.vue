<style lang="scss">
@import "./assets/stylesheets/bulma";
@import "./assets/stylesheets/app";
</style>

<template>
  <section class="section">
    <div class="container">
      <Header></Header>
      <div class="columns">
        <div class="column">
          <FontPreload></FontPreload>
          <form @submit.prevent="update">
            <h2 class="subtitle">Parameters</h2>

            <div class="field">
              <label for="sel-dictionary" class="label">Dictionary</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    class="input is-shadowless"
                    id="sel-dictionary"
                    v-model="options.dictionary"
                  >
                    <option
                      v-for="[id, dict] of dictionaries"
                      v-bind:key="id"
                      :value="id"
                    >
                      {{ dict.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="inp-words" class="label">Words count</label>
              <div class="control">
                <input
                  type="number"
                  class="input is-shadowless"
                  id="inp-words"
                  v-model.number="options.words"
                  min="0"
                  max="20"
                />
              </div>
            </div>
            <div class="field">
              <label for="inp-digits" class="label">Digits count</label>
              <div class="control">
                <input
                  type="number"
                  class="input is-shadowless"
                  id="inp-digits"
                  v-model.number="options.digits"
                  min="0"
                  max="20"
                />
              </div>
            </div>
            <div class="field">
              <label for="inp-min-length" class="label">
                Minimum word length
              </label>
              <div class="control">
                <input
                  type="number"
                  class="input is-shadowless"
                  id="inp-min-length"
                  v-model.number="options.minWordLength"
                  min="1"
                  max="15"
                />
              </div>
            </div>
            <div class="field">
              <label for="inp-max-length" class="label">
                Maximum word length
              </label>
              <div class="control">
                <input
                  type="number"
                  class="input is-shadowless"
                  id="inp-max-length"
                  v-model.number="options.maxWordLength"
                  min="1"
                  max="15"
                />
              </div>
            </div>
            <div class="field">
              <label for="sel-case" class="label">Word case</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    class="input is-shadowless"
                    id="sel-case"
                    v-model="options.wordCase"
                  >
                    <option
                      v-for="(name, code) of wordCases"
                      v-bind:key="name"
                      :value="code"
                    >
                      {{ name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="sel-delimiter" class="label">Delimiter</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    class="input is-shadowless"
                    id="sel-delimiter"
                    v-model="options.delimiter"
                  >
                    <option
                      v-for="[delimiterTitle, delimiterCode] in delimiters"
                      :key="delimiterCode"
                      :value="delimiterCode"
                    >
                      {{ delimiterTitle }} ({{ delimiterCode }})
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="inp-phrases-count" class="label">
                Phrases to generate
              </label>
              <div class="control">
                <input
                  type="number"
                  class="input is-shadowless"
                  id="inp-phrases-count"
                  v-model.number="options.count"
                  min="1"
                  max="30"
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary"
                  :disabled="locked"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="column" v-if="result?.length === 0">
          <About></About>
          <SourceCode></SourceCode>
          <DictionaryInfo v-bind:selected="options.dictionary"></DictionaryInfo>
        </div>
        <PasswordList
          v-else
          v-bind:error="error"
          v-bind:result="result"
          @reset="reset"
        ></PasswordList>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script lang="ts">
import fontPreload from "./components/font-preload.vue";
import footer from "./components/footer.vue";
import about from "./components/about.vue";
import sourceCode from "./components/source-code.vue";
import dictionaryInfo from "./components/dictionary-info.vue";
import header from "./components/header.vue";
import passwordList from "./components/password-list.vue";

import dictionaryList from "./libs/load-dictionaries";
import { Options } from "./libs/settings-storage";
import delimiters from "./libs/delimiters";
import wordCases from "./libs/word-cases";
import { getRandomPhrase } from "./libs/phrase-generator";
import { defineComponent } from "@vue/runtime-core";

// load settings from url
const options = new Options();

// load dictionaries list
const dictionaries = dictionaryList.list();

if (!options.dictionary) {
  options.dictionary = dictionaries.keys().next().value;
}

export default defineComponent({
  data() {
    return {
      dictionaries: dictionaries,
      options: options,
      wordCases: wordCases,
      delimiters: delimiters,
      result: [],
      locked: false,
      error: undefined,
    };
  },
  components: {
    FontPreload: fontPreload,
    Footer: footer,
    About: about,
    SourceCode: sourceCode,
    DictionaryInfo: dictionaryInfo,
    Header: header,
    PasswordList: passwordList,
  },
  methods: {
    reset() {
      this.result = [];
      this.error = undefined;
    },
    async update() {
      this.locked = true;
      this.error = undefined;

      try {
        for (let i = 0; i < this.options.count; i++) {
          const rnd = await getRandomPhrase({
            dictionary: this.options.dictionary,
            words: this.options.words,
            digits: this.options.digits,
            minWordLength: this.options.minWordLength,
            maxWordLength: this.options.maxWordLength,
            wordCase: this.options.wordCase,
            delimiter: this.options.delimiter,
          });

          this.options.save();

          this.result.unshift(rnd as never);
        }
      } catch (e) {
        this.error = e.message;
      }

      this.locked = false;
    },
  },
});
</script>
