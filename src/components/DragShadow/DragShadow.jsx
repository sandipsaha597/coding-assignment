import { Box } from '@mui/material'
import { useDragShadow } from '../../hooks/useDragShadow/useDragShadow'

/**
 * DragShadow Component
 *
 * This component provides drag-and-drop functionality with a visual shadow effect.
 * It leverages a custom hook, `useDragShadow`, to manage the drag state, references,
 * and styles for both the draggable item and its shadow. Upon an invalid/unsuccessful drop
 * the shadow goes back to the drag item element it was dragged from with animation.
 *
 * Props:
 * - `children`: The content to be rendered inside the draggable item and its shadow.
 * - `onDrag` (function): Callback function to be executed during the drag event.
 *    Please refer to useDragShadow hook for more details about this function.
 * - `onDrop` (function): Callback function to be executed when the item is dropped.
 *    Please refer to useDragShadow hook for more details about this function
 *
 * Usage:
 * ```
 * <DragShadow onDrag={handleDrag} onDrop={handleDrop}>
 *   <YourContent />
 * </DragShadow>
 * ```
 */

const DragShadow = ({ children, onDrag = () => {}, onDrop = () => false }) => {
  /* All the functionalities are implemented inside the useDragShadow hook 
    instead of using useDragShadow hook, draggable prop and onDragStart, onDragEnd etc attributes and event could be used
    but it gives a translucent blur effect on the shadow which I don't like so I implemented my own functionality and styles.
    Libraries like dnd-kit, react-dnd, react-beautiful-dnd etc could be used as well.
  */
  const { dragItemRef, draggedShadowRef, dragItemProps, draggedShadowProps } =
    useDragShadow(onDrag, onDrop)
  const { style: dragItemStyles, ...dragItemPropsRest } = dragItemProps
  const { style: dragShadowStyles, ...draggedShadowPropsRest } =
    draggedShadowProps
  return (
    <>
      {/* Using the sx prop to apply styles instead of the style attribute because inline styles can be
      detected as a security vulnerability in various security scans due to potential XSS attacks. */}
      <Box ref={dragItemRef} {...dragItemPropsRest} sx={dragItemStyles}>
        {children}
      </Box>
      {/* the shadow of the drag item which moves and follows the mouse */}
      <Box
        ref={draggedShadowRef}
        {...draggedShadowPropsRest}
        sx={dragShadowStyles}
      >
        {/* the exact same children is rendered so it looks the exact same as drag item */}
        {children}
      </Box>
    </>
  )
}

export default DragShadow
