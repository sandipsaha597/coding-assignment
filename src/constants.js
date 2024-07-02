import { MarkerType } from 'reactflow'
import TextNodeInReactFlow from './components/ReactFlowNodes/TextNode/TextNodeInReactFlow'
import TextNodeEditForm from './components/ReactFlowNodeEditForms/TextNodeEditForm/TextNodeEditForm'

/**
 * Naming conventions:
 * - Screaming Snake Case (e.g., NODE_TYPE_FORM_COMPONENT_MAP) indicates that the values
 *   are linked with values saved in backend, localStorage, sessionStorage, etc. These should be
 *   changed with high caution.
 * - camelCase names (e.g., defaultEdgeOptions) indicate that names are used only in the frontend
 *   codebase and can be changed more easily.
 */

// width of the right side panel of the app
export const rightSidePanelWidth = '400px'

// Passed in the defaultEdgeOptions prop of reactFlow to style the edges
export const defaultEdgeOptions = {
  markerEnd: { type: MarkerType.ArrowClosed },
}

// Types of nodes available in the chatbot flow.
export const NODE_TYPE_MAP = {
  TEXT_NODE: 'textNode',
  // FORM_NODE: 'formNode',
}

/*
 * Maps the node types to components. It tells reactFlow which component
 * should be shown for each node type. Passed in the nodeTypes prop of reactFlow.
 */
export const NODE_TYPE_REACT_FLOW_COMPONENT_MAP = {
  [NODE_TYPE_MAP.TEXT_NODE]: TextNodeInReactFlow,
  // [NODE_TYPE_MAP.FORM_NODE]: FormNode,
}

/**
 * Maps node types to their corresponding form components.
 * All form components should follow a specific structure:
 * - They should take the data through props.data and display it in the form inputs.
 * - They should call the props.onChange callback function with the new values
 *   (the whole data object to be set as the selected node's data).
 */
export const NODE_TYPE_FORM_COMPONENT_MAP = {
  [NODE_TYPE_MAP.TEXT_NODE]: TextNodeEditForm,
}

// Keys used for storing data in localStorage
export const LOCAL_STORAGE_KEYS = {
  SAVED_CHATBOT_FLOW_BUILDER_STATE: 'savedChatbotFlowBuilderState',
}
