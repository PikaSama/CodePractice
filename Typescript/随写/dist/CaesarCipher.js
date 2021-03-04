const str = "DSKDVLDF VRXO";
function CaesarCipher(action, str, offset) {
    const parsedOffset = ~~offset;
    const strBox = [''];
    const actions = new Map([
        ['encrypt', encrypt],
        ['decrypt', decrypt],
    ]);
    function encrypt(char, nums) {
        const { encrypt: num } = nums;
        // 122 - offset + 1
        // 90 - offset + 1
        if (char >= (num - parsedOffset)) {
            // 97 + (offset - 1) - (122 - code)
            // 65 + (offset - 1) - (90 - code)
            strBox.push(String.fromCharCode(char - 26 + parsedOffset));
        }
        else {
            strBox.push(String.fromCharCode(char + parsedOffset));
        }
    }
    function decrypt(char, nums) {
        const { decrypt: num } = nums;
        // 97 + offset - 1
        // 65 + offset - 1
        if (char <= (num + parsedOffset)) {
            // 122 - (offset - 1) + (char - 97)
            // 90 - (offset - 1) + (char - 65)
            strBox.push(String.fromCharCode(char + 26 - parsedOffset));
        }
        else {
            strBox.push(String.fromCharCode(char - parsedOffset));
        }
    }
    for (const i of str) {
        const code = i.charCodeAt(0);
        const func = actions.get(action);
        switch (true) {
            // Lowercase letter
            case code >= 97 && code <= 122: {
                const list = {
                    encrypt: 123,
                    decrypt: 96,
                };
                func.call(CaesarCipher, code, list);
                break;
            }
            // Uppercase letter
            case code >= 65 && code <= 90: {
                const list = {
                    encrypt: 91,
                    decrypt: 64,
                };
                func.call(CaesarCipher, code, list);
                break;
            }
            // Other symbols
            default: {
                strBox.push(String.fromCharCode(code));
                break;
            }
        }
    }
    return strBox.join('');
}
console.log(CaesarCipher('decrypt', str, 3));
