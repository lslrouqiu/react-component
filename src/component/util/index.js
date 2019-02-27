export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
}
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
