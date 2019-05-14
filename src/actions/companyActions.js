import axios from "axios";

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
} from "./types";

const url = "https://protected-retreat-99874.herokuapp.com/";
//getting a list of all companies
export const getCompanies = () => dispatch => {
  axios
    .get(`${url}api/companies/companyNames`)
    .then(res =>
      // console.log( "res", {res}),

      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANIES,
        payload: null
      })
    );
};

/**
 * gets a companies news articles
 */
export const getCompanyInfo = companyData => dispatch => {
  // console.log(companyData);
  axios
    .post(`${url}api/companies/companyInfo`, companyData)
    .then(res =>
      dispatch({
        type: GET_COMPANYINFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANYINFO,
        payload: null
      })
    );
};

// get the stocks data of the companies displayed on the dashboard;
export const getStocks = () => dispatch => {
  axios
    .get(`${url}api/companies/stockData`)
    .then(res =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_STOCKS,
        payload: null
      })
    );
};

export const getSectorPerformance = () => dispatch => {
  axios
    .get(`${url}api/companies/sectorPerformance`)
    .then(res =>
      dispatch({
        type: GET_SECTOR_PERFORMANCE,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_SECTOR_PERFORMANCE,
        payload: null
      })
    );
};

export const getGainers = () => dispatch => {
  axios
    .get(`${url}api/companies/gainers`)
    .then(res =>
      dispatch({
        type: GET_GAINERS,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_GAINERS,
        payload: null
      })
    );
};

export const getLosers = () => dispatch => {
  axios
    .get(`${url}api/companies/losers`)
    .then(res =>
      dispatch({
        type: GET_LOSERS,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_LOSERS,
        payload: null
      })
    );
};

export const getChartData = companyData => dispatch => {
  axios
    .post(`${url}api/companies/chartData`, companyData)
    .then(res =>
      dispatch({
        type: GET_CHARTDATA,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_CHARTDATA,
        payload: null
      })
    );
};

export const getSentimentData = companyData => dispatch => {
  axios
    .post(`${url}api/companies/sentimentData`, companyData)
    .then(res =>
      dispatch({
        type: GET_SENTIMENT,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_SENTIMENT,
        payload: null
      })
    );
};

export const getCompanyProfile = companyData => dispatch => {
  axios
    .post(`${url}api/companies/companyProfile`, companyData)
    .then(res =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: null
      })
    );
};
