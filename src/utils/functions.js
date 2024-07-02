/* This file contains a collection of generic utility functions that can be used across various applications.
These functions are designed to be reusable, independent of any specific application logic, 
and should perform general-purpose tasks that are commonly needed in JavaScript development. */

/**
 * Retrieves the mouse position from a mouse event object.
 * This function is pure.
 *
 * @param {MouseEvent} e - The mouse event object containing clientX and clientY coordinates.
 * @returns {Object} An object with x and y properties representing the mouse coordinates.
 */
export const getMousePosition = (e) => ({
  x: e.clientX,
  y: e.clientY,
})

/**
 * Checks if two elements overlap by a specified margin in pixels. By margin I don't mean CSS margin.
 * 
 * Overlap Algorithm
 * by rect I am referring to rectangle
 * - if rect1's left is greater than rect2's right I know for sure that they are overlapping/colliding
 * - if rect1's right is less than rect2's left I know for sure that they are overlapping/colliding
 * - if rect1's top is greater than rect2's bottom I know for sure that they are overlapping/colliding
 * - if rect1's bottom is less than rect2's top I know for sure that they are overlapping/colliding 

    now when I know when they are not overlapping/colliding, I can work on margin. I want to know if they are overlapping by a certain margin or not
    - by subtracting from right side and adding on left I made rect smaller on x-axis
    - by subtracting from bottom side and adding on top I made rect smaller on y-axis
    - so now I made the rect2 smaller that means rect1 would have to move further to reach rect2 
 * 
 * @param {Element} element1 - The first element to check.
 * @param {Element} element2 - The second element to check.
 * @param {number} [marginWidth=0] - Margin in pixels to consider overlapping in width.
 * @param {number} [marginHeight=0] - Margin in pixels to consider overlapping in height.
 * @returns {boolean} True if elements overlap by the specified margin, false otherwise.
 */
export const isElementsOverlappingByMargin = (
  element1,
  element2,
  marginWidth = 0,
  marginHeight = 0
) => {
  const rect1 = element1.getBoundingClientRect()
  const rect2 = element2.getBoundingClientRect()

  // Check if elements overlap considering the specified margins

  // Algorithm and logic explained in the above JSDoc comment - Overlap Algorithm
  // if any of the below condition is false I know that they are not overlapping so I can return false
  if (
    (rect1.left > rect2.right - marginWidth ||
      rect1.right < rect2.left + marginWidth ||
      rect1.top > rect2.bottom - marginHeight ||
      rect1.bottom < rect2.top + marginHeight) === false
  ) {
    return true // Elements overlap
  }

  return false // No overlap
}

/**
 * Creates a throttled version of a function that limits how often it can be called.
 *
 * @param {Function} fn - The function to be throttled.
 * @param {number} delay - The minimum time interval in milliseconds between each function call.
 * @returns {Function} A throttled function that delays subsequent invocations of `fn` until `delay` milliseconds have passed.
 */
export const throttle = (fn, delay) => {
  let throttled = false

  return (...args) => {
    if (throttled) return

    fn(...args)
    throttled = true

    setTimeout(() => {
      throttled = false
    }, delay)
  }
}

/**
 * Creates a throttled function that can handle multiple keys and arguments,
 * ensuring each key has its own throttle instance.
 *
 * @param {Function} fn - The function to be throttled.
 * @param {number} [delay=3000] - The minimum time interval in milliseconds between each function call.
 * @returns {Function} A throttled function that can handle multiple keys and arguments,
 * ensuring each key has its own throttle instance.
 */
export const throttleMultiple = (fn, delay = 3000) => {
  const obj = {}

  return (key, ...rest) => {
    if (key in obj === false) {
      obj[key] = throttle(fn, delay)
    }
    obj[key](...rest)
  }
}

/**
 * Retrieves and parses a value from localStorage based on the provided key.
 * If parsing fails, logs the error and returns null.
 *
 * @param {string} key - The key under which the value is stored in localStorage.
 * @returns {any} The parsed value from localStorage, or null if parsing fails or the value does not exist.
 */
export const getValueFromLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    console.error(err)
    return null
  }
}
