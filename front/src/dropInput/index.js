import React from 'react'
import Box from '@mui/material/Box'

export default function DropInput({
  handleFile,
  isLoading,
  handleDrop,

}) {
  return (
    <Box
      flex={2}
      width="100%"
      textAlign="center"
      bgcolor="#E5E5E5"
      display='flex'
      justifyContent="center"
      alignItems="center"
      onClick={handleFile}
      sx={{
        marginBottom: "20px",
        borderRadius: 1,
        cursor: "pointer"
      }}
      style={{
        userSelect: "none"
      }}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      {isLoading ? (
        <p>
          Processing ...
        </p>
      ) : (
        <p>
          Ajouter un fichier
        </p>
      )}
    </Box>
  )
}
