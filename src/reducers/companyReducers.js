import {
  GET_COMPANIES,
  GET_STOCKS,
  GET_COMPANYINFO,
  GET_CHARTDATA,
  GET_SENTIMENT,
  GET_SECTOR_PERFORMANCE,
  GET_GAINERS,
  GET_LOSERS,
  GET_COMPANY_PROFILE
} from "../actions/types";

const initialState = {
  companies: [],
  stocks: [],
  companyInfo: [],
  chartData: [],
  sentimentData: [],
  sector: [],
  gainers: [],
  losers: [],
  companyProfile: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case GET_COMPANYINFO:
      return {
        ...state,
        companyInfo: action.payload
      };
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload
      };
    case GET_SECTOR_PERFORMANCE:
      return {
        ...state,
        sector: action.payload
      };
    case GET_GAINERS:
      return {
        ...state,
        gainers: action.payload
      };
    case GET_LOSERS:
      return {
        ...state,
        losers: action.payload
      };
    case GET_CHARTDATA:
      return {
        ...state,
        chartData: action.payload
      };
    case GET_SENTIMENT:
      return {
        ...state,
        sentimentData: action.payload
      };
    case GET_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: action.payload
      };

    default:
      return state;
  }
}
