const str = "APHASIAC soul";
function cipher(str: string, offset: number): string {
    const parsedOffset = ~~offset;
    const encryptedStr = [''];
    for (let i = 0;i < str.length;i += 1) {
        const code = str.charCodeAt(i);
        switch (true) {
            case code >= 97 && code <= 122: {
                if (code >= (123 - parsedOffset)) {
                    encryptedStr.push(String.fromCharCode(code - (26 - parsedOffset)));
                } else {
                    encryptedStr.push(String.fromCharCode(code + parsedOffset));
                }
                break;
            }
            case code >= 65 && code <= 90: {
                if (code >= (91 - parsedOffset)) {
                    encryptedStr.push(String.fromCharCode(code - (26 - parsedOffset)));
                } else {
                    encryptedStr.push(String.fromCharCode(code + parsedOffset));
                }
                break;
            }
            default: {
                encryptedStr.push(String.fromCharCode(code));
                break;
            }
        }
    }
    return encryptedStr.join('');
}
console.log(cipher(str, 2));