import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function Menubar({ closeWindow }) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        width: "100%",
      }}
      bgcolor="#262626"
      style={{
        WebkitAppRegion: 'drag' // required to drag window
      }}
    >
      <Tooltip
        title="Close"
        onClick={closeWindow}
        arrow
        TransitionComponent={Zoom}
      >
        <IconButton size="small">
          <Box
            sx={{
              borderRadius: '50%',
              height: "16px",
              width: "16px",
              margin: "2px",
              transition: "0.5s",
              ":hover": {
                bgcolor: "#FEBC2E",
              }
            }}
            style={{
              WebkitAppRegion: "no-drag"
            }}
            bgcolor="#FF5F57"
          >
          </Box>
        </IconButton>
      </Tooltip>
    </Box>
  )
}
