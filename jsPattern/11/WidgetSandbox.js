/**
 * Created by merlin.ho on 2017. 6. 13..
 */

/**
 * 11장. 샌드박스 테스트
 * 이 패턴은 자바스크립트 이름공간의 단점을 해결하는 방안. 
 * 단일 전역 변수에 지나치게 의존하지 않고 점으로 길게 연결된 이름을 가진 타입이 범람하지 않게 한다.
 * 다른 모듈 및 샌드박스에 전혀 영향을 주지 않고 어떤 모듈을 '실행할 수 있는' 독자적 환경을 구축한다는 점
 */


/**
 * 지금까지 구축했던것.
 * 자원봉사자가 참가자를 체크인하고, 참가자는 행사장 근처의 음식점 정보를 찾을 수 있게 되었다.
 * 여기서 추가로 대시보드가 있었음녀 좋겠다고 담당자가 이야기한다.
 * 
 * 대시보드 특성 측면상 대시보드는 보통 담당자 별로 보고 싶어하는 타입으로 커스터마이징을 할수 있어야 한다.
 * 예를 들면 어떤 사람은 a,b 만을  어떤 사람은 a,c 만을 보고 싶어할 수도 있다.
 * 각 위젯마다의 의존성은 없어야 겠다.
 * 음... 확장 가능한 해결책을 찾아보자. 우선 이런 위젯들을 서로 떼어놓을수 있다면 테스트와 구성 요소간 결합도가 낮아진다.
 * 이에 해결책은 각각 위젯을 자신의 샌드박스에 가둬두자..
 * 
 * 일단 샌드박스에선 첫번째 인자를 위젯 함수로 보고 ...
 */

/**
 * 샌드박스의 목표는 한 대시보드에서 위젯 간 결합도를 낮추고 떼어놓는 일이다.
 * 샌드박스 역시 위젯이 주변 환경과 소통할 수 있게끔 도구세트가 필요하다.
 * 하지만 도구세트는 어떤 위젯에서 어떤 도구가 필요한지 알고 있으면 되므로 도구세트는 고정하진 말자.
 * 
 * 그렇다면 이 도구세트는 어디서 정의하고 도구를 어떻게 샌드박스 인스턴스에 추가할 것인가. 그리고 위젯이 사용가능한 도구를 어떻게 지정할까..
 * 위젯 과 도구세트
 * 
 * 쉽게 생각해봤을때 위젯에 도구세트를 삽입하는 방법이 있겠다. 단점이 있을까? 
 * WidgetSandbox ( A , tool1, tool2, tool3) , A 라는 위젯엔 tool1, tool2, tool3 이라는 도구를 쓴다.
 * 이 반대로 해도 된다. 제일 마지막에 A를 넣어두 된다.
 * 여기서 도구를 모듈로 제작을 한다면 도구에서는 위젯 인스턴스를 인자로 받아서 받은 인스턴스에 도구 역활을 하는 녀석들을 프로퍼티에 추가한다.
 * 
 * 그럼 샌드박스에선 받은 도구들을 호출하고 마지막으로 위젯을 실행시킨다.
 * 여기서 샌드박스의 역활은 샌드박스를 new로 선언하면서 해당 this안에 도구와 위젯을 가둬두는 것이다.
 * 도구1(this), 도구2(this), ... 도구n(this), 위젯(this)
 * 이렇게 하면 위젯에서는 원하는 도구를 this.도구1 , this.도구2 이런식으로 활용할 수 있겟다.
 * 
 */

/**
 * 샌드박스 패턴은 모듈 간 결합도를 낮추고 의존성을 엄격하게 다스리는 기법
 * 도구를 ( 모듈의 자원과 기능 접근을 제한하기 위한 ) 퍼사드로 사용하면 이점이 있다.
 * 
 * 샌드박스 생성자 함수에 위젯 모듈 함수를 전달한다.
 * 도구는 샌드박스 생성자 함수에 배열 또는 개별 인자 형태로 넘긴다.
 * 샌드박스에서 사용하기로 지정한 도구가 유효하다.
 * 샌드박스 안에서 실행할 위젯이 요청한 도구는 샌드박스가 제공한다.
 */

var Conference = Conference || {};

Conference.WidgetSandbox = function () {
  'use strict';

  // new로 실행했는지 보장한다..
  if (!(this instanceof Conference.WidgetSandbox)) {
    throw new Error(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
  }

  var widgetFunction,
    toolsToLoad = [],
    argsArray;

  // var widgetFunction = arguments[arguments.length -1],
  //   toolsToLoad = [];

  //arguments에서 *진짜* 배열을 추출한다.
  argsArray = Array.prototype.slice.call(arguments);

  //배열 마지막 원소는 widgetFunction일 것이다..
  widgetFunction = argsArray.pop();

  if (typeof widgetFunction !== 'function') {
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  // if(arguments[0] instanceof Array){
  //   toolsToLoad = arguments[0];
  // }

  toolsToLoad = (argsArray[0] instanceof Array) ? argsArray[0] : argsArray;

  toolsToLoad.forEach(function (toolName) {
    if (!Conference.WidgetTools.hasOwnProperty(toolName)) {
      throw new Error(Conference.WidgetSandbox.messages.unknownTool + toolName);
    }

    Conference.WidgetTools[toolName](this);
  }, this); // 콜백 내에서 this가 sandbox 인스턴스를 가리키도록 보장한다..



  widgetFunction(this);


};

// 도구 이름공간을 생성한다..
Conference.WidgetTools = {};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew: 'new로 실행시켜야 합니다',
  fcnMustBeProvided: '함수가 인자로 넘어와야 합니다',
  unknownTool: '알 수 없는 도구입니다.'
};



// var weatherSandbox = new Conference.WidgetSandbox(['toolA','toolB'], Conference.widgets.weatherWidget);
// var weatherSandbox = new Conference.WidgetSandbox('toolA','toolB', Conference.widgets.weatherWidget);