import { createSlice } from '@reduxjs/toolkit'
import { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import {
  getNodeById,
  getSavedChatbotFlowBuilderState,
} from '../core/utilFunctions'

const savedChatbotFlowBuilderState = getSavedChatbotFlowBuilderState()
/*
  This state contains the nodes and edges for the chatbotFlowBuilder.
  It should only include values that:
  - Continuously change,
  - Are serializable,
  - Trigger re-renders upon change.
  
  References to ReactFlow, reactFlowInstance, and all other non-serializable values are stored in the AppContext.
  This separation ensures that the Redux state remains serializable and suitable for debugging and testing, 
  while non-serializable values are managed within the application context.

  Initially, I was cautious about whether to use Context API and Redux together in the same application.
  After consulting ChatGPT, I learned that it is not only okay to use them together but also considered a very good practice 
  since they serve different purposes. The react-redux library itself uses Context API under the hood.
*/
const initialState =
  savedChatbotFlowBuilderState === null
    ? {
        nodes: [],
        edges: [],
      }
    : savedChatbotFlowBuilderState

const chatbotFlowBuilderSlice = createSlice({
  name: 'chatbotFlowBuilder',
  initialState,
  reducers: {
    /**
     * Adds a new node to the state.
     * @param {Object} action.payload - The payload containing the new node to add.
     * @param {Object} payload.newNode - a valid new node
     */
    addNode: (state, { payload }) => {
      state.nodes.push(payload.newNode)
    },
    /* reactFlow prop */
    /* upon selecting a node and pressing backspace deletes that node
    If onNodeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component */
    onNodesChange: (state, { payload }) => {
      state.nodes = applyNodeChanges(payload.changes, state.nodes)
    },

    /* reactFlow prop */
    /* upon selecting an edge and pressing backspace deletes that edge. 
    If onEdgeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component
    upon selecting a node and pressing backspace deletes that node
    edges related to that node should delete as well.
    If onEdgeChange is not there changes won't be applied, unless we are using uncontrolled reactFlow component
    */
    onEdgesChange: (state, { payload }) => {
      state.edges = applyEdgeChanges(payload.changes, state.edges)
    },
    /* reactFlow prop */
    /* triggers upon valid connection of two node. */
    onConnect: (state, { payload }) => {
      // using addEdge function is important because it runs validation and does not add duplicate edges
      state.edges = addEdge(payload.params, state.edges)
    },

    /**
     * Edits the data of a node in the state based on the provided node ID.
     * Logs an error if the node ID does not exist in the current state.
     * @param {Object} action.payload - The payload containing the node ID and new data.
     * @param {String} payload.id - a valid nodeId
     * @param {Object} payload.newData - newData object to replace the old data object
     */
    editNodeData: (state, { payload }) => {
      const [, nodeIndex] = getNodeById(payload.nodeId, state.nodes)
      if (nodeIndex === -1) {
        console.error('Attempt to edit a node which does not exist')
      } else {
        state.nodes[nodeIndex].data = payload.newData
      }
    },
  },
})

export const chatbotFlowBuilderSliceActions = chatbotFlowBuilderSlice.actions
const chatbotFlowBuilderSliceReducer = chatbotFlowBuilderSlice.reducer
export default chatbotFlowBuilderSliceReducer
