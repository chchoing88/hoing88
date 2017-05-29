/**
 * Created by merlin.ho on 2017. 4. 13..
 */
// (function(){
    // if(C.speColl === undefined) { C.speColl = {} };
    // C.spe
    function FlipsnapTab(opts){
        if (!(this instanceof FlipsnapTab)) {
            return new FlipsnapTab();
        }
        this.init(opts);
        this.initEvent();
    }
    FlipsnapTab.prototype.init = function(opts){
        var self = this;
        opts = opts || {};
        self.tabList = [];
        self.tabTwoDepth = opts.tabTwoDepth || true;

        // mainTab setting
        self.tabMain = opts.tabMain || '#speColl .tab_main';
        self.tabMainDom = document.querySelector(self.tabMain);
        self.tabMainList = self.tabMainDom.getElementsByTagName('li');
        self.tabMainAnchor = self.tabMainDom.getElementsByTagName('a');

        // if subTab use
       // if( self.tabTwoDepth ){
            self.tabSub = opts.tabSub || '#speColl .tab_sub';
            self.tabSubDom = document.querySelector(self.tabSub);
            self.tabSubList = self.tabSubDom.getElementsByTagName('li');
            self.tabSubAnchor = self.tabSubDom.getElementsByTagName('a');
        //}

        // item setting
        self.flipsnapWrap = opts.flipsnap || '#speColl .flipsnap';
        self.filpsnapItem = document.querySelectorAll('.item'); // 수정 필요

        //console.log(self.filpsnapItem);

        Array.prototype.forEach.call(self.filpsnapItem,function(elem,idx){
            var tabMainIndex = parseInt(elem.getAttribute("data-tab1"),10),
                tabSubIndex = parseInt(elem.getAttribute("data-tab2"),10),
                arrTemp = [];

            arrTemp.push(self.tabMainList[tabMainIndex]);

            // exist subIndex
            if(!isNaN(tabSubIndex)){
                arrTemp.push(self.tabSubList[tabSubIndex]);
            }
            self.tabList.push(arrTemp);

        });

        //console.log(self.tabList);
        var startIdx = 0;
        try {
            startIdx = sessionStorage.getItem('speColl%ED%94%8C%ED%85%8C4') || 0;
        }catch(err){}
        // tab connect panel...
        self.setTab();
        self.flipsnap = Flipsnap(self.flipsnapWrap);
        self.flipsnap.moveToPoint(startIdx);

        // if (!self.element) {
        //     throw new Error('element not found');
        // }

    };
    FlipsnapTab.prototype.initEvent = function(){
        var self = this;
        // 탭 클릭시...
        Array.prototype.forEach.call(self.tabMainList,function(elem){
            //console.log(elem);
            elem.addEventListener('click', function(e) {
                e.preventDefault();
                var idx = parseInt(elem.getAttribute('data-panel'), 10) || 0;
                self.flipsnap.moveToPoint(idx);
            });
        });

        Array.prototype.forEach.call(self.tabSubList,function(elem){
            elem.addEventListener('click', function(e) {
                e.preventDefault();
                var idx = parseInt(elem.getAttribute('data-panel'), 10) || 0;
                self.flipsnap.moveToPoint(idx);
            });
        });

        // flicking
        self.flipsnap.element.addEventListener('fspointmove', function() {
            $(self.filpsnapItem).removeClass('_active').eq(self.flipsnap.currentPoint).addClass('_active');

            $(self.tabMainList).removeClass('on');
            $(self.tabSubList).removeClass('on');

            self.tabList.forEach(function(elem,idx){
                if(idx == self.flipsnap.currentPoint){
                    elem.forEach(function(subElem){
                        $(subElem).addClass('on');
                    });
                }
            });

            try {
                sessionStorage.setItem('speColl%ED%94%8C%ED%85%8C4', self.flipsnap.currentPoint);
            } catch (err) {}

        }, false);

    };

    FlipsnapTab.prototype.setTab = function(){
        var self = this;

        self.tabList.forEach(function(elem,idx){
            if(elem.constructor == Array){
                elem.forEach(function(subElem){
                    if(subElem.getAttribute('data-panel') == undefined){
                        subElem.setAttribute('data-panel',idx);
                    }
                });

            }
        });
    };
    // 서브탭 show / hide
    FlipsnapTab.prototype.setSubTab = function(){
        var self = this;

        //self.tabSubDom.getElementsByTagName('ul');
    };
    //return FlipsnapTab;
// })();

// 이렇게 호출할것이다...
//FlipsnapTab({
//  flipsnap : '.flipsnap',
//  tabTwoDepth : true,
//  tabMain : '.tab_main',
//  tabSub : '.tab_sub',
//  tabStruct :[
//     item_0 : {tabMain : 0},
//     item_1 : {tabMain : 1 , tabSub : 0 },
//     item_2 : {tabMain : 1 , tabSub : 1 },
//     item_3 : {tabMain : 1 , tabSub : 2 }
//  ]
// });

// main 탭과 sub 탭을 어떻게 매칭 시킬것인가...



// item_0.tabMain : 1
// item_1.tabMain : 2
// item_1.subMain : 0

//item_0 :
//item_1 : mainTab1 subTab0
//item_2 : subTab1

/// SF.C.speColl.flipsnapTab();

// [main0 , {main1:sub0} , [main1,sub1] , [main1,sub2] ]

//



