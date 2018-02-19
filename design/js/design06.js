/**
 * Created by merlin.ho on 2017. 3. 2..
 */

//프록시 패턴

//프록시는 대리인이라는 뜻입니다. 즉 사용자가 원하는 행동을 하기 전에 한 번 거쳐가는 단계를 뜻합니다. 좋은 프록시는 사용자의 요청을 캐싱하여 성능을 높일 수도 있고, 에러를 잡아낼 수도 있지만, 나쁜 프록시는 사용자의 요청을 왜곡하여 다른 동작을 하도록 만들 수도 있습니다. 양날의 검과 같습니다.

//법무부

var Praetorian = (function(){
    function Praetorian(){}
    Praetorian.prototype.report = function(fact){
        console.log('황제에게 ' + fact + '을 보고드립니다!');
    };
    Praetorian.prototype.assassinate = function(target){
        console.log(target + ' 암살 명령을 받았습니다');
    };
    return Praetorian;
})();

var PraetorianProxy = (function(){

    function PraetorianProxy (master){
        this.master = master;
        this.praetorian = new Praetorian();

    }
    PraetorianProxy.prototype.report = function(fact){
        var lie = '거짓';
        console.log(this.master + '에게 ' + fact + '를 보고 드립니다.');
        this.praetorian.report(lie);

    };
    PraetorianProxy.prototype.assassinate = function(target){
        console.log('더 이상' + target + '암살을 하지 않습니다.');
        this.praetorian.assassinate('galba');
    };

    return PraetorianProxy;
})();

var praetorian = new PraetorianProxy('otho');

praetorian.report('ho');
praetorian.assassinate('otho');

// 원래대로 한다면 
// 황제에게 ho 를 보고 드립니다.
// otho 암살명령을 받았습니다.

// 프록시 거치면.
// otho 에게 ho를 보고 드립니다.
// 황제에게 거짓을 보고드립니다.
// 더이상 otho 암살을 하지 않습니다.
// 갈바를 암살명령을 받았습니다.