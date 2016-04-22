//全局变量
(function($, document, undefined){
	window.yan	=	{};
	yan.nu		= '&nbsp;&nbsp;o(￣ヘ￣*o)&nbsp;&nbsp;';
	yan.renzhen = '&nbsp;&nbsp;(｡・`ω´･)&nbsp;&nbsp;';
	yan.happy	= '&nbsp;&nbsp;(*´∇｀*)&nbsp;&nbsp;';
	yan.wuyu	= '&nbsp;&nbsp;눈_눈&nbsp;&nbsp;';
})(jQuery, document);

//触摸事件
(function($, document, undefined){
	var $doc	= $(document),
		Fn		= function(){},
		touch	= function(target, start, move, end){
			this.$target = $(target);
			this.start = start || Fn;
			this.move = move || Fn;
			this.end = end || Fn;
			this.init();
		}
	touch.prototype = {
		init: function(){
			var _this = this;
			this.$target.on('touchstart', function(e){
				var __this	= this,
					e		= e.originalEvent,
					touche = e.touches[0],
					startX	= touche.pageX,
					startY	= touche.pageY,
					offsetX	= 0,
					offsetY	= 0;
				$doc.on('touchmove', function(e){
					var e		= e.originalEvent,
						touche	= e.touches[0];
					offsetX = touche.pageX - startX;
					offsetY = touche.pageY - startY;
					return _this.move.call(__this, e, offsetX, offsetY);
				}).on('touchend touchcancel', function(e){
					var isClick = !offsetX && !offsetY;
					$(this).off('touchmove touchend touchcancel');
					return _this.end.call(__this, offsetX, offsetY, isClick, e);
				});
				return _this.start.call(__this, e, startX, startY);
			});
		},
	};
	$.fn.xtouch = function(end, move, start){
		return this.each(function(){
			new touch(this, start, move, end);
		});
	};
	$.fn.mclick = function(fn){
		return this.xtouch(function(x, y, isClick, e){
			isClick && (fn || Fn).call(this, e) === false && e.preventDefault();
		});
	}
})(jQuery, document);

//错误提示
(function($, document, undefined){
	var	tipsTimer;
	$.tips = function(mode,text,time){
		if(!text.length)return false;
		var	_html	= '',
			icon	= '',
			time	= time || 3000,
			$mySelf	= $('[data-name="tips"]');
		if($mySelf.length){
			$mySelf.remove();
			clearTimeout(tipsTimer);
		};
		switch(mode){
			case 'error' : icon = 'fa-times-circle';break;
			case 'success' : icon = 'fa-check-circle';break;
			case 'info' : icon = 'fa-info-circle';break;
			case 'warning' : icon = 'fa-exclamation-triangle';break;
		};
		_html = '<div class="tips col-xs-10 col-xs-offset-1 col-lg-6 col-lg-offset-3" data-name="tips">'+
					'<div class="box auto '+ mode +'">'+
						'<div class="col-xs-1" style="float:right;"><a class="closeBox" data-name="close" href="javascript:;"><i class="fa close fa-times"></i></a></div>'+
						'<div class="col-xs-10 auto"><i class="fa icon fl '+ icon +'"></i><span class="auto">'+ text +'</span></div>'+
					'</div>'+
				'</div>';
		$(_html).appendTo('body').on('click','[data-name=close]',function(){
			$('[data-name="tips"]').remove();
		});
		tipsTimer = setTimeout(function(){
			$('[data-name="tips"]').fadeOut(400,function(){
				$(this).remove();
			});
		},time);
	};
})(jQuery, document);

//背景图片加载
(function($, document, undefined){
	if(!$('.k-random-bg').length || $(window).width()<768)return false;
	var	roundBg;
	(roundBg = (function(){
		$('.k-random-bg').css({'backgroundImage':'url(/static/images/bg/k-bg'+ Math.ceil(Math.random()*19+1) + '.jpg)'});
		return function(time){
			setTimeout(function(){
				var	img	=	new Image();
				img.onload	=	function(){
					$('.k-random-bg').css({'backgroundImage':'url('+ img.src +')'});
					roundBg(10000);
				};
				img.onerror	=	function(){
					roundBg(100);
				};
				img.src	=	'/static/images/bg/k-bg'+ Math.ceil(Math.random()*19+1) + '.jpg';
			},time);
		};
	})())(10000);
	console.log(roundBg);
})(jQuery, document);

//懒加载
(function($, document, undefined){
	var kPreLoad;
	(window.kPreLoad = function(){
		$image	=	$('img[data-src]');
		for(var	i=0; i<$image.length; i++){
			var	$img	=	$image.eq(i);
			if($img.offset().top<$(window).scrollTop()+$(window).height() && $img.offset().top + $img.parent().height() >$(window).scrollTop()){
				$img.attr('src',$img.attr('data-src')).removeAttr('data-src');
			}
		}
	})();
	setTimeout(window.kPreLoad,500);
	$(window).scroll(window.kPreLoad);
})(jQuery, document);
