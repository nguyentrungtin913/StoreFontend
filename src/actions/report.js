import * as reportConstants from "./../constants/report";

export const fetchListReport = (params) => {
  return {
    type: reportConstants.FETCH_REPORT,
    payload: {
      params
    }
  };
};

export const fetchListReportSuccess = data => {
  return {
    type: reportConstants.FETCH_REPORT_SUCCESS,
    payload: {
      data
    }
  };
};
