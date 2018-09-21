import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import jss from 'jss';
import preset from 'jss-preset-default';
import utils from './utils';

jss.setup(preset())

const styles = {
  common: {
    fill: 'transparent',
    'stroke-width': '10',
    'stroke-linecap': 'round'
  },
  progress: {
    extend: 'common',
    'stroke-dasharray': '628.3185307179587',
    'stroke-dashoffset': '628.3185307179587',
    transition: 'all 0.3s ease'
  },
  bg: {
    extend: 'common',
    stroke: 'rgba(124, 181, 236, 0.3)'
  }
}

const { classes } = jss.createStyleSheet(styles).attach()

const propTypes = {
  /** 圆环的颜色，字符串表示单个颜色，数组表示渐变 */
  strokeColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** 进度的值 */
  progress: PropTypes.number.isRequired,
}

const defaultProps = {
  strokeColor: 'blue'
}

class Circle extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var count = 0;
    var timer;
    if (utils.isArray(this.props.strokeColor)) {
      this.progress.style.stroke = "url(#gradient)";
    } else {
      this.progress.style.stroke = this.props.strokeColor;
    }
    setTimeout(() => {
      this.progress.style.strokeDashoffset = parseInt(628.3185307179587 - (628.3185307179587 * this.props.progress/100));

      timer = setInterval(() => {
        if (count >= this.props.progress) {
          clearInterval(timer)
        }
        this.text.innerHTML = `${count}%`;
        count++
      }, 300/this.props.progress)
    }, 300)
  }

  renderLinearGradient() {
    if (utils.isString(this.props.strokeColor)) {
      return null;
    }

    const length = this.props.strokeColor.length;
    return (
      <linearGradient id="gradient">
        {this.props.strokeColor.map((item, index) => {
          return <stop key={index} offset={`${index*100/(length-1)}%`} stopColor={item} />
        })}
      </linearGradient>
    )
  }

  render() {
    return (
      <div>
        <svg className={this.props.className} width="400" height="400">
          {this.renderLinearGradient()}
          <g>
            <circle cx="200" cy="200" r="100" className={`${classes.bg}`} />
            <circle ref={node => this.progress = node} cx="200" cy="200" r="100" className={`${classes.progress}`} />
            <text ref={node => this.text = node} textAnchor="middle" alignmentBaseline="central" x="200" y="200" style={{'fontFamily': 'arial', 'fontSize': '30px'}} ></text>
          </g>
        </svg>
      </div>
    );
  }
}

Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

export default Circle;
