import React from 'react';
import PropTypes from 'prop-types';


const Success = ({ msg }) => msg ? <div className="alert alert-success">{msg}</div> : null;

const Error = ({ msg }) => msg ? <div className="alert alert-danger">{msg}</div> : null;

Success.propTypes = { msg: PropTypes.string };

Error.propTypes = { msg: PropTypes.string };

export { Success, Error }