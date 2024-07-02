import { NODE_TYPE_MAP } from '../../constants'
import useChatbotFlowBuilder from '../../hooks/useChatbotFlowBuilder/useChatbotFlowBuilder'
import { isElementsOverlappingByMargin } from '../../utils/functions'
import DragShadow from '../DragShadow/DragShadow'
import MessageOutlinedIconMUI from '@mui/icons-material/MessageOutlined'
import NodeInNodesPanel from './NodeInNodesPanel'
import { styled } from '@mui/system'

// list of nodes currently available is the app and shown in the nodes panel
const nodesInNodesPanel = [
  {
    id: crypto.randomUUID(),
    nodeType: NODE_TYPE_MAP.TEXT_NODE,
    icon: <MessageOutlinedIconMUI fontSize="large" />,
    text: 'Text message',
    defaultData: {
      textMessage: 'Text message',
    },
  },
]

const NodesInPanelList = () => {
  const { addNode, chatbotReactFlowRef, chatbotReactFlowInstance } =
    useChatbotFlowBuilder()

  return (
    <StyledNodesInPanelList>
      {nodesInNodesPanel.map(({ id, nodeType, defaultData, icon, text }) => {
        return (
          /* using DragShadow component to make the node draggable
      upon dragging the node, the node will stay at the same place but a shadow will appear
      which will move with the mouse */
          <DragShadow
            key={id}
            onDrop={(e, offset, draggedItem) => {
              // dimensions of the node in nodes panel
              const draggedItemBoundingClientRect =
                draggedItem.getBoundingClientRect()

              // check if the chatBotFlow box and node in panel box are overlapping of not
              const isOverlapping = isElementsOverlappingByMargin(
                chatbotReactFlowRef.current,
                draggedItem,
                // the draggedItem(node in panel) should be 50% or more inside of the chatBotFlow
                draggedItemBoundingClientRect.width / 2,
                draggedItemBoundingClientRect.height / 2
              )
              // if not overlapping returning false which makes it an invalid/unsuccessful drop
              if (isOverlapping === false) return false

              // need the screenToFlowPosition to place the node in the right place of the flow
              const position = chatbotReactFlowInstance.screenToFlowPosition({
                x: e.clientX,
                y: e.clientY,
              })
              // zoom level of the chatbotFlow
              const zoomLevel = chatbotReactFlowInstance.getZoom()
              // creating a valid new node to add to chatbotFlow
              const newNode = {
                id: crypto.randomUUID(),
                position: {
                  /* positioning the newNode's top-left corner to draggedItem's(node in panel) top-left corner, despite of zoom level
                   Mathematical explanation: 
                    Getting the top-left corner(position and offset):
                    we know that offset gives the distance between the mouse pointer and the top-left corner of the draggedItem
                    that means the if we subtract top-left corner with position we get the position of the top-left corner of draggedItem in reactFlow

                    taking care of zoom level:
                    the default zoom level is 1
                    the fully zoomed-in level is 2
                    the fully zoomed-out level is 0.5

                    default zoom is normal offset divided by 1 results in the same number
                    fully zoomed-in means, if the distance between point a and point b was x, now it is x * 2. So the offset should decrease by half to align properly
                    the opposite goes with zoom-out
                  */
                  x: position.x - offset.x / zoomLevel,
                  y: position.y - offset.y / zoomLevel,
                },
                type: nodeType,
                data: defaultData,
              }
              addNode(newNode)

              // returning true which makes it a valid/successful drop
              return true
            }}
          >
            <NodeInNodesPanel icon={icon} text={text} />
          </DragShadow>
        )
      })}
    </StyledNodesInPanelList>
  )
}

export default NodesInPanelList

const StyledNodesInPanelList = styled('div')({
  display: 'flex',
  gap: '10px',
  flexFlow: 'row wrap',
})
