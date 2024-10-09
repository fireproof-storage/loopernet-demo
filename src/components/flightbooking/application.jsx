import React from "react"
import Application from "./application.module.scss"
import Progress from "./progress.module.scss"
import SeatStyles from "./seat.module.scss"
import Seat from "./seat"
import Ailse from "./ailse"
import PlaneBG from "./plane.svg"
import { passengerData, makeRandomOrder } from "./data"
class FlightBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seat: 'Please select' };
    this.seatRefs = {}; // To store refs to the seats
    this.emojiRef = React.createRef(); // Ref to the emoji
    this.seatContainerRef = React.createRef(); // Ref to the seat container

    this.businessClassSeats = new Set([
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
      'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
      'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
    ]);
  }

  setSeat = (new_seat) => {
    this.setState({ seat: new_seat }, () => {
      this.moveEmojiToSeat(new_seat);
    });
  };

  componentDidMount() {
    // Set the initial position of the emoji to the first seat
    this.moveEmojiToSeat('A1');

    this.intervalId = setInterval(() => {
      const randomOrder = makeRandomOrder();
      console.log(randomOrder);
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }



  moveEmojiToSeat = (seatId) => {
    const seatElement = this.seatRefs[seatId];
    if (seatElement && this.emojiRef.current && this.seatContainerRef.current) {
      const seatRect = seatElement.getBoundingClientRect();
      const containerRect = this.seatContainerRef.current.getBoundingClientRect();
      const offsetTop = seatRect.top - containerRect.top;

      const isBusinessClass = this.businessClassSeats.has(seatId);

      // Extract the seat number (digits from the seat ID)
      const seatNumberMatch = seatId.match(/\d+/);
      const seatNumber = seatNumberMatch ? seatNumberMatch[0] : null;

      let leftPosition;

      if (isBusinessClass) {
        // For business class seats ending with 1, 2, or 3
        if (['1', '2', '3'].includes(seatNumber)) {
          leftPosition = '19%';
        } else {
          // Default position for other business class seats
          leftPosition = '50%';
        }
      } else {
        // For economy class seats ending with 1, 2, 3, or 4
        if (['1', '2', '3', '4'].includes(seatNumber)) {
          leftPosition = '13%';
        } else {
          // Default position for other economy class seats
          leftPosition = '56%';
        }
      }

      // Apply the styles to the emoji
      this.emojiRef.current.style.top = `${offsetTop}px`; // Move vertically
      this.emojiRef.current.style.left = leftPosition;    // Adjust horizontally
    }
  };

  render() {
    const currentPassenger = passengerData.find(passenger => passenger.seat === this.state.seat)?.name || 'Please select'
    const isNotSelected = this.state.seat === 'Please select'
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
                <td>{this.state.seat}</td>
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
              <p>{this.state.seat}</p>
            )}
          </div>
          <button disabled={isNotSelected}>Continue</button>
        </div>
        <div className={Application.seatpicker}>
          <div
            className={Application.plane}
            ref={this.seatContainerRef}
            style={{ position: 'relative' }} // Make this container relative
          >
            <div className={SeatStyles.container}>
              <div className={SeatStyles.business}>
                {["A1", "A2", "a", "A3", "A4", "a", "A5", "A6", "B1", "B2", "a", "B3", "B4", "a", "B5", "B6", "C1", "C2", "a", "C3", "C4", "a", "C5", "C6"].map((seat, index) => {
                  if (seat === "a") {
                    return <Ailse key={index} />;
                  } else {
                    const available = passengerData.find(p => p.seat === seat)?.name !== null;
                    return (
                      <Seat
                        key={seat}
                        setSeat={this.setSeat}
                        currentSeat={this.state.seat}
                        seat={seat}
                        available={available}
                        forwardedRef={(ref) => (this.seatRefs[seat] = ref)} // Add ref
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
                    const available = passengerData.find(p => p.seat === seat)?.name !== null;
                    return (
                      <Seat
                        key={seat}
                        setSeat={this.setSeat}
                        currentSeat={this.state.seat}
                        seat={seat}
                        available={available}
                        forwardedRef={(ref) => (this.seatRefs[seat] = ref)} // Add ref
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
                    const available = passengerData.find(p => p.seat === seat)?.name !== null;
                    return (
                      <Seat
                        key={seat}
                        setSeat={this.setSeat}
                        currentSeat={this.state.seat}
                        seat={seat}
                        available={available}
                        forwardedRef={(ref) => (this.seatRefs[seat] = ref)} // Add ref
                      />
                    );
                  }
                })}
              </div>
            </div>
            <img src={PlaneBG} alt="Plane" className={Application.plane_bg} />
            {/* Flight Attendant Emoji */}
            <div
              ref={this.emojiRef}
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
                transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out', // Add transition for left
              }}
            >
              🧑‍✈️
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FlightBooking