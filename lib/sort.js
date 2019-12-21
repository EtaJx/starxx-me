const sort = (arr, type) => { // 快速排序
  if (arr.length <= 1) {
    return arr
  }
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  let left = [], right = []
  const pivotTime = type == 'list' ? new Date(pivot.date) : new Date(pivot.header.date)
  for (const item of arr) {
    const time = type == 'list' ? new Date(item.date) : new Date(item.header.date)
    time < pivotTime ? left.push(item) : right.push(item)
  }
  return sort(left, type).concat([pivot], sort(right, type))
}

module.exports = sort
