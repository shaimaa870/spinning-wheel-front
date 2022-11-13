// ** React Imports
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

// ** Redux Imports
import { Provider } from "react-redux";
// import { store } from './redux/storeConfig/store'
import { history, store } from "./store";

// ** Toast & ThemeColors Context
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./utility/context/ThemeColors";

import { AbilityContext } from "src/utility/context/Can";
// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Toastify
import "@styles/react/libs/toastify/toastify.scss";

// ** Core styles

import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import { IntlProviderWrapper } from "./utility/context/Internationalization";
// import ability from './configs/acl/ability';
import userAbility from "src/configs/permission/userAbitlity";
import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import SignalRProvider from "./utility/providers/SignalRProvider";
import TransKeyNotFound from "./components/TransKeyNotFound";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={userAbility}>
          <ThemeContext>
            <IntlProviderWrapper>
              <SignalRProvider>
                {/* <LanguageProvider> */}
                <TransKeyNotFound />
                <LazyApp />
                <ToastContainer newestOnTop />
                {/* </LanguageProvider> */}
              </SignalRProvider>
            </IntlProviderWrapper>
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
