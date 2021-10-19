import authApi from '../api/auth';

export default function useRegister(navigation, setLoading) {
    return async function register(user) {
        setLoading(true);
        try {
            const response = await authApi.post('/register', {
                user: user
            });
            if (response.status == 201 || response.status == 200) {
                navigation.navigate('Verification Code', {
                    userId: response.data.userId,
                    expirationTime: response.data.expirationTime
                });
            }
        } catch (error) {
            setLoading(false);
            redirectScreen(JSON.parse(error.response.request._response).message);
            return ;
        }
    }

    function redirectScreen(errorMessage) {
        console.log(errorMessage)
        if (errorMessage == "phoneNumber") {
            navigation.navigate('Phone Number', {
                error: 'Invalid number'
            })
        }
        if (errorMessage == "name") {
            navigation.navigate('About You', {
                error: 'Bad name'
            })
        }
    }

}