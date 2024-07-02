import { Typography, styled } from '@mui/material'

// assuming all the nodes in nodes panel will have the same look only icon and text will vary
const NodeInNodesPanel = ({ icon, text }) => {
  return (
    <StyledNodeInNodesPanel>
      {icon}
      <Typography>{text}</Typography>
    </StyledNodeInNodesPanel>
  )
}

export default NodeInNodesPanel

// styles of the node in node panel
const StyledNodeInNodesPanel = styled('div')({
  border: '2px solid #586089',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '16px 20px',
  width: '180px',
  boxSizing: 'border-box',
  fill: '#586089',
  color: '#586089',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
