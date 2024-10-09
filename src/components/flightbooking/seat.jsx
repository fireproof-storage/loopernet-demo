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
    const isCurrent = currentSeat === seat;
    const availableButtonClasses = isCurrent
      ? `${SeatStyle.button} ${SeatStyle.current}`
      : `${SeatStyle.button}`;

    return available ? (
      <button
        ref={forwardedRef} // Attach the ref here
        className={availableButtonClasses}
        onClick={this.handleClick}
      >
        {/* {seat} */}
      </button>
    ) : (
      <div
        title={`Seat ${seat} is unavailable`}
        className={`${SeatStyle.button} ${SeatStyle.button_unavailable}`}
      >
        {/* {seat} */}
      </div>
    );
  }
}

export default Seat
