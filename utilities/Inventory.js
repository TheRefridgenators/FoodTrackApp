export function useProperArticle(itemName) {
  return (itemName.match(/^[aeiou]/i) ? "an " : "a ") + itemName;
}