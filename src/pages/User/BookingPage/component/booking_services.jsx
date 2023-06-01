import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListSer } from "../../../../redux/Service/service_page_selecter";
import { getServices } from "../../../../redux/Service/service_page_thunk";
import "../../../../assets/scss/user_css/booking_page/booking_services.scss";
import { addService, removeService } from "../../../../redux/Booking/booking_page_reducer";
import { selectServices } from "../../../../redux/Booking/booking_page_selecter";
import { Alert } from "react-bootstrap";
const BookingServices = (props) => {
  const dispatch = useDispatch();
  const services = useSelector(selectListSer);
  const servicesInBooking = useSelector(selectServices);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleAddService = (ser) => {
    dispatch(addService(ser));
  };
  const handleRemoveService = (ser) => {
    dispatch(removeService(ser));
  };

  return (
    <div>
      <div className="div_services">
        {services?.map((ser) => (
          <div className="div_service" key={ser.seId}>
            <img
              src={
                process.env.REACT_APP_API_URL + "/image/service/" + ser.seImage
              }
              style={{
                backgroundColor: "#22d3ee",
                color: "white",
                borderRadius: "30px",
                padding: 6,
                cursor: "pointer",
                height: 200,
                width: 200,
              }}
              alt=""
            />
            <p>{ser.seName}</p>
            <b>{ser.sePrice}</b>
            {servicesInBooking?.includes(ser) ? (
              <button
                className="btn-exist-service"
                disabled
              >
                Add service
              </button>
            ) : (
              <button
                className="btn-add-service"
                onClick={() => handleAddService(ser)}
              >
                Add service
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="div_services_booking">
        {servicesInBooking?.map((ser, index) => (
          <div className="div_service_booking" key={index}>
            <b>{ser.seName}</b>
            <button
              className="btn-add-service"
              onClick={() => handleRemoveService(ser)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {props.error ?
        <Alert key={'danger'} variant={'danger'}>
          Please select service!
        </Alert> : null
      }

    </div>
  );
};

export default BookingServices;
