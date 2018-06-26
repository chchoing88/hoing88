"use strict";

(function (g) {
  g.Box = (function () {
    var _ = g.util;
    var defaultProps = {
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      color: "red",
      directionX: DIRECTION.RIGHT,
      directionY: DIRECTION.BOTTOM,
      speed: 10,
    };

    var divideDirection = [
      {
        directionX: DIRECTION.RIGHT,
        directionY: DIRECTION.TOP
      },
      {
        directionX: DIRECTION.RIGHT,
        directionY: DIRECTION.BOTTOM
      },
      {
        directionX: DIRECTION.LEFT,
        directionY: DIRECTION.TOP
      },
      {
        directionX: DIRECTION.LEFT,
        directionY: DIRECTION.BOTTOM
      }
    ]
    /**
     * Box class
     * @param {object} frame frame object
     * @param {object} props related box options 
     * @return {object} return box object
     * @see see detailed props param README.md
     */
    function Box(frame, props) {
      // this._opts = Object.assign({}, defaultProps, props);
      this._opts = _.assign({}, defaultProps, props);
      this._frame = frame;
      this._dom = null;
      this._intervalId = 0;
    }

    Box.prototype = {
      _increaseX: function () { return this._opts.left++ },
      _decreaseX: function () { return this._opts.left-- },
      _increaseY: function () { return this._opts.top++ },
      _decreaseY: function () { return this._opts.top-- },
      _divideWidth: function () {
        this._opts.width = Math.floor(this._opts.width / 2);
        this._opts.height = Math.floor(this._opts.height / 2);
        this._dom.style.width = this._opts.width + "px";
        this._dom.style.height = this._opts.height + "px";
      },
      /**
       * Move box
       */
      move: function () {
        var self = this;
        var opts = self._opts;
        var crashFrameDirectionX = "";
        var crashFrameDirectionY = "";

        var left = (opts.directionX === DIRECTION.RIGHT) ? this._increaseX.bind(self) :
          this._decreaseX.bind(self);
        var top = (opts.directionY === DIRECTION.BOTTOM) ? this._increaseY.bind(self) :
          this._decreaseY.bind(self);

        this._intervalId = setInterval(function () {

          var leftValue = opts.left;
          var topValue = opts.top;

          crashFrameDirectionX = self._frame.checkX(leftValue, opts.width);
          crashFrameDirectionY = self._frame.checkY(topValue, opts.height);
          // console.log(crashFrameDirectionY);

          switch (crashFrameDirectionX) {
            case DIRECTION.RIGHT:
              left = self._decreaseX.bind(self);
              opts.directionX = DIRECTION.LEFT;
              break;

            case DIRECTION.LEFT:
              left = self._increaseX.bind(self);
              opts.directionX = DIRECTION.RIGHT;
              break;
            default:
              left = left;

          }

          switch (crashFrameDirectionY) {
            case DIRECTION.TOP:
              top = self._increaseY.bind(self);
              opts.directionY = DIRECTION.BOTTOM;
              break;

            case DIRECTION.BOTTOM:
              top = self._decreaseY.bind(self);
              opts.directionY = DIRECTION.TOP;
              break;

            default:
              top = top;
          }

          leftValue = left();
          topValue = top();
          self._dom.style.left = leftValue + "px";
          self._dom.style.top = topValue + "px";


        }, opts.speed);
      },
      /**
       * box dom render
       */
      render: function () {
        var style = {
          left: this._opts.left + "px",
          top: this._opts.top + "px",
          width: this._opts.width + "px",
          height: this._opts.height + "px",
          backgroundColor: this._opts.color
        };
        this._dom = document.createElement("div");
        // Object.assign(this._dom.style, style);
        _.assign(this._dom.style, style);
        this._dom.className = "box";


        this._frame.target.appendChild(this._dom);
      },
      /**
       * box dom delete
       */
      delete: function () {
        this._dom.remove();
      },
      /**
       * box dom divide
       */
      divide: function () {
        var i = 0;
        var diviedBoxes = [];
        // 일단 스탑
        this.stop();
        // width , height 를 반으로 나눈뒤.
        this._divideWidth();
        // 같은 걸 3개 인스턴스를 만든뒤.
        for (i = 4; i > 0; i--) {
          if (i === 4) {
            // Object.assign(this._opts, diviedDirection[0]);
            _.assign(this._opts, divideDirection[0]);
            diviedBoxes.push(this);
            this.move();
            continue;
          }
          // Object.assign(this._opts, diviedDirection[i])
          _.assign(this._opts, divideDirection[i]);
          diviedBoxes[i] = new Box(this._frame, this._opts);
          diviedBoxes[i].render();
          diviedBoxes[i].move();
        }
        // 4개를 moveTo 해서 움직인다..

        return diviedBoxes;
      },
      /**
       * box move stop
       */
      stop: function () {
        if (this._intervalId) {
          clearInterval(this._intervalId)
        }
      },
      /**
       * box move restart
       */
      restart: function () {
        this.move();
      },

    };

    return Box;
  })();
})(window);
