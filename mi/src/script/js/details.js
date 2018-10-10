//1.导入模块的公用部分
!function($){
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
	//第一个参数：地址。
	//第二个参数：选择器。
	var $sid=location.search.substring(1);
	//console.log($sid);
	$('.footercontent').load('footer.html');
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
			}else{
				$leftstr+='<li><img src="'+value+'" alt=""></li>';
			}	
		});
		var $rightstr='';
		$.each($righturl, function (index, value) {
			if(index==0){
				$rightstr+='<div class="colorli"><a href="#" class="current"><img class="square" src="'+value+'"></a></div>'
			}else{
				$rightstr+='<div class="colorli"><a href="#"><img class="square" src="'+value+'"></a></div>'
			}
		});
		$('.goodsPicList').html($leftstr);
		$('.rightpiclist').html($rightstr);
	})

}(jQuery);