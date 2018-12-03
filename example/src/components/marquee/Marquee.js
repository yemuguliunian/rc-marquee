/**
 * 文字滚动
 * auto : ywx
 * createTime : 2018-07-16
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Marquee.less';

import classnames from 'classnames';

class Marquee extends React.Component {

    static defaultProps = {
        prefixCls : 'rc-marquee',
        delay : 1000, // ms 延迟滚动
        speed : 20, // 滚动速度
        space : 30, // 滚动衔接的间距
        scrollType : 'auto' // 滚动模式
    }

    constructor(props) {
        super(props);

        this.state = {
            overflowWidth : 0,
            animatedWidth : 0,
            marqueeOffsetWidth : 0,
            textOffsetWidth : 0, // 文本的实际宽度
            display : false, //
            afterDelay : false,
            marqueeId : _.uniqueId('marquee_'),
            textId : _.uniqueId('text_'),
            endTextId : _.uniqueId('endText_')
        };

        this._marqueeTimer = "";
        this.marqueeDiv = "";
        this.textDiv = "";
        this.marquee = this._marquee.bind(this);
        this.isAuto = this.props.scrollType === 'auto';
    }

    componentDidMount() {
        const _t = this;
        const { scrollType } = _t.props;
        const { marqueeId, textId, endTextId } = _t.state;

        this.marqueeDiv = document.getElementById(marqueeId);
        this.textDiv = document.getElementById(textId);
        this.endTextDiv = document.getElementById(endTextId);

        // 延迟200ms 防止拿不到div的真实offsetWidth
        this.winDelayTimer = setTimeout(function() {
            // marqueeDiv的可见宽度
            let marqueeOffsetWidth = _t.marqueeDiv.offsetWidth;
            let textOffsetWidth = _t.textDiv.offsetWidth;

            _t.setState({
                marqueeOffsetWidth : marqueeOffsetWidth,
                textOffsetWidth : textOffsetWidth,
                display : textOffsetWidth > marqueeOffsetWidth
            })
            if(!!_t._marqueeTimer) {
                clearInterval(_t._marqueeTimer);
            }
            // scrollType滚动模式为自动滚动时
            if(_t.isAuto) {
                if(textOffsetWidth > marqueeOffsetWidth) {
                    new Promise(_t._delayTime.bind(_t)).then(() => {
                        _t.setState({
                            afterDelay : true
                        })
                    });
                }
            }
            clearTimeout(_t.winDelayTimer);
        }, 200);
    }

    _delayTime(resolve, reject) {
        const _t = this;
        const { speed, delay } = _t.props;
        _t.delayTimer =  setTimeout(function() {
            _t._marqueeTimer = setInterval(_t.marquee, speed);
            resolve();
        }, delay)
    }

    _marquee() {
        const { textOffsetWidth, marqueeOffsetWidth } = this.state;
        const { space } = this.props;
        if(!!this.marqueeDiv) {
            if(this.isAuto) {
                // 向左无线滚动
                if(textOffsetWidth + space - this.marqueeDiv.scrollLeft <= 0) {
                    this.marqueeDiv.scrollLeft -= textOffsetWidth + space; 
                } else {
                    this.marqueeDiv.scrollLeft++; 
                } 
            } else {
                // 移入滚动
                if(marqueeOffsetWidth + this.marqueeDiv.scrollLeft >= textOffsetWidth) {
                    this.marqueeDiv.scrollLeft -= textOffsetWidth; 
                    clearInterval(this._marqueeTimer);
                } else {
                    this.marqueeDiv.scrollLeft++; 
                }
             
            }
        }
    }

    onMouseOut() {
        const _t = this;
        const {
            marqueeOffsetWidth, textOffsetWidth, afterDelay
        } = _t.state;
        const { speed } = _t.props;
        if(textOffsetWidth > marqueeOffsetWidth) {
            if(this.isAuto && afterDelay) {
                // 滚动模式为auto时
                if(!!this._marqueeTimer) {
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

    onMouseOver() {
        const _t = this;
        const {
            marqueeOffsetWidth, textOffsetWidth, afterDelay
        } = _t.state;
        const { speed } = _t.props;
        if(this.isAuto) {
            clearInterval(this._marqueeTimer);
        } else {
            if(textOffsetWidth > marqueeOffsetWidth) {
                this._marqueeTimer = setInterval(_t.marquee, speed);
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.delayTimer);
        clearInterval(this._marqueeTimer);
    }

    render() {

        const { 
            prefixCls, space, scrollType, className, children, style
        } = this.props;

        const { 
            id, display, marqueeId, textId, endTextId
        } = this.state;
        const classString = classnames({
            [prefixCls] : true
        }, className);

        let endTextRender, textStyle = style;
        // 初始进入即自动滚动
        if(this.isAuto) {
            textStyle = {
                ...textStyle,
                marginRight : space
            }
            const endTextClassStr = classnames({
                [`${prefixCls}-text`] : true,
                [`${prefixCls}-text-hide`] : !display
            })
            endTextRender = (
                <div id={endTextId} className={endTextClassStr} style={textStyle}>
                    {children}
                </div>
            )
        }

        return (
            <div 
                id={marqueeId}
                onMouseOut={this.onMouseOut.bind(this)}
                onMouseOver={this.onMouseOver.bind(this)}
                className={classString}
            >
                <div id={textId} className={`${prefixCls}-text`} style={textStyle}>
                    {children}
                </div>
                {endTextRender}
            </div>
        )
    }
}

Marquee.propTypes = {
    delay : PropTypes.number,
    speed : PropTypes.number,
    space : PropTypes.number,
    scrollType : PropTypes.oneOf(['auto', 'hover'])
}

export default Marquee;