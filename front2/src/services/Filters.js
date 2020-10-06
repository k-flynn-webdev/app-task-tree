
const ITEM_DATE = {
  name: 'itemDate',
  filter: function (item, day=true, month=true, year=true) {
    if (!item) return ''
    if (!item.created_at) return ''

    let result = []

    const newDate = new Date(item.created_at)
    const Day = newDate.getDate()
    const Month = newDate.getMonth()
    const Year = newDate.getFullYear()

    if (day) { result.push(Day) }
    if (month) { result.push(Month + 1) }
    if (year) { result.push(Year) }

    return result.join('/')
  }
}

const ALL_FILTERS = [
  ITEM_DATE
]

export default (Vue) => {
  ALL_FILTERS.forEach(item => Vue.filter(item.name, item.filter))
}
