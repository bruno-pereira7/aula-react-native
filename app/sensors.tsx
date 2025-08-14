// app/sensors.tsx
import { View, Text, StyleSheet } from 'react-native'
import { Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { Subscription } from 'expo-sensors/build/Pedometer'


export default function Sensors() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  }); // Cria um objeto com x, y e z
  const [subscription, setSubscription] = useState<Subscription | null>(null); // Cria uma subscription para o giroscópio - esse hook é utilizado para armazenar o estado do giroscópio

  const _slow = () => Gyroscope.setUpdateInterval(1000); // Função para setar o intervalo de atualização do giroscópio para 1000ms
  const _fast = () => Gyroscope.setUpdateInterval(16); // Função para setar o intervalo de atualização do giroscópio para 16ms

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  }; // Função para adicionar um listener ao giroscópio

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  }; // Função para remover o listener do giroscópio

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []); // Hook para adicionar o listener ao giroscópio e remover o listener ao desmontar o componente

  return (
    <View style={styles.container}>
      <Text>Giroscópio</Text>
      <Text>X: {x}</Text>
      <Text>Y: {y}</Text>
      <Text>Z: {z}</Text>

      <Button onPress={_slow}>Lento</Button>
      <Button onPress={_fast}>Rápido</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  }
})