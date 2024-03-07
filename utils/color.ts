export function getRandomColor(str: string) {
  let sum = 0
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i)
  }
  return [
    '#A48AEE',
    '#34AFD7',
    '#525BCE',
    '#2A7EB6',
    '#D33E86',
    '#D45151',
    '#C6A73A',
    '#4D9C46',
    '#DD7236',
  ][sum % 9]
}
