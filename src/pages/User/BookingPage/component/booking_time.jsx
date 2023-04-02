import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { useState } from 'react';
import moment from 'moment/moment';
import momentTimezone from "moment-timezone";
import { Button, Col, Row } from 'react-bootstrap';
import '../../../../assets/css/user_css/booking_page/booking_time.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, addIdTimeActiver, addTime } from '../../../../redux/booking/booking_page_reducer';
import { selectIdTimeActiver } from '../../../../redux/booking/booking_page_selecter';

const BookTime = () => {
  const dispatch = useDispatch();
  const [date, ] = useState(Date.now());
  const [timeNow, ] = useState(moment(new Date(date)).format('HH:mm'));
  const [datePicker, setDatePicker] = useState(moment(new Date(date)).format('YYYY-MM-DD'));
  const timeList = [
    {
      id:1,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 8, minute: 0 })
      )
    },
    {
      id:2,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 9, minute: 0 })
      )
    },
    {
      id:3,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 10, minute: 0 })
      )
    },
    {
      id:4,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 11, minute: 0 })
      )
    },
    {
      id:5,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 12, minute: 0 })
      )
    },
    {
      id:6,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 13, minute: 0 })
      )
    },
    {
      id:7,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 14, minute: 0 })
      )
    },
    {
      id:8,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 15, minute: 0 })
      )
    },
    {
      id:9,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 16, minute: 0 })
      )
    },
    {
      id:10,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 17, minute: 0 })
      )
    },
    {
      id:11,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 18, minute: 0 })
      )
    },
    {
      id:12,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 19, minute: 0 })
      )
    },
    {
      id:13,
      time: new Date(
        momentTimezone().utc()
          .tz("Asia/Ho_Chi_Minh")
          .set({ hour: 20, minute: 0 })
      )
    },
  ];

  const _handlePikerDate = (e) => {
    setDatePicker(e.format('YYYY-MM-DD').toString())
    dispatch(addDate(e.format('YYYY-MM-DD').toString()))
  }
  const old_id = useSelector(selectIdTimeActiver);
  const _handlePikerTime = (e,id) => {
    
    if(old_id !== 0){
     
      let collapse = document.getElementById('btn-time'+old_id);
      collapse.classList.remove('active');
    }
    dispatch(addIdTimeActiver(id))
    let collapse = document.getElementById('btn-time'+id);
    collapse.classList.add('active');
    dispatch(addTime(e.target.value))

  }

  return (
    <>
      <Row className='booking-time'>
        <Col sm={12} md={12} lg={4} xl={4} className='picker-date'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs(moment(new Date(date)).format('YYYY-MM-DD'))}
              minDate={dayjs(moment(new Date(date)).format('YYYY-MM-DD'))}
              onChange={_handlePikerDate}
            />
          </LocalizationProvider>
        </Col >
        <Col sm={12} md={12} lg={5} className='picker-time'>
          <Row >
            {timeList.map((index) => (
              <Col xs={4} sm={3} md={2}  key={index.id}>
                {timeNow >= moment(new Date(index.time.getTime())).format('HH:mm') && datePicker ===  moment(new Date(date)).format('YYYY-MM-DD')?
                  <Button variant="outline-secondary btn-time-disavled" disabled>{moment(new Date(index.time.getTime())).format('HH:mm')}</Button>
                  :
                  <Button variant="outline-primary btn-time" id={"btn-time"+index.id} value={moment(new Date(index.time.getTime())).format('HH:mm')} onClick={e=>_handlePikerTime(e,index.id)} >{moment(new Date(index.time.getTime())).format('HH:mm')}</Button>
                }
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default BookTime