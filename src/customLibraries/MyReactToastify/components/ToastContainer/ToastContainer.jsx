import { useMemo, useSyncExternalStore } from 'react'
import ToastItem from '../ToastItem/ToastItem'
import { toastContainerPosition } from '../../constants'
import { toastStore } from '../../toastStore'
import { Box } from '@mui/material'
import { positionStylesMap } from '../constants'

/**
 * Render this component in the app to enable toast notification functionality
 *
 * props.position {TOAST_CONTAINER_POSITION} - position where toast notifications should be shown
 */
const ToastContainer = ({ position = toastContainerPosition.TOP_CENTER }) => {
  /* A react.js hook to sync an external store. By using this hook we can make a 
  component re-render with desired values/state from outside of a react component
  or custom hook */
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot
  )

  // styles to be applied in the toastContainer
  const toastContainerStyles = useMemo(() => {
    const positionStyles = positionStylesMap[position]
    // base styles which should be applied regardless of the position
    const baseStyles = {
      position: 'fixed',
      display: 'flex',
      gap: '10px',
    }

    return {
      ...baseStyles,
      ...positionStyles,
    }
  }, [position])

  return (
    /* Using the sx prop to apply styles instead of the style attribute because inline styles can be
      detected as a security vulnerability in various security scans due to potential XSS attacks. */
    <Box sx={toastContainerStyles}>
      {toasts.map((toastData) => (
        <ToastItem key={toastData.id} toastData={toastData} />
      ))}
    </Box>
  )
}

export default ToastContainer
