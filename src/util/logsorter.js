export const sorter = (arr, key) => {
  arr.sort((a, b) => (parseInt(a[key]) < parseInt(b[key]) ? 1 : -1));
};

export const generateRealArray = async (arr) => {
  var realArr = [];
  // eslint-disable-next-line no-unused-vars
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

export const nonStackArray = (arr) => {
  var realArr = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].number; j++) {
      if (!arr[i].stackable) {
        realArr[count] = arr[i];
        count++;
      }
    }
  }
  return realArr;
};

export const isStackable = (is_stackable, height) => {
  return is_stackable === 1 && height < 230;
};
