/*!
 * jQuery X Plugins
 * xiewulong <xiewulong@vip.qq.com>
 * http://xiewulong.github.io/jqueryX
 * https://github.com/xiewulong/jqueryX/blob/master/MIT-License
 * create: 2013/5/16
 * update: 2015/4/10
 * version: 1.0.0
 */

!function(a,b){var c=function(c){var f=c(a),g=c(d),h=function(){};return c.extend({x:"1.0.0",xajax:function(a,b,d,e,f,g){b=b||h,"javascript:;"==a?b(d):c[f||"post"](a,e,b,g||"json")},cookie:function(a,c,e,f,g,h){var i,j,k=new Date;return c===b?(i=d.cookie.match(new RegExp("(^| )"+a+"=([^;]*)(;|$)")),i?unescape(i[2]):""):(j=a+"="+escape(c),j+=e?";expires="+k.toGMTString(k.setDate(k.getDate()+e)):"",j+=f?";path="+f:"",j+=g?";domain="+g:"",j+=h?";secure":"",d.cookie=j,void 0)},clip:function(b,d){var e,f=c(b).val(),d=d||h;(e=a.clipboardData)?(e.clearData(),e.setData("text",f),d.call(b,!0)):(b.focus(),b.selectionStart=0,b.selectionEnd=f.length,d.call(b,!1))},loader:function(a,b){function d(){if(c.isFunction(a))a();else if(c.isPlainObject(a))for(var b in a)c.isFunction(a[b])&&a[b]()}return b?d():c(d),a},pop:function(a){function b(){var a=o-n.adjust-k,b=p-n.adjust-l;return{left:a<n.left?a<n.adjust?n.adjust:a:n.left<n.adjust?n.adjust:n.left,top:b<n.top?b<n.adjust?n.adjust:b:n.top<n.adjust?n.adjust:n.top}}function e(a){return{marginLeft:(a?f.scrollLeft():0)-k/2,marginTop:(a?f.scrollTop():0)-l/2}}var i,j,k,l,m,n={html:"",parent:"body",id:"jq_x_pop",close:"",width:0,height:0,position:"fixed",top:0,left:0,bg:!0,bgclose:!0,bgcloser:!0,bgcolor:"#000",opacity:.5,zIndex:100,animation:"",duration:400,adjust:20,drag:"",fn:!1,fnC:!1},o=g.width(),p=g.height();if(c.extend(n,a),n.html){if(c.popClose(n.id),n.bg&&c.popBg({parent:n.parent,id:n.id+"_bg",close:n.bgclose?n.close||n.id+"_c":"",bgcolor:n.bgcolor,fade:n.animation?!0:!1,duration:n.duration,opacity:n.opacity,zIndex:n.zIndex-1}),j="display:inline;position:"+n.position+";z-index:"+n.zIndex+";"+(n.animation&&n.width&&n.height?"display:none;":"")+(n.width?"width:"+n.width+"px;":"")+(n.height?"height:"+n.height+"px;":""),n.$pop=c('<div id="'+n.id+'" class="'+n.id+'" style="'+j+'">'+n.html+"</div>").appendTo(n.parent),k=n.width||n.$pop.width(),l=n.height||n.$pop.height(),m="fixed"==n.position?e():e(1),(n.left||n.top)&&"absolute"==n.position&&(i=b()),n.$pop.css({left:n.left?"fixed"==n.position?n.left:i.left:"50%",marginLeft:n.left?"":m.marginLeft,top:n.top?"fixed"==n.position?n.top:i.top:"50%",marginTop:n.top?"":m.marginTop}),"fixed"==n.position&&c.ie6(function(){var a;n.$pop.css({position:"absolute"}),(a=function(){m=e(1),n.$pop.css({left:n.left?n.left+f.scrollLeft():"50%",marginLeft:n.left?"":m.marginLeft,top:n.top?n.top+f.scrollTop():"50%",marginTop:n.top?"":m.marginTop})})(),f.resize(a).scroll(a)}),n.animation)switch((!n.width||!n.height)&&n.$pop.hide(),n.animation){case"fade":n.$pop.stop().fadeIn(n.duration)}return n.close="."+(n.close||n.id+"_c"),c(n.close).on("click",function(a){(n.fnC||h).call(n.$pop.get(0)),c.popClose(n.id,n.animation),a.stopPropagation()}),!n.bg&&n.bgcloser&&(g.on("click",function(){n.$pop.remove()}),n.$pop.on("click",function(a){a.stopPropagation()})),n.drag&&n.$pop.find(n.drag).mousedown(function(a){var a=a||event,b=a.clientX,c=a.clientY,e=n.$pop,f=parseInt(e.css("marginLeft")),g=parseInt(e.css("marginTop"));return d.onmousemove=function(a){var a=a||event;return e.css({marginLeft:f+a.clientX-b,marginTop:g+a.clientY-c}),!1},d.onmouseup=function(){return d.onmouseup=d.onmousemove=null,!1},!1}),(n.fn||h).call(n.$pop.get(0),{width:o,height:p,adjust:n.adjust}),n.$pop}},popClose:function(a,b,d){function e(a){c(a||this).remove()}var a="."+a,f=a+"_bg",g=a+","+f;switch(b){case"fade":c(g).stop().fadeOut(d||400,e);break;default:e(g)}},popBg:function(a){var b,d,e={parent:"body",id:"jq_x_pop_bg",close:"jq_x_pop_c",bgcolor:"#000",fade:!1,duration:400,opacity:.5,zIndex:99};return c.extend(e,a),b=e.fade?0:e.opacity,d=0==c("."+e.id).size()?c('<div id="'+e.id+'" class="'+e.id+" "+e.close+'" style="position:fixed;width:100%;height:100%;left:0;top:0;background:'+e.bgcolor+";opacity:"+b+";filter:alpha(opacity="+100*b+");z-index:"+e.zIndex+';"></div>').appendTo(e.parent):c("#"+e.id),e.fade&&d.stop().animate({opacity:e.opacity},e.duration),c.ie6(function(){var a;(a=function(){d.css({position:"absolute",height:f.height(),marginTop:f.scrollTop()})})(),f.resize(a).scroll(a)}),d},textSize:function(a,b){var d=null==a.match(/[^ -~]/g)?a.length:a.length+a.match(/[^ -~]/g).length;if(!b)return d;if(!(d>b))return a;for(var e=0,f=a.length;f>=e;e++)if(c.textSize(a.substring(0,e+1))>b)return a.substring(0,e)},ie6:function(a){var b;return(b=e.userAgent.indexOf("MSIE 6.0")>0)&&(a||h)(),b},ltie:function(a,c){var d,f,g,i=e.userAgent;if(-1!=i.indexOf("MSIE"))return a===b&&(a=9),"function"==typeof a&&(c=a,a=9),d=i.indexOf("MSIE"),g=parseInt(i.slice(d+5,d+7)),(f=a>g)&&(c||h)(),f},ie:function(a,c){var d,f=e.userAgent;return"function"==typeof a&&(c=a,a=b),index=f.indexOf("MSIE"),version=parseInt(f.slice(index+5,index+7)),(d=index>0&&(!a||a==version))&&(c||h)(),d}}),c.fn.extend({backtop:function(){var a=c("html, body");return this.each(function(){var a,b=c(this);(a=function(){b[f.scrollTop()?"addClass":"removeClass"]("on")})(),f.on("scroll",a)}).on("click",function(){a.stop().animate({scrollTop:0})})},scrolls:function(a){return this.each(function(){function b(b,c){var b=b||event,d=(c||(b.wheelDelta?b.wheelDelta:40*-b.detail))/2,l=k.position().top+d,o=m.height()-k.height(),p=g.height()||0,q=e.height()-p-(i.height()||0)-f.height();o>l&&(l=o),l>0&&(l=0),k.css({top:l}),f.css({top:l/o*q+p}),j[0>l?"show":"hide"](),(a||h).call(n,l<=o),b.preventDefault?b.preventDefault():event.returnValue=!1}var e,f,g,i,j,k,l,m=c(this),n=this;0==m.find(".scroll").size()&&(l=n.innerHTML,m.html('<div class="scroll_c"></div><div class="scroll"><a href="javascript:;" class="up">▲</a><a href="javascript:;" class="scroller"></a><a href="javascript:;" class="down">▼</a></div><a href="javascript:;" class="gotop"></a>').find(".scroll_c").html(l)),e=m.find(".scroll"),f=e.find(".scroller"),g=e.find(".up"),i=e.find(".down"),j=m.find(".gotop"),k=m.find(".scroll_c"),f.get(0).onmousedown=function(b){var b=b||event,f=c(this),l=b.clientY-f.position().top;return d.onmousemove=function(b){var b=b||event,c=b.clientY-l,d=k.height(),o=e.height()-(i.height()||0)-f.height(),p=g.height()||0;return c>o&&(c=o),p>c&&(c=p),f.css({top:c}),k.css({top:-((c-p)/(o-p))*(d-m.height())}),j[c>0?"show":"hide"](),(a||h).call(n,c>=o),!1},d.onmouseup=function(){return d.onmousemove=d.onmouseup=null,!1},!1},j.on("click",function(){k.css({top:0}),f.css({top:g.height()||0}),touch(this).hide()}),g.on("click",function(a){b(a,120)}),i.on("click",function(a){b(a,-120)}),n.onmouseover=function(){"onmousewheel"in this?this.onmousewheel=b:(this.removeEventListener("DOMMouseScroll",b,!1),this.addEventListener("DOMMouseScroll",b,!1))}}).fixScrolls()},fixScrolls:function(){return this.each(function(){var a=c(this),g=a.find(".scroll_c"),b=a.find(".scroll"),d=b.find(".scroller"),e=a.height(),f=g.height();d.height((b.height()-(b.find(".up").height()||0)-(b.find(".down").height()||0))*e/f),b[f>e?"show":"hide"](),e>=f&&(d.css({top:0}),g.css({top:0}))})},checkAll:function(a,b,d){function e(){var a=!0;return f.each(function(){!this.checked&&(a=!1)}),a}var f=c(a),g=c(this.selector+","+a),b=b||h,d=d||b,i=this;return f.change(function(){var a=e();i.prop("checked",a),d.call(this,a)}),this.change(function(){var a=this.checked;g.prop("checked",a),b.call(this,a)})},checkboxs:function(a,d){return a===b&&(a="on"),"function"==typeof a&&(d=a,a="on"),this.on("click",function(){(d||h).call(this,c(this).toggleClass(a).hasClass(a))})},radios:function(a,d){var e=this;return a===b&&(a="on"),"function"==typeof a&&(d=a,a="on"),this.on("click",function(){e.removeClass(a),c(this).addClass(a),(d||h).call(this)})},selects:function(a){var d,e,f={parent:"",disabled:"disabled",trigger:"",span:"span",p:"p",a:"a",onW:"",onS:"",onA:"",animation:"",duration:100,toggle:!0,fn:!1,fnA:!1},i=this;return c.extend(f,a),d=i.find(f.p),(f.parent?c(f.parent):g).on("click",e=function(){switch(f.animation){case"slide":d.stop().slideUp(f.duration);break;case"fade":d.stop().fadeOut(f.duration);break;default:d.hide()}f.onW&&i.removeClass(f.onW)}),this.each(function(){var a=c(this),d=a.find(f.trigger||f.span),g=a.find(f.span),i=a.find(f.p),j=i.find(f.a);d.off().on("click",function(b){if(!(a.hasClass(f.disabled)||f.toggle&&"none"!==i.css("display"))){switch(e(),f.animation){case"slide":i.stop().slideDown(f.duration);break;case"fade":i.stop().fadeIn(f.duration);break;default:i.show()}f.onW&&a.addClass(f.onW),(f.fn||h).call(a.get(0)),b.stopPropagation()}}),j.off().on("click",function(a){var d=c(this),e=g.get(0).tagName.toUpperCase(),i=(f.fnA||h).call(this);i===!1?a.stopPropagation():(i===b&&(i=d.text()),"INPUT"==e||"TEXTAREA"==e?g.val(i):g.html(i),f.onS&&g.addClass(f.onS),f.onA&&(j.removeClass(f.onA),d.addClass(f.onA)))}),f.onA&&j.each(function(){var a=c(this),b=a.text(),d=g.get(0).tagName.toUpperCase(),e="INPUT"==d||"TEXTAREA"==d?g.val():g.text();e==b&&a.addClass(f.onA)})})},tabs:function(a,d,e,f,g){"function"==typeof d&&(g=d,d="on"),"function"==typeof e&&(g=e,e=b),"function"==typeof f&&(g=f,f=0),!e&&("click"==d||"hover"==d)&&(e=d),f===b&&(f=0);var i,j="hover"==e?"mouseover":"click",k=this;return(i=function(b){var e=c(a);k.removeClass(d).eq(b).addClass(d),e.hide().eq(b).show(),(g||h).call(k.get(b),b,e.get(b))})(f),this.each(function(a){c(this).on(j,function(){i(a)})})},imgLoad:function(a,c){return a===b&&(a="_src"),"function"==typeof a&&(c=a,a="_src"),this.each(function(b){var d=new Image,e=this.src||"",f=this.getAttribute(a),g=this;"IMG"==this.tagName.toUpperCase()&&f&&(d.onload=function(){g.src=this.src,g.setAttribute(a,e),(c||h).call(g,this,b)},d.src=f)})},inputIn:function(a,b){return b&&(a=b[0]+a+b[1]),this.each(function(){var b,c,e,f,g,h,i=d.selection;this.focus(),h=this.value,i?(g=(g=this.getAttribute("_range"))?g.split("|"):[0,0],b=parseInt(g[0]),c=b+parseInt(g[1])):(b=this.selectionStart,c=this.selectionEnd),e=b+a.length,this.value=h.slice(0,b)+a+h.slice(c),this.focus(),i?(this.setAttribute("_range",e+"|0"),f=i.createRange(),f.moveStart("character",e-this.value.length),f.collapse(!0),f.select()):this.setSelectionRange(e,e)})},limit:function(a,b){return this.each(function(){var d=c(this),e=d.val(),f=c.textSize(e)/2;"function"==typeof b?b.call(this,Math.floor(a-f)):f>a&&d.val(c.textSize(e,2*a))})},inputs:function(a){function e(){var a,b=c(this),d=b.val(),e=k.defV&&b.attr(k.defV)||this.defaultValue,f=c.textSize(d)/2;e&&d==e&&g(e)||(a="number"==typeof k.limit?k.limit:b.attr(k.limit)?parseInt(b.attr(k.limit)):140,"function"==typeof k.fn?k.fn.call(this,Math.floor(a-f)):f>a&&b.val(c.textSize(d,2*a)))}function f(){if(d.selection){{var a,b=d.selection.createRange(),e=c(this),f=this.value,g=f.length,h=b.text.length,i=0;c.ie(8)}b.moveStart("character",-g),a=b.text;for(var j=0,k=a.length;k>j&&-1!=f.indexOf(a.slice(-(j+1)));j++);e.attr("_range",j-h+i+"|"+h)}}function g(a){return 0==k.values.length||c.inArray(a,k.values)>=0}var h,i,j,k={parent:"",values:[],defV:"_value",onF:"",onK:"",limit:!1,fn:!1,range:!1,events:!0},l=c.ltie(10);return c.extend(k,a),j=k.range&&c.ie(),h=k.parent?c(k.parent):this,i=k.parent?this.selector:b,h.on("focus",i,function(){var a=c(this),b=k.defV&&a.attr(k.defV)||this.defaultValue;b&&a.val()==b&&g(b)&&a.val(""),a.addClass(k.onF),k.events&&k.limit&&e.call(this)}).on("blur",i,function(){var a=c(this),b=a.val(),d=k.defV&&a.attr(k.defV)||this.defaultValue;(""==b||b==d)&&g(d)&&a.val(d).removeClass(k.onF+" "+k.onK),k.events&&k.limit&&e.call(this)}).on(l?"keyup":"input",i,function(){var a=c(this),b=a.val(),d=k.defV&&a.attr(k.defV)||this.defaultValue;a[""==b||b==d?"removeClass":"addClass"](k.onK),j&&f.call(this),k.limit&&e.call(this)}),k.limit&&(this.each(e),l&&this.on("paste",e)),j&&h.on("mouseup",i,f),this}}),c},d=a.document,e=a.navigator,f=a.jQuery,g=a.define;f&&f().jquery&&c(f),"function"==typeof g&&g.amd&&g(["jquery"],c)}(window);