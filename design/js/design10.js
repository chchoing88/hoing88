/**
 * Created by merlin.ho on 2017. 3. 3..
 */

//중재자 패턴에 대해 알아보겠습니다! 여러 개의 객체들을 관리하는 패턴입니다.

var Josephus = (function() {
    function Josephus() {
        this.participants = [];
    }
    Josephus.prototype.register = function(participant) {
        this.participants.push(participant);
    };
    Josephus.prototype.deliver = function(sender, message) {
        this.participants.forEach(function(participant) {
            if (participant !== sender) {
                console.log(sender + '님이 ' + participant + '님에게 "' + message + '"라고 말합니다.');
            }
        });
    };
    return Josephus;
})();

var josephus = new Josephus();
josephus.register('Jew');
josephus.register('Roman');
josephus.deliver('Jew', '우리 땅에서 물러가라!');
josephus.deliver('Roman', '네놈들을 멸망시켜주겠다!');

//서로의 말을 전달하는 공간을 마련했다는 점에서 채팅방과 비슷하고, 어떤 메세지를 바꿔서 표현할 수 있다는 점에서 통역과도 비슷합니다. 이들의 공통점은 모든 객체들이 이 중재자 객체를 거쳐야한다는 거죠.

//중재자 패턴은 여러 개의 객체들을 모두 관리하는 관제탑 같은 역할을 합니다. 등록된 객체들의 상황을 통제하고 관리할 수 있습니다. 이름처럼 중재자로서의 역할도 수행할 수 있고요. 채팅방 외에도 자원 분배기나 가계부같은 것에도 이 패턴을 사용할 수 있겠네요. 등록된 통장이나, 카드 등의 잔액을 한 번에 관리할 수 있습니다. 
