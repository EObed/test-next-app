import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

interface Prop {
  startDate: string
}

const DatePickerComp:React.FC<Prop> = (props) => {
  const { startDate } = props;

  return (
    <div>  <DatePicker defaultValue={startDate ? moment(startDate, 'YYYY-MM-DD') : undefined}/></div>
  )
}

export default DatePickerComp