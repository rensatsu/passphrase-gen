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
                      v-for="(dict, code) of dictionaries"
                      v-bind:key="code"
                      :value="code"
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
                      v-for="delim in delimiters"
                      v-bind:key="delim.value"
                      :value="delim.value"
                    >
                      {{ delim.name }} ({{ delim.value }})
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
        <div class="column" v-if="result === null">
          <About></About>
          <SourceCode></SourceCode>
          <DictionaryInfo
            v-bind:dictionaries="dictionaries"
            v-bind:selected="options.dictionary"
          ></DictionaryInfo>
        </div>
        <PasswordList
          v-else
          v-bind:error="error"
          v-bind:result="result"
        ></PasswordList>
      </div>
    </div>
  </section>
  <Footer></Footer>
</template>

<script>
import fontPreload from "./components/font-preload";
import footer from "./components/footer";
import about from "./components/about";
import sourceCode from "./components/source-code";
import dictionaryInfo from "./components/dictionary-info";
import header from "./components/header";
import passwordList from "./components/password-list";

import dictionaryList from "./libs/load-dictionaries";
import phraseGenerator from "./libs/phrase-generator";
import { load as settingsLoad, save as settingsSave } from "./libs/settings-storage";
import delimiters from "./libs/delimiters";
import wordCases from "./libs/word-cases";

// load settings from url
const lSettings = settingsLoad();

// load dictionaries list
const dictionaries = dictionaryList.list();
const defaultDictCode = Object.values(dictionaries)[0].code;

// default set of options
const options = {
  dictionary: defaultDictCode,
  words: 3,
  digits: 4,
  minWordLength: 3,
  maxWordLength: 8,
  wordCase: "lower",
  delimiter: "-",
  count: 1,
};

// merge options from settings-storage
if (lSettings !== null) {
  Object.keys(options).forEach((key) => {
    if (key in lSettings) {
      options[key] = lSettings[key];
    }
  });
}

export default {
  data() {
    return {
      dictionaries: dictionaries,
      options: options,
      wordCases: wordCases,
      delimiters: delimiters,
      result: null,
      locked: false,
      error: null,
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
      this.result = null;
      this.error = null;
    },
    async update() {
      this.locked = true;
      this.error = null;

      try {
        for (let i = 0; i < this.options.count; i++) {
          const rnd = await phraseGenerator({
            dictionary: this.options.dictionary,
            words: this.options.words,
            digitsCount: this.options.digits,
            minWordLength: this.options.minWordLength,
            maxWordLength: this.options.maxWordLength,
            wordCase: this.options.wordCase,
            delimiter: this.options.delimiter,
          });

          settingsSave(this.options);

          if (this.result === null) {
            this.result = [];
          }

          this.result.unshift(rnd);
        }
      } catch (e) {
        this.error = e.message;
      }

      this.locked = false;
    },
  },
};
</script>
