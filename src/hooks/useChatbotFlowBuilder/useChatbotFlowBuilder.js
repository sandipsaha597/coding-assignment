import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppContext } from '../../AppContext/useAppContext'
import { chatbotFlowBuilderSliceActions } from '../../store/chatbotFlowBuilderSlice'

/**
 * This hook contains the global state, context, and methods for the chatbotFlowBuilder.
 *
 * @returns {Object} An object containing various states, context, and methods to interact with the chatbotFlowBuilder.
 *
 * Properties:
 *  - {Array} nodes: The nodes currently present in the chatbotFlowBuilder.
 *  - {Function} addNode: A function to add a node to the flow.
 *  - {Array} selectedNodes: Nodes that are currently selected in the flow.
 *  - {Function} onNodesChange: A React Flow prop. Pass the values as they are.
 *  - {Function} editNodeData: A function to edit the data of an existing node.
 *  - {Array} edges: The edges currently present in the chatbotFlowBuilder.
 *  - {Function} onEdgesChange: A React Flow prop. Pass the values as they are.
 *  - {Function} onConnect: A React Flow prop. Pass the values as they are.
 *  - {Ref} chatbotReactFlowRef: HTML element reference of the chatbotFlowBuilder.
 *  - {Object} chatbotReactFlowInstance: The instance of chatbotReactFlow, initialized upon chatbotFlow (reactFlow) initialization.
 *        This includes methods like addNodes, screenToFlowPosition, etc. Refer to the React Flow documentation for more info: https://reactflow.dev/api-reference/types/react-flow-instance
 *  - {Function} setChatbotReactFlowInstance: Sets the chatbotReactFlowInstance. Pass it in the onInit prop of React Flow.
 */

const useChatbotFlowBuilder = () => {
  const nodes = useSelector((state) => state.chatbotFlowBuilder.nodes)
  const edges = useSelector((state) => state.chatbotFlowBuilder.edges)
  const {
    chatbotReactFlowRef,
    chatbotReactFlowInstance,
    setChatbotReactFlowInstance,
  } = useAppContext().chatbotFlowBuilder
  const dispatch = useDispatch()

  // when a node is selected, that node's selected fields becomes true automatically
  const selectedNodes = useMemo(() => {
    return nodes
      .filter((node) => node.selected)
      .map((v) => ({ id: v.id, type: v.type, data: v.data }))
  }, [nodes])

  /*  */
  /**
   * use this function to add a node to chatbotFlowBuilder.
   * newNode should be a valid reactFlow node
   * to remove a a node just select the node in the UI and press backspace
   * that node and all the edges will get deleted automatically
   *
   * Adds a new node to the state.
   * @param {Object} newNode - a valid new node
   */
  const addNode = useCallback(
    (newNode) => {
      dispatch(chatbotFlowBuilderSliceActions.addNode({ newNode }))
    },
    [dispatch]
  )

  /* reactFlow prop */
  /* upon selecting a node and pressing backspace deletes that node
    If onNodeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component */
  const onNodesChange = useCallback(
    (changes) =>
      dispatch(chatbotFlowBuilderSliceActions.onNodesChange({ changes })),
    [dispatch]
  )

  /* reactFlow prop */
  /* upon selecting an edge and pressing backspace deletes that edge. 
    If onEdgeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component
    upon selecting a node and pressing backspace deletes that node
    edges related to that node should delete as well.
    If onEdgeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component
    */
  const onEdgesChange = useCallback(
    (changes) =>
      dispatch(chatbotFlowBuilderSliceActions.onEdgesChange({ changes })),
    [dispatch]
  )

  /* reactFlow prop */
  /* triggers upon valid connection of two node. */
  const onConnect = useCallback(
    (params) => dispatch(chatbotFlowBuilderSliceActions.onConnect({ params })),
    [dispatch]
  )

  /**
   * Edits the data of a node in the state based on the provided node ID.
   * @param {String} payload.id - a valid nodeId
   * @param {Object} payload.newData - newData object to replace the old data object
   */
  const editNodeData = useCallback(
    (nodeId, newData) => {
      dispatch(
        chatbotFlowBuilderSliceActions.editNodeData({
          nodeId,
          newData,
        })
      )
    },
    [dispatch]
  )

  return {
    nodes,
    addNode,
    selectedNodes,
    onNodesChange,
    editNodeData,
    edges,
    onEdgesChange,
    onConnect,
    chatbotReactFlowRef,
    chatbotReactFlowInstance,
    setChatbotReactFlowInstance,
  }
}

export default useChatbotFlowBuilder
