import { HEIGHT } from './../../constants';

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
  myPanelProduct: {
    height: HEIGHT - 187 + 'px',
    overflow: 'scroll',
    overflowX: 'hidden'
  },
  listProduct: {
    textAlign: 'center',
    fontSize: '16pt'
  },
  myButton: {
    fontSize: '13pt',
    backgroundColor: 'blue',
    width: '80px',
    height: '30px',
    paddingTop: '1px',
    marginLeft: '15px !important',
    color: 'white'
  },
  myMenuItem: {
    fontSize: '1.4rem !important'
  },
  backgroundEmpty: {
    backgroundPosition: 'center',
    backgroundSize: '220px',
    backgroundRepeat: 'no-repeat',
    height: '261px'
  },
  search: {
    fontSize: '13pt'
  },
  textFilter: {
    fontSize: '13pt'
  }
});

export default styles;
