import axiosClient from './axiosClient';

const login = async (data: Object): Promise<> => {
    return axiosClient.post('auth/login', data);
};

const whoami = async () => {
    return axiosClient.get(`auth/whoami`);
};

const userAPI = {
    login,
    whoami
};

export default userAPI;