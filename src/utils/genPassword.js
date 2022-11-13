import config from '../configs'

export function generatePassword() {

    var password = "";
    const { gen_password_characters: characters, gen_password_length: length } = config;
    for (let i = 0; i < length; ++i) {
        password += characters[getRandomInt(0, characters.length - 1)];
    }
    return password;
}
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generateId(arr = [], prop) {
    const id = generatePassword();
    const index = arr.findIndex(e => e[prop] === id);
    if (index > -1) {
        generateId(arr, prop);
    }
    return id;
}
export function isBase64(str) {
    if ( typeof(str)!=="string" ||str === '' || str.trim() === '') { return false; }
    try {

        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}