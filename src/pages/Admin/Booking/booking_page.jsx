import * as React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Year,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { L10n, Internationalization } from "@syncfusion/ej2-base";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DataManager } from "@syncfusion/ej2-data";
import moment from "moment-timezone";
import "moment/min/locales";
import { useDispatch, useSelector } from "react-redux";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Lưu",
      cancelButton: "Đóng",
      deleteButton: "Xóa",
      newEvent: "THÊM SỰ KIỆN",
      editEvent: "CHỈNH SỬA SỰ KIỆN",
      save: "Thêm",
      moreDetails: "Chi tiết",
      addTitle: "Số điện thoại khách ",
      title: "Số điện thoại khách ",
      today: "Hôm nay",
      day: "Ngày",
      week: "Tuần",
      month: "Tháng",
      year: "Năm",
      start: "Thời gian bắt đầu",
      end: "Thời gian kết thúc",
    },
  },
});

const BookingPage = () => {
  const dispatch = useDispatch();
  let scheduleObj;
  const date = moment.tz(new Date(), "Asia/Ho_Chi_Minh").format("LLLL");
  const instance = new Internationalization();

  function getTimeString(value) {
    return instance.formatDate(value, { skeleton: "hm" });
  }

  function eventTemplate(props) {
    return (
      <div
        style={{
          paddingleft: 10,
          fontSize: 15,
          height: 500,
          width: 1100,
          background:
            props.orSerStatus === "Đang tiến hành"
              ? "#facc15"
              : props.orSerStatus === "Đã hoàn thành"
              ? "#10b981"
              : "#ef4444",
        }}
      >
        <div className="subject">SĐT: {props.orSerPhoneNo}</div>
        <div className="time">
          {getTimeString(props.orSerStartTime)} -{" "}
          {getTimeString(props.orSerEndTime)}
        </div>
      </div>
    );
  }
  function onPopupOpen(args) {
    if (args.type === "Editor") {
      if (!args.data.Guid) {
        args.cancel = true;
      } else {
        args.cancel = true;
        // (args.data) là dữ liệu của orderSer mà e click , e setOpenModal khúc này r fetch orderSerDetail để hiện lên trong model
      }
    }
  }
  const token1 = localStorage.getItem("token");
  const token2 = sessionStorage.getItem("token");
  console.log(token1)
  const onPopupClose = (args) => {};
  let dataManagerOrder = new DataManager({
    url: "http://localhost:8181/api/OrdersSer",
    headers: [
      {
        Authorization: `Bearer ${token1 === null?token2:token1}`,
      },
    ],
  });
  return (
    <div>
      <ScheduleComponent
        width="100%"
        height="800px"
        readOnly={true}
        ref={(schedule) => (scheduleObj = schedule)}
        currentView="Month"
        selectedDate={new Date(date)}
        showQuickInfo={false}
        popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        eventSettings={{
          dataSource: dataManagerOrder,
          template: eventTemplate,
          fields: {
            id: { name: "orSerId" },
            subject: {
              name: "orSerPhoneNo",
            },
            startTime: {
              name: "orSerStartTime",
              validation: { required: true },
            },
            endTime: { name: "orSerEndTime", validation: { required: true } },
          },
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="8:00" endHour="21:00" />
          <ViewDirective option="Week" startHour="8:00" endHour="21:00" />
          <ViewDirective option="Month" />
          <ViewDirective option="Year" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Year]} />
      </ScheduleComponent>
    </div>
  );
};
export default BookingPage;
