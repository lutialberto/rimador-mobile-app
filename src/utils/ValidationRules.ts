export const onlyDigits = (v: string | boolean) =>
  typeof v === 'string' && (v.length === 0 || /^\d+$/.test(v.toString()))
    ? true
    : 'Poner solo números';

export const onlyVocalStruct = (v: string | boolean) =>
  (typeof v === 'string' && v.length === 0) ||
  /^(a|á|e|é|i|í|o|ó|u|ú|A|Á|E|É|I|Í|O|Ó|U|Ú|-)+$/.test(v.toString())
    ? true
    : 'Poner solo vocales y/o guiones';
