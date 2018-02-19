/**
 * Created by merlin.ho on 2017. 6. 24..
 */
var Conference = Conference || {};


Conference.transportScheduler = function(auditService , transportCompanyFactory){
  'use strict';

  if(!auditService){
    throw new Error(Conference.transportScheduler.messages.noAuditService);
  }

  if (!transportCompanyFactory) {
    throw new Error(Conference.transportScheduler.messages.noCompanyFactory);
  }

  return {
    scheduleTransportation : function scheduleTransportation(transportDetails) {
      if (!transportDetails) {
        throw new Error(Conference.transportScheduler.messages.noDetails);
      }
      var company;

      company = transportCompanyFactory.create(transportDetails);

      return company.schedulePickup(transportDetails).
        then(function successful(confirmation){
          auditService.logReservation(transportDetails,confirmation);
          return confirmation;
      });
    }
  };
};

Conference.transportScheduler.messages = {
  noAuditService: "집계 서비스 인스턴스는 필수입니다.",
  noCompanyFactory: "운송회사 팩토리 인스턴스는 필수입니다.",
  noDetails: "transportDetails 인스턴스는 필수입니다."
};

// 전략 패턴 없이 코딩했을때와 달리 transportScheduler의
// 할일은 다음 세가지로 압축된다..

// 1. 주입한 transportCompanyFactory에서 운수회사 모듈을 꺼낸다
// 2. 운수회사 모듈의 schedulePickup 함수를 실행한다
// 3. 성공한 요청을 집계 서비스에 로깅한다