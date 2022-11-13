// ** Logo
// import logo from '@src/assets/images/logo/logo.png'

import themeConfig from 'src/configs/themeConfig'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo'  src={themeConfig.app.appLogoImage} alt='logo' width={120} />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
