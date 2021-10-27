import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import styles from "./styles";
import IconLeft0 from "./../../assets/Test/dragonLeft0.gif";
import IconLeft1 from "./../../assets/Test/dragonLeft1.gif";
import IconLeft2 from "./../../assets/Test/dragonLeft2.gif";
import IconLeft3 from "./../../assets/Test/dragonLeft3.gif";

import IconStandLeft0 from "./../../assets/Test/dragonLeft0.png";
import IconStandLeft1 from "./../../assets/Test/dragonLeft1.png";
import IconStandLeft2 from "./../../assets/Test/dragonLeft2.png";
import IconStandLeft3 from "./../../assets/Test/dragonLeft3.png";

import IconRight0 from "./../../assets/Test/dragonRight0.gif";
import IconRight1 from "./../../assets/Test/dragonRight1.gif";
import IconRight2 from "./../../assets/Test/dragonRight2.gif";
import IconRight3 from "./../../assets/Test/dragonRight3.gif";

import IconStandRight0 from "./../../assets/Test/dragonRight0.png";
import IconStandRight1 from "./../../assets/Test/dragonRight1.png";
import IconStandRight2 from "./../../assets/Test/dragonRight2.png";
import IconStandRight3 from "./../../assets/Test/dragonRight3.png";

let x = 0;
let y = 0;
const step = 2;
const minLeft = 250;
const maxLeft = 1200;
const minTop = 80;
const maxTop = 550;
const timer = 130;
let actionDragon = [];
const length = 4;

const dragonTypesLeft = [IconLeft0, IconLeft1, IconLeft2, IconLeft3];
const dragonTypesStandLeft = [IconStandLeft0, IconStandLeft1, IconStandLeft2, IconStandLeft3];
const dragonTypesRight = [IconRight0, IconRight1, IconRight2, IconRight3];
const dragonTypesStandRight = [IconStandRight0, IconStandRight1, IconStandRight2, IconStandRight3];

class DragonItem extends Component {

  constructor(props) {
    super(props);
    let d = new Date();
    let time = d.getTime();
    this.state = {
      time: time,
      start: 0,
      pause: 0,
      move: 'left',
      player: 5,
      listDragon: null,
      dragons: [],
      winner: '',
      still: 0,
      direction: 4
    };
  }
  componentDidMount() {
    this.renderDrangon()
  }
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  renderDrangon() {
    let { player } = this.state;
    let { classes } = this.props;
    let dragons = [];
    for (let i = 0; i < player; i++) {
      dragons.push(i);
    }

    let xhtml = (
      dragons.map((e) => {
        const rand = Math.floor(Math.random() * length)
        let dir = Math.floor((Math.random() * 8) + 1);
        let randomDragonTypes;
        if (dir <= 4) {
          randomDragonTypes = dragonTypesLeft[rand];
        } else {
          randomDragonTypes = dragonTypesRight[rand];
        }
        let properties = {
          dragon: e,
          still: 0,
          direction: dir,
          type: rand,
          pause: 0,
          delay: 5000,
        }
        actionDragon.push(properties);
        return (
          <div id={e} style={{ backgroundImage: `url(${randomDragonTypes})` }} className={classes.idObject1}></div>
        );
      })
    )
    window.onload = () => this.moveControl(dragons);
    this.handleStart(dragons)
    this.setState({
      listDragon: xhtml,
      dragons: dragons
    })
  }

  handleStart = (dragons) => {
    let { pause } = this.state;
    if (pause === 0) {
      setInterval(() => {
        this.setState({
          time: this.state.time + 1,
        })
        dragons.forEach((dragon, index) => {
          index = document.getElementById(dragon);
          this.autoMove(index)
        });
      }, timer)
    }
  }

  moveControl(dragons) {

    let { time } = this.state;

    dragons.forEach((dragon, index) => {
      let id = index;
      index = document.getElementById(dragon);
      index.addEventListener("mousemove", function (e) {
        x = window.Event ? e.pageX : 0;
        y = window.Event ? e.pageY : 0;
        if (actionDragon[id].pause === 1) {
          index.style.top = y - 60 + "px";
          index.style.left = x - 25 + "px";
          if (actionDragon[id].direction === 1 || actionDragon[id].direction === 2) {
            index.style.transform = "rotate(15deg)";
          } else {
            index.style.transform = "rotate(-15deg)";
          }
          index.style.zIndex = time;
        }
      });
      window.addEventListener("mousedown", function (e) {
        actionDragon[id].pause = 1;
      });
      window.addEventListener("mouseup", function (e) {
        index.style.transform = "rotate(0deg)";
        actionDragon[id].pause = 0;
        console.log(actionDragon[id])
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


  autoMove(index) {
    let id = index.id;
    let properties = actionDragon[id];

    if (index && properties) {
      let { still, direction, type, pause, delay } = properties;

      if (pause === 0) {
        let left = this.getStyle(index, 'left').replace(/[^0-9]/g, '') - 1;
        let top = this.getStyle(index, 'top').replace(/[^0-9]/g, '') - 1;
        console.log(still)
        if (still < 2) {
          let distance = Math.floor((Math.random() * 150) + 150);
          direction = Math.floor((Math.random() * 8) + 1);
          this.wait(delay)
          index.style.border = "solid thin red";
          actionDragon[id].still = distance;
          actionDragon[id].direction = direction;
          actionDragon[id].delay = Math.floor((Math.random() * 1300) + 300);
        }else{
          index.style.border = "solid thin black";
        }

        still = actionDragon[id].still;
        direction = actionDragon[id].direction;
        actionDragon[id].still = still - 2;

        let x = step;
        let loop = Math.floor((Math.random() * 1) + 1);
        for (let i = 0; i < loop; i++) {
          // eslint-disable-next-line default-case
          switch (direction) {
            case 1:
              if (top > minTop && left > minLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top -= x;
                left -= saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesLeft[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
            case 2:
              if (top > minTop && left > minLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top -= x;
                left -= saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesLeft[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
            case 3:
              if (left > minLeft) {
                left -= x;
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesLeft[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
            case 4:
              if (top < maxTop && left > minLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top += x;
                left -= saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesLeft[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
            case 5:
              if (top < maxTop && left < maxLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top += x + 1;
                left += saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesRight[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
            case 6:
              if (top < maxTop && left < maxLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top += x + 1;
                left += saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesRight[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;

            case 7:
              if (left < maxLeft) {
                left += x + 1;
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesRight[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;

            case 8:
              if (top > minTop && left < maxLeft) {
                let saiSo = Math.floor((Math.random() * 1) + 0)
                top -= x + 1;
                left += saiSo;
                index.style.top = top + "px";
                index.style.left = left + "px";
                index.style.zIndex = top;
                index.style.backgroundImage = " url(" + dragonTypesRight[type] + ")";
              } else {
                actionDragon[id].direction = Math.floor((Math.random() * 7) + 1);
              }
              break;
          }
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    let { listDragon } = this.state;

    return (
      <div className={`${classes.board} `}>
        <div id="board">
          {listDragon}
        </div>
        {/* //<p>{this.state.time}</p> */}
      </div>

    );
  }
}

DragonItem.propTypes = {
  classes: PropTypes.object,
  order: PropTypes.object
};

export default withStyles(styles)(DragonItem);
