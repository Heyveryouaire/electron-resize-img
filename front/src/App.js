import React, { useState, useEffect } from 'react'

import './App.css';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import Input from '@mui/material/InputBase'

import MenuBar from './menuBar'

function App() {
  const { emit, finish, end, targetfolder } = window
  const [isLoading, setIsLoading] = useState(false)
  const [path, setPath] = useState("")

  const handleFile = () => {
    setIsLoading(true)
    emit('openDialog')
  }

  const closeWindow = () => {
    emit("close")
  }

  const minimizeWindow = () => {
    emit("minimize")
  }

  const getTargetFolder = () => {
    emit("gettargetfolder")
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

  targetfolder.received('targetfolder', (e, path) => {
    if (path) {
      setPath(path)
    }
  })

  const handleDrop = (e) => {
    e.preventDefault()

    let files = []
    for (let file of e.dataTransfer.files) {
      files.push({
        name: file.name,
        path: file.path,
        type: file.type
      })
    }
    emit('drop', files)
  }

  useEffect(() => {
      localStorage.setItem('path', path)
      emit("setpath", path)
  }, [path])

  useEffect(() => {
    let path = localStorage.getItem('path')
    emit("setpath", path)
  }, [])



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
          minimizeWindow={minimizeWindow}
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
          flex={1}
          // bgcolor="white"
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: 'center',
            margin: "5px",
            padding: "5px"
          }}
        >
          <Box
            bgcolor='#E5E5E5'
            sx={{
              padding: "10px",
              borderRadius: 1,
            }}
          >

            <Tooltip
              title={<p style={{ fontSize: '12px' }}>Double-cliquer pour ouvrir le gestionnaire de fichier</p>}
              onClick={closeWindow}
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
      </Box>
    </Container >
  );
}

export default App;
