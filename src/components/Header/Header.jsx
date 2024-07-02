import { Button, styled } from '@mui/material'
import { memo } from 'react'
import { rightSidePanelWidth } from '../../constants'
import { saveChatbotFlow } from '../../core/utilFunctions'
import { validationBeforeSave } from '../../core/validationFunctions/validationBeforeSave'
import { toast } from '../../customLibraries/MyReactToastify/toast'

// memoized header to prevent unnecessary re-renders
const Header = memo(function Header() {
  return (
    <StyledHeader>
      <Button
        variant="outlined"
        size="small"
        // tried to style the button close to the UI design provided
        // ideally the desired styled button should come form design system
        sx={{
          gridArea: 'button',
          bgcolor: '#fff',
          fontWeight: 'bold',
          fontSize: '13px',
          border: '2px solid #575d99',
          padding: '3px 24px',
          color: '#575d99',
          '&:hover': {
            border: '2px solid #575d99',
          },
        }}
        onClick={() => {
          // validating the form before saving
          const [isValid] = validationBeforeSave()
          if (isValid === false) {
            // if validation fails it show user an error message
            toast.error('Cannot save flow')
            return
          }
          // save the flow to localStorage
          const [isFlowSaved, message] = saveChatbotFlow()
          if (isFlowSaved) {
            // if saving succeeds it shows user a success message
            toast.success(message)
            return
          }
          // if saving fails it shows user an error message
          toast.error(message)
        }}
      >
        Save Changes
      </Button>
    </StyledHeader>
  )
})

export default Header

const StyledHeader = styled('header')({
  display: 'grid',
  gridArea: 'header',
  background: '#f3f3f3',
  placeItems: 'center',
  gridTemplateColumns: `1fr ${rightSidePanelWidth}`,
  gridTemplateAreas: `'normalButton button'`,
})
