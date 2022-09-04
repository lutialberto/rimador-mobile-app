export interface IWord {
  id: number;
  name: string;
  length: number;
  syllables: ISyllables;
  strongSyllable: IStrongSyllable;
  rhyme: IRhyme;
  vocalStruct: string;
}

export interface ISyllables {
  count: number;
  value: string;
}

export interface IStrongSyllable {
  position: number;
}

export interface IRhyme {
  consonant: string;
  asonant: string;
}
