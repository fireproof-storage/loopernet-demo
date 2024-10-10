import React from "react"
import PropTypes from "prop-types"
import SeatStyle from "./seat.module.scss"

class Seat extends React.Component {
  handleClick = () => {
    const { available, setSeat, seat } = this.props;
    if (available) {
      setSeat(seat);
    }
  };

  render() {
    const { seat, available, currentSeat, forwardedRef, mostExpensiveItem } = this.props;
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
        {/* {mostExpensiveItem || ""} */}
      </button>
    ) : (
      <div>
        <div style={{ fontSize: '36px', position: 'absolute', zIndex: 100, marginLeft: '5px', marginTop: '1px', textAlign: 'center', width: '20px' }}>
          {mostExpensiveItem || ""}
        </div>
        <div
          title={`Seat ${seat} is unavailable`}
          className={`${SeatStyle.button} ${SeatStyle.button_unavailable}`}
        >
        </div>
      </div>
    );
  }
}

Seat.propTypes = {
  available: PropTypes.bool.isRequired,
  setSeat: PropTypes.func.isRequired,
  seat: PropTypes.string.isRequired,
  currentSeat: PropTypes.string.isRequired,
  forwardedRef: PropTypes.object,
  mostExpensiveItem: PropTypes.string,
};
export default Seat
