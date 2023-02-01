import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { GroupCreate } from "@storage/group/GroupCreate";
import { useState } from "react";
import { AppError } from "@utils/AppError";
import { Container, Content, Icon } from "./styles";
import { Alert } from "react-native";

export function NewGroup() {

  const [group, setGroup] = useState('')
  const navigation = useNavigation();

    async function handleCreatePlayers() {
      try {
        if(group.trim().length === 0) {
          return  Alert.alert('Novo Grupo', 'Informe o nome do grupo');
        }

        await GroupCreate(group)
      
        navigation.navigate('players', { group: group });
      } catch (error) {
        // console.log(error);
        if(error instanceof AppError) {
          Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight title="Nova turma" subtitle="Crie uma turma" />
        <Input placeholder="Nome da turma" onChangeText={(text) => setGroup(text)} />
        <Button title="Criar" onPress={handleCreatePlayers} />

      </Content>
    </Container>
  )
}