import {WIDTH, HEIGHT} from "./../../constants";

const styles = () => ({
  date: {
    width: '20%',
    fontSize: '15pt',
    margin: '-1% 3% 3% 2%',
    display: 'inline-block'
  },
  filter: {
    fontSize: '15pt',
    textAlign: 'center',
    margin: '20px 0 -30px 0'
  },
  text: {
    fontSize: '14pt'
  },
  myPanelOrder: {
    height: HEIGHT/2,
    overflow: 'scroll',
    overflowX: 'hidden'
  },
  total:{
    fontSize: '14pt',
    textAlign: 'right',
    color: 'black',
    marginTop: '-10px'
  },
  textTotal:{
    marginLeft: '1%',
    textAlign: 'right',
    marginRight: '1%'
  },
  myButton: {
    fontSize: '13pt',
    marginLeft: '15px !important',
    backgroundColor: 'blue',
    color: 'white'
  },
  myMenuItem: {
    fontSize: '1.4rem !important'
  },
  export:{
    fontSize: '13pt',
  }
});

export default styles;
