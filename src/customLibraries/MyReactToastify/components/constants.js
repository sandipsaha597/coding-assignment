import { toastContainerPosition, toastType } from '../constants'

// used and IIFE to form a closure so that `gapFromViewPortEdge` is not accessible from outside
export const positionStylesMap = (() => {
  // gaps accross all the positions should be consistent
  const gapFromViewPortEdge = '10px'

  // styles of the toast container as per position
  return {
    [toastContainerPosition.TOP_CENTER]: {
      top: gapFromViewPortEdge,
      left: '50%',
      transform: 'translate(-50%, 0)',
      flexDirection: 'column',
      alignItems: 'center',
    },
    [toastContainerPosition.TOP_LEFT]: {
      top: gapFromViewPortEdge,
      left: gapFromViewPortEdge,
      flexDirection: 'column',
    },
    [toastContainerPosition.TOP_RIGHT]: {
      top: gapFromViewPortEdge,
      right: gapFromViewPortEdge,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    [toastContainerPosition.BOTTOM_CENTER]: {
      bottom: gapFromViewPortEdge,
      left: '50%',
      transform: 'translate(-50%, 0)',
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    [toastContainerPosition.BOTTOM_LEFT]: {
      bottom: gapFromViewPortEdge,
      left: gapFromViewPortEdge,
      flexDirection: 'column-reverse',
    },
    [toastContainerPosition.BOTTOM_RIGHT]: {
      bottom: gapFromViewPortEdge,
      right: gapFromViewPortEdge,
      flexDirection: 'column-reverse',
      alignItems: 'flex-end',
    },
  }
})()

// styles of the toast items as per toast types
export const typeStyleMap = {
  [toastType.DEFAULT]: {
    border: '2px solid #586089',
    background: '#fff',
    color: '#586089',
  },
  [toastType.SUCCESS]: {
    background: '#2ecc71',
    color: '#1e2430',
  },
  [toastType.ERROR]: {
    background: '#ffcbcb',
    color: '#1e2430',
  },
}
