const createDate = (item, field) => {
  const newDate = new Date(item[field])
  const Day = newDate.getDate()
  const Month = newDate.getMonth() + 1
  const Year = newDate.getFullYear()

  return [Day, Month, Year ]
}

const ITEM_LOGIN = {
  name: 'itemLogin',
  filter: function (item, day=true, month=true, year=true) {
    if (!item) return ''
    if (!item.login_at) return ''

    let result = []

    const dateArr = createDate(item, 'login_at')

    if (day) { result.push(dateArr[0]) }
    if (month) { result.push(dateArr[1]) }
    if (year) { result.push(dateArr[2]) }

    return result.join('/')
  }
}

const ITEM_UPDATE = {
  name: 'itemUpdate',
  filter: function (item, day=true, month=true, year=true) {
    if (!item) return ''
    if (!item.updated_at) return ''

    let result = []

    const dateArr = createDate(item, 'updated_at')

    if (day) { result.push(dateArr[0]) }
    if (month) { result.push(dateArr[1]) }
    if (year) { result.push(dateArr[2]) }

    return result.join('/')
  }
}

const ITEM_DATE = {
  name: 'itemDate',
  filter: function (item, day=true, month=true, year=true) {
    if (!item) return ''
    if (!item.created_at) return ''

    let result = []

    const dateArr = createDate(item, 'created_at')

    if (day) { result.push(dateArr[0]) }
    if (month) { result.push(dateArr[1]) }
    if (year) { result.push(dateArr[2]) }

    return result.join('/')
  }
}

const ALL_FILTERS = [
  ITEM_LOGIN,
  ITEM_DATE,
  ITEM_UPDATE
]

export default (Vue) => {
  ALL_FILTERS.forEach(item => Vue.filter(item.name, item.filter))
}
