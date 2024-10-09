import React from "react"
import Application from "./application.module.scss"
import Progress from "./progress.module.scss"
import SeatStyles from "./seat.module.scss"
import Seat from "./seat"
import Ailse from "./ailse"
import PlaneBG from "./plane.svg"
class FlightBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seat: 'Please select' };
    this.seatRefs = {}; // To store refs to the seats
    this.emojiRef = React.createRef(); // Ref to the emoji
    this.seatContainerRef = React.createRef(); // Ref to the seat container

    // Add this line:
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

  componentDidMount() {
    // Set the initial position of the emoji to the first seat
    this.moveEmojiToSeat('A1');
  }

  render() {
    const isNotSelected = this.state.seat === 'Please select'
    return (
      <div className={Application.container}>
        <div className={Application.logo}/>
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
                <td>Mr. Brett Jones</td>
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
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A1"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['A1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['A2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['A3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['A4'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['A5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="A6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['A6'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['B1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B2"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['B2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B3"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['B3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['B4'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['B5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="B6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['B6'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['C1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C2"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['C2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['C3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['C4'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['C5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="C6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['C6'] = ref)} // Add ref
                />
              </div>
              <div className={SeatStyles.economy}>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D2"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D4"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D6"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D7"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="D8"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['D8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['E1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['E2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E3"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['E3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E4"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['E4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E5"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['E5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['E6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E7"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['E7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="E8"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['E8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F1"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['F1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['F2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['F3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['F4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['F5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['F6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F7"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['F7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="F8"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['F8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G1"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G3"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['G5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G7"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="G8"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['G8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['H1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['H2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H3"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['H3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H4"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['H4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['H5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H6"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['H6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H7"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['H7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="H8"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['H8'] = ref)} // Add ref
                />
              </div>
              <div className={SeatStyles.economy}>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['I1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I2"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['I2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['I3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['I4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I5"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['I5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['I6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I7"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['I7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="I8"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['I8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J1"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['J1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['J2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J3"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['J3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J4"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['J4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J5"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['J5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="J6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['J6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K7"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K8"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K8'] = ref)} // Add ref
                />
                {/* wrap */}
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K1"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['K1'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K2"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K2'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K3"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K3'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K4"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['K4'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K5"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K5'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K6"
                  available={true}
                  forwardedRef={(ref) => (this.seatRefs['K6'] = ref)} // Add ref
                />
                <Ailse/>
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K7"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['K7'] = ref)} // Add ref
                />
                <Seat
                  setSeat={this.setSeat}
                  currentSeat={this.state.seat}
                  seat="K8"
                  available={false}
                  forwardedRef={(ref) => (this.seatRefs['K8'] = ref)} // Add ref
                />
              </div>
            </div>
            <img src={PlaneBG} alt="Plane" className={Application.plane_bg}/>
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