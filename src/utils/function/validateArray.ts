export const validateArray = (arr1: string[], arr2: string[]) => {
  //   const set = new Set(arr2);
  //   return arr1.every((element) => set.has(element));
  if (arr1.length === arr2.length) {
    return true;
  } else {
    return false;
  }
};
