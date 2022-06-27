let startsWith = new RegExp('^a', 'i');
let endsWith = new RegExp('t$', 'i');
const formPattern = '_d___'
const newVal = formPattern.replaceAll('_', '.');    
const contains = new RegExp('^' + newVal + '$', 'i');
const excludePattern = '';
const strArr = excludePattern.split('').join(',');
const regex = new RegExp('^(?!.*[' + strArr + ']).*$', 'i');
const exclude = new RegExp('^(?!.*[' + strArr + ']).*$', 'i');

const filtered = fiveLetterWords
  .filter(word => startsWith.test(word))
  .filter(word => endsWith.test(word))
  .filter(word => contains.test(word))
  .filter(word => exclude.test(word));
console.log(filtered);
