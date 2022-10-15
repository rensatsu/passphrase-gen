<style lang="scss">
@import "./assets/stylesheets/blueberry.scss";
@import "./assets/stylesheets/app.scss";

details > summary {
  user-select: none;
  cursor: pointer;
}
</style>

<template>
  <Header class="container"></Header>
  <main class="container">
    <div class="grid grid--1-1 grid-mobile--1">
      <div>
        <FontPreload></FontPreload>
        <form @submit.prevent="update">
          <div class="form-group">
            <label for="sel-dictionary">Dictionary</label>
            <select
              class="form-control form-group"
              id="sel-dictionary"
              v-model="options.dictionary"
            >
              <option v-for="[id, dict] of dictionaries" :key="id" :value="id">
                {{ dict.name }}
              </option>
            </select>
            <DictionaryInfo :selected="options.dictionary"></DictionaryInfo>
          </div>

          <button
            type="button"
            class="btn btn-block form-group"
            @click.prevent="toggleAdvanced"
          >
            <template v-if="options.isAdvanced">Hide advanced options</template>
            <template v-else>Show advanced options</template>
          </button>

          <div class="form-group" v-if="options.isAdvanced">
            <label for="inp-words">Words count</label>
            <input
              type="number"
              class="form-control"
              id="inp-words"
              v-model.number="options.words"
              min="1"
              max="20"
            />
          </div>
          <div class="form-group" v-if="options.isAdvanced">
            <label for="inp-digits">Digits count</label>
            <input
              type="number"
              class="form-control"
              id="inp-digits"
              v-model.number="options.digits"
              min="0"
              max="20"
            />
          </div>
          <div class="form-group" v-if="options.isAdvanced">
            <label for="inp-min-length">Word length</label>
            <div class="grid grid-mobile--1-1 grid--1-1">
              <input
                type="number"
                class="form-control"
                id="inp-min-length"
                v-model.number="options.minWordLength"
                min="1"
                max="15"
                placeholder="Min word length"
              />
              <input
                type="number"
                class="form-control"
                id="inp-max-length"
                v-model.number="options.maxWordLength"
                min="1"
                max="15"
                placeholder="Max word length"
              />
            </div>
          </div>
          <div class="form-group" v-if="options.isAdvanced">
            <label for="sel-case">Word case</label>
            <select
              class="form-control"
              id="sel-case"
              v-model="options.wordCase"
            >
              <option
                v-for="[code, name] in wordCases"
                :key="code"
                :value="code"
              >
                {{ name }}
              </option>
            </select>
          </div>
          <div class="form-group" v-if="options.isAdvanced">
            <label for="sel-delimiter">Delimiter</label>
            <select
              class="form-control"
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
          <div class="form-group" v-if="options.isAdvanced">
            <label for="inp-phrases-count">Phrases to generate</label>
            <input
              type="number"
              class="form-control"
              id="inp-phrases-count"
              v-model.number="options.count"
              min="1"
              max="30"
            />
          </div>

          <div class="form-group">
            <div class="control">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                :disabled="locked"
              >
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
      <div v-if="result.length === 0 && !error">
        <About></About>
        <SourceCode></SourceCode>
      </div>
      <PasswordList
        v-else
        :error="error"
        :result="result"
        @reset="reset"
      ></PasswordList>
    </div>
  </main>
  <Footer class="container"></Footer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { Ref } from "vue";

import FontPreload from "./components/font-preload.vue";
import Footer from "./components/footer.vue";
import About from "./components/about.vue";
import SourceCode from "./components/source-code.vue";
import DictionaryInfo from "./components/dictionary-info.vue";
import Header from "./components/header.vue";
import PasswordList from "./components/password-list.vue";

import dictionaryList from "./libs/load-dictionaries";
import { Options } from "./libs/settings-storage";
import { delimiters as delimitersMap } from "./libs/delimiters";
import { wordCaseNames } from "./libs/word-cases";
import { getRandomPhrase } from "./libs/phrase-generator";

// declare and load dictionaries
const dictionaries = ref(dictionaryList.list());

// declare and load settings from url
const options = reactive(new Options());

if (!options.dictionary) {
  options.dictionary = dictionaries.value.keys().next().value;
}

const wordCases = ref(wordCaseNames);
const delimiters = ref(delimitersMap);
const result: Ref<Array<string>> = reactive(ref([]));
const locked = ref(false);
const error: Ref<string | undefined> = ref(undefined);

function toggleAdvanced() {
  options.isAdvanced = !options.isAdvanced;
}

function reset() {
  result.value.splice(0, result.value.length);
  error.value = undefined;
}

async function update() {
  locked.value = true;
  error.value = undefined;

  try {
    options.save();

    for (let i = 0; i < options.count; i++) {
      const rnd = await getRandomPhrase({
        dictionary: options.dictionary,
        words: options.words,
        digits: options.digits,
        minWordLength: options.minWordLength,
        maxWordLength: options.maxWordLength,
        wordCase: options.wordCase,
        delimiter: options.delimiter,
      });

      console.log("Generated password", rnd);
      // result.value = [rnd, ...result.value];
      result.value.unshift(rnd);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "Unknown error";
    }
  }

  locked.value = false;
}
</script>
