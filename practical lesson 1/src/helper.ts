export function generateNumberBetweenExclusive(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

export function generateNumberBetweenInclusive(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}

export function generateRandomString(length: number): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=,.<>[]{}";
    let result = "";

    for (let i = 0; i < length; ++i) {
        result += alphabet[generateNumberBetweenExclusive(0, alphabet.length)];
    }

    return result;
}