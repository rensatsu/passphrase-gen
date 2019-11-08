/** A module to create a new collection and fill it with dictionaries */

import DictionaryCollection from './dictionary-collection';
import Dictionary from './dictionary';

const collection = new DictionaryCollection();

collection.add(new Dictionary({
    code: 'english',
    name: 'English Popular',
    path: 'google-10000-english-usa-no-swears.txt',
    title: '10000 popular english words in USA (without swear words)',
    source: 'https://github.com/first20hours/google-10000-english'
}));

collection.add(new Dictionary({
    code: 'eff-large',
    name: 'EFF Large (five dice)',
    path: 'eff_large_wordlist.txt',
    title: 'EFF\'s New Wordlists for Random Passphrases (five dice)',
    source: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases'
}));

collection.add(new Dictionary({
    code: 'eff-short1',
    name: 'EFF Short 1 (four dice)',
    path: 'eff_short_wordlist_1.txt',
    title: 'EFF\'s New Wordlists for Random Passphrases (four dice)',
    source: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases'
}));

collection.add(new Dictionary({
    code: 'eff-short2',
    name: 'EFF Short 2 (unique prefix)',
    path: 'eff_short_wordlist_2_0.txt',
    title: 'EFF\'s New Wordlists for Random Passphrases (with words that have unique three-character prefixes)',
    source: 'https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases'
}));

collection.add(new Dictionary({
    code: 'anime',
    name: 'Anime',
    path: 'anime-titles.txt',
    title: 'Anime titles',
    source: 'https://wiki.anidb.net/w/API'
}));

export default collection;
