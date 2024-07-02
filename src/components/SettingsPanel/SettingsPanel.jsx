import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import useChatbotFlowBuilder from '../../hooks/useChatbotFlowBuilder/useChatbotFlowBuilder'
import SettingsPanelEditForm from './SettingsPanelForm'
import SettingsPanelHeader from './SettingsPanelHeader'
import { settingsPanelTypeToTitleMap } from './constants'

const SettingsPanel = () => {
  const { selectedNodes } = useChatbotFlowBuilder()
  const [settingsPanelShow, setSettingsPanelShow] = useState(false)

  useEffect(() => {
    /* if exactly one node is selected, settings panel will be shown
    by pressing ctrl/cmd + shift user can do multi-selection in reactFlow */
    if (selectedNodes.length === 1) {
      setSettingsPanelShow(true)
    } else {
      setSettingsPanelShow(false)
    }
  }, [selectedNodes])

  return (
    <StyledSettingsPanel settingsPanelShow={settingsPanelShow}>
      <SettingsPanelHeader
        // settings panel header title should be different for different node types
        title={settingsPanelTypeToTitleMap[selectedNodes[0]?.type]}
        // hiding the settings panel upon back arrow button click
        hideSettingsPanel={() => setSettingsPanelShow(false)}
      />
      <SettingsPanelEditForm />
    </StyledSettingsPanel>
  )
}

export default SettingsPanel

const StyledSettingsPanel = styled('section')(({ settingsPanelShow }) => ({
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%',
  transform: settingsPanelShow ? 'translate(0%, 0)' : 'translate(-100%, 0)',
  transition: '.4s ease-in-out',
}))
