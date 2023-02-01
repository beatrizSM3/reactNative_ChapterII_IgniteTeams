import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError'

import { player_collection} from '../StorageConfig'
import {playerGetByGroup} from './PlayerGetByGroup'

import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers =  await playerGetByGroup(group);
    const playerAlreadyExists = storedPlayers.some(player => player.name === newPlayer.name);
    if (playerAlreadyExists) {
        throw new AppError('Já existe um jogador cadastrado com esse nome.')
    }
    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(`${player_collection}-${group}`, storage)
  } catch (error) {
    throw error;
  }
}