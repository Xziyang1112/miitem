//1.导入模块的公用部分
!function($){
	//加载头部
	$('.topcontent').load('header.html', function(){
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
	//加载尾部
	$('.footercontent').load('footer.html');
	//详情页
	var $sid=location.search.substring(1);
	if($sid=='sid=3'){
		$('.goods-info-head-size').show();
	}else{
		$('.goods-info-head-size').hide();
	}
	//console.log($sid);
	$.ajax({
		url: 'http://10.31.162.60/miitem/mi/php/getdetails.php?'+$sid,
		dataType: 'json'
	}).done(function (data){
		if(data.righturl){
			$('.goods-info-head-colors').show();
			var $righturl=data['righturl'].split(',');
		}else{
			$('.goods-info-head-colors').hide();
		}
		$lefturl=data['lefturl'].split(',');
		//console.log($lefturl);
		$leftstr= '';
		$('.goods-name').html(data.name);//标题
		$('.goods-subtitle p').html(data.subtitle);//副标题
		$('.J_mi_goodsPrice').html(data.price);//价格
		$('.pingjia').html(data.comment);//评价
		$('.tiwen').html(data.question);//提问
		$('.manyidu').html(data.agree+'%')//满意度
		$.each($lefturl, function (index, value) {
			if(index==0){
				$leftstr+='<li class="current"><img src="'+value+'" alt=""></li>';
				$('.zoom-big-block .img').css({
					"background-image":"url("+value+")"
				});
				var $bigpstr='';
				$bigpstr+='<img src="'+value+'" class="J_goodsBigPic" id="J_BigPic"></img>';
				$('.goods-big-pic').html($bigpstr);
			}else{
				$leftstr+='<li><img src="'+value+'" alt=""></li>';
			}	
		});
		var $rightstr='';
		$.each($righturl, function (index, value) {
			if(index==0){
				$rightstr+='<div class="colorli"><a href="#" class="current"><img class="square" src="'+value+'"></a></div>';
			}else{
				$rightstr+='<div class="colorli"><a href="#"><img class="square" src="'+value+'"></a></div>';
			}
		});
		$('.goodsPicList').html($leftstr);
		$('.rightpiclist').html($rightstr);
		$('.zoom-sml-list').html($('.goodsPicList').html());
		//点击图片改变url
		/* $('.goodsPicList').on('click',function(event){
			$('.goodsPicList').find('li').removeClass('current');
			var $this=event.target;
			if(event.target.nodeName=="IMG"){
				var $bigpstr='';
				$this.parentNode.setAttribute("class",'current');
				$bigpstr+='<img src="'+$this.src+'" class="J_goodsBigPic" id="J_BigPic"></img>';
				$('.goods-big-pic').html($bigpstr);
				$('.zoom-big-block .img').css({
					"background-image":"url("+$this.src+")"
				});
			}
			$('.zoom-sml-list').html($('.goodsPicList').html());
		});

		 $('.zoom-sml-list').on('click',function(event){
			$('.zoom-sml-list').find('li').removeClass('current');
			var $this=event.target;
			if(event.target.nodeName=="IMG"){
				var $bigpstr='';
				$this.parentNode.setAttribute("class",'current');
				console.log($('.zoom-sml-list .current').index());
				$bigpstr+='<img src="'+$this.src+'" class="J_goodsBigPic" id="J_BigPic"></img>';
				$('.goods-big-pic').html($bigpstr);
				$('.zoom-big-block .img').css({
					"background-image":"url("+$this.src+")"
				});
			}
		})  */
		//小图list
		var $index=0;
		var $smlli=$('.goodsPicList li');
		var $bigli=$('.zoom-sml-list li');
		var $bigbg=$('.zoom-big-block .img');
		var $bigpic=$('.goods-big-pic');
		var $zoomprev=$('.zoom-big-nav .left-nav');
		var $zoomnext=$('.zoom-big-nav .right-nav');
		$smlli.on('click',function(){
			$index=$(this).index();
			$(this).addClass('current').siblings('li').removeClass('current');
			$bigli.eq($(this).index()).addClass('current').siblings('li').removeClass('current');
			$bigbg.css({
				"background-image":"url("+$(this).children().attr('src')+")"
			});
			var $bigpstr='';
			$bigpstr+='<img src="'+$(this).children().attr('src')+'" class="J_goodsBigPic" id="J_BigPic"></img>';
			$bigpic.html($bigpstr);
			if($index>=$smlli.length-1){
				$zoomnext.hide();
				$index==$smlli.length-1;
			}else{
				$zoomnext.show();
			}
			if($index<=0){
				$zoomprev.hide();
			}else{
				$zoomprev.show();
			}
		});
		//巨幕list
		 $bigli.on('click',function(){
			$index=$(this).index();
			$(this).addClass('current').siblings('li').removeClass('current');
			$smlli.eq($(this).index()).addClass('current').siblings('li').removeClass('current');
			$bigbg.css({
				"background-image":"url("+$(this).children().attr('src')+")"
			});
			var $bigpstr='';
			$bigpstr+='<img src="'+$(this).children().attr('src')+'" class="J_goodsBigPic" id="J_BigPic"></img>';
			$bigpic.html($bigpstr);
			if($index>=$smlli.length-1){
				$zoomnext.hide();
				$index==$smlli.length-1;
			}else{
				$zoomnext.show();
			}
			if($index<=0){
				$zoomprev.hide();
			}else{
				$zoomprev.show();
			}
		}); 
		//点击巨幕显示
		$bigpic.on('click',function(){
			$('.goods-pic-zoom-block').show();
			//console.log($('.zoom-sml-list').find('li'));
		});
		//点击巨幕消失
		$('.goods-pic-zoom-block .exit-btn').on('click',function(){
			$('.goods-pic-zoom-block').hide();
		})
		//巨幕按钮效果
		//var $smlli=$('.goodsPicList li');
		//var $bigli=$('.zoom-sml-list li');
	
		if($smlli.length==1){
			$zoomnext.hide();
			$zoomprev.hide();
		}else{
			if($index>=$smlli.length-1){
				$zoomnext.hide();
				$index==$smlli.length-1;
			}else{
				$zoomnext.show();
			}
			if($index<=0){
				$zoomprev.hide();
			}else{
				$zoomprev.show();
			}
		}
		$zoomnext.on('click',function(){
			console.log($('.goodsPicList li').length);
			$index=$('.goodsPicList .current').index();
			$index++;
			$zoomprev.show();
			$(this).show();
			var $smli=$smlli.eq($index);
			$smli.addClass('current').siblings('li').removeClass('current');
			$bigli.eq($index).addClass('current').siblings('li').removeClass('current');
			$bigbg.css({
				"background-image":"url("+$smli.children().attr('src')+")"
			});
			var $bigpstr='';
			$bigpstr+='<img src="'+$smli.children().attr('src')+'" class="J_goodsBigPic" id="J_BigPic"></img>';
			$bigpic.html($bigpstr);
			if($index>=$smlli.length-1){
				$(this).hide();
				$index==$smlli.length-1;
			}else{
				$(this).show();
			}
		})
		$zoomprev.on('click',function(){
			$index=$('.goodsPicList .current').index();
			$index--;
			$(this).show();
			$zoomnext.show();
			var $smli=$('.goodsPicList li').eq($index);
			$smli.addClass('current').siblings('li').removeClass('current');
			$bigli.eq($index).addClass('current').siblings('li').removeClass('current');
			$bigbg.css({
				"background-image":"url("+$smli.children().attr('src')+")"
			});
			var $bigpstr='';
			$bigpstr+='<img src="'+$smli.children().attr('src')+'" class="J_goodsBigPic" id="J_BigPic"></img>';
			$bigpic.html($bigpstr);
			if($index<=0){
				$(this).hide();
			$index==0;
			}else{
				$(this).show();
			}
		})
		//尺码效果
		$('#J_goodsSize li').on('click',function(){
			$(this).addClass('current').siblings('li').removeClass('current');
		})
	})
}(jQuery);