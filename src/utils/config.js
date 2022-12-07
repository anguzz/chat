import Pocketbase from 'pocketbase';

export const url='https://angus.pockethost.io/';
export const client = new Pocketbase(url);

//the following is for local testing
//uncomment below and use npm local to start local pocketbase exe 
//use same username/pw below at  http://127.0.0.1:8090/_/ 
/*

export const USERNAME = "email@email.com";
export const PASSWORD = "devTest1234";
export const url='http://127.0.0.1:8090';
export const authData =  await client.admins.authWithPassword(USERNAME, PASSWORD)
*/


