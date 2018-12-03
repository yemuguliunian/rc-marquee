'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./Marquee.less');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 文字滚动
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * auto : ywx
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * createTime : 2018-07-16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Marquee = function (_React$Component) {
    _inherits(Marquee, _React$Component);

    function Marquee(props) {
        _classCallCheck(this, Marquee);

        var _this = _possibleConstructorReturn(this, (Marquee.__proto__ || Object.getPrototypeOf(Marquee)).call(this, props));

        _this.state = {
            overflowWidth: 0,
            animatedWidth: 0,
            marqueeOffsetWidth: 0,
            textOffsetWidth: 0, // 文本的实际宽度
            display: false, //
            afterDelay: false,
            marqueeId: _.uniqueId('marquee_'),
            textId: _.uniqueId('text_'),
            endTextId: _.uniqueId('endText_')
        };

        _this._marqueeTimer = "";
        _this.marqueeDiv = "";
        _this.textDiv = "";
        _this.marquee = _this._marquee.bind(_this);
        _this.isAuto = _this.props.scrollType === 'auto';
        return _this;
    }

    _createClass(Marquee, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _t = this;
            var scrollType = _t.props.scrollType;
            var _t$state = _t.state,
                marqueeId = _t$state.marqueeId,
                textId = _t$state.textId,
                endTextId = _t$state.endTextId;


            this.marqueeDiv = document.getElementById(marqueeId);
            this.textDiv = document.getElementById(textId);
            this.endTextDiv = document.getElementById(endTextId);

            // 延迟200ms 防止拿不到div的真实offsetWidth
            this.winDelayTimer = setTimeout(function () {
                // marqueeDiv的可见宽度
                var marqueeOffsetWidth = _t.marqueeDiv.offsetWidth;
                var textOffsetWidth = _t.textDiv.offsetWidth;

                _t.setState({
                    marqueeOffsetWidth: marqueeOffsetWidth,
                    textOffsetWidth: textOffsetWidth,
                    display: textOffsetWidth > marqueeOffsetWidth
                });
                if (!!_t._marqueeTimer) {
                    clearInterval(_t._marqueeTimer);
                }
                // scrollType滚动模式为自动滚动时
                if (_t.isAuto) {
                    if (textOffsetWidth > marqueeOffsetWidth) {
                        new Promise(_t._delayTime.bind(_t)).then(function () {
                            _t.setState({
                                afterDelay: true
                            });
                        });
                    }
                }
                clearTimeout(_t.winDelayTimer);
            }, 200);
        }
    }, {
        key: '_delayTime',
        value: function _delayTime(resolve, reject) {
            var _t = this;
            var _t$props = _t.props,
                speed = _t$props.speed,
                delay = _t$props.delay;

            _t.delayTimer = setTimeout(function () {
                _t._marqueeTimer = setInterval(_t.marquee, speed);
                resolve();
            }, delay);
        }
    }, {
        key: '_marquee',
        value: function _marquee() {
            var _state = this.state,
                textOffsetWidth = _state.textOffsetWidth,
                marqueeOffsetWidth = _state.marqueeOffsetWidth;
            var space = this.props.space;

            if (!!this.marqueeDiv) {
                if (this.isAuto) {
                    // 向左无线滚动
                    if (textOffsetWidth + space - this.marqueeDiv.scrollLeft <= 0) {
                        this.marqueeDiv.scrollLeft -= textOffsetWidth + space;
                    } else {
                        this.marqueeDiv.scrollLeft++;
                    }
                } else {
                    // 移入滚动
                    if (marqueeOffsetWidth + this.marqueeDiv.scrollLeft >= textOffsetWidth) {
                        this.marqueeDiv.scrollLeft -= textOffsetWidth;
                        clearInterval(this._marqueeTimer);
                    } else {
                        this.marqueeDiv.scrollLeft++;
                    }
                }
            }
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut() {
            var _t = this;
            var _t$state2 = _t.state,
                marqueeOffsetWidth = _t$state2.marqueeOffsetWidth,
                textOffsetWidth = _t$state2.textOffsetWidth,
                afterDelay = _t$state2.afterDelay;
            var speed = _t.props.speed;

            if (textOffsetWidth > marqueeOffsetWidth) {
                if (this.isAuto && afterDelay) {
                    // 滚动模式为auto时
                    if (!!this._marqueeTimer) {
                        clearInterval(this._marqueeTimer);
                    }
                    this._marqueeTimer = setInterval(_t.marquee, speed);
                } else {
                    clearInterval(this._marqueeTimer);
                    // 还原滚动位置
                    this.marqueeDiv.scrollLeft = 0;
                }
            }
        }
    }, {
        key: 'onMouseOver',
        value: function onMouseOver() {
            var _t = this;
            var _t$state3 = _t.state,
                marqueeOffsetWidth = _t$state3.marqueeOffsetWidth,
                textOffsetWidth = _t$state3.textOffsetWidth,
                afterDelay = _t$state3.afterDelay;
            var speed = _t.props.speed;

            if (this.isAuto) {
                clearInterval(this._marqueeTimer);
            } else {
                if (textOffsetWidth > marqueeOffsetWidth) {
                    this._marqueeTimer = setInterval(_t.marquee, speed);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.delayTimer);
            clearInterval(this._marqueeTimer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                space = _props.space,
                scrollType = _props.scrollType,
                className = _props.className,
                children = _props.children,
                style = _props.style;
            var _state2 = this.state,
                id = _state2.id,
                display = _state2.display,
                marqueeId = _state2.marqueeId,
                textId = _state2.textId,
                endTextId = _state2.endTextId;

            var classString = (0, _classnames4.default)(_defineProperty({}, prefixCls, true), className);

            var endTextRender = void 0,
                textStyle = style;
            // 初始进入即自动滚动
            if (this.isAuto) {
                var _classnames2;

                textStyle = _extends({}, textStyle, {
                    marginRight: space
                });
                var endTextClassStr = (0, _classnames4.default)((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-text', true), _defineProperty(_classnames2, prefixCls + '-text-hide', !display), _classnames2));
                endTextRender = _react2.default.createElement(
                    'div',
                    { id: endTextId, className: endTextClassStr, style: textStyle },
                    children
                );
            }

            return _react2.default.createElement(
                'div',
                {
                    id: marqueeId,
                    onMouseOut: this.onMouseOut.bind(this),
                    onMouseOver: this.onMouseOver.bind(this),
                    className: classString
                },
                _react2.default.createElement(
                    'div',
                    { id: textId, className: prefixCls + '-text', style: textStyle },
                    children
                ),
                endTextRender
            );
        }
    }]);

    return Marquee;
}(_react2.default.Component);

Marquee.defaultProps = {
    prefixCls: 'rc-marquee',
    delay: 1000, // ms 延迟滚动
    speed: 20, // 滚动速度
    space: 30, // 滚动衔接的间距
    scrollType: 'auto' // 滚动模式
};


Marquee.propTypes = {
    delay: _propTypes2.default.number,
    speed: _propTypes2.default.number,
    space: _propTypes2.default.number,
    scrollType: _propTypes2.default.oneOf(['auto', 'hover'])
};

exports.default = Marquee;
module.exports = exports['default'];