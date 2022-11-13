import createReducer from "src/utils/reduxsauce/createReducer";
import { DEFAULT_LOCALE, DEFAULT_DIRECTION, getLocaleDirection, DEFAULT_CURRENCY } from "../constants";
import { ActionTypes } from "./actions";
import {locales} from "../SupportedLocales";

import { defaultState, bindReducers } from "src/utils/genState";

const initialState = {
  supportedLocales: locales,
  locale: locales[DEFAULT_LOCALE],
  direction: DEFAULT_DIRECTION,
  defaultCurrency: DEFAULT_CURRENCY,
  priceDisplay: "baseprice", //allawed values: baseprice, fees, prepayamount, totalamount
  lastPing: "",
  isLoadingHotels: false,
  layout: "vertical", // options[String]: "vertical"(default), "horizontal"
  theme: "light", // options[String]: 'light'(default), 'dark', 'semi-dark'
  sidebarCollapsed: false, // options[Boolean]: true, false(default)
  navbarColor: "default", // options[String]: default / primary / success / danger / info / warning / dark
  navbarType: "floating", // options[String]: floating(default) / static / sticky / hidden
  footerType: "static", // options[String]: static(default) / sticky / hidden
  disableCustomizer: true, // options[Boolean]: true, false(default)
  hideScrollToTop: false, // options[Boolean]: true, false(default)
  menuTheme: "primary", // options[String]: primary / success / danger / info / warning / dark
  extraStarred: [],
  suggestions: [],
  starred: [],
  defaultLat:21.4233733,
  defaultLong:39.821831,
  defaultZoom:12.5,
  ...defaultState("isoCountries"),
};

const changeLocale = (state, draft, locale) => {

  let _locale = locales[locale.code];
  if (!_locale) _locale = locales[DEFAULT_LOCALE];

  draft.locale = _locale;
  draft.direction = _locale.direction.toLowerCase() === "rtl" ? "rtl" : "ltr";
  localStorage.setItem("culture", _locale.code);
  localStorage.setItem("language", _locale.code);
  localStorage.setItem("cultureCode", _locale.culture);
  localStorage.setItem("isRTL", _locale.isRTL);

  // window.recaptchaOptions = {
  //   lang: locale,
  // };

  document.getElementsByTagName("html")[0].setAttribute("dir", _locale.direction);
  document.getElementsByTagName("body")[0].setAttribute("dir", _locale.direction);
  document.getElementsByTagName("body")[0].setAttribute("direction", _locale.direction);
  document.getElementsByTagName("body")[0].style.direction=_locale.direction;
  document.getElementsByTagName("body")[0].style.textAlign=_locale.direction==="RTL"?"right":"unset";
};
const changeCurrencySuccess = (state, draft, payload ) => {
  // const { currency } = payload;
  // draft.currency = SupportedCurrencies[currency];
  // storage.setItem("currency", currency);
};

const changePriceDisplay = (state, draft,{ priceDisplay }) => {
    draft.priceDisplay = priceDisplay;
};

const ping = (state,draft, payload) => {
    draft.lastPing = payload;
};

const setIsLoading = (state,draft, payload) => {
    draft.isLoadingHotels = true;
};

const clearIsLoading = (state,draft, payload) => {
    draft.isLoadingHotels = false;
};



export const reducer = createReducer(initialState, {
  ...bindReducers(ActionTypes, {action:"setIsLoading",async:false,successCb:setIsLoading}),
  ...bindReducers(ActionTypes, {action:"clearIsLoading",async:false,successCb:clearIsLoading}),
  ...bindReducers(ActionTypes, {action:"changeLocale",async:false,successCb:changeLocale}),
});
