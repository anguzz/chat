import Pocketbase from 'pocketbase';

export const USERNAME = "santoyox714@gmail.com";
export const PASSWORD = "devTest1234";
export const url='http://127.0.0.1:8090';

export const client = new Pocketbase(url);
export const authData =  await client.admins.authWithPassword(USERNAME, PASSWORD)

