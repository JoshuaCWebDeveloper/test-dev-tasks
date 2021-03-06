/* Desktop.js
 * The top-level component for react-orcus. Renders the entire desktop.
 * Dependencies: react, prop-types modules
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict"; //import modules

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Desktop = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//define constants
var DEFAULT_ID = "ORCUS_DESKTOP_DEFAULT_ID_VALUE_392183"; //create our Desktop class

var Desktop =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Desktop, _React$Component);

  function Desktop(props, context) {
    var _this;

    _classCallCheck(this, Desktop);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Desktop).call(this, props, context)); //create default id

    _this.defaultId = "orcus-desktop-" + Math.floor(Math.random() * 100);
    return _this;
  }

  _createClass(Desktop, [{
    key: "render",
    value: function render() {
      var className = "orcus-desktop " + this.props.className,
          id = this.props.id == DEFAULT_ID ? this.defaultId : this.props.id,
          _this$props = this.props,
          shortcuts = _this$props.shortcuts,
          taskbar = _this$props.taskbar,
          programMenu = _this$props.programMenu,
          props = _objectWithoutProperties(_this$props, ["shortcuts", "taskbar", "programMenu"]),
          shortcutsContent = "",
          taskbarContent = "",
          programMenuContent = "";

      if (shortcuts) {
        shortcutsContent = _react["default"].createElement("div", {
          className: "orcus-shortcuts"
        });
      }

      if (taskbar) {
        taskbarContent = _react["default"].createElement("div", {
          className: "orcus-taskbar"
        });
      }

      if (programMenu) {
        programMenuContent = _react["default"].createElement("div", {
          className: "orcus-program-menu"
        });
      } //render


      return _react["default"].createElement("div", _extends({}, props, {
        className: className,
        id: id
      }), _react["default"].createElement("div", {
        className: "orcus-desktop-content"
      }, shortcutsContent, this.props.children), taskbarContent, programMenuContent);
    }
  }]);

  return Desktop;
}(_react["default"].Component); //define default props


exports.Desktop = Desktop;
Desktop.defaultProps = {
  shortcuts: true,
  taskbar: true,
  programMenu: true,
  className: "",
  id: DEFAULT_ID
}; //define props

Desktop.propTypes = {
  shortcuts: _propTypes["default"].bool,
  taskbar: _propTypes["default"].bool,
  programMenu: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  id: _propTypes["default"].string
}; //define context

Desktop.contextTypes = {}; //export Desktop class