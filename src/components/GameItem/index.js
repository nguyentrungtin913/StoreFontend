import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import IconLeft0 from "./../../assets/Test/dragonLeft0.gif";
import IconLeft1 from "./../../assets/Test/dragonLeft1.gif";
import IconLeft2 from "./../../assets/Test/dragonLeft2.gif";
import IconLeft3 from "./../../assets/Test/dragonLeft3.gif";

let x = 0;
let y = 0;

class GameItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      pause: 0,
      step: 0,
      move: 'left',
      player: 5,
      listDragon: null,
      dragons: [],
      winner: ''
    };
  }
  componentDidMount() {
    this.renderDrangon()
  }

  renderDrangon() {
    let { player } = this.state;
    let { classes } = this.props;
    let dragons = [];
    for (let i = 0; i < player; i++) {
      dragons.push(i);
    }
    const dragonTypes = [IconLeft0, IconLeft1, IconLeft2, IconLeft3];
    let top = 0;
    let xhtml = (
      dragons.map((e) => {
        top += 90;
        const randomDragonTypes = dragonTypes[Math.floor(Math.random() * dragonTypes.length)];
        return (
          <div id={e} style={{ backgroundImage: `url(${randomDragonTypes})`, top: `${top}px` }} className={classes.idObject1}></div>
        );
      })
    )
    window.onload = () => this.moveControl(dragons);

    this.setState({
      listDragon: xhtml,
      dragons: dragons
    })
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSave = e => {
    e.preventDefault();
    this.renderDrangon();
  }

  handleStart = (dragons) => {
    let { pause } = this.state;
    if (pause === 0) {
      setInterval(() => {
        this.setState({
          step: this.state.step + 1,
        })
        dragons.forEach((dragon, index) => {
          index = document.getElementById(dragon);
          this.autoMove(index, dragon)
        });
      }, 100)
    }
  }

  moveControl(dragons) {
    let move = 0;
    dragons.forEach((dragon, index) => {
      index = document.getElementById(dragon);
      index.addEventListener("mousemove", function (e) {
        x = window.Event ? e.pageX : 0;
        y = window.Event ? e.pageY : 0;
        if (move === 1) {
          index.style.top = y - 60 + "px";
          index.style.left = x - 25 + "px";
          index.style.transform = "rotate(15deg)";
          index.style.zIndex = y;
        }
      });
      window.addEventListener("mousedown", function (e) {
        move = 1;
      });
      window.addEventListener("mouseup", function (e) {
        index.style.transform = "rotate(0deg)";
        move = 0;
      });
    });
  }

  getStyle = (el, styleProp) => {
    var value, defaultView = (el.ownerDocument || document).defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
      // sanitize property name to css notation
      // (hypen separated words eg. font-Size)
      styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
      // sanitize property name to camelCase
      // eslint-disable-next-line no-useless-escape
      styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
        return letter.toUpperCase();
      });
      value = el.currentStyle[styleProp];
      // convert other units to pixels on IE
      if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
        return (function (value) {
          var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
          el.runtimeStyle.left = el.currentStyle.left;
          el.style.left = value || 0;
          value = el.style.pixelLeft + "px";
          el.style.left = oldLeft;
          el.runtimeStyle.left = oldRsLeft;
          return value;
        })(value);
      }
      return value;
    }
  }

  onReset = (dragons) => {
    if (confirm(`Bạn có muốn chơi lại không ?`)) { //eslint-disable-line
      let { pause } = this.state;
      if (pause === 0) {
        this.setState({
          pause: 1,
          start: 0,
          winner: '',
        })
      }
      dragons.forEach((dragon, index) => {
        index = document.getElementById(dragon);
        index.style.left = "1200px";
      })
    }
  }
  onStart = (dragons) => {
    this.setState({
      pause: 0,
      move: 'left',
      start: 1,
    })
    this.handleStart(dragons)
  }
  autoMove(index, dragon) {
    if (index) {
      let left = this.getStyle(index, 'left').replace(/[^0-9]/g, '') - 1;

      let x = Math.floor((Math.random() * 5) + 0)
      let { move, pause } = this.state;
      if (pause === 0) {
        if (move === 'left') {
          left -= x;
        } else if (move === 'right') {
          this.setState({
            pause: 1,
            start: 0,
            winner: dragon,
          })
        }
        if (left < 18) {
          this.setState({
            move: 'right'
          })
        }
        index.style.left = left + "px";
      }
    }
  }

  render() {
    const { classes } = this.props;
    let { listDragon, dragons, player, start, winner } = this.state;
    let disabled = "";
    let result = "";
    if (start === 1) {
      disabled = "disabled";
    }

    if (winner !== '') {
      result = "Rồng vừa chiến thắng mang số: " + (winner === 0 ? this.state.player : winner);
    }
    return (
      <div>
        <div className={`${classes.control}`}>
          <form onSubmit={this.onSave} >
            <p className={`${classes.element} m-2`}>Nhập số lượng rồng</p>
            <input
              type="number"
              className={`form-control ${classes.textInput} ${classes.element} m-2`}
              name="player"
              max="5"
              min="2"
              onChange={this.onChange}
              value={player}
              disabled={disabled}
            />
            <button type="submit" className={` btn btn-lg btn-outline-success ${classes.element} m-2`} disabled={disabled} >Tạo</button>
            <button type="button" onClick={() => this.onReset(dragons)} className={` btn btn-lg btn-outline-warning ${classes.element} m-2`}>Chơi lại</button>
            <h1 className={`${classes.element} `}>{result}</h1>
          </form>

          <button className={`${classes.element}`} disabled={disabled} onClick={() => this.onStart(dragons)} >Bắt đầu</button>
        </div>
        <div className={`${classes.board} ${classes.verticalLine}`}>
          <div id="board">
            {listDragon}
          </div>
          {/* //<p>{this.state.time}</p> */}
        </div>
      </div>

    );
  }
}

GameItem.propTypes = {
  classes: PropTypes.object,
  order: PropTypes.object
};

export default withStyles(styles)(GameItem);
