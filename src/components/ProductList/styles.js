import { HEIGHT } from './../../constants';

const styles = () => ({
  listProduct: {
    textAlign: 'center',
    fontSize: '16pt'
  },
  listProductSell: {
    textAlign: 'center',
    width: '100%'
  },
  disable: {
    display: 'none'
  },
  myTable: {
    width: '100%'
  },
  myTd: {
    whiteSpace: 'nowrap'
  },
  myTr: {
    height: '100px',
  },
  myPanelProduct: {
    height: HEIGHT - 177 + 'px',
    overflow: 'scroll',
    overflowX: 'hidden'
  },
  resizeMyPanelProduct: {
    height: HEIGHT - 133 + 'px',
  },
  myPanelProductSellBody: {
    height: HEIGHT - 227 + 'px',
    overflow: 'scroll',
    overflowX: 'hidden',
    fontSize: '13pt',
    width: '100%'
  },
  myPanelProductSell: {
    marginLeft: '15px'
  },
  myInput: {
    width: '80%',
    float: 'left',
    textAlign: 'right',
    marginLeft: '4px',
    marginTop: '0.5px',
    marginBottom: '8px',
    marginRight: '10px',
    fontSize: '16pt',
    height: '30px',
    color: 'black'
  },
  show: {
    display: 'revert !important'
  },
  hidden: {
    display: 'none'
  },
  myButton: {
    fontSize: '13pt',
    backgroundColor: 'blue',
    color: 'white'
  },
  myMenuItem: {
    fontSize: '1.4rem !important'
  },
  inline: {
    float: 'left'
  },
  search: {
    fontSize: '13pt'
  },
  backgroundEmpty: {
    backgroundPosition: 'center',
    backgroundSize: '220px',
    backgroundRepeat: 'no-repeat',
    height: '311px'
  },

});

export default styles;
