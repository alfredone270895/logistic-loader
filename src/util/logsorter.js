export const sorter = (arr, key) => {
  arr.sort((a, b) => (parseInt(a[key]) < parseInt(b[key]) ? 1 : -1));
};

export const generateRealArray = async (arr) => {
  let realArr = [];
  let count = 0;
  arr.map((item) => {
    if (item.stackable === 1) {
      const arr = new Array(parseInt(item.number));
      for (let j = 0; j < parseInt(item.number); j++) {
        arr[j] = Object.assign({}, item);
        count++;
      }
      realArr = [...realArr, ...arr];
    }
  });
  return realArr;
};

export const isStackable = (is_stackable, height) => {
  return is_stackable === 1 && height < 230;
};
