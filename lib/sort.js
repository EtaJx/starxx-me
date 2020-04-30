const sort = arr => { // 快速排序
  if (arr.length <= 1) {
    return arr
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  let left = [], right = [];
  const pivotTime = new Date(pivot.date).getTime();
  for (const item of arr) {
    const time = new Date(item.date).getTime();
    time < pivotTime ? left.push(item) : right.push(item)
  }
  return sort(left).concat([pivot], sort(right))
};

module.exports = sort;
