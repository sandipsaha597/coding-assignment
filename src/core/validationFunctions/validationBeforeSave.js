import { nodesWithHandleCountN } from '../utilFunctions'

/**
 * Error types for validation before saving.
 *
 * This object contains different types of validation errors that can occur before saving.
 */
export const validationBeforeSaveErrorTypes = {
  moreThanOneNodeHasEmptyTargetHandle: 'moreThanOneNodeHasEmptyTargetHandle',
}

/**
 * Validates the chatbotFlowBuilder state before saving.
 *
 * It uses nodesWithHandleCountN function to get the nodeIds of nodes which has exactly 0 edges connected to target handle
 * validations:
 * - it checks if more than one node has an empty target handle.
 *
 * @returns {Array} An array containing:
 * - {boolean} - The validation status (true if validation passed, false otherwise).
 * - {string} - The type of error if validation failed (empty string if validation passed).
 * - {string} - A descriptive error message if validation failed (empty string if validation passed).
 */
export const validationBeforeSave = () => {
  // Get node IDs that have exactly 0 target handles
  const nodeIds = nodesWithHandleCountN(0, 'target')

  // Check if more than one node has an empty target handle
  if (nodeIds.length > 1) {
    return [
      false,
      validationBeforeSaveErrorTypes.moreThanOneNodeHasEmptyTargetHandle,
      'More than one node has empty target handle',
    ]
  }

  // Return validation passed status if there are no issues
  return [true, '', '']
}
