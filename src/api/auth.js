import axios from 'axios';

export default axios.create({
    baseURL: 'https://8e2a-2a01-cb05-2af-fc00-68d6-49d9-74f0-a73a.ngrok.io',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});