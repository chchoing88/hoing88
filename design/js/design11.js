/**
 * Created by merlin.ho on 2017. 3. 6..
 */

//옵저버 패턴 또는 관찰자 패턴에 대해서 알아보겠습니다. 옵저버는 스타크래프트에 있는 그 옵저버가 맞습니다. 항상 어딘가에서 여러분을 관찰하고 있죠.

//브라우저에도 똑같은 역할을 하는 게 있습니다. 바로 이벤트 핸들러죠. 이벤트를 등록만 해 두면, 나중에 이벤트가 발생했을 때 알려줍니다. 그 후에는 콜백 함수가 실행됩니다. 다시 말하면, 콜백 함수가 실행되기 전까지의 과정이 바로 옵저버 패턴을 활용한 예라고 할 수 있습니다.

//
    // 얘가 관찰할 대상 , 또는 하나의 상품...고객들이 이용하는 대상..고객들은 이 대상을 지켜본다.
var Vespasianus = (function(){
    function Vespasianus (){
        //가입자들...
        this.subscribers = [];
    }
    Vespasianus.prototype.publish = function(){
        var self = this;
        //모두가 매개변수로 들어가는 함수에 조건들이 참인가..
        // 유저들에게 새로운 공지..를 띄우는.
        this.subscribers.every(function(user){
            //console.log(typeof user === 'object');
            if(typeof user === 'object' && typeof user.fire === 'function'){

                user.fire(self);
                return true;
            }else{
                return false;
            }
        })

    };
    Vespasianus.prototype.register = function(user){
        this.subscribers.push(user);
    };

    return Vespasianus;
})();


//관찰하는 사람 , 또는 위의 상품을 이용하는 사용자...

var Mucianus = (function(){
    function Mucianus (){
        // 사용자의 상품 이용 목록...
        this.list = [];
    }
    Mucianus.prototype.subscribe = function(target){
        var targetObj = {};
        targetObj.target = target;
        targetObj.point = 0;

        this.list.push(targetObj);
        //console.log(targetObj);
        // 내가 저 상품을 이용한다는 등록을 함...
        target.register(this);
    };
    // 사용자는 상품을 이용 해지할 능력이 있음..
    Mucianus.prototype.unsubscribe = function(){

    };

    Mucianus.prototype.fire = function(target){
        this.list.some(function(goods){
            console.log(goods.target, target, goods.target === target);
            if(goods.target === target){
                ++goods.point;
                return true;
            }else{
                return false;
            }
        });
    };

    return Mucianus;
})();


//코드를 보면 publish와 subscribe 그리고 fire 메소드가 있습니다. 먼저 관찰 대상을 subscribe한 후, 관찰 대상은 특정 행동을 할 때 자신의 행동을 publish합니다. publish한 행동은 subscribe한 사람들에게 전달됩니다. 그 전달 방식이 fire입니다. fire 부분은 콜백이라고 보셔도 됩니다. 무키아누스가 베스파시아누스를 관찰하고 있다가, 베스파시아누스가 특정 행동을 하니까 자동으로 무키아누스에게 그 소식이 전달됩니다. 베스파시아누스가 1점을 딴 것을 확인할 수 있습니다.

//결론..
var vespasianus = new Vespasianus();
var mucianus = new Mucianus();
//무키아누스가 베스파시아누스를 관찰한다.
mucianus.subscribe(vespasianus);
//베스파시아누스가 publish 할때마다 무키아누스가 그 사실을 안다...
vespasianus.publish();
console.dir(mucianus.list); // [{ target: Vespasianus, point: 1 }]