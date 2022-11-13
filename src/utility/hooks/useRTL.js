//** React Imports
import { useEffect } from 'react'

// ** Store & Actions
import { LayoutActions} from 'src/store/layout/actions'
import { useDispatch, useSelector } from 'react-redux'

export const useRTL = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const isRtl = useSelector(state => state.layout.isRTL)

  // ** Return a wrapped version of useState's setter function
  const setValue = value => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(isRtl) : value
      dispatch(LayoutActions.handleRtl(valueToStore))
      // dispatch(LayoutActions.handleMenuHidden(valueToStore))
    } catch (error) {
      // ** A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  // useEffect(() => {
  //   // ** Get HTML Tag
  //   debugger
  //   const element = document.getElementsByTagName('html')[0]
  //   // ** If isRTL then add attr dir='rtl' with HTML else attr dir='ltr'
  //   if(isRtl===undefined)
  //   return;
  //   if (isRtl) {
  //     element.setAttribute('dir', 'rtl')
  //   } else {
  //     element.setAttribute('dir', 'ltr')
  //   }
  // }, [isRtl])

  return [isRtl, setValue]
}
