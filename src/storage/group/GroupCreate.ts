import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { group_collection } from "@storage/StorageConfig";
import { AppError } from "@utils/AppError";
import { GroupsGetAll } from "./GroupsGetAll";


export async function GroupCreate(newGroupName: string){
    try{
        const storedGroups = await  GroupsGetAll()
        const storage = JSON.stringify([...storedGroups, newGroupName]);
        const groupAlreadyExists = storedGroups.includes(newGroupName);

        if(groupAlreadyExists) {
        throw new AppError('Já existe um grupo cadastrado com esse nome.')
        }
        await AsyncStorage.setItem(group_collection, storage);
    } catch(error) {
        throw error;
    }

}