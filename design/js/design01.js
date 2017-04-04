/**
 * Created by merlin.ho on 2017. 3. 1..
 */
//추상 팩토리



// 어떻게 실행할 것인가.?
var abstractCharacterFactory = (function(){
    // private..
    var job = {};

    // public..
    return {
        addjob : function(jobname , obj){
            if( typeof obj === 'function'){
                job[jobname] = obj;
            }
        },
        create : function(jobname , obj){
            if( job[jobname] != 'undefined' && typeof job[jobname] === 'function'){
                var instance = new job[jobname](obj);
            }
            else{
                console.log(typeof job[jobname]);
            }
            return instance;
        }
    }
})();


// emperor 클래스..
var Emperor = (function(){
    function Emperor(option){
        this.name = option.name;
    }

    Emperor.prototype.attack = function(){
        console.log('emeperor attack!!');
    };

    return Emperor;

})();

// 직업을 등록..
abstractCharacterFactory.addjob('emperor',Emperor); // 키와 해당 객체..
//abstractCharacterFactory.addjob('governor',Governor); // 키와 해당 객체..

// 직업으로 사람들을 생성..
var nero = abstractCharacterFactory.create('emperor',{ name : 'Nero'});

console.dir(nero);