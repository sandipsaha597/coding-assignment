import { getOutgoers } from 'reactflow'
import { getNodeById } from '../utilFunctions'
import { store } from '../../store/store'
/**
 * Error types for connection validation.
 *
 * This object contains different types of validation errors that can occur when creating a connection between nodes.
 */
export const isValidConnectionErrorTypes = {
  connectionAlreadyExits: 'connectionAlreadyExits',
  onlyOneConnectionAllowed: 'onlyOneConnectionAllowed',
}

/**
 * Validates if a connection between nodes is valid.
 *
 * This function checks if a connection between nodes is valid based on the current state of nodes and edges.
 * It ensures that no duplicate connections exist and that only one connection is allowed per source handle.
 *
 * @param {Object} connection - The connection object containing source and target node IDs.
 * @returns {Array} An array containing:
 * - {boolean} - The validation status (true if the connection is valid, false otherwise).
 * - {string} - The type of error if validation failed (empty string if validation passed).
 * - {string} - A descriptive error message if validation failed (empty string if validation passed).
 */
export const isValidConnection = (connection) => {
  // Destructure nodes and edges from the current state of the chatbotFlowBuilder
  const { nodes, edges } = store.getState().chatbotFlowBuilder

  // Get the source node by its ID
  const [sourceNode] = getNodeById(connection.source)

  // Get all outgoers (nodes that the source node connects to) of the source node
  const outgoers = getOutgoers(sourceNode, nodes, edges)

  // If there are no outgoers, the connection is valid
  if (outgoers.length === 0) return [true, '']

  // If there's only one outgoer and if the outgoer is the target node, the connection already exists
  if (outgoers.length === 1 && outgoers[0].id === connection.target) {
    return [
      false,
      isValidConnectionErrorTypes.connectionAlreadyExits,
      'Connection already exists',
    ]
  }

  // If there is already one or more outgoers, only one connection is allowed per source handle
  if (outgoers.length >= 1) {
    return [
      false,
      isValidConnectionErrorTypes.onlyOneConnectionAllowed,
      'Only one connection is allowed per source handle',
    ]
  }
}
