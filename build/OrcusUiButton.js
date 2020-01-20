/* OrcusUiButton.js
 * Component Description
 * Dependencies: react, prop-types modules, components, services, classes
 * Author: Joshua Carter
 * Created: January 1, 2020
 */
"use strict";
//import modules

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrcusUiButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create our OrcusUiButton class
var OrcusUiButton = function OrcusUiButton(props) {
    var className = "orcus-ui orcus-button " + props.className;
    //render
    return _react2.default.createElement(
        'span',
        _extends({}, props, { className: className }),
        this.props.children
    );
};
//define default props
OrcusUiButton.defaultProps = {
    className: ""
};
//define props
OrcusUiButton.propTypes = {
    className: _propTypes2.default.string
};

//export OrcusUiButton class
exports.OrcusUiButton = OrcusUiButton;