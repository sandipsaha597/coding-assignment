/**
 * This custom library is inspired by the react-toastify library (https://fkhadra.github.io/react-toastify/introduction).
 *
 * I wanted to figure out how react-toastify allows calling a function from outside a component
 * and triggering a re-render within a component. By examining the source code, I noticed it uses
 * a hook called useSyncExternalStore. After learning about this hook, I implemented this basic
 * version of a toast notification library.
 *
 * This library provides basic toast notifications similar to react-toastify.
 *
 * Usage:
 *  1. Render the ToastContainer component anywhere in the app.
 *  2. Call toast('message'), toast.error('message'), or toast.success('message') from anywhere
 *     in the app to display a toast notification.
 */

export { toast } from './toast'
export { default as ToastContainer } from './components/ToastContainer/ToastContainer.jsx'
export { toastContainerPosition as TOAST_CONTAINER_POSITION } from './constants'
