// mLab Azure MongoDB Cluster connection string
// const username = '';
// const password = '';
// const clusterName = '';
// const database = '';
// exports.dbUrl = `mongodb+srv://${username}:${password}@${clusterName}.twitk.mongodb.net/${database}?retryWrites=true&w=majority`;

// Azure Cosmos DB connection string
const appName = '';
const username = '';
const password = '';
const port = 10255;
const host = '';
const database = '';
exports.dbUrl = `mongodb://${username}:${password}@${host}:${port}/${database}?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${appName}@`;