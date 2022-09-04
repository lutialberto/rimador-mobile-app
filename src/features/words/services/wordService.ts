import {IWordFilters} from '../models/IWordFilters';
import {IWord} from '../models/words/IWord';

export async function getWords(filters?: IWordFilters): Promise<IWord[]> {
  let words = await require('../assets/words.json');
  if (filters) {
    words = words.filter(
      (w: IWord) =>
        (!filters.length || w.name.length === filters.length) &&
        (!filters.prefix || w.name.startsWith(filters.prefix)) &&
        (!filters.sufix || w.name.endsWith(filters.sufix)),
    );
  }
  return words;
}

export async function getWordDetail(id: number): Promise<IWord | undefined> {
  const res = await getWords();
  return res.find(w => w.id === id);
}
