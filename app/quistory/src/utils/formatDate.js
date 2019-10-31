export const get12HouredTime = hour => {
  if (hour > 12) {
    return `오후 ${pad(hour - 12, 2)}`
  }
  return `오전 ${pad(hour, 2)}`
}
export default date => {
  return `${
    date.getFullYear() === new Date().getFullYear()
      ? ''
      : date.getFullYear() + '년'
  } ${date.getMonth() + 1}월 ${date.getDate()}일 ${get12HouredTime(
    date.getHours(),
  )}:${pad(date.getMinutes(), 2)}`
}