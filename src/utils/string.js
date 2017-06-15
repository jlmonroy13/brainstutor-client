const getCleanedString = (string) => {
   let str = string;
   str = str.replace(/á/gi,"a");
   str = str.replace(/é/gi,"e");
   str = str.replace(/í/gi,"i");
   str = str.replace(/ó/gi,"o");
   str = str.replace(/ú/gi,"u");
   str = str.replace(/ñ/gi,"n");
   return str;
};

export default getCleanedString;