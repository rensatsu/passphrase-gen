<style lang="scss">
@import './assets/stylesheets/app';
@import '../node_modules/bulma/bulma';

header {
    display: flex;
    align-items: center;
}

.app-icon {
    width: 48px;
    height: 48px;
    background: url('./assets/images/icon48.png');
    background-size: 100% 100%;
}

.collector {
    opacity: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    display: inline-flex;
    pointer-events: none;
    position: fixed;
}
</style>

<template>
    <section class="section">
        <div class="container">
            <header class="mb-1">
                <div class="app-icon"></div>
                <h1 class="title ml-1">Passphrase Generator</h1>
            </header>

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
                                        >{{ dict.name }}</option>
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
                            <label for="inp-min-length" class="label">Minimum word length</label>
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
                            <label for="inp-max-length" class="label">Maximum word length</label>
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
                                        >{{ name }}</option>
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
                                        >{{ delim.name }} ({{ delim.value }})</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label for="inp-phrases-count" class="label">Phrases to generate</label>
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
                                    :disabled="this.locked"
                                >Generate</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="column" v-if="result === null">
                    <h2 class="subtitle">What is it?</h2>
                    <article class="message">
                        <div class="message-body">
                            This is a password phrase generator.
                            <br />It generates a password phrase based on words from the selected dictionary.
                            <br />Also, you have an option to add a few digits to make it more secure.
                            <br />
                            <a
                                href="https://xkcd.com/936/"
                                target="_blank"
                            >Check out the xkcd comic about password strength</a>.
                        </div>
                    </article>

                    <h2 class="subtitle">Source code</h2>
                    <article class="message">
                        <div class="message-body">
                            Source code is availabe on
                            <a
                                href="https://github.com/rensatsu/passphrase-gen"
                                target="_blank"
                            >Github</a>.
                        </div>
                    </article>

                    <h2 class="subtitle">Dictionary information</h2>
                    <article class="message">
                        <div class="message-body">
                            <h3 class="mb-1">
                                {{ dictionaries[options.dictionary].name }}
                            </h3>
                            <p>
                                {{ dictionaries[options.dictionary].title }}
                            </p>
                            <p>
                                <a
                                    :href="dictionaries[options.dictionary].source"
                                    rel="nofollow"
                                    target="_blank"
                                >
                                    Source
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
                <div class="column" v-else>
                    <h2 class="subtitle">Result</h2>
                    <article class="message is-danger" v-if="error !== null">
                        <div class="message-body">{{ error }}</div>
                    </article>
                    <pre><code v-for="line in result" v-bind:key="line" class="is-block">{{ line }}</code></pre>
                    <div class="mt-1">
                        <button @click="reset" class="button">Reset</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Collector -->
        <img src="https://collector.rencloud.workers.dev/collect?app=xkcdpw"
            alt="Collector" role="presentation" width="1" height="1"
            class="collector" loading="off"
        />
        <!-- END: Collector -->
    </section>
</template>

<script>
import 'typeface-ibm-plex-sans';
import 'typeface-ibm-plex-mono';
import fontPreload from './font-preload';
import dictionaryList from './libs/load-dictionaries';
import phraseGenerator from './libs/phrase-generator';
import * as settingsStorage from './libs/settings-storage';
import delimiters from './libs/delimiters';
import wordCases from './libs/word-cases';

// load settings from url
const lSettings = settingsStorage.load();

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
    wordCase: 'lower',
    delimiter: '-',
    count: 1
};

// merge options from settings-storage
if (lSettings !== null) {
    Object.entries(options).forEach(([key, value]) => {
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
            error: null
        };
    },
    components: {
        FontPreload: fontPreload
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
                        delimiter: this.options.delimiter
                    });

                    settingsStorage.save(this.options);

                    if (this.result === null) {
                        this.result = [];
                    }

                    this.result.unshift(rnd);
                }
            } catch (e) {
                this.error = e.message;
            }

            this.locked = false;
        }
    }
};
</script>
