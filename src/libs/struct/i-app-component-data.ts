import Dictionary from "../dictionary";
import { Options } from "../settings-storage";
import { WordCase } from "../word-cases";

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
