/* OrcusApp.js
 * Represents a single application in the react-orcus desktop
 * Dependencies: react, prop-types modules, OrcusUiButton components
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import modules

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrcusApp = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OrcusUiButton = require('./OrcusUiButton.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import components


//define constants
var DEFAULT_ID = "ORCUS_APP_DEFAULT_ID_VALUE_68142";
//create our OrcusApp class
var OrcusApp = function (_React$Component) {
    _inherits(OrcusApp, _React$Component);

    function OrcusApp(props, context) {
        _classCallCheck(this, OrcusApp);

        //bind event handlers
        var _this = _possibleConstructorReturn(this, (OrcusApp.__proto__ || Object.getPrototypeOf(OrcusApp)).call(this, props, context));

        _this.handleMaximizeClick = _this.handleMaximizeClick.bind(_this);
        _this.handleRestoreClick = _this.handleRestoreClick.bind(_this);

        //init state
        _this.state = {
            opened: _this.props.initialOpened,
            maximized: false
        };

        //create default id
        _this.defaultId = "orcus-app-" + Math.floor(Math.random() * 10000);
        return _this;
    }

    _createClass(OrcusApp, [{
        key: 'render',
        value: function render() {
            var className = "orcus-app orcus-window " + this.props.className,

            //get id, either property or default
            id = this.props.id == DEFAULT_ID ? this.defaultId : this.props.id,

            //{slug, name, icon, initialOpened, initialPosition, ...props} = this.props,
            slugs = undefined,
                props = {},
                restoreMaximizeContent = "";

            //if we are closed
            if (!this.state.opened) {
                //render nothing
                return null;
            }

            //if we are maximized
            if (this.state.maximized) {
                //show restore button
                restoreMaximizeContent = _react2.default.createElement(
                    _OrcusUiButton.OrcusUiButton,
                    { className: 'orcus-restore', onClick: this.handleRestoreClick },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-resize-small' })
                );
            } else {
                //show maximize button
                restoreMaximizeContent = _react2.default.createElement(
                    _OrcusUiButton.OrcusUiButton,
                    { className: 'orcus-maximize', onClick: this.handleRestoreClick },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-resize-full' })
                );
            }

            //render
            return _react2.default.createElement(
                'div',
                _extends({}, props, { className: className, id: id }),
                _react2.default.createElement(
                    'header',
                    { className: 'orcus-title-bar' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'orcus-title' },
                        this.props.name
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'orcus-window-controls' },
                        _react2.default.createElement(
                            _OrcusUiButton.OrcusUiButton,
                            { className: 'orcus-minimize' },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-minus' })
                        ),
                        restoreMaximizeContent,
                        _react2.default.createElement(
                            _OrcusUiButton.OrcusUiButton,
                            { className: 'orcus-minimize' },
                            _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'orcus-client-area' },
                    this.props.children
                )
            );
        }
    }, {
        key: 'handleMaximizeClick',
        value: function handleMaximizeClick(e) {
            this.setState({ maximized: true });
        }
    }, {
        key: 'handleRestoreClick',
        value: function handleRestoreClick(e) {
            this.setState({ maximized: false });
        }
    }]);

    return OrcusApp;
}(_react2.default.Component);
//define default props
OrcusApp.defaultProps = {
    icon: "th-large",
    initialOpened: false,
    initialPosition: [0, 0, 100, 100],

    className: "",
    id: DEFAULT_ID
};
//define props
OrcusApp.propTypes = {
    slug: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string,
    initialOpened: _propTypes2.default.bool,
    initialPosition: _propTypes2.default.arrayOf(_propTypes2.default.number),

    className: _propTypes2.default.string,
    id: _propTypes2.default.string
};
//define context
OrcusApp.contextTypes = {};
//export OrcusApp class
exports.OrcusApp = OrcusApp;