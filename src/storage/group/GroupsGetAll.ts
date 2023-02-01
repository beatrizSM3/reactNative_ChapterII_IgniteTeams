import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { group_collection } from "@storage/StorageConfig";


export async function GroupsGetAll(): Promise<string[]>{
    try{
        const groupsStorage = await AsyncStorage.getItem(group_collection);
        const groups : string[] = groupsStorage ? JSON.parse(groupsStorage) : [];
        return groups;
    } catch(error) {
        throw error;
    }
}