/**
 * Created by merlin.ho on 2017. 3. 2..
 */


//책임 연쇄 패턴에 대해 알아보겠습니다. 책임 연쇄라고 하니 뭔가 거창하게 들리지만 사실 별 거 없습니다. 동작의 수행을 다른 객체에게 떠넘기는 패턴일 뿐입니다. 가장 쉽게 접하는 예로 이벤트 버블링이 있습니다. 어떤 태그에 이벤트가 발생하면 그 이벤트는 해당 태그의 부모나 조상에게도 순서대로 발생합니다. 이 때 사용자가 이벤트 리스너를 달아서 어떤 태그에서 이벤트를 처리할 지, 또는 다음 태그로 이벤트 처리 수행을 넘길지 결정할 수 있습니다. 이와 같이 동작의 처리를 자신이 할 지 다음으로 넘길 지 결정하는 패턴이 책임 연쇄입니다.

//canMakeDecision 결정을 내릴 수 있는지 여부를 판단
//makeDecision 결정을 내립니다.

//장군과 원로원은 canMakeDecision은 false를 return하기 때문에 결정을 내릴 수 없습니다. 저는 간단하게 바로 return false를 했지만, 내부 구현은 알아서 하시면 됩니다.

//장군
var General = (function() {
    function General() {}
    General.prototype.canMakeDecision = function() {
        // 복잡한 확인 코드
        return false;
    };
    General.prototype.makeDecision = function() {
        console.log('맞서 싸운다');
    };
    return General;
})();

//평의원
var Senator = (function() {
    function Senator() {}
    Senator.prototype.canMakeDecision = function() {
        // 복잡한 확인 코드
        return true;
    };
    Senator.prototype.makeDecision = function() {
        console.log('눈치를 본다');
    };
    return Senator;
})();

//황제
var Emperor = (function() {
    function Emperor() {}
    Emperor.prototype.canMakeDecision = function() {
        // 복잡한 확인 코드
        return true;
    };
    Emperor.prototype.makeDecision = function() {
        console.log('항복한다');
        console.log('자결한다');
    };
    return Emperor;
})();

var DecisionMaker = (function(){
    function DecisionMaker(){
        this.decider = [];
        this.decider.push(new General());
        this.decider.push(new Senator());
        this.decider.push(new Emperor());
    }

    DecisionMaker.prototype.makeDecision = function(){
        var length = this.decider.length,
            i;
        for(i = 0; i<length; i++){
            if(this.decider[i].canMakeDecision()){
                return this.decider[i].makeDecision();
            }
        }
    };
    return DecisionMaker;
})();

//결론..
var choice = new DecisionMaker();
choice.makeDecision();


