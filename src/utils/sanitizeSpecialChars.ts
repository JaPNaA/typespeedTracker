const replacements: { [x: string]: string } = {
    "\u201c": '"',
    "\u201d": '"',
    "\u2018": "'",
    "\u2019": "'" // hey, that's this year!
};

export default function sanitizeSpecialChars(text: string) {
    return replacements[text] || text;
};