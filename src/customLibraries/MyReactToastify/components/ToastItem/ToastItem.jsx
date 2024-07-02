import { Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { toast } from '../../toast'
import { typeStyleMap } from '../constants'

/**
 * ToastItem to be shown in the UI
 *
 * props.toastData - provide a valid toast data preferably created using `createToastObject` function
 */
const ToastItem = ({ toastData }) => {
  // styles to be applied in the toastContainer
  const toastStyles = useMemo(() => {
    // base styles which should be applied regardless of the toast type
    const baseStyles = { borderRadius: '12px', padding: '7px 21px' }
    const typeStyles = typeStyleMap[toastData.type]

    return {
      ...baseStyles,
      ...typeStyles,
    }
  }, [toastData.type])

  useEffect(() => {
    // removing the toast notification automatically after a certain delay
    const timer = setTimeout(() => {
      toast.remove(toastData.id)
    }, toastData.autoClose)

    /* In case the component unmounts it removes all the timers which was registered.
      And react strict mode run useEffect twice (useEffect callback => cleanup => useEffect callback)
      so providing clean up is very important
    */
    return () => clearTimeout(timer)
  }, [toastData.id, toastData.autoClose])

  /* Using the sx prop to apply styles instead of the style attribute because inline styles can be
      detected as a security vulnerability in various security scans due to potential XSS attacks. */
  return <Typography sx={toastStyles}>{toastData.message}</Typography>
}

export default ToastItem
