import * as productConstants from "./../constants/product";
import { toastWarning, toastSuccess, toastError } from "../helpers/toastHelper";
import _ from "lodash";

const initialState = {
  listProductChoose: []
};

const reducer = (state = initialState, action) => {
  let index = -1;
  switch (action.type) {
    case productConstants.LIST_CHOOSE: {
      return {
        ...state,
        listProductChoose: []
      };
    }
    case productConstants.CHOOSE_PRODUCT: {
      let { product } = action.payload;
      index = _.findIndex(state.listProductChoose, pro => {
        return pro.id === product.id;
      });
      if (index === -1) {
        product.amountSell = 1;
        return {
          ...state,
          listProductChoose: [product].concat(state.listProductChoose)
        };
      }
      return { ...state };
    }

    case productConstants.CANCEL_PRODUCT: {
      let { id } = action.payload;

      return {
        ...state,
        listProductChoose: state.listProductChoose.filter(
          item => item.id !== id
        )
      };
    }

    case productConstants.UP_PRODUCT: {
      const { id, type } = action.payload;
      const { listProductChoose } = state;
      index = _.findIndex(listProductChoose, pro => {
        return pro.id === id;
      });

      if (index !== -1) {
        let pro = listProductChoose[index];
        if (type === "sell") {
          if (pro.amountSell < pro.amount) {
            pro.amountSell++;
          } else {
            toastWarning("Số lượng đã đạt giá trị tối đa !");
          }
        } else {
          pro.amountSell++;
        }
        const newList = [
          ...listProductChoose.slice(0, index),
          pro,
          ...listProductChoose.slice(index + 1)
        ];
        return {
          ...state,
          listProductChoose: newList
        };
      }
      return {
        ...state
      };
    }

    case productConstants.DOWN_PRODUCT: {
      const { id, type } = action.payload;
      const { listProductChoose } = state;

      index = _.findIndex(listProductChoose, pro => {
        return pro.id === id;
      });

      if (index !== -1) {
        let pro = listProductChoose[index];
        if (type === "sell") {
          if (pro.amountSell > 1) {
            pro.amountSell--;
          } else {
            toastWarning("Số lượng đã đạt giá trị tối thiểu !");
          }
        } else {
          pro.amountSell--;
        }
        const newList = [
          ...listProductChoose.slice(0, index),
          pro,
          ...listProductChoose.slice(index + 1)
        ];
        return {
          ...state,
          listProductChoose: newList
        };
      }

      return {
        ...state
      };
    }

    case productConstants.SELL: {
      return {
        ...state
      };
    }
    case productConstants.SELL_SUCCESS: {
      toastSuccess("Xuất thành công");
      return {
        ...state,
        listProductChoose: state.listProductChoose.filter(
          item => item.id === null
        )
      };
    }
    case productConstants.SELL_FAILD: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state
      };
    }

    case productConstants.BUY_SUCCESS: {
      toastSuccess("Nhập thành công");
      return {
        ...state,
        listProductChoose: state.listProductChoose.filter(
          item => item.id === null
        )
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
