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
    return (
      <div
        ref={forwardedRef} // Attach the ref here
        className={`${SeatStyle.button} ${!available ? SeatStyle.button_unavailable : ''} ${isSelected ? SeatStyle.current : ''}`}
        onClick={this.handleClick}
      >
        {/* {seat} */}
      </div>
    );
  }
}

export default Seat
