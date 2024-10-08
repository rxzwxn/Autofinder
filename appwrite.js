import { Account, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '66fbb9ed00383fbac58f',
  databaseId: '66fc2233001c6bc47203',
  collectionId:'66fc2243001467b1c87a'
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId); 

export const account = new Account(client);
export const databases = new Databases(client);

export async function updatecars(data) {
  try {
    const response = await databases.createDocument(
      config.databaseId,
      '66fc2243001467b1c87a',
      ID.unique(),
      data
    );
    console.log('Car document created:', response);
  } catch (error) {
    console.error('Error creating car document:', JSON.stringify(error, null, 2));
  }
}
// Function to fetch car listings
export const fetchCars = async () => {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.collectionId
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching car documents:', JSON.stringify(error, null, 2));
    throw error; 
  }
};


export async function login() {
  
    const session = await account.createEmailPasswordSession('rizwanexe@duck.com', '12345678');
  
  } 

  


// API Connection Test Function
/*export const testConnection = async () => {
  try {
    // Call the Appwrite health endpoint to check the server status
    const health = await client.call('get', '/health');
    console.log("Appwrite Health Status:", health);
  } catch (error) {
    console.error("Connection Test Failed:", JSON.stringify(error, null, 2));
  }
};*/
