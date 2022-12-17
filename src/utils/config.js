import Pocketbase from 'pocketbase'

// To use with remote pockethost hosting uncomment the following  two lines
// Use 'npm run pockethost'
const url = 'https://angus.pockethost.io/'
export const client = new Pocketbase(url)

// To use with local pocketbase
//use 'npm start' go to http://127.0.0.1:8090/_/ for admin collections view
//use test@email.com and test123456 to login to local admin view
//comment out url above and uncomment the url below

// const local = 'http://127.0.0.1:8090'
// export const client = new Pocketbase(local)
