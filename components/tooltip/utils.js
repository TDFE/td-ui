/**
 * Created by kongliang on 29/06/2017.
 */

export function getOffsetToBody(dom) {
  let offsetX = 0;
  let offsetY = 0;
  let offsetParent = dom;
  while (offsetParent) {
    offsetX += dom.offsetLeft;
    offsetY += dom.offsetTop;
    offsetParent = dom.offsetParent;
    if (!offsetParent || offsetParent === document.body) {
      break;
    }
  }
  return [offsetX, offsetY];
}

export function contains(rootClass, n) {
  let node = n;
  while (node && node !== document.body) {
    if (node.className === rootClass) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

export function placeTooltip(placeTop, placeLeft, tooltipW, tooltipH, targetRect) {
  const targetW = targetRect.width;
  const targetH = targetRect.height;
  const targetLeft = targetRect.left;
  const targetTop = targetRect.top;
  let left, top;
  switch (placeTop) {
    case 'bottom':
      top = targetTop + targetH;
      break;
    case 'bottomAlign':
      top = targetTop + targetH - tooltipH;
      break;
    case 'center':
      top = targetTop + targetH / 2 - tooltipH / 2;
      break;
    case 'topAlign':
      top = targetTop;
      break;
    default:
      top = targetTop - tooltipH;
  }

  switch (placeLeft) {
    case 'right':
      left = targetLeft + targetW;
      break;
    case 'rightAlign':
      left = targetLeft + targetW - tooltipW;
      break;
    case 'center':
      left = targetLeft + targetW / 2 - tooltipW / 2;
      break;
    case 'leftAlign':
      left = targetLeft;
      break;
    default:
      left = targetLeft - tooltipW;
  }
  return {top: top, left: left};
}

export function isPlacementValid(left, top, width, height) {
  return left >= document.body.scrollLeft && top >= document.body.scrollTop && (left + width) <= (document.body.scrollLeft + document.documentElement.clientWidth) && (top + height) <= (document.body.scrollTop + document.documentElement.clientHeight);
}
