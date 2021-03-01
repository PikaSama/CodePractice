var str = "APHASIAC soul";
function cipher(str, offset) {
    var parsedOffset = ~~offset;
    var encryptedStr = [''];
    for (var i = 0; i < str.length; i += 1) {
        var code = str.charCodeAt(i);
        switch (true) {
            case code >= 97 && code <= 122: {
                if (code >= (123 - parsedOffset)) {
                    encryptedStr.push(String.fromCharCode(code - (26 - parsedOffset)));
                }
                else {
                    encryptedStr.push(String.fromCharCode(code + parsedOffset));
                }
                break;
            }
            case code >= 65 && code <= 90: {
                if (code >= (91 - parsedOffset)) {
                    encryptedStr.push(String.fromCharCode(code - (26 - parsedOffset)));
                }
                else {
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
