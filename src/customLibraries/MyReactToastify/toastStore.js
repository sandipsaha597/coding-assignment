/* Please refer to the react.dev documentation to learn about 
useSyncExternalStore and how this structure works in detail (https://react.dev/reference/react/useSyncExternalStore) */

// all the toasts visible in the UI
let toasts = []

// create a valid object of toast notification
const createToastObject = (message, autoClose = 3000, type = 'default') => {
  return {
    id: crypto.randomUUID(),
    message,
    autoClose,
    type,
  }
}

// all the active listeners
let listeners = []

export const toastStore = {
  /**
   * adds new toast notification to the toast array
   *
   * @param {String} message text to be shown in the toast notification
   * @param {Object} options options of the toast
   *  type {TOAST_TYPE} - a valid toast type for the toast notification
   *  autoClose {number} - toast automatically closes after center milliseconds
   *
   * @return {String} id of the toast. This can be used to identify or/and removes a toast
   *
   */
  addToast: (message, { type, autoClose }) => {
    const newToast = createToastObject(message, autoClose, type)
    toasts = [...toasts, newToast]
    emitChanges()
    return newToast.id
  },

  /**
   * removes toast notification from the UI
   *
   * @param {String} id toast id of the toast notification to be removed
   */
  removeToast: (id) => {
    toasts = toasts.filter((v) => v.id !== id)
    emitChanges()
  },

  /* Getting used as the first argument of the useSyncExternalStore hook
   in the toastContainer */
  subscribe: (listener) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },

  /* Currently shown toasts. Getting used as the second argument of the useSyncExternalStore hook
   in the toastContainer */
  getSnapshot: () => toasts,
}

// calls all the active listeners
const emitChanges = () => {
  for (let listener of listeners) {
    listener()
  }
}
