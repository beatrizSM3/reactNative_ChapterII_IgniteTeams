import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { useCallback, useEffect, useState, useRef } from "react";
import { PlayerCard } from "@components/PlayerCards";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { GroupsGetAll } from "@storage/group/GroupsGetAll";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/PlayerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/PlayerGetBuGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/PlayerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/GroupRemoveByName";
import { Loading } from "@components/Loading";


interface RouteParams {
    group: string;
}

export function Players() {

    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState<string>('Time A')
    const [activeTeam, setActiveTeam] = useState<string>('')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const [newPlayer, setNewPlayer] = useState<string>('')

    const navigation = useNavigation();
    const route = useRoute()

    const { group } = route.params as RouteParams //grupo quando seleciona a rota
    const newPlayerInputRef = useRef<TextInput>(null)


    async function getStoredGroups() {
        try {
            const storedGroups = await GroupsGetAll();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddPlayer() {

        if (newPlayer.trim().length === 0) {
            return Alert.alert('Digite o nome do jogador')
        }

        const newPlayerObject = {
            name: newPlayer,
            team: team
        }


        try {

            await playerAddByGroup(newPlayerObject, group)
            newPlayerInputRef.current?.blur();

            setNewPlayer('');
            getPlayersByTeam();



        } catch (error) {
            if (error instanceof AppError) {
                return Alert.alert('Nova pessoa', error.message)
            }
            console.log(error);
        }

    }

    async function getPlayersByTeam() {
        try {
          
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)
          
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
          await playerRemoveByGroup(playerName, group);
    
          getPlayersByTeam()
    
        } catch (error) {
          console.log(error);
    
          Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
        }
      }

      async function groupRemove() {
        try {
          await groupRemoveByName(group);
          navigation.navigate('groups');
    
        } catch (error) {
          console.log(error);
          Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
        }
      }
    
      async function handleGroupRemove() {
        Alert.alert(
          'Remover',
          'Deseja remover o grupo?',
          [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemove() }
          ]
        )
      }

    useEffect(() => {
        getPlayersByTeam();
        // getStoredGroups();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <HighLight title={group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome da pessoa"
                      inputRef={newPlayerInputRef}
                    autoCorrect={false}
                    value={newPlayer}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                    onChangeText={text => setNewPlayer(text)} />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
            </Form>


            <HeaderList>
                <FlatList data={['Time A', 'Time B']}
                    keyExtractor={item => item}

                    renderItem={({ item }) =>

                        <Filter title={item}
                            active={item === team}
                            onPress={() => setTeam(item)}
                        />


                    } horizontal />
                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>

            </HeaderList>


            {isLoading? <Loading/> : 
            
            <FlatList 
            data={players} 
            keyExtractor={item => item.name} 
            renderItem={({ item }) => <PlayerCard name={item.name} 
            onRemove={() => handlePlayerRemove(item.name)}
            />}
                ListEmptyComponent={<ListEmpty message="Nenhum jogador cadastrado" />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />}
            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />

        </Container>
    )
}