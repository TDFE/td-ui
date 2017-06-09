export function getOffsetLeft(el) {
  let offset = 0;
  let node = el;
  while (node) {
    if (node.tagName === 'BODY') {
      break;
    }
    offset += node.offsetLeft;
    node = node.offsetParent;
  }
  return offset;
}
