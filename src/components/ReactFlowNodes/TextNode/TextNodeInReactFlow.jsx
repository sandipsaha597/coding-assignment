import MessageOutlinedIconMUI from '@mui/icons-material/MessageOutlined'
import { Box, Typography, styled } from '@mui/material'
import { Handle, Position } from 'reactflow'
import { WhatsAppIcon } from '../../../assets/svgIcons'

// Text node to show in chatbotFlow
const TextNodeInReactFlow = ({ selected, data }) => {
  return (
    <>
      {/* simple styling as per the design provided */}
      <StyledTextNodeInReactFlow selected={selected}>
        <StyledTextNodeInReactFlowHead>
          <MessageOutlinedIconMUI fontSize="small" sx={{ mr: '8px' }} />
          <Typography fontWeight="bold">Send Message</Typography>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <WhatsAppIcon width={23} height={23} />
          </Box>
        </StyledTextNodeInReactFlowHead>
        <StyledTextNodeInReactFlowBody>
          <Typography>{data.textMessage}</Typography>
        </StyledTextNodeInReactFlowBody>
      </StyledTextNodeInReactFlow>

      {/* target and source handles to attach edges */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  )
}

export default TextNodeInReactFlow

const StyledTextNodeInReactFlow = styled('div')(({ selected }) => ({
  // the selected nodes should be highlighted
  outline: `2px solid ${selected ? '#7386bc' : 'transparent'}`,
  borderRadius: '10px',
  width: 300,
  overflow: 'hidden',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
}))

const StyledTextNodeInReactFlowHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  background: '#b1efe2',
  padding: '5px 15px',
})

const StyledTextNodeInReactFlowBody = styled('div')({
  padding: '13px 15px',
  background: '#fff',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
})
