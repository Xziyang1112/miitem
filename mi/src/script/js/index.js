//1.导入模块的公用部分
/* define([],function(){
	return{
		fn:!function($){
			//结构
			//轮播图
			var $lbSlider=$('.main_box_1 .lb-slider');
			$.ajax({
				url:'http://10.31.162.60/miitem/mi/php/getdatalbt.php',
				dataType:'json'
			}).done(function(data){
				var $lbstr='';
				$.each(data,function(index,value){
					if(index==0){
						$lbstr+=`<div class="slide" style="opacity:1"><a href="#"><img src="${value.url}"></a></div>`
					}else{
						$lbstr+=`<div class="slide"><a href="#"><img src="${value.url}"></a></div>`
					}		
				});
				$lbSlider.html($lbstr);
			})
			//为你推荐
			var $recList=$('.rec-list');
			$.ajax({
				url:'http://10.31.162.60/miitem/mi/php/getdatarec.php',
				dataType:'json'
			}).done(function(data){
				var $recstr='';
				$.each(data,function(index,value){
					$recstr+=`<li class="rec-item">
					<dl>
						<dt>
							<a href="#">
								<img src="${value.url}" alt="${value.name}">
							</a>
						</dt>
						<dd class="xm-recommend-name">
							<a href="#">${value.name}</a>
						</dd>
						<dd class="xm-recommend-price">${value.price}</dd>
						<dd class="xm-recommend-tips">${}</dd>
						<dd class="xm-recommend-notice"></dd>
					</dl>
				</li>`	
				});
				$lbSlider.html($recstr);
			})
		
		
		
		
			//效果
			$('.topcontent').load('header.html');
			//第一个参数：地址。
			//第二个参数：选择器。
			$('.footercontent').load('footer.html');
			//轮播图
			var $num=0;
			var $timer=null;
			//点击按钮
			$('.lb-pager a').on('click',function(){
				$num=$(this).index();
				imgchange($num);
			});
			//点击左键事件
			$('.lb-controls-direction .lb-next').on('click',function(){
				$num++;
				if($num>=5){
					$num=0;
				}
				imgchange($num);
			});
			//点击右键事件
			$('.lb-controls-direction .lb-prev').on('click',function(){
				$num--;
				if($num<=-1){
					$num=4;
				}
				imgchange($num);
			});
			//开启定时器
			$timer=setInterval(function(){
				$num++;
				if($num>=5){
					$num=0;
				}
				imgchange($num);
			},5000);
			$('.lb-viewport').hover(function(){
				clearInterval($timer);//鼠标滑过关闭定时器
			},function(){
				$timer=setInterval(function(){
					$num++;
					if($num>=5){
						$num=0;
					}
					imgchange($num);
				},5000);//鼠标移出开启定时器
			})
			//图片变换函数封装
			function imgchange(a){
				$('.lb-pager a').eq(a).addClass('active').siblings('a').removeClass('active');
				$('.lb-slider .slide').eq(a).animate({opacity:1},700).siblings('div').animate({opacity:0},700);
			}
		}(jQuery)
	}
}); */






//结构
!function ($) {
	$('.topcontent').load('header.html', function () {

		//select-region
		var $blackmu = $('.blackmu');
		var $selectRegion = $('.select-region');
		$selectRegion.on('click', function () {
			$('.modal').animate({
				top: 400,
			}, 100);
			$blackmu.show();
		})
		$blackmu.on('click', function () {
			$('.modal').animate({
				top: -500
			}, 100)
			$blackmu.hide();
		})
		$('.modal .close').on('click', function () {
			$('.modal').animate({
				top: -500
			}, 100)
			$blackmu.hide();
		})

		//小米手机
		var $miphone = $('.miphone');
		var $navMenuul = $('.navMenu .children-list');
		var $navMenuli = '';
		$('.navMenu').css('height', 0);
		$.ajax({
			url: 'http://10.31.162.60/miitem/mi/php/getdatanavMenu.php',
			dataType: 'json'
		}).done(function (data) {
			$.each(data, function (index, value) {
				if (index == 0) {
					$navMenuli += '<li class="first"><div class="figure figure-thumb"><a href="#"><img src="' + value.url + '" alt="' + value.title + '" width="160" height="110"></a></div><div class="title"><a href="#">' + value.title + '</a></div><p class="price">' + value.price + '</p></li>';
				} else {
					$navMenuli += '<li><div class="figure figure-thumb"><a href="#"><img src="' + value.url + '" alt="' + value.title + '" width="160" height="110"></a></div><div class="title"><a href="#">' + value.title + '</a></div><p class="price">' + value.price + '</p></li>';
				}
			});
		})
		$miphone.hover(function () {
			$('.navMenu').animate({
				height: 230
			}, function () {
				$navMenuul.html($navMenuli);
			})
		}, function () {
			$('.navMenu').animate({
				height: 0
			}, function () {
				$navMenuli2 = '';
				$navMenuul.html($navMenuli2);
			})
		})
		//登陆注册
		if(getCookie('UserName')){
			$('.top_right').hide();
			$('.topbar-info').show().find('.name').html(getCookie('UserName'));
		}
		$('.topbar-info .userexit').on('click',function(){
			delCookie('UserName','',-1);
			$('.topbar-info').hide();
			$('.top_right').show();
		});


		$('.topbar-info .user').hover(function(){
			$('.topbar-info .user-menu').animate({
				height:164
			},300)
		},function(){
			$('.topbar-info .user-menu').animate({
				height:0
			},300)
		})



	});
	$('.footercontent').load('footer.html');
	//轮播图
	var $lbSlider = $('.main_box_1 .lb-slider');
	$.ajax({
		url: 'http://10.31.162.60/miitem/mi/php/getdatalbt.php',
		dataType: 'json'
	}).done(function (data) {
		var $lbstr = '';
		$.each(data, function (index, value) {
			if (index == 0) {
				$lbstr += '<div class="slide" style="opacity:1"><a href="#"><img src="' + value.url + '"></a></div>';
			} else {
				$lbstr += '<div class="slide"><a href="#"><img src="' + value.url + '"></a></div>';
			}
		});
		$lbSlider.html($lbstr);
	})

	//小米闪购
	var $flrlist=$('.fl_bd_rlist');
	$.ajax({
		url: 'http://10.31.162.60/miitem/mi/php/getdatahdp.php',
		dataType: 'json'
	}).done(function (data) {
		var $flashstr = '';
		$.each(data, function (index, value) {
			$flashstr+=`<li class="rainbow-item${value.rainbow}">
		<a href="#" class="bga">
			<div class="bg"></div>
		</a>
			<div class="content">
				<a href="#" class="thumb"><img src="${value.url}" alt=""></a>
				<h3 class="title"><a href="#">${value.title}</a></h3>
				<p class="desc">${value.description}</p>
				<p class="price"><span>${value.price}</span>&nbsp;<span>元</span>&nbsp;&nbsp;<del>${value.del}元</del></p>
				
			</div>
		</li>`
		});
		$flrlist.html($flashstr);
	})
	 

	//为你推荐
	var $recList = $('.rec-list');
	$.ajax({
		url: 'http://10.31.162.60/miitem/mi/php/getdatarec.php',
		dataType: 'json'
	}).done(function (data) {
		var $recstr = '';
		$.each(data, function (index, value) {
			$recstr += '<li class="rec-item"><dl><dt><a href="#"><img src="' + value.url + '" alt="' + value.name + '"></a></dt><dd class="xm-recommend-name"><a href="#">' + value.name + '</a></dd><dd class="xm-recommend-price">' + value.price + '</dd><dd class="xm-recommend-tips">' + value.tips + '</dd><dd class="xm-recommend-notice"></dd></dl></li>'
		});
		$recList.html($recstr);
	})

}(jQuery);






//效果
!function ($) {
	//轮播图
	var $num = 0;
	var $timer = null;
	//点击按钮
	$('.lb-pager a').on('click', function () {
		$num = $(this).index();
		imgchange($num);
	});
	//点击左键事件
	$('.lb-controls-direction .lb-next').on('click', function () {
		$num++;
		if ($num >= 5) {
			$num = 0;
		}
		imgchange($num);
	});
	//点击右键事件
	$('.lb-controls-direction .lb-prev').on('click', function () {
		$num--;
		if ($num <= -1) {
			$num = 4;
		}
		imgchange($num);
	});
	//开启定时器
	$timer = setInterval(function () {
		$num++;
		if ($num >= 5) {
			$num = 0;
		}
		imgchange($num);
	}, 5000);
	$('.lb-viewport').hover(function () {
		clearInterval($timer);//鼠标滑过关闭定时器
	}, function () {
		$timer = setInterval(function () {
			$num++;
			if ($num >= 5) {
				$num = 0;
			}
			imgchange($num);
		}, 5000);//鼠标移出开启定时器
	})
	//图片变换函数封装
	function imgchange(a) {
		$('.lb-pager a').eq(a).addClass('active').siblings('a').removeClass('active');
		$('.lb-slider .slide').eq(a).animate({ opacity: 1 }, 700).siblings('div').animate({ opacity: 0 }, 700);
	}
	//为你推荐效果
	var $recnext = $('.recommend .control-next');
	var $recprev = $('.recommend .control-prev');
	var $recList = $('.rec-list');
	$recnext.on('click', function () {
		$recnext.addClass('control-disabled').siblings('a').removeClass('control-disabled');
		$recList.animate({
			left: -1226
		}, 500)
	})
	$recprev.on('click', function () {
		$recprev.addClass('control-disabled').siblings('a').removeClass('control-disabled');
		$recList.animate({
			left: 14
		}, 500)
	})
	//右边栏
	var $totopbtn = $('.right-bar-totop');
	$totopbtn.css("visibility", "hidden");
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 930) {
			$totopbtn.css("visibility", "visible");
		} else if ($(window).scrollTop() < 930) {
			$totopbtn.css("visibility", "hidden");
		}
	});
	$totopbtn.on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 0);
	})
	//楼梯
	var $louti = $('.stairs');//左侧楼梯
	var $loutili = $('.stairs li');
	var $louceng = $('#main .louti');
	$louti.hide();
	$(window).on('scroll', function () {
		var $scrolltop = $(window).scrollTop();//获取滚动条的top值。
		if ($scrolltop >=2390){
			$louti.show();
		} else {
			$louti.hide();
		}
	});
	//点击左侧楼梯，右边对应的楼层跳转。
	$loutili.not('.last').on('click', function () {
		$(this).addClass('active').siblings('li').removeClass('active');
		var $top = $louceng.eq($(this).index()).offset().top;
		$('html,body').animate({//赋值时考虑兼容。
			scrollTop: $top
		});
	});	
	//倒计时
	var djs={};
	var myDate=new Date();
	var year = myDate.getFullYear();//获取当前年
    var yue = myDate.getMonth()+1;//获取当前月
    var date = myDate.getDate();//获取当前日
	var starttime = new Date(year,yue,date,18,00,00);
	var time=starttime-myDate;
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		if (hour <= 9) {hour = '0' + hour;}
		if (minute <= 9) {minute = '0' + minute;}
    	if (seconds <= 9) {second = '0' + seconds;}
		$('.hourbox').html(hour);
		$('.minutebox').html(minute);
		$('.secondbox').html(seconds);
  	djs.timer=setInterval(function () {
    var nowtime = new Date();
	var time = starttime - nowtime;
	if(starttime - nowtime<=0){
		clearInterval(djs.timer);
	}else{
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		if (hour <= 9) {hour = '0' + hour;}
		if (minute <= 9) {minute = '0' + minute;}
    	if (seconds <= 9) {second = '0' + seconds;}
		$('.hourbox').html(hour);
		$('.minutebox').html(minute);
		$('.secondbox').html(seconds);
	} 
  }, 1000);
  //详情页点击跳转
  
}(jQuery);




