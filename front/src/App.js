import React, { useState, useEffect } from 'react'

import './App.css';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MenuBar from './menuBar'
import InputPath from './inputPath';
import DropInput from './dropInput';

function App() {
  const { emit, finish, evenement } = window
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

  evenement.received('finish', () => {
    if (!isLoading) {
      setIsLoading(false)
    }
  })

  evenement.received('cancel', () => {
    if (!isLoading) {
      setIsLoading(false)
    }
  })

  evenement.received('targetfolder', (e, path) => {
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
    async function load() {
      const data = finish.loading
      if (data) {
        setIsLoading(false)
      }
    } load()

  }, [finish])

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
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: 'center',
            margin: "5px",
            padding: "5px",
            flexDirection: "column",
          }}
        >
          <InputPath
            getTargetFolder={getTargetFolder}
            setPath={setPath}
            path={path}
          />
        </Box>
        <DropInput
          handleFile={handleFile}
          handleDrop={handleDrop}
          isLoading={isLoading}
        />
      </Box>
    </Container >
  );
}

export default App;
