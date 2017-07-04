import React from 'react';
import PropTypes from 'prop-types';
export default class Option extends React.Component {
  static PropTypes = {
    value: PropTypes.string
  }
  static isSelectOption = true;
}
