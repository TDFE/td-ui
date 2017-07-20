/**
 * Created by kongliang on 19/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';
import s from './style';
import {placements} from './placements';
import {contains, placeTooltip, isPlacementValid} from './utils';
export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popVisible: false,
      adjustedPlacement: this.props.placement
    };
    this.getToolTipPos = this.getToolTipPos.bind(this);
  }

  static propTypes = {
    children: PropTypes.any,
    defaultVisible: PropTypes.bool,
    visible: PropTypes.bool,
    placement: PropTypes.string,
    onVisibleChange: PropTypes.func,
    afterVisibleChange: PropTypes.func,
    overlayStyle: PropTypes.object,
    overlayClassName: PropTypes.string,
    prefixCls: PropTypes.string,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    getTooltipContainer: PropTypes.func,
    destroyTooltipOnHide: PropTypes.bool,
    align: PropTypes.object,
    arrowContent: PropTypes.any
  };

  static defaultProps = {
    prefixCls: s.tooltipPrefix,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    align: {},
    placement: 'right',
    trigger: ['hover'],
    overlayClassName: '',
    arrowContent: null
  };

  onPopupMouseEnter = () => {
    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
  }

  onPopupMouseLeave = () => {
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  }

  onPopupMouseClick = (e) => {
    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
  }

  setPopVisible = (visible) => {
    this.setState({popVisible: visible});
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(visible);
    }
  }

  delaySetPopupVisible = (visible, delayS) => {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopVisible(visible);
        this.clearDelayTimer();
      }, delay);
    } else {
      this.setPopVisible(visible);
    }
  }

  clearDelayTimer = () => {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  onDocumentClick = (event) => {
    const target = event.target;
    if (this.state.popVisible && !contains(this.props.prefixCls + '-popup', target)) {
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  componentDidMount() {
    if (this.props.trigger.indexOf('click') !== -1) {
      document.body.addEventListener('click', this.onDocumentClick)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onDocumentClick)
  }

  getToolTipPos (width, height) {
    const targetBound = this.refs.baseCom.getBoundingClientRect();
    const placementBacks = ['top', 'bottom', 'right', 'left'];
    const tooltipPos = {left: 0, top: 0};
    let placement = placements[this.props.placement],
      result = placeTooltip(placement.posTop, placement.posLeft, width, height, targetBound);
    tooltipPos.left = result.left + placement.offset[0] + document.body.scrollLeft;
    tooltipPos.top = result.top + placement.offset[1] + document.body.scrollTop;
    if (this.props.autoAdjustOverflow) {
      for (let i = 0, len = placementBacks.length; i < len; i++) {
        placement = placements[placementBacks[i]];
        result = placeTooltip(placement.posTop, placement.posLeft, width, height, targetBound);
        if (isPlacementValid(result.left, result.top, width, height)) {
          tooltipPos.left = result.left + placement.offset[0] + document.body.scrollLeft;
          tooltipPos.top = result.top + placement.offset[1] + document.body.scrollTop;
          if (placementBacks[i] !== this.state.adjustedPlacement) {
            this.setState({adjustedPlacement: placementBacks[i]});
          }
          break;
        }
      }
    }
    return tooltipPos;
  }

  render() {
    const {prefixCls, content, title, trigger, overlayStyle, overlayClassName, visible} = this.props;
    const mouseProps = {};
    if (trigger.indexOf('hover') !== -1) {
      mouseProps.onMouseEnter = this.onPopupMouseEnter;
      mouseProps.onMouseLeave = this.onPopupMouseLeave;
    }
    if (trigger.indexOf('click') !== -1) {
      mouseProps.onClick = this.onPopupMouseClick;
    }
    const child = React.cloneElement(this.props.children);
    return <div style={overlayStyle} className={prefixCls + '-root ' + overlayClassName}>
      <div {...mouseProps} ref="baseCom">{child}</div>
      {visible || this.state.popVisible ? (
        <Popup
          ref="popup"
          getToolTipPos={this.getToolTipPos}
          content={content || title}
          title={content ? title : null}
          placement={this.state.adjustedPlacement}
          prefixCls={prefixCls}
        />
      ) : ''}
    </div>;
  }
}
