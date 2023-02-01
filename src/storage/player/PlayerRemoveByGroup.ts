import AsyncStorage from '@react-native-async-storage/async-storage';

import { player_collection } from '@storage/StorageConfig';
import { playerGetByGroup } from './PlayerGetByGroup';


export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
      const storage = await playerGetByGroup (group);
  
      const filtered = storage.filter(player => player.name !== playerName);
  
      const players = JSON.stringify(filtered);
  
      await AsyncStorage.setItem(`${player_collection}-${group}`, players);
  
    } catch (error) {
      throw error;
    }
  }