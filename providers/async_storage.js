import {AsyncStorage} from 'react-native';

export class AsyncStorageProvider {
    constructor() {
    }

    async setData(key, val) {
        try {
          await AsyncStorage.setItem(key, val).then(() => alert("data saved!"));
        } catch (error) {
          console.log("setData -> error", error);
          
        }
    }
    
    async getData(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log("getData -> error", error);
        }
    }
    
    async getAllKeys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.log("getAllKeys -> error", error);
        }
    }
    
    async removeData(key) {
        try {
            await AsyncStorage.removeItem(key).then(() => alert("data removed!"));
        } catch (error) {
            console.log("removeData -> error", error);
        }
    }
    
    async clearData() {
        try {
            await AsyncStorage.clear().then(() => alert("all data cleared!"));
        } catch (error) {
            console.log("clearData -> error", error);
        }
    }
}


