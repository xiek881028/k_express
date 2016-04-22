//开发日志页交互
(function($, document, undefined){
	var	$box	=	$('[data-name=logs]');
	if(!$box.length)return false;
	var	makeup;
	(makeup = function(){
		var	$art	=	$('[data-name="list"] article'),
			ltHgt	=	0,
			rtHgt	=	0;
		for(var i=0,max=$art.length; i<max; i++){
			if(ltHgt > rtHgt && i != 0){
				$art.eq(i).removeClass('left right').addClass('right');
				rtHgt += $art.eq(i).height();
			}else if((ltHgt <= rtHgt && i != 0) || i == 0){
				$art.eq(i).removeClass('left right').addClass('left');
				ltHgt += $art.eq(i).height();
			};
		};
	})();
	$(window).resize(makeup).on('orientationchange',function(){
		setTimeout(makeup,200);
	});
})(jQuery, document);

//首页交互
(function($, document, undefined){
	if(!$('[data-name="indexLun"]').length)return false;
	var	lun,
		moveTag,
		moveTimeout,
		moveFootTimeout,
		buttomAd,
		say,
		footMove	=	1,//foot开关变量
		tagMove		=	1;//tag开关变量
	//banner图加入canvas泡泡效果
	(lun = function(){
		var img		=	new Image,
			$img	=	$('[data-pao-src]');
		if($img.length && $img.offset().top<$(window).scrollTop()+$(window).height() && $img.offset().top + $img.parent().height() >$(window).scrollTop()){
			img.onload = function(){
				$img.attr('src',img.src).removeAttr('data-pao-src');
				window.pao();
			};
			img.src	=	$img.attr('data-pao-src');
		};
	})();
	$(window).on('load',function(){
		moveTag();
		buttomAd();
		say();
	});

	//导航卡片翻转效果
	moveTag = function(){
		var	$box	=	$('[data-name="tagList"]'),
			$li		=	$box.find('li'),
			solTop	=	$(window).scrollTop();
		if($box.offset().top < (+solTop+$(window).height()) && (+solTop+$('nav').height()+10) < (+$box.offset().top + $box.height())){
			if(tagMove){
				tagMove = 0;
				var	i	=	0;
				(function move(){
					moveTimeout = setTimeout(function(){
						if(i<$li.length){
							$li.eq(i).addClass('move');
							i++;
							move();
						};
					},150);
				})();
			};
		}else{
			$box.find('li').removeClass('move');
			clearTimeout(moveTimeout);
			tagMove = 1;
		};
	};

	//底部导航交互效果
	buttomAd = function(){
		var	$foot	=	$('[data-name="footerAd"]'),
			$li		=	$foot.find('li'),
			solTop	=	$(window).scrollTop();
		if($foot.offset().top < (+solTop+$(window).height()) && (+solTop+$('nav').height()+10) < (+$foot.offset().top + $foot.height())){
			if(footMove){
				footMove = 0;
				var	i	=	0;
				(function move(){
					moveFootTimeout = setTimeout(function(){
						if(i<$li.length){
							$li.eq(i).addClass('move');
							i++;
							move();
						};
					},250);
				})();
			};
		}else{
			$foot.find('li').removeClass('move');
			clearTimeout(moveFootTimeout);
			footMove = 1;
		};
	};

	//说明区域交互效果
	say = function(){
		var	$box	=	$('[data-name="sayBox"]'),
			solTop	=	$(window).scrollTop();
		if($box.offset().top < (+solTop+$(window).height()) && (+solTop+$('nav').height()+10) < (+$box.offset().top + $box.height())){
			$box.addClass('move');
		}else{
			$box.removeClass('move');
		};
	};

	$(window).scroll(function(){
		lun();
		moveTag();
		buttomAd();
		say();
	});
})(jQuery, document);

//列表页交互
(function($, document, undefined){
	if(!$('.J_k_listBox').length)return false;
})(jQuery, document);
