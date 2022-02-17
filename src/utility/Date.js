import jalaali from 'jalaali-js'

export const years = []
const currentYear = jalaali.toJalaali(new Date()).jy
for (let y = 120; y >= 0; y--) {
    const year = currentYear - y
    years.push({value: year, label: year})
}

export const month = [
    { value: '1', label: 'فروردین' },
    { value: '2', label: 'اردیبهشت' },
    { value: '3', label: 'خرداد' },
    { value: '4', label: 'تیر' },
    { value: '5', label: 'مرداد' },
    { value: '6', label: 'شهریور' },
    { value: '7', label: 'مهر' },
    { value: '8', label: 'آبان' },
    { value: '9', label: 'آذر' },
    { value: '10', label: 'دی' },
    { value: '11', label: 'بهمن' },
    { value: '12', label: 'اسفند' }
]

export const day = []
for (let d = 1; d <= 31; d++) {
    day.push({value: d, label: d})
}