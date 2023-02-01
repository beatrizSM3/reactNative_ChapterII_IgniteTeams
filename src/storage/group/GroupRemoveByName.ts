import AsyncStorage from '@react-native-async-storage/async-storage';

import { group_collection, player_collection } from '../StorageConfig';

import {GroupsGetAll } from './GroupsGetAll'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await GroupsGetAll();

    const groups = storedGroups.filter(group => group !== groupDeleted);

    await AsyncStorage.setItem(group_collection, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${player_collection}-${groupDeleted}`);

  } catch (error) {
    throw error;
  }
}