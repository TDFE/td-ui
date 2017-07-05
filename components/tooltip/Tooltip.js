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
      tooltipLeft: 0,
      tooltipTop: 0
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
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    align: {},
    placement: 'right',
    trigger: ['hover'],
    arrowContent: null
  };

  onPopupMouseEnter = () => {
    this.setState({popVisible: true, tooltipLeft: 100});
  }

  onPopupMouseLeave = () => {
    this.setState({popVisible: false});
  }

  onPopupMouseClick = (e) => {
    this.setState({popVisible: true});
  }

  onDocumentClick = (event) => {
    const target = event.target;
    if (this.state.popVisible && !contains(this.props.prefixCls + '-popup', target)) {
      this.setState({popVisible: false});
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
    this.removeContainer();
    document.body.removeEventListener('click', this.onDocumentClick)
  }

  getToolTipPos (width, height) {
    const targetBound = this.refs.base.getBoundingClientRect()
    const placementBacks = [this.props.placement, 'top', 'bottom', 'right', 'left'];
    const tooltipPos = {left: 0, top: 0};
    for (let i = 0, len = placementBacks.length; i < len; i++) {
      let placement = placements[placementBacks[i]];
      let result = placeTooltip(placement.posTop, placement.posLeft, width, height, targetBound);
      if (isPlacementValid(result.left, result.top, width, height)) {
        tooltipPos.left = result.left + placement.offset[0];
        tooltipPos.top = result.top + placement.offset[1];
        break;
      }
    }
    return tooltipPos;
  }

  render() {
    const {prefixCls, content, title, trigger, style} = this.props;
    const mouseProps = {ref: 'base'};
    if (trigger.indexOf('hover') !== -1) {
      mouseProps.onMouseEnter = this.onPopupMouseEnter;
      mouseProps.onMouseLeave = this.onPopupMouseLeave;
    }
    if (trigger.indexOf('click') !== -1) {
      mouseProps.onClick = this.onPopupMouseClick;
    }
    const child = React.cloneElement(this.props.children);
    return <div style={style}  className={prefixCls + '-root'}>
      <div {...mouseProps}>{child}</div>
      {this.state.popVisible ? (
        <Popup
          ref="popup"
          getToolTipPos={this.getToolTipPos}
          content={content}
          title={title}
          prefixCls={prefixCls}
        />
      ) : ''}
    </div>;
  }
}
