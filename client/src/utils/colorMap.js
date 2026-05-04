/** Maps product color keys to display hex */
export const colorHex = {
  black: '#1a1a1a',
  navy: '#1e3a5f',
  'onion-pink': '#c9a0a8',
  white: '#f5f5f5',
  grey: '#6b7280',
  'light-purple': '#c4b5fd',
  mauve: '#9f7a8a',
  'dusty-rose': '#d4a5a5',
  cream: '#f5f0e6',
  ivory: '#fffff0',
  champagne: '#f7e7ce',
  'midnight-blue': '#191970',
  pink: '#fbcfe8',
  'sage-green': '#4a7c5f',
  crimson: '#dc143c',
  wine: '#722f37',
}

export function getColorDotStyle(key) {
  return { backgroundColor: colorHex[key] || '#ccc' }
}
