import { Box } from '@mui/material'
import './LoadingScreen.css'

const LoadingScreen = () => {
  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "80vh"}}>

      <div className='wrapper'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
      </div>
    </Box>
  )
}

export default LoadingScreen