import { getValueFromLocalStorage } from '../utils/functions'
import { LOCAL_STORAGE_KEYS } from '../constants'
import { store } from '../store/store'

/**
 * Core utility functions.
 *
 * These functions are tightly coupled with the application and can be used anywhere within it.
 *
 * Many of the functions below use store.getState(), which comes with both benefits and tradeoffs.
 *
 * Benefits:
 * - Eliminates the need to pass down the latest values available in the store.
 * - Results in cleaner code with fewer function arguments, making the functions easier to use and less prone to bugs.
 * - Reduces re-renders and enhances memoization by not requiring updated state in various dependency arrays, leading to improved performance.
 *
 * Tradeoffs:
 * - Introduces tight coupling and impurity making the functions harder to test and less predictable.
 * - Functions that use store.getState() become impure, which makes them unsuitable for use in pure functions.
 * - Parameter order (nodes, id) is better than (id, nodes)
 *
 * Workaround:
 * - When using these functions in pure contexts, pass the necessary values as parameters.
 */

/**
 * Retrieves a node by its ID from a given array of nodes.
 * @param {string} id - The ID of the node to be retrieved.
 * @param {Array} [nodes] - An optional array of nodes to search within. If not provided, it defaults to the nodes
 * from the Redux store's chatbotFlowBuilder slice.
 * @returns {Array} - An array where the first element is the found node (or undefined if not found)
 * and the second element is the index of the found node (or -1 if not found).
 * I'm using getNodeById in a reducer slice. Can't use store.getState() there because reducer is pure function.
 * For that case nodes parameter is provided. Please Provide the nodes argument when using this function in a pure function.
 */
export const getNodeById = (id, nodes) => {
  const currentNodes = nodes ?? store.getState().chatbotFlowBuilder.nodes
  const nodeIndex = currentNodes.findIndex((node) => id === node.id)
  return [currentNodes[nodeIndex], nodeIndex]
}

/**
 * Retrieves the saved state of the chatbot flow builder from local storage.
 *
 * This function uses the getValueFromLocalStorage utility function to access
 * the saved state from local storage using the predefined key
 * LOCAL_STORAGE_KEYS.SAVED_CHATBOT_FLOW_BUILDER_STATE.
 *
 * @returns {Object|null} The saved state of the chatbot flow builder if it exists in local storage,
 * or null if not found or if the key does not exist.
 */

export const getSavedChatbotFlowBuilderState = () =>
  getValueFromLocalStorage(LOCAL_STORAGE_KEYS.SAVED_CHATBOT_FLOW_BUILDER_STATE)

// saves the current chatbotFlowBuilder state to local storage
export const saveChatbotFlow = () => {
  /* in case the store.getState().chatbotFlowBuilder contains non-serializable values or/and bigInt
  numbers or/and circular object the JSON.stringify will fail that's why wrapped the whole thing in
  a try catch block */
  try {
    const chatbotFlowBuilderState = store.getState().chatbotFlowBuilder
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.SAVED_CHATBOT_FLOW_BUILDER_STATE,
      JSON.stringify(chatbotFlowBuilderState)
    )
    return [true, 'Flow saved']
  } catch (err) {
    console.error(err)
    return [false, err.message]
  }
}

/**
 * Constructs a mapping of nodes to their connected edges.
 *
 * This function retrieves the current state of the chatbot flow builder from the Redux store,
 * then creates an object where each node ID is mapped to an object containing arrays of edge IDs
 * for edges where the node is a source or a target.
 *
 * @returns {Object} An object where each key is a node ID, and each value is an object with two properties:
 * - `source`: An array of edge IDs where the node is the source.
 * - `target`: An array of edge IDs where the node is the target.
 */
export const nodesConnectedToEdges = () => {
  // Retrieve the current state of the chatbot flow builder from the Redux store
  const chatbotFlowBuilderState = store.getState().chatbotFlowBuilder
  const nodes = chatbotFlowBuilderState.nodes
  const edges = chatbotFlowBuilderState.edges

  // Initialize the result object with each node ID mapped to an object containing empty arrays for source and target edges
  const resultObj = {}
  for (let i = 0; i < nodes.length; i++) {
    const nodeId = nodes[i].id
    resultObj[nodeId] = {
      source: [],
      target: [],
    }
  }

  // Iterate over the edges and populate the source and target arrays for each node
  for (let i = 0; i < edges.length; i++) {
    const edgeId = edges[i].id
    const sourceIdOfTheEdge = edges[i].source
    const targetIdOfTheEdge = edges[i].target

    resultObj[sourceIdOfTheEdge].source.push(edgeId)
    resultObj[targetIdOfTheEdge].target.push(edgeId)
  }

  // Return the result object containing the node to edges mapping
  return resultObj
}

/**
 * Computes the count of edges connected to each node.
 *
 * This function constructs an object that maps each node ID to an object containing the count of source and target edges.
 * It uses the `nodesConnectedToEdges` function to get the mapping of nodes to their connected edges.
 *
 * @returns {Object} An object where each key is a node ID, and each value is an object with two properties:
 * - `source`: The count of edges where the node is the source.
 * - `target`: The count of edges where the node is the target.
 */
export const nodesEdgeCount = () => {
  // Initialize the result object
  const resultObj = {}

  // Get the mapping of nodes to their connected edges
  const nodesEdgesConnectionMap = nodesConnectedToEdges()

  // Iterate over each entry in the nodesEdgesConnectionMap
  Object.entries(nodesEdgesConnectionMap).forEach(([key, value]) => {
    // For each node, count the source and target edges
    resultObj[key] = {
      source: value.source.length,
      target: value.target.length,
    }
  })

  // Return the result object containing the node to edge count mapping
  return resultObj
}

/**
 * Retrieves node IDs that have exactly N edges connected to a specified handle (source or target).
 *
 * This function computes the edge counts for each node using the nodesEdgeCount function,
 * then filters the nodes to find those that have exactly N edges for the specified handle.
 *
 * @param {number} n - The exact number of edges the nodes should have connected to the specified handle.
 * @param {string} handle - The handle type to check ('source' or 'target').
 * @returns {Array<string>} An array of node IDs that have exactly N edges connected to the specified handle.
 */
export const nodesWithHandleCountN = (n, handle) => {
  // Initialize an array to store node IDs with exactly N edges for the specified handle
  const nodeIdsWithCountN = []

  // Get the edge count for each node
  const nodesEdgeCountObj = nodesEdgeCount()

  // Iterate over each entry in the nodesEdgeCountObj
  Object.entries(nodesEdgeCountObj).forEach(([key, value]) => {
    // If the node has exactly N edges for the specified handle, add its ID to the array
    if (value[handle] === n) {
      nodeIdsWithCountN.push(key)
    }
  })

  // Return the array of node IDs with exactly N edges for the specified handle
  return nodeIdsWithCountN
}
