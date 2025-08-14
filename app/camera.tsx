// app/camera.tsx
import { View, StyleSheet } from 'react-native'
import { CameraView } from 'expo-camera'
import { Avatar, Button } from 'react-native-paper'
import * as FileSystem from 'expo-file-system'
import { useEffect, useState } from 'react'

export default function Camera() {
  const [photo, setPhoto] = useState<string | null>(null) // Cria um estado para armazenar a foto
  const photoFileName = FileSystem.documentDirectory + 'photo.jpg' // Cria um caminho para salvar a foto

  let cameraRef: CameraView | null = null

  const takePicture = async () => { // Função para tirar a foto
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync() // Tira a foto
      if (photo) {
        setPhoto(photo.uri) // Atualiza o estado da foto
        await FileSystem.copyAsync({ // Copia a foto para o caminho criado
          from: photo.uri,
          to: photoFileName,
        })    
      }
    }
  }

  const verifyExistedPhoto = async () => { // Função para verificar se a foto já existe
    const file = await FileSystem.getInfoAsync(photoFileName) // Verifica se a foto já existe
    if(file.exists) {
      setPhoto(file.uri) // Atualiza o estado da foto
    }
  }

  useEffect(() => {
    verifyExistedPhoto() // Verifica se a foto já existe
  }, [])

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={ref => cameraRef = ref} facing='front' />
      <Button onPress={takePicture}>Tirar foto</Button>

      {photo && <Avatar.Image size={250} source={{ uri: photo }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  camera: {
    height: 300,
    width: 300,
  }
})