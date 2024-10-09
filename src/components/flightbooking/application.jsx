import React from "react"
import Application from "./application.module.scss"
import Progress from "./progress.module.scss"
import SeatStyles from "./seat.module.scss"
import Seat from "./seat"
import Ailse from "./ailse"
import PlaneBG from "./plane.svg"
class FlightBooking extends React.Component {
  state = { seat: 'Please select' }

  setSeat = new_seat => {
    this.setState(state => ({
      seat: new_seat
    }))
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
          <div className={Application.plane}>
            <div className={SeatStyles.container}>  
              <div className={SeatStyles.business}>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A1" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A4" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="A6" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B2" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B3" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B4" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="B6" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C2" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C4" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="C6" available={true} />
              </div>
              <div className={SeatStyles.economy}>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D2" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D4" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D6" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D7" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="D8" available={false} />

                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E3" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E4" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E5" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E7" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="E8" available={false} />

                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F1" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F4" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F7" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="F8" available={false} />

                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G1" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G3" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G4" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G7" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="G8" available={true} />

                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H3" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H4" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H6" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H7" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="H8" available={true} />
              </div>
              <div className={SeatStyles.economy}>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I2" available={false} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I4" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I5" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I7" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="I8" available={false} />

                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J1" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J3" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J4" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J5" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="J6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K7" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K8" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K1" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K2" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K3" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K4" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K5" available={true} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K6" available={true} />
                <Ailse/>
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K7" available={false} />
                <Seat setSeat={this.setSeat} currentSeat={this.state.seat} seat="K8" available={false} />
              </div>
            </div>
            <img src={PlaneBG} alt="Plane" className={Application.plane_bg}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FlightBooking
