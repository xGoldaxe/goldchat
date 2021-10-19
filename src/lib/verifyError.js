export default function verifyError(nativeErrorTest, error) {
    return function verifyErrorWithState(state) {
        if (error != null && error.hasOwnProperty('value') && error.setError) {
            if (error.test) {
                error.test(state, error);
            } else {
                nativeErrorTest(state, error);
            }
        }
    }
}