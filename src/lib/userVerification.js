exports.nickname = function verifyNickname(nickname) {
    if (nickname.length <= 0) {
        throw ('Nickname too short');
    }
    if (!(nickname.length < 20)) {
        throw ('Nickname too long');
    }
}