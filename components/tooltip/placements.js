const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

export const placements = {
  left: {
    posTop: 'center',
    posLeft: 'left',
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset
  },
  right: {
    posTop: 'center',
    posLeft: 'right',
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset
  },
  top: {
    posTop: 'top',
    posLeft: 'center',
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset
  },
  bottom: {
    posTop: 'bottom',
    posLeft: 'center',
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset
  },
  topLeft: {
    posTop: 'top',
    posLeft: 'leftAlgin',
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset
  },
  leftTop: {
    posTop: 'topAlign',//'top', 'topAlign', 'center', 'bottomAlign', 'bottom'
    posLeft: 'left',//'left', 'leftAlgin', 'center', 'rightAlign', 'right'
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset
  },
  topRight: {
    posTop: 'top',
    posLeft: 'rightAlign',
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset
  },
  rightTop: {
    posTop: 'topAlign',
    posLeft: 'right',
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset
  },
  bottomRight: {
    posTop: 'bottom',
    posLeft: 'rightAlign',
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset
  },
  rightBottom: {
    posTop: 'bottomAlign',
    posLeft: 'right',
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset
  },
  bottomLeft: {
    posTop: 'bottom',
    posLeft: 'leftAlgin',
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset
  },
  leftBottom: {
    posTop: 'bottomAlign',
    posLeft: 'left',
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset
  },
};

export default placements;
