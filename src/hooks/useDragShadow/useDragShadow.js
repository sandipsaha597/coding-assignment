import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getMousePosition } from '../../utils/functions'

/**
 * A custom hook to implement drag shadow functionality to any react js application
 *
 * @param {Function} onDrag event which trigger when element is getting dragged.
 *    Passes multiple argument
 *    - e: mouseEvent,
 *    - offset.current: offset of the mouse pointer from the top left corner of the element getting dragged
 *    - draggedShadowRef.current: HTML element reference of the dragged shadow element
 *    - dragItemRef.current: HTML element reference of the drag item element
 * @param {Function} onDrop event which trigger when element is drop.
 *    passes same argument as onDrag event
 *    if the function returns true, it is considers a valid/successful drop
 *    if the function returns false, it is considers an invalid/unsuccessful drop.
 *      and the shadow goes back to the drag item element it was dragged from with animation.
 * @returns {Object}
 *  {Ref} dragItemRef: pass this ref to the ref attribute of drag item element
 *  {Ref} draggedShadowRef: pass this ref to the ref attribute of draggedShadow element
 *  {Object} dragItemProps: dragItemProps contains onMouseDown event handler and styles to be applied in the dragItem element
 *  {Object} draggedShadowProps: draggedShadowProps contains styles to be applied in the shadow of the element
 */

export const useDragShadow = (onDrag = () => {}, onDrop = () => false) => {
  // dragItemRef: pass this to dragItem element
  const dragItemRef = useRef(null)
  // draggedShadowRef: pass this to draggedShadow element
  const draggedShadowRef = useRef(null)
  // isDragging: state showing if the element is getting dragged or not
  const [isDragging, setIsDragging] = useState(false)
  // current mouse position
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  // styles which gets set when drop is invalid/unsuccessful
  const [onDropStyles, setOnDropStyles] = useState({})
  // offset of the mouse pointer from the top left corner of the element getting dragged
  const offset = useRef({ x: null, y: null })
  // calculated draggedShadow position from viewport
  const draggedShadowPosition = {
    x: mousePosition.x - offset.current.x,
    y: mousePosition.y - offset.current.y,
  }

  const setPositions = useCallback((e) => {
    setMousePosition(getMousePosition(e))
  }, [])
  const resetPositions = () => {
    setMousePosition({ x: null, y: null })
    offset.current = { x: null, y: null }
  }
  const handleOnMouseDown = useCallback(
    (e) => {
      setIsDragging(true)
      /* what's the mouse offset from the item getting dragged.
    how many pixels mouse is away from top left corner of the item getting dragged */
      offset.current = {
        x: e.clientX - dragItemRef.current.getBoundingClientRect().left,
        y: e.clientY - dragItemRef.current.getBoundingClientRect().top,
      }
      setPositions(e)
    },
    [setPositions]
  )

  const handleMouseMove = useCallback(
    (e) => {
      /* wrapping the updating part in requestAnimation frame gives smoother animation, 
      better performance and reduces re-renders drastically */
      requestAnimationFrame(() => {
        setPositions(e)
        onDrag(e, offset.current, draggedShadowRef.current, dragItemRef.current)
      })
    },
    [onDrag, setPositions]
  )

  const handleMouseUp = useCallback(
    (e) => {
      if (!isDragging) return
      setIsDragging(false)
      /* calling the callback function onDrop
      if it return true, it is considered a valid/successful drop and false otherwise */
      const isDropValid = onDrop(
        e,
        offset.current,
        draggedShadowRef.current,
        dragItemRef.current
      )
      if (isDropValid === false) {
        /* if drop is invalid/unsuccessful it adds some styles/animations so the shadow goes back 
        to the drag item element it was dragged from with animation. */
        const dragRefBoundingClientRect =
          dragItemRef.current.getBoundingClientRect()
        setOnDropStyles({
          display: 'block',
          left: dragRefBoundingClientRect.left,
          top: dragRefBoundingClientRect.top,
          transition: '.4s',
        })
        // removing the styles from the element after 400ms(transition time) and ready for a fresh start from scratch
        setTimeout(() => {
          setOnDropStyles({})
        }, 400)
      }
      // resets the positions for a fresh new start
      resetPositions()
    },
    [isDragging, onDrop]
  )

  // dragItemProps contains onMouseDown event handler and styles to be applied in the dragItem element
  const dragItemProps = useMemo(
    () => ({
      onMouseDown: handleOnMouseDown,
      style: {
        width: 'fit-content',
        height: 'fit-content',
        userSelect: 'none',
        cursor: 'pointer',
      },
    }),
    [handleOnMouseDown]
  )

  // draggedShadowProps contains styles to be applied in the shadow of the element
  const draggedShadowProps = {
    style: {
      display: isDragging ? 'block' : 'none',
      position: 'fixed',
      opacity: 0.7,
      left: draggedShadowPosition.x,
      top: draggedShadowPosition.y,
      userSelect: 'none',
      cursor: 'pointer',
      ...onDropStyles,
    },
  }

  useEffect(() => {
    /* there's no need to keep the event listeners attached all the time
    only adding the listener when dragging start and removing when dragging ends */
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    // attached event listeners should get removed upon component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return { dragItemRef, draggedShadowRef, dragItemProps, draggedShadowProps }
}
