// ** React Imports
import { useContext } from 'react'

// ** Third Party Components
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

// ** Internationalization Context
import { IntlContext } from '@src/utility/context/Internationalization'
import { useRTL } from 'src/utility/hooks/useRTL'
import { locales } from 'src/store/SupportedLocales'

const IntlDropdown = () => {
  // ** Context
  const intlContext = useContext(IntlContext)
  const [isRtl, setValue] = useRTL();
  // ** Vars
  const langObj = locales;
  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    intlContext.switchLanguage(lang)
    setValue(lang.isRtl)
  }
  if (Object.keys(locales).length <= 1) {
    return <></>
  }
  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          className='country-flag flag-icon'
          countryCode={locales[intlContext.locale].flag }
          svg
        />
        <span className='selected-language'>{langObj[intlContext.locale].name}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' right>
        {locales && Object.keys(locales).map((key,i) => {
          return(
          <DropdownItem key={i} href='/' tag='a' onClick={e => handleLangUpdate(e, locales[key])}>
            <ReactCountryFlag className='country-flag' countryCode={locales[key].flag} svg />
            <span className='ml-1'>{locales[key].name}</span>
          </DropdownItem>
        )})}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
