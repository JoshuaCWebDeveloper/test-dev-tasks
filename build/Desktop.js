/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Desktop = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//define constants
var DEFAULT_ID = "ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183";
//create our Desktop class
var Desktop = function (_React$Component) {
    _inherits(Desktop, _React$Component);

    function Desktop(props, context) {
        _classCallCheck(this, Desktop);

        //create default id
        var _this = _possibleConstructorReturn(this, (Desktop.__proto__ || Object.getPrototypeOf(Desktop)).call(this, props, context));

        _this.defaultId = "orcus-desktop-" + Math.floor(Math.random() * 100);
        return _this;
    }

    _createClass(Desktop, [{
        key: 'render',
        value: function render() {
            var className = "orcus-desktop " + this.props.className,

            //get id, either property or default
            id = this.props.id == DEFAULT_ID ? this.defaultId : this.props.id,

            //{shortcuts, taskbar, programMenu, ...props} = this.props,
            shortcuts = 1,
                taskbar = 1,
                programMenu = true,
                props = {},
                shortcutsContent = "",
                taskbarContent = "",
                programMenuContent = "";
            if (shortcuts) {
                shortcutsContent = _react2.default.createElement('div', { className: 'orcus-shortcuts' });
            }
            if (taskbar) {
                taskbarContent = _react2.default.createElement('div', { className: 'orcus-taskbar' });
            }
            if (programMenu) {
                programMenuContent = _react2.default.createElement('div', { className: 'orcus-program-menu' });
            }
            //render
            return _react2.default.createElement(
                'div',
                _extends({}, props, { className: className, id: id }),
                _react2.default.createElement(
                    'div',
                    { className: 'orcus-desktop-content' },
                    shortcutsContent,
                    this.props.children
                ),
                taskbarContent,
                programMenuContent
            );
        }
    }]);

    return Desktop;
}(_react2.default.Component);
//define default props
Desktop.defaultProps = {
    shortcuts: true,
    taskbar: true,
    programMenu: true,

    className: "",
    id: DEFAULT_ID
};
//define props
Desktop.propTypes = {
    shortcuts: _propTypes2.default.bool,
    taskbar: _propTypes2.default.bool,
    programMenu: _propTypes2.default.bool,

    className: _propTypes2.default.string,
    id: _propTypes2.default.string
};
//define context
Desktop.contextTypes = {};
//export Desktop class
exports.Desktop = Desktop;