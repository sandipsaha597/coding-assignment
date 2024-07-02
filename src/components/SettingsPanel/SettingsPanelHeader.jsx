import ArrowBackIconMUI from '@mui/icons-material/ArrowBack'
import { IconButton, Typography, styled } from '@mui/material'

/**
 * SettingsPanelHeader Component
 *
 * This component renders a header for the settings panel with a title and a back button.
 *
 * Props:
 * - `hideSettingsPanel` (function): Callback function to hide the settings panel when the back button is clicked.
 * - `title` (string): The title to be displayed in the header. Defaults to an empty string.
 *
 * Usage:
 * ```
 * <SettingsPanelHeader hideSettingsPanel={handleHideSettingsPanel} title="Settings" />
 * ```
 */
const SettingsPanelHeader = ({ hideSettingsPanel, title = '' }) => {
  return (
    <StyledSettingsPanelHeader>
      <IconButton
        sx={{ position: 'absolute', left: 5, borderRadius: '4px' }}
        onClick={hideSettingsPanel}
        size="small"
      >
        <ArrowBackIconMUI fontSize="small" />
      </IconButton>
      <Typography>{title}</Typography>
    </StyledSettingsPanelHeader>
  )
}

export default SettingsPanelHeader

const StyledSettingsPanelHeader = styled('header')({
  borderBottom: '1px solid #d8d8d8',
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  gridTemplateRows: '40px auto',
})
