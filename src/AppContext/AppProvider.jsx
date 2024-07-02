import { useRef, useState } from 'react'
import { AppContext } from './AppContext'
/* 
  The AppProvider is not intended for storing states that continuously change, 
  are serializable, or trigger re-renders upon change. Those states should be 
  managed by the Redux store.
  
  The AppProvider is meant to store:
  - Static values
  - Non-serializable values
  - References
  - Other similar values
 */

const AppProvider = ({ children }) => {
  /* chatbotFlowBuilder - start */
  // reference of the chatbotFlowBuilder reactFlow component
  const chatbotReactFlowRef = useRef(null)
  /* State to hold the instance of the React Flow, set upon React Flow initialization.
  This state is useful when working with uncontrolled components or for methods
  such as screenToFlowPosition, etc. */
  const [chatbotReactFlowInstance, setChatbotReactFlowInstance] = useState(null)

  /* chatbotFlowBuilder - end */

  // all the values and methods available in AppContext
  const value = {
    chatbotFlowBuilder: {
      chatbotReactFlowRef,
      chatbotReactFlowInstance,
      setChatbotReactFlowInstance,
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
