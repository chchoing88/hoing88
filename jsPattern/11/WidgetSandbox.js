/**
 * Created by merlin.ho on 2017. 6. 13..
 */

var Conference = Conference || {};

Conference.WidgetSandbox = function(){
  'use strict';

  // new로 실행했는지 보장한다..
  if(!(this instanceof Conference.WidgetSandbox)){
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

  if(typeof widgetFunction !== 'function'){
    throw new Error(Conference.WidgetSandbox.messages.fcnMustBeProvided);
  }

  // if(arguments[0] instanceof Array){
  //   toolsToLoad = arguments[0];
  // }

  toolsToLoad = (argsArray[0] instanceof Array)? argsArray[0] : argsArray;

  toolsToLoad.forEach(function(toolName){
    if(!Conference.WidgetTools.hasOwnProperty(toolName)){
      throw new Error(Conference.WidgetSandbox.messages.unknownTool + toolName);
    }

    Conference.WidgetTools[toolName](this);
  },this); // 콜백 내에서 this가 sandbox 인스턴스를 가리키도록 보장한다..



  widgetFunction(this);


};

// 도구 이름공간을 생성한다..
Conference.WidgetTools = {};

Conference.WidgetSandbox.messages = {
  mustBeCalledWithNew : 'new로 실행시켜야 합니다',
  fcnMustBeProvided : '함수가 인자로 넘어와야 합니다',
  unknownTool : '알 수 없는 도구입니다.'
};



// var weatherSandbox = new Conference.WidgetSandbox(['toolA','toolB'], Conference.widgets.weatherWidget);
// var weatherSandbox = new Conference.WidgetSandbox('toolA','toolB', Conference.widgets.weatherWidget);