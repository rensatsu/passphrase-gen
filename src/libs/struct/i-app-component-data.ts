import Dictionary from "../dictionary.js";
import { Options } from "../settings-storage.js";
import { WordCase } from "../word-cases.js";

interface IAppComponentData {
  dictionaries: Map<string, Dictionary>;
  options: Options;
  wordCases: Map<WordCase, string>;
  delimiters: Map<string, string>;
  result: Array<string>;
  locked: boolean;
  error: string | undefined;
}

export default IAppComponentData;
