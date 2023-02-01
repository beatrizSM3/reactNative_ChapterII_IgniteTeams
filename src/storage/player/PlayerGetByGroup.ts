import AsyncStorage from '@react-native-async-storage/async-storage';
import { player_collection} from '../StorageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerGetByGroup(group: string) : Promise< PlayerStorageDTO[]> {
  try {
    const storage = await AsyncStorage.getItem(`${player_collection}-${group}`)
    const playersByGroup: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
    return playersByGroup;
  } catch (error) {
    throw error;
  }
}