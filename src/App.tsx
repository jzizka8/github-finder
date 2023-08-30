import { useState } from 'react'
import { Button, TextField } from '@mui/material';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex  items-center'>
      <h1>Github finder</h1>
      <div className='text-red-500'>
        hei

      </div>
      <TextField id="usernameTxt" label="Username" variant="standard" />
      <Button variant="contained">Find!</Button>
    </div>
  )
}

export default App
