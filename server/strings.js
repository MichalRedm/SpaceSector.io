class Strings {
    static random(length, symbols) {
        const defaultSymbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ";
        length = (length !== undefined) ? length : 1;
        symbols = (symbols !== undefined) ? symbols : defaultSymbols;
        var randomString = "";
        for (var i = 0; i < length; i++) {
            randomString += symbols[Math.floor(Math.random() * symbols.length)];
        }
        return randomString;
    }
}

module.exports = Strings;