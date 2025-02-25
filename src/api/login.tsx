import axios from 'axios';

const GetUser = async (e_mail: string, password: string) => {
  try {
    const API_URL = `http://localhost:8080/login`;

    const response = await axios.post(API_URL, {
      userEmail: e_mail,        // Use function argument for email
      userPassword: password,   // Use function argument for password
    }, {
      headers: {
        'Content-Type': 'application/json', // Set header for JSON
      },
    });

    console.log('User Data From DB:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error validating user:', error.response?.data || error.message);
    return null;
  }
};




export default GetUser;
