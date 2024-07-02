import { styled } from '@mui/material'
import NodesInPanelList from './NodesInPanelList'

const NodesPanel = () => {
  return (
    <StyledNodesPanel>
      <NodesInPanelList />
    </StyledNodesPanel>
  )
}

export default NodesPanel

const StyledNodesPanel = styled('section')({
  padding: '10px',
})
