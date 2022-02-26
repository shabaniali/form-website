import jalaali from 'jalaali-js'

export const years = []
const currentYear = jalaali.toJalaali(new Date()).jy
for (let y = currentYear; y >= 1300; y--) {
  const year = y
  years.push({ value: year, label: year })
}

export const month = []
for (let m = 1; m <= 12; m++) {
  month.push({ value: m, label: m })
}

export const day = []
for (let d = 1; d <= 31; d++) {
  day.push({ value: d, label: d })
}