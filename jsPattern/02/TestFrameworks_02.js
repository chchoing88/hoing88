/**
 * Created by merlin.ho on 2017. 5. 5..
 */
function createReservation(passenger, flight,saver){
  var reservation ={
    passengerInformation: passenger,
    flightInformation: flight
  };

  saver.saveReservation(reservation);

  return reservation;
}

function ReservationSaver() {
  this.saveReservation = function(reservation){

  };
}