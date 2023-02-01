
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { Alert, FlatList} from 'react-native';
import { Container } from './styles';
import { useCallback, useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GroupsGetAll } from '@storage/group/GroupsGetAll';
import { Loading } from '@components/Loading';




export function Groups() {

  const [isLoading, setIsLoading] = useState(true);
  const [ groups, setGroups ] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('newGroup');
    
  }

  async function getStoredGroups() {
    try {
      setIsLoading(true);
      const storedGroups = await GroupsGetAll();
      setGroups(storedGroups);
     
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    // console.log('Groups');
    getStoredGroups();
  }, []));

  return (
    <Container>
      <Header />
      <HighLight title='Turmas' subtitle='Joge com a sua turma'/>

      {isLoading? <Loading/> : 
      
      <FlatList
      data={groups}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <GroupCard title={item} onPress={() => handleOpenGroup(item)}/>
      )}
      contentContainerStyle={groups.length === 0 && { flex: 1 }}
      ListEmptyComponent={ ()=>
        <ListEmpty message='Nenhuma turma encontrada' />
      }
      />}


      <Button title='Criar turma' onPress={handleNewGroup}/>

      
     
    </Container>
  );
}
function GroupGetAll() {
  throw new Error('Function not implemented.');
}

