import { memo } from 'react'
import { Typography, styled } from '@mui/material'

// take data object as input and shows it in the form
// when form value changes it calls the onChange callback function with new values
const TextNodeEditForm = memo(function TextNodeEditForm({
  data = {},
  onChange,
}) {
  const handleFormChange = (key, value) => {
    const values = {
      ...data,
      [key]: value,
    }
    // calling the props.onChange callback function with new values
    onChange(values)
  }

  return (
    // default submit is prevented because pressing enter key submits the form
    <Form onSubmit={(e) => e.preventDefault()}>
      <Label htmlFor="text-message" component="label">
        Text
      </Label>
      <Textarea
        id="text-message"
        rows={4}
        value={data.textMessage}
        onChange={(e) => handleFormChange('textMessage', e.target.value)}
        placeholder="Enter text message"
      ></Textarea>
    </Form>
  )
})

export default TextNodeEditForm

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

// ideally the colors, gaps etc should come from theme
const Label = styled(Typography)({ color: '#d8d8d8', fontSize: '14px' })
const Textarea = styled('textarea')({
  padding: '10px',
  borderRadius: '4px',
  borderColor: '#dedede',
  resize: 'vertical',
})
