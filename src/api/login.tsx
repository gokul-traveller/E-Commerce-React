import axios from 'axios';

const GetUser = async (e_mail: string) => {
  try {
    const response = await axios.post(`http://localhost:8080/getUser/${e_mail}`);
    console.log('User Data From DB:', response.data);
    console.log('User Data From DB Email:', response.data.userEmail);
    console.log('User Data From DB Password: ', response.data.userPassword);
    return response.data; 
  } catch (error) {
    console.error('Error validating user:', error);
    return null; 
  }
};

export default GetUser;
