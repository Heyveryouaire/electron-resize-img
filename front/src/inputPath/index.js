import React from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Input from '@mui/material/InputBase'

export default function InputPath({
  getTargetFolder,
  setPath,
  path,
}) {
  return (
    <Box
      bgcolor='#E5E5E5'
      sx={{
        padding: "10px",
        borderRadius: 1,
      }}
    >

      <Tooltip
        title={<p style={{ fontSize: '12px' }}>Double-cliquer pour ouvrir le gestionnaire de fichier</p>}
        arrow
        TransitionComponent={Zoom}
        placement="top"

      >
        <Input
          bgcolor="white"
          placeholder="Entrer un chemin cible"
          value={path}
          onDoubleClick={e => {
            e.preventDefault()
            getTargetFolder()
          }}
          onChange={e => {
            e.preventDefault()
            setPath(e.target.value)
          }}
          onClick={e => {
            e.preventDefault()
          }}

          style={{
            userSelect: 'none'
          }}
        />
      </Tooltip>
    </Box>
  )
}
