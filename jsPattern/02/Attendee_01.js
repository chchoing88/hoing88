/**
 * Created by merlin.ho on 2017. 5. 5..
 */

Attendee = function(service , messenger, attendeeId){

  if(!(this instanceof Attendee)){
    return new Attendee(attendeeId);
  }

  this.attendedId = attendeeId;
  //this.service = new ConferenceWebSvc();
  //this.messenger = new Messenger();
  this.service = service;
  this.messenger = messenger;
};

//주어진 세션에 좌석 예약을 지도한다.
// 성공/실패 여부를 메시지로 알려준다.

Attendee.prototype.reserve = function(sessionId){
  if(this.service.reserve(this.attendedId,sessionId)){
    this.messenger.success('좌석 예약이 완료되었습니다' + ' 고객님은 ' + this.service.getRemainingReservations() + ' 좌석을 추가 예약하실 수 있습니다.');

  }else {
    this.messenger.failure('죄송합니다 , 해당 좌석은 예약하실 수 없습니다.')
  }
};
