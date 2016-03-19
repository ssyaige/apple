$(function(){
	var W=$(window).width()
	$('.gallery-content').css({'left':function(i){
            return i*W
		}})
	$(window).resize(function(){
		W=$(window).width()
		$('.gallery-content').css({'left':function(i){
            return i*W
		}})
	})
	//闭包   函数在定义的时候会记录下自己可见区域内的变量
	//       从远到近形成一个链条，成为作用域链
	//       函数在调用的时候，整个作用域链的变量都是可见状态的
	//       链条近处放入变量会覆盖远处放入变量
	// 常见用法1：用来消除全局变量
	// 常见用法2：传递临时状态

    var move=(function(){
        var index=1;
        return function(){
            $('.dotnav li').removeClass('current');
            $('.dotnav li').addClass(function(i,old){
            	$(this).removeClass(old)
            	if(i===index){
            		return 'current'
            	}
            })
        	var off=-index*W;
        	index+=1;
        	if(index===3){
        		index=0;
        	}
          $('.gallery-content').css({'transform':'translateX('+off+'px)'})
        }
    })()
    $('.dotnav li').each(function(i){
    	$(this).data('a',i)
    })
    $('.dotnav li').click(function(){
    	$('.dotnav li').removeClass('current');
    	$(this).addClass('current');
    	var off=-$(this).data('a')*W;
    	$('.gallery-content').css({'transform':'translateX('+off+'px)'});
    })
	var timeId=setInterval(move,2000)
})
