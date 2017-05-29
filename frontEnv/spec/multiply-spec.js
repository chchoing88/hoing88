/**
 * Created by merlin.ho on 2017. 4. 5..
 */
"use strict";
/*
 * spy is Something important here is that the when you spy a function,
 * the real function is never called.
 * the real function is never called, but if you really need to spy it and also call it,
 * you can do it with and.callThrough.
*/

// 스파이는 함수에 심는다... 하지만 실제로 가동되지는 않는다..

//var multiply_lib = require('../app/a/script01.js');

// describe("#multiply", function () {
//     it("returns the correct multiplied value", function () {
//         var product = multiply_lib.multiply(2, 3);
//         expect(product).toBe(5);
//     });
// });

// describe("A suite", function() {
//     it("contains spec with an expectation", function() {
//         expect(true).toBe(true);
//     });
// });

// describe("pending specs",function(){
//
//     xit("can be declared 'xit'",function(){
//         expect(true).toBe(false);
//     });
//
//     it("can be declared with 'it' but without a function");
//
//     it("can be declared by calling 'pending' in the spec body",function(){
//         expect(true).toBe(false);
//         pending('this is why it is pending');
//     })
// });

describe("A spy", function() {
    var foo, bar = null;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, 'setBar').and.callThrough();
    });

    it("can call through and then stub in the same spec", function() {
        foo.setBar(123);
        expect(bar).toEqual(123);

        foo.setBar.and.stub();
        bar = null;

        foo.setBar(123);
        expect(bar).toBe(null);
    });
});