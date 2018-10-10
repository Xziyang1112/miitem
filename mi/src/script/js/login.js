!function($){
    //点击切换登陆方式
    $('.saoma').on('click',function(){
        $('.saoma').addClass('now');
        $('.zhanghao').removeClass('now');
        $('.tab-bd1').hide();
        $('.tab-bd2').show();
    });
    $('.zhanghao').on('click',function(){
        $('.zhanghao').addClass('now');
        $('.saoma').removeClass('now');
        $('.tab-bd2').hide();
        $('.tab-bd1').show();
    });


	function addCookie(key,value,day){
        var date=new Date();//创建日期对象
        date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
        document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
    }
    $('#btn').on('click',function(){
        var $username=$('#username').val();
        var $password=$('#password').val();
        $.ajax({
            type:'post',
            url:'http://10.31.162.60/miitem/mi/php/login.php',
            data:{//将用户名和密码传输给后端
                name:$username,
                pass:$password
            },
            success:function(data){//请求成功，接收后端返回的值
                if(!data){//用户名或者密码错误
                    $('#error').show();
                    $('#password').val('');
                }else{//成功,存cookie,跳转到首页
                    $('.error').hide();
                    addCookie('UserName',$username,7);
                    location.href='http://10.31.162.60/miitem/mi/src/index.html';
                }
            }
        })
    });
}(jQuery);