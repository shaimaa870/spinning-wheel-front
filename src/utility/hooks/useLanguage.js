import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export const  useLanguage = () => {
    const { locale: appLocale } = useSelector(state => state.app);
    const [locale, setLocale] = useState("en");
    useEffect(() => {
        setLocale(appLocale);
    }, [appLocale])
    return {
        locale
    }
}