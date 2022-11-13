import config from "config";
import qs from "query-string";
import { qsDecrypt, qsEncrypt } from "./encryption";

const queryStringBlackList = ["?cko-session-id"];

export const parseQueryString = () => {
  const encQuery = window.location.search;
  let query = "";
  if (queryStringBlackList.some(a => encQuery.startsWith(a))) {
    query = "";
  } else {
    query = qsDecrypt(encQuery);
  }
  
  const _state = qs.parse(query, { parseNumbers: true, parseBooleans: true });
  if (_state.pax) {
    _state.pax = JSON.parse(_state.pax);
  }

  _state.pax = _state.pax || [{ adults: 1, children: 0, infants: 0 }];
  _state.city1in = _state.city1in || +new Date();
  _state.city1out = _state.city1out || +new Date().setDate(new Date().getDate() + 1);
  _state.city2in = _state.city2in || _state.city1out;
  _state.city2out = _state.city2out || +new Date(_state.city1out).setDate(new Date(_state.city1out).getDate() + 1);

  _state.startcity = _state.startcity || config.makkah;
  _state.loadHotels = _state.loadHotels || false;
  _state.step = _state.step || 0;
  _state.city = _state.city || 0;

  return _state;
};

export const updateParams = (params, removeParams) => {
  const oldQp = parseQueryString();
  Object.keys(params).map(e => {
    oldQp[e] = params[e];
  });

  if (!!removeParams) {
    removeParams.map(e => {
      delete oldQp[e];
    });
  }

  const updateQp = serializeQueryString(oldQp);
  return updateQp;
};

const serializeQueryString = obj => {
  const pax = `[${obj.pax.map(a => JSON.stringify(a)).join(",")}]`;
  obj.pax = pax;

  const qpString = Object.keys(obj)
    .map(function(key) {
      return key + "=" + obj[key];
    })
    .join("&");

  return qpString;
};

export const serializeReservation = reservation => {
  const qp = {};

  qp.startcity = reservation.startWithCityCode;
  qp.city1in = reservation.checkInDate;
  qp.city1out = reservation.checkOutDate;

  let city2NightsCount = 0;
  if (reservation.startWithCityCode === config.makkah) {
    city2NightsCount = reservation.nights[reservation.nights.findIndex(a => a.cityCode !== config.madina)].nightCount;
  } else {
    city2NightsCount = reservation.nights[reservation.nights.findIndex(a => a.cityCode !== config.makkah)].nightCount;
  }

  const out = new Date(reservation.checkInDate);
  out.setDate(out.getDate() + city2NightsCount);
  out.setHours(0, 0, 0, 0);

  qp.city2in = reservation.checkInDate;
  qp.city2out = +out;
  qp.pax = reservation.pax;
  qp.loadHotels = true;
  qp.step = reservation.step || 0;
  qp.city = reservation.city || 0;

  return serializeQueryString(qp);
};
