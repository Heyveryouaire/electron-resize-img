import React, { useState, useEffect } from 'react'

import './App.css';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

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
                bgcolor="#FF5F57"
              >
              </Box>
          </IconButton>
        </Tooltip>
      </Box>
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
