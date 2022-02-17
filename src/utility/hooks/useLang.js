//** React Imports
import { useEffect, useContext } from 'react'
import { IntlContext } from '@src/utility/context/Internationalization'
import {useRTL} from './useRTL'

export const useLang = () => {  
  const intlContext = useContext(IntlContext)
  const [isRtl, setRTL] = useRTL()
  const lang = intlContext.locale
  const setValue = value => {
    try {
      if (value === 'en') {
        setRTL(false)
      } else if (value === 'fa') {
        setRTL(true)
      }
      localStorage.setItem('lang', value)
      intlContext.switchLanguage(value)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
  }, [lang])

  return [lang, setValue]
}
