import React, { useState, useEffect, useRef, useCallback } from "react";
import Application from "./application.module.scss";
import Progress from "./progress.module.scss";
import SeatStyles from "./seat.module.scss";
import Seat from "./seat";
import Ailse from "./ailse";
import PlaneBG from "./plane.svg";
import { passengerData, makeRandomOrder } from "./data";
import { useFireproof } from "use-fireproof"

const FlightBooking = () => {
  const [currentSeat, setSeat] = useState('Please select');
  const seatRefs = useRef({});
  const emojiRef = useRef(null);
  const seatContainerRef = useRef(null);

  const { database, useLiveQuery } = useFireproof("flight-db");


  const orders = useLiveQuery('seat');

  const businessClassSeats = new Set([
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
  ]);

  const moveEmojiToSeat = useCallback((seatId) => {
    const seatElement = seatRefs.current[seatId];
    if (seatElement && emojiRef.current && seatContainerRef.current) {
      const seatRect = seatElement.getBoundingClientRect();
      const containerRect = seatContainerRef.current.getBoundingClientRect();
      const offsetTop = seatRect.top - containerRect.top;

      const isBusinessClass = businessClassSeats.has(seatId);

      const seatNumberMatch = seatId.match(/\d+/);
      const seatNumber = seatNumberMatch ? seatNumberMatch[0] : null;

      let leftPosition;

      if (isBusinessClass) {
        if (['1', '2', '3'].includes(seatNumber)) {
          leftPosition = '19%';
        } else {
          leftPosition = '50%';
        }
      } else {
        if (['1', '2', '3', '4'].includes(seatNumber)) {
          leftPosition = '13%';
        } else {
          leftPosition = '56%';
        }
      }

      emojiRef.current.style.top = `${offsetTop}px`;
      emojiRef.current.style.left = leftPosition;
    }
  });

  useEffect(() => {
    moveEmojiToSeat('A1');

    const intervalId = setInterval(() => {
      const randomOrder = makeRandomOrder();
      database.put(randomOrder);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    moveEmojiToSeat(currentSeat);
  }, [currentSeat, moveEmojiToSeat]);

  const currentPassenger = passengerData.find(passenger => passenger.seat === currentSeat)?.name || 'Please select';
  const isNotSelected = currentPassenger === 'Please select';

  console.log(currentSeat, currentPassenger);


  return (
    <div className={Application.container}>
      <div className={Application.logo} />
      <div className={Application.progress}>
        <ol className={Progress.steps}>
          <li className={Progress.complete}>
            <div className={Progress.label}>Choose Dates</div>
          </li>
          <li className={Progress.complete}>
            <div className={Progress.label}>Passenger Details</div>
          </li>
          <li className={Progress.current}>
            <div className={Progress.label}>Seat selection</div>
          </li>
          <li>
            <div className={Progress.label}>Payment confirmation</div>
          </li>
          <li>
            <div className={Progress.label}>Booking confirmation</div>
          </li>
        </ol>
      </div>
      <div className={Application.main}>
        <h1>Seat selection</h1>
        <table className={Application.table} cellSpacing="0">
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentPassenger}</td>
              <td>{currentSeat}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={Application.footer}>
        <div className={Application.summary}>
          <h3>Selected seat:</h3>
          {isNotSelected ? (
            <p>&nbsp;</p>
          ) : (
            <p>{currentSeat}</p>
          )}
        </div>
        <button disabled={isNotSelected}>Continue</button>
      </div>
      <div className={Application.seatpicker}>
        <div
          className={Application.plane}
          ref={seatContainerRef}
          style={{ position: 'relative' }}
        >
          <div className={SeatStyles.container}>
            <div className={SeatStyles.business}>
              {["A1", "A2", "a", "A3", "A4", "a", "A5", "A6", "B1", "B2", "a", "B3", "B4", "a", "B5", "B6", "C1", "C2", "a", "C3", "C4", "a", "C5", "C6"].map((seat, index) => {
                if (seat === "a") {
                  return <Ailse key={index} />;
                } else {
                  const available = orders.docs.some(order => order.seat === seat);
                  return (
                    <Seat
                      key={seat}
                      setSeat={setSeat}
                      currentSeat={currentSeat}
                      seat={seat}
                      available={available}
                      forwardedRef={(ref) => (seatRefs.current[seat] = ref)}
                    />
                  );
                }
              })}
            </div>
            <div className={SeatStyles.economy}>
              {["D1", "D2", "a", "D3", "D4", "D5", "D6", "a", "D7", "D8", "E1", "E2", "a", "E3", "E4", "E5", "E6", "a", "E7", "E8", "F1", "F2", "a", "F3", "F4", "F5", "F6", "a", "F7", "F8", "G1", "G2", "a", "G3", "G4", "G5", "G6", "a", "G7", "G8", "H1", "H2", "a", "H3", "H4", "H5", "H6", "a", "H7", "H8"].map((seat, index) => {
                if (seat === "a") {
                  return <Ailse key={index} />;
                } else {
                  const available = orders.docs.some(order => order.seat === seat);
                  return (
                    <Seat
                      key={seat}
                      setSeat={setSeat}
                      currentSeat={currentSeat}
                      seat={seat}
                      available={available}
                      forwardedRef={(ref) => (seatRefs.current[seat] = ref)}
                    />
                  );
                }
              })}
            </div>
            <div className={SeatStyles.economy}>
              {["I1", "I2", "a", "I3", "I4", "I5", "I6", "a", "I7", "I8", "J1", "J2", "a", "J3", "J4", "J5", "J6", "a", "J7", "J8", "K1", "K2", "a", "K3", "K4", "K5", "K6", "a", "K7", "K8"].map((seat, index) => {
                if (seat === "a") {
                  return <Ailse key={index} />;
                } else {
                  const available = orders.docs.some(order => order.seat === seat);
                  return (
                    <Seat
                      key={seat}
                      setSeat={setSeat}
                      currentSeat={currentSeat}
                      seat={seat}
                      available={available}
                      forwardedRef={(ref) => (seatRefs.current[seat] = ref)}
                    />
                  );
                }
              })}
            </div>
          </div>
          <img src={PlaneBG} alt="Plane" className={Application.plane_bg} />
          <div
            ref={emojiRef}
            style={{
              position: 'absolute',
              top: '0px',
              left: '56%',
              transform: 'translateX(80%)',
              zIndex: '1000',
              fontSize: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
            }}
          >
            🧑‍✈️
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;