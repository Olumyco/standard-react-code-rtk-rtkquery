import React from 'react';
import PropTypes from 'prop-types';

function CurrencyFormat(props) {

  return (
    <span>{(props.value.toFixed(2).toString()).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</span>
  );
}

CurrencyFormat.propTypes = {
  value: PropTypes.number.isRequired
};

export default CurrencyFormat;