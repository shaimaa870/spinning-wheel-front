// ** React Imports
import { useState, createContext, useEffect } from 'react'

// ** Intl Provider Import
import { I18nProvider } from "@lingui/react";

// ** Core Language Data
import messagesEn from '@assets/data/locales/en.json'
import messagesAr from '@assets/data/locales/ar.json'

// ** User Language Data
import userMessagesEn from '@src/assets/data/locales/en.json'
import userMessagesAr from '@src/assets/data/locales/ar.json'
import { AppActions } from 'src/store/app/actions'
import { locales } from 'src/store/SupportedLocales'
import { useDispatch } from 'react-redux'
import { i18n } from '@lingui/core';
import * as plurs from 'make-plural/plurals';
// ** Menu msg obj
// const menuMessages = {
//   en: { ...messagesEn, ...userMessagesEn },
//   ar: { ...messagesAr, ...userMessagesAr },
// }

// ** Create Context
const Context = createContext()

const loadedLocales = () => {
  let result = {}
  for (const key in locales) {
    result[key] = { plurals: plurs[key] }
  }
  return result;
}
i18n.loadLocaleData(loadedLocales())
async function dynamicActivate(locale) {
  const { messages } = await import(`@lingui/loader!src/locales/${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

const IntlProviderWrapper = ({ children }) => {
  const lang = localStorage.getItem("language");
  const currentLang = lang ? locales[lang] : Object.values(locales).find(l => l.default);

  // ** States
  const [locale, setLocale] = useState(currentLang.code)
  // const [messages, setMessages] = useState(menuMessages[currentLang.code])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.changeLocale(currentLang))
    dynamicActivate(currentLang.code);
  }, [])
  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang.code)
    // setMessages(menuMessages[lang.code])
    dispatch(AppActions.changeLocale(lang))
    dynamicActivate(lang.code);
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <I18nProvider i18n={i18n} key={locale} locale={locale} 
      // messages={messages} 
      defaultLocale={currentLang.code}>
        {children}
      </I18nProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
