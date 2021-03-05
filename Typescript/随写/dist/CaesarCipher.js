const str = 'DSKDVLDF VRXO';
function CaesarCipher(str, offset) {
    let parsedOffset = ~~offset;
    const strBox = [''];
    if (parsedOffset >= 0) {
        parsedOffset %= 26;
    }
    else {
        parsedOffset = 26 - (Math.abs(parsedOffset) % 26);
    }
    function moveSym(char, num) {
        // 122 - offset + 1
        // 90 - offset + 1
        if (char >= num - parsedOffset) {
            // 97 + (offset - 1) - (122 - code)
            // 65 + (offset - 1) - (90 - code)
            strBox.push(String.fromCharCode(char - 26 + parsedOffset));
        }
        else {
            strBox.push(String.fromCharCode(char + parsedOffset));
        }
    }
    for (const i of str) {
        const sym = i.charCodeAt(0);
        switch (true) {
            // Lowercase letter
            case sym >= 97 && sym <= 122: {
                moveSym(sym, 123);
                break;
            }
            // Uppercase letter
            case sym >= 65 && sym <= 90: {
                moveSym(sym, 91);
                break;
            }
            // Other symbols
            default: {
                strBox.push(String.fromCharCode(sym));
                break;
            }
        }
    }
    return strBox.join('');
}
console.log(CaesarCipher(str, -3));
