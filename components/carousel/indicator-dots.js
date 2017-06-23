import React from 'react'
import PropTypes from 'prop-types'

function Dot (props) {
  return (
    <span
      onClick={((e) => {
        const index = props.index;
        return (e) => {
          props.onClick(index);
        }
      })()}
      style={{
        display: 'inline-block',
        height: '8px',
        width: '8px',
        borderRadius: '4px',
        backgroundColor: 'white',
        margin: '7px 5px',
        opacity: props.selected ? '1' : '0.3',
        transitionDuration: '300ms',
        cursor: 'pointer'
      }} />
  )
}

export default function IndicatorDots (props) {
  const wrapperStyle = {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0px',
    textAlign: 'center'
  }
  // 当只有一个dot的时候隐藏dot
  if (props.total < 2) {
    return <div style={wrapperStyle} />
  } else {
    return (
      <div style={wrapperStyle}>{
        Array.apply(null, Array(props.total)).map((x, i) => {
          return <Dot key={i} index={i} onClick={props.onClick} selected={props.index === i} />
        })
      }</div>
    )
  }
}

IndicatorDots.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}
