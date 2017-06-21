/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-21 16:15:03
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-21 16:15:04
 */

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};

const targetOffset = [0, 0];

const placements = {
  bottomLeft: {
    points: ['tl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset
  },
  bottomRight: {
    points: ['tr', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset
  },
};

export default placements;
