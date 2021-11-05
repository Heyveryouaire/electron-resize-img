import React, { useState, useEffect } from 'react'

import './App.css';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import MenuBar from './menuBar'

function App() {
  const { emit, finish, end } = window
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = () => {
    setIsLoading(true)
    emit('openDialog')
  }

  const closeWindow = () => {
    emit("close")
  }

  useEffect(() => {
    async function load() {
      const data = finish.loading
      if (data) {
        setIsLoading(false)
      }
    } load()

  }, [finish])


  end.received('finish', () => {
    if (!isLoading) {
      setIsLoading(false)
    }
  })

  end.received('cancel', () => {
    if (isLoading) {
      setIsLoading(false)
    }
  })

  return (
    <Container
      sx={{
        height: "100vh",
        color: "#404040",
        bgcolor: "#1A5A73"
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
        justifyContent="flex-start"
        alignItems="center"
        display="flex"
        flexDirection='column'
      >
        <MenuBar
          closeWindow={closeWindow}
        />
        <Box
          flex={1}
          sx={{
            width: "100%",
            textAlign: 'center',
            paddingTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2 style={{
            color: "#E5E5E5",
            userSelect: "none",
          }}>
            Image resizer
          </h2>
        </Box>
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
      </Box>
    </Container >
  );
}

export default App;
