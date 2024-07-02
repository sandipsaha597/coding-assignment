import { useCallback, useMemo } from 'react'
import { styled } from '@mui/material'
import ReactFlow from 'reactflow'
import 'reactflow/dist/style.css'
import './App.css'
import Header from './components/Header/Header'
import NodesPanel from './components/NodesPanel/NodesPanel'
import SettingsPanel from './components/SettingsPanel/SettingsPanel'
import {
  NODE_TYPE_REACT_FLOW_COMPONENT_MAP,
  defaultEdgeOptions,
  rightSidePanelWidth,
} from './constants'
import { isValidConnection } from './core/validationFunctions/isValidConnections'
import {
  TOAST_CONTAINER_POSITION,
  ToastContainer,
  toast,
} from './customLibraries/MyReactToastify'
import useChatbotFlowBuilder from './hooks/useChatbotFlowBuilder/useChatbotFlowBuilder'
import { throttleMultiple } from './utils/functions'

function App() {
  // useChatbotFlowBuilder contains all the functionalities, states, context and methods related to chatbotFlow
  const {
    nodes,
    edges,
    chatbotReactFlowRef,
    setChatbotReactFlowInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useChatbotFlowBuilder()

  console.log(nodes, edges)

  /* Memoizing the throttledErrorToast function is crucial to ensure that the same throttle context and variables
  are reused across renders. Without memoization, each rerender would create a new throttle function,
  resulting in multiple toast notifications appearing simultaneously.
  Alternatively, we can define the throttledErrorToast function outside of the component to achieve the same effect:
  const throttledErrorToast = throttle(toast.error, 3000); */
  const throttledErrorToast = useMemo(() => {
    // throttling to limit the number of toast notifications of the same type
    return throttleMultiple(toast.error, 3000)
  }, [])

  const isValidConnectionUseCallback = useCallback(
    (connection) => {
      const [result, errType, message] = isValidConnection(connection)

      // if the connection is valid just returning true indicating to reactFlow that it's valid connection
      if (result) return true
      /* if connection is invalid showing user an error toast with a message explaining why it is invalid.
      `isValidConnection` event of reactFlow gets triggered on mousemove that is why we need some workaround
       otherwise many toast notifications with the same error type will be shown at once
       throttling to limit the number of toast notifications of the same type
      */
      message && throttledErrorToast(errType, message)
    },
    [throttledErrorToast]
  )

  return (
    <ChatbotFlowBuilder>
      {/* header of the app */}
      <Header />
      <ReactFlowWrapper>
        <ReactFlow
          ref={chatbotReactFlowRef}
          nodes={nodes}
          nodeTypes={NODE_TYPE_REACT_FLOW_COMPONENT_MAP}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={defaultEdgeOptions}
          onConnect={onConnect}
          onInit={setChatbotReactFlowInstance}
          proOptions={{ hideAttribution: true }}
          isValidConnection={isValidConnectionUseCallback}
        />
      </ReactFlowWrapper>
      <RightSidePanel>
        <SettingsPanel />
        <NodesPanel />
      </RightSidePanel>
      {/* Using ToastContainer to enable toast notifications in the app */}
      <ToastContainer position={TOAST_CONTAINER_POSITION.TOP_CENTER} />
    </ChatbotFlowBuilder>
  )
}

export default App

const ChatbotFlowBuilder = styled('div')({
  display: 'grid',
  height: '100vh',
  gridTemplateRows: '45px 1fr',
  gridTemplateColumns: `1fr ${rightSidePanelWidth}`,
  gridTemplateAreas: `
          'header header'
          'react-flow right-side-panel'
        `,
})

const ReactFlowWrapper = styled('main')({ gridArea: 'react-flow' })

const RightSidePanel = styled('aside')({
  border: '1px solid #d8d8d8',
  borderRight: 'none',
  borderBottom: 'none',
  display: 'grid',
  gridArea: 'right-side-panel',
  overflow: 'hidden',
  position: 'relative',
})
