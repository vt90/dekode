//NOTE :https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
export default function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
