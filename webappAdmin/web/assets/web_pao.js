window.pao = function(){
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
				|| window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());

	(function() {

		var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

		// Main主函数
		initHeader();
		addListeners();

		//初始化
		function initHeader() {
			width = $('.J_large_header').width();
			height = $('.J_large_header').height();
			target = {x: 0, y: height};

			//largeHeader = $('.J_large_header').get(0);
			//largeHeader.style.height = height+'px';
			//alert(height);

			canvas = $('.J_canvas').get(0);
			canvas.width = width;
			canvas.height = height;
			ctx = canvas.getContext('2d');

			// create particles
			circles = [];
			for(var x = 0; x < width*0.5; x++) {
				var c = new Circle();
				circles.push(c);
			}
			animate();
		}

		//监听scroll事件与resize事件
		function addListeners() {
			window.addEventListener('scroll', scrollCheck);
			window.addEventListener('resize', resize);
		}

		//如果动画位置在页面外，停止动画
		function scrollCheck() {
			if(document.body.scrollTop > height) animateHeader = false;
			else animateHeader = true;
		}

		//屏幕大小改变重新计算窗口以及画布宽高
		function resize() {
			width = $('.J_large_header').width();
			height = $('.J_large_header').height();
			//largeHeader.style.height = height+'px';
			canvas.width = width;
			canvas.height = height;
		}

		//动画函数
		function animate() {
			if(animateHeader) {
				ctx.clearRect(0,0,width,height);
				for(var i in circles) {
					circles[i].draw();
				}
			}
			requestAnimationFrame(animate);
		}

		// Canvas manipulation
		//画布函数
		function Circle() {
			var _this = this;

			// constructor
			(function() {
				_this.pos = {};
				init();
			})();

			//随机生成泡泡
			function init() {
				_this.pos.x = Math.random()*width;
				_this.pos.y = height+Math.random()*100;
				_this.alpha = 0.1+Math.random()*0.3;
				_this.scale = 0.1+Math.random()*0.3;
				_this.velocity = Math.random();
			}

			this.draw = function() {
				//透明度小于0，从新随机
				if(_this.alpha <= 0) {
					init();
				}
				_this.pos.y -= _this.velocity;
				//随机方向漂浮
				(Math.floor(_this.velocity*10)%7) ? _this.pos.x += _this.velocity : _this.pos.x -= _this.velocity;
				_this.alpha -= 0.0005;
				ctx.beginPath();
				//飘升
				ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
				//透明度飘升过程中递减
				ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
				ctx.fill();
			};
		}

	})();
};
