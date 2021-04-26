import axios from 'axios';
import { baseUrl, issuesEndpoint } from '../config';

export const getIssuesService = async (user) => {

    const url = `${baseUrl}${issuesEndpoint}`;

    const options = {
        headers: {
            accept: 'application/json',
            
        },
    };

    try {
        const response = await axios.get(url, options).then( res => res).catch(error => error);
        return response;
    }
    catch (error) {
        return error;
    }
};

