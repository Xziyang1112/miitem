//1.导入模块的公用部分
!function($){
	//第一个参数：地址。
	//第二个参数：选择器。
	$('.footercontent').load('footer.html');
	$('.user').hover(function(){
		$('.user-menu').show();
		$('.user-menu').animate({
			height:150
		},300)
	},function(){
		$('.user-menu').animate({
			height:0
		},300,function(){
			$('.user-menu').hide();
		})
	})
	if(getCookie('UserName')){
		$('.login').hide();
		$('.registor').hide();
		$('.order').show();
		$('.btn-login').hide();
		$('.user').show();
		$('.user .name').html(getCookie('UserName'));
		$('.login-desc').hide();
	}else{
		$('.login').show();
		$('.registor').show();
		$('.order').hide();
		$('.btn-login').show();
		$('.user').hide();
		$('.login-desc').show();
	}
	$('.exit-btn').on('click',function(){
		delCookie('UserName', '', -1);
		$('.login').show();
		$('.registor').show();
		$('.order').hide();
		$('.btn-login').show();
		$('.user').hide();
		$('.login-desc').show();
	})
	//将推荐商品的数据渲染出来
	$.ajax({
		url:'http://10.31.162.60/miitem/mi/php/getdatacart.php',
		dataType:'json'
	}).done(function(data){
		var $html='';
		$.each(data,function(index,value){
			if(index>=6){
				$html+=` <li class="xm-recommend-list">
				<dl>
					<dt><a href="#"><img src="${value.url}" alt="${value.name}" sid="${value.sid}"></a></dt>
					<dd class="xm-recommend-name"><a href="#"> ${value.name} </a></dd>
					<dd class="xm-recommend-price">${value.price}元</dd>
					<dd class="xm-recommend-tips">${value.tips}<a href="javascript:;" class="btn">加入购物车</a></dd>
				</dl>
			</li>`
			}
		})
		$('.cart-recommend ul').html($html);
	});

	function createcart(sid,num){
		$.ajax({
			url:'http://10.31.162.60/miitem/mi/php/getdatacart.php',
			dataType:'json'
		}).done(function(data){
			for (var i = 0; i < data.length; i++) {
				if(sid==data[i].sid){
					var $clone=$('.list-body:hidden').clone(true);
					$clone.find('.col-img').find('img').attr('src',data[i].url);
					$clone.find('.col-img').find('img').attr('sid',data[i].sid);
					$clone.find('.col-name').find('a').html(data[i].name);
					$clone.find('.col-price .price').html(data[i].price);
					$clone.find('.change-goods-num').find('input').val(num);
					var $dj1=parseFloat($clone.find('.col-price .price').text());
					$clone.find('.col-total .smtotal').html(($dj1*num).toFixed(2));
					$clone.css('display','block');
					$('.cart-goods-list').append($clone);
					kong();
					totalprice();
				}
			}
		})
	}

	var sidarr=[];
	var numarr=[];
	function cookieToArray(){
		if(getCookie('cartsid')){
			sidarr=getCookie('cartsid').split(',');
		}
		if(getCookie('cartnum')){
			numarr=getCookie('cartnum').split(',');
		}
	}
	$('.cart-recommend ul').on('click','.btn',function(){
		var sid=$(this).parents('dl').find('img').attr('sid');
		cookieToArray();
		if($.inArray(sid,sidarr)!=-1){
			$('.list-body:visible').each(function(){
				if(sid==$(this).find('img').attr('sid')){
					var $num=$(this).find('.change-goods-num input').val();
					$num++;
					$(this).find('.change-goods-num input').val($num);
					var $dj=parseFloat($(this).find('.col-price .price').html());
					$(this).find('.col-total .smtotal').html(($dj*$num));

					numarr[$.inArray(sid,sidarr)]=$num;
					addCookie('cartnum', numarr.toString(), 7);
					totalprice();
				}
			});
		}else{
			sidarr.push(sid);//将当前id添加到数组里面。
			addCookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
			numarr.push(1);//走这里数量都是1.
			addCookie('cartnum', numarr.toString(), 7);
			createcart(sid, 1);
			totalprice();
		}
	});

	if (getCookie('cartsid') && getCookie('cartnum')) {
		var s = getCookie('cartsid').split(',');//存放sid数组
		var n = getCookie('cartnum').split(',');//存放数量数组
		for (var i = 0; i < s.length; i++) {
			createcart(s[i], n[i]);//遍历创建商品列表
		}
	}

	kong();
	function kong() {
		if (getCookie('cartsid')) {//cookie存在，有商品，购物车不再为空
			$('.cart-empty').hide();
			$('.cartbox').show();
		} else {
			$('.cart-empty').show();
			$('.cartbox').hide();
		}
	}


	function totalprice(){
		var total = 0;//总的价格
		var countnum = 0;//总的数量
		var znum=0;
		$('.list-body:visible').each(function(){
			if($(this).find('.icon-checkbox').hasClass('icon-checkbox-selected')){
				total+=parseFloat($(this).find('.col-total .smtotal').html());
				countnum+=parseInt($(this).find('.change-goods-num input').val());
			}
		});
		$('.list-body:visible').each(function(){
			if($(this).find('.icon-checkbox')){
				znum+=parseInt($(this).find('.change-goods-num input').val());
			}
		});
		if(total==0){
			$('.cart-bar .btn').addClass('btn-disabled');
			$('.no-select-tip').show();	
		}else{
			$('.cart-bar .btn').removeClass('btn-disabled');
			$('.no-select-tip').hide();	
		}
		$("#J_cartTotalPrice").html(total.toFixed(2));
		$('#J_selTotalNum').html(countnum);
		$('#J_cartTotalNum').html(znum);
	}

	$('.J_plus').on('click',function(){
		var $count = $(this).parents('.list-body').find('.change-goods-num input').val();
		$count++;
		if($count>=99){
			$count=99;
		}
		$(this).parents('.list-body').find('.change-goods-num input').val($count);
		$(this).parents('.list-body').find('.smtotal').html(singlegoodsprice($(this)));
		totalprice();
		setcookie($(this));
	});


	$('.J_minus').on('click',function(){
		var $count = $(this).parents('.list-body').find('.change-goods-num input').val();
		$count--;
		if($count<=1){
			$count=1;
		}
		$(this).parents('.list-body').find('.change-goods-num input').val($count);
		$(this).parents('.list-body').find('.smtotal').html(singlegoodsprice($(this)));
		totalprice();
		setcookie($(this));
	});


	$('.change-goods-num input').on('input', function() {
		var $reg = /^\d+$/g; //只能输入数字
		var $value = parseInt($(this).val());
		if ($reg.test($value)) {
			if ($value >= 99) {//限定范围
				$(this).val(99);
			} else if ($value <= 0) {
				$(this).val(1);
			} else {
				$(this).val($value);
			}
		} else {
			$(this).val(1);
		}
		$(this).parents('.list-body').find('.smtotal').html(singlegoodsprice($(this)));//改变后的价格
		totalprice();
		setcookie($(this));
	});

	function singlegoodsprice(row) { //row:当前元素
		var $dj = parseFloat(row.parents('.list-body').find('.col-price .price').html());
		var $cnum = parseInt(row.parents('.list-body').find('.change-goods-num input').val());
		return ($dj * $cnum).toFixed(2);
	}

	function setcookie(obj) { //obj:当前操作的对象
		cookieToArray();
		var $index = obj.parents('.list-body').find('img').attr('sid');
		numarr[sidarr.indexOf($index)] = obj.parents('.list-body').find('.change-goods-num input').val();
		addCookie('cartnum', numarr.toString(), 7);
	}

	//删除
	function delgoodslist(sid, sidarr) {//sid：当前的sid，sidarr:cookie的sid的值
		var index = -1;
		for (var i = 0; i < sidarr.length; i++) {
			if (sid == sidarr[i]) {
				index = i;
			}
		}
		sidarr.splice(index, 1);//删除数组对应的值
		numarr.splice(index, 1);//删除数组对应的值
		addCookie('cartsid', sidarr.toString(), 7);//添加cookie
		addCookie('cartnum', numarr.toString(), 7);
	}

	$('.cart-goods-list').on('click', '.col-action a', function(ev){
		cookieToArray(); //转数组
	   if(confirm('你确定要删除吗？')){
		 $(this).first().parents('.list-body').remove();
	   }
		delgoodslist($(this).first().parents('.list-body').find('img').attr('sid'), sidarr);
		totalprice();
	});
	//全选
	$('.list-head .icon-checkbox').on('click',function(){
		if($(this).hasClass('icon-checkbox-selected')){
			$(this).removeClass('icon-checkbox-selected');
			$('.list-body:visible').find('.icon-checkbox').removeClass('icon-checkbox-selected');
			totalprice();
		}else{
			$(this).addClass('icon-checkbox-selected');
			$('.list-body:visible').find('.icon-checkbox').addClass('icon-checkbox-selected');
			totalprice();
		}
	});
	$('.list-body .icon-checkbox').on('click',function(){
		if($(this).hasClass('icon-checkbox-selected')){
			$(this).removeClass('icon-checkbox-selected');
		}else{
			$(this).addClass('icon-checkbox-selected');
		}
	});
	var $inputchecked=$('.list-body:visible').find('.icon-checkbox');
	$('.cart-goods-list').on('click', $inputchecked, function() {
		if($(this).hasClass('icon-checkbox-selected')){
			$(this).removeClass('icon-checkbox-selected');
		}else{
			$(this).addClass('icon-checkbox-selected');
		}
		var $inputs = $('.list-body:visible').find('.icon-checkbox'); //放内部
		if ($('.list-body:visible').find('.icon-checkbox-selected').length == $inputs.size()) {
			$('.list-head .icon-checkbox').addClass('icon-checkbox-selected');
		} else {
			$('.list-head .icon-checkbox').removeClass('icon-checkbox-selected');
		}
		totalprice();
	});
}(jQuery);