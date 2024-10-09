import React from "react"
import SeatStyle from "./seat.module.scss"

class Seat extends React.Component {
  handleClick = () => {
    const { available, setSeat, seat } = this.props;
    if (available) {
      setSeat(seat);
    }
  };

  render() {
    const { seat, available, currentSeat, forwardedRef } = this.props;
    const isSelected = currentSeat === seat;
      
    const isCurrent = currentSeat === seat
    const availableButtonClasses = isCurrent ? `${SeatStyle.button} ${SeatStyle.current}` : `${SeatStyle.button}`
    return (
      <div
        ref={forwardedRef} // Attach the ref here
        // className={`${SeatStyle.button} ${!available ? SeatStyle.button_unavailable : ''} ${isSelected ? SeatStyle.current : ''}`}
        className={!available ? `${SeatStyle.button} ${SeatStyle.button_unavailable}` : isSelected ? `${SeatStyle.button} ${SeatStyle.current}` : `${SeatStyle.button}`}
        onClick={this.handleClick}
      >
        {/* {seat} */}
      </div>
    );
  }
}

export default Seat
