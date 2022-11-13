import { secretbox, randomBytes } from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";
import { decode, encode } from "@stablelib/utf8";
import storage from 'services/storage';

export const generateKeys = () => {
  const key = randomBytes(secretbox.keyLength);
  const encodedKey = encodeURLSafe(key);
  return encodedKey;
};

const newNonce = () => randomBytes(secretbox.nonceLength);

const encrypt = (data, key) => {
  const keyUint8Array = decodeURLSafe(key);
  const nonce = newNonce();
  const encodedData = encode(data);
  const box = secretbox(encodedData, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeURLSafe(fullMessage);
  return base64FullMessage;
};

const decrypt = (messageWithNonce, key) => {
  const keyUint8Array = decodeURLSafe(key);

  const messageWithNonceAsUint8Array = decodeURLSafe(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(secretbox.nonceLength, messageWithNonce.length);

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  const base64DecryptedMessage = decode(decrypted);
  return base64DecryptedMessage;
};

const getKeys = () => {
  let sessionToken = storage.getItem("sessionToken");
  if (!!sessionToken) {
    var parts = sessionToken.split("/");
    var token = parts[0];
    const encryptionKey = parts[1];
    return encryptionKey;
  }
};

//what if failed?
export const qsEncrypt = queryString => {
  const isdev = !!storage.getItem("isdev");
  if (isdev) return queryString;

  const encryptionKey = getKeys();
  if (queryString && !!encryptionKey) {
    return encrypt(queryString, encryptionKey);
  } else return undefined;
};
export const qsDecrypt = queryString => {
  const isdev = !!storage.getItem("isdev");
  if (isdev) return queryString;

  if (queryString == undefined || queryString.trim().length == 0) return undefined;
  //remove  ?
  const _queryString = queryString && queryString.substring(1);
  const encryptionKey = getKeys();
  if (_queryString && !!encryptionKey) {
    return decrypt(_queryString, encryptionKey);
  } else return undefined;
};
