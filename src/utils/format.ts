import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export default function formatUtc(time: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs.utc(time).format(format)
}
