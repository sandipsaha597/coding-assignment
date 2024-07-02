import { toastType } from './constants'
import { toastStore } from './toastStore'

/**
 * Shows a toast notification with default type
 * @param {String} message text to be shown in the toast notification
 * @param {Object} options options of the toast
 *  autoClose {number} - toast automatically closes after center milliseconds
 *
 * @return {String} id of the toast. This can be used to identify or/and removes a toast
 */
export const toast = (message, { autoClose } = {}) => {
  return toastStore.addToast(message, { autoClose })
}

/**
 * show a toast notification with success type
 *
 * same params and return as toast function
 */
toast.success = (message, { autoClose } = {}) => {
  return toastStore.addToast(message, { type: toastType.SUCCESS, autoClose })
}

/**
 * show a toast notification with error type
 *
 * same params and return as toast function
 */
toast.error = (message, { autoClose } = {}) => {
  return toastStore.addToast(message, { type: toastType.ERROR, autoClose })
}

/**
 * removes a toast notification from the UI
 * @param {String} id - id of the toast (Upon calling toast() or toast.error() etc it returns the toast id).
 *
 * can be used for cleanup as well
 *  useEffect(() => {
 *    const a = toast('default')
 *    const b = toast.success('success toast')
 *    const c = toast.error('error toast')
 *    return () => {
 *      toast.remove(a)
 *      toast.remove(b)
 *      toast.remove(c)
 *    }
 *  }, [])
 */
toast.remove = toastStore.removeToast
