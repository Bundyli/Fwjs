/**
 * Created by Administrator on 2018/2/21.
 */

$(function () {
/*动态的响应式轮播图*/
    banner();
    // 初始化页签
    initTab();
    // 初始化页面上的工具提示
    $('[data-toggle="tooltip"]').tooltip();
});

var banner = function (){
    /*
    * 1.准备数据（模拟数据）
    * 2.判断当前的设备是移动端还是非移动端 768px
    * 3.根据设备将数据转化成html 拼接字符串
    *  点容器内容需要动态生成
    *  图片盒子内容需要动态生成
    * 4.渲染到页面当中 追加即可
    * 5.测试不同设备能否响应
    *  监听页面尺寸改变 重新渲染页面
    * 6.移动端手势切换功能 左右滑动
    *
    * */
    // 获取需要操作的元素
    var $banner = $('.carousel');
    var $point = $banner.find('.carousel-indicators');
    var $image = $banner.find('.carousel-inner');
    var $window = $(window);

    // 1.准备数据（模拟数据）
    var data = [
        {
            pcSrc:'images/slide_01_2000x410.jpg',
            mSrc:'images/slide_01_640x340.jpg'
        },
        {
            pcSrc:'images/slide_02_2000x410.jpg',
            mSrc:'images/slide_02_640x340.jpg'
        },
        {
            pcSrc:'images/slide_03_2000x410.jpg',
            mSrc:'images/slide_03_640x340.jpg'
        }
    ];
    // 渲染操作
    var render = function () {
        // 2.判断当前的设备是移动端还是非移动端 768px
        var isMobile = $window.width() < 768 ?true :false;
        // 3.根据设备将数据转化成html 拼接字符串
        var pointHtml = ''
        var imageHtml = '';
        // 根据数据来拼接
        $.each(data, function (k,v) {
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+k+'" '+(k==0?'class="active"':'')+'></li>'

            imageHtml += '<div class="item '+(k==0?'active':'')+'">';
            // 根据需要追加
            if(isMobile){
                imageHtml += '<a href="#" class="m_imgBox"><img src="'+v.mSrc+'"></a>';
            }else {
                imageHtml += '<a href="#" class="pc_imgBox" style="background-image: url('+v.pcSrc+')"></a>';
            }
            imageHtml += '</div>';
        });
            // 4.渲染页面
            $point.html(pointHtml);
            $image.html(imageHtml);
    }

    // render(); trigger('resize')加上即页面刷新，主动触发resize事件

    // 5.测试不同设备能否响应   监听页面尺寸改变 重新渲染页面
    $window.on('resize',function () {
        // console.log($window.width());
        render();
    }).trigger('resize');

    // 6.移动端手势切换功能 左右滑动
    // 通过jQuery也是可以绑定touch事件的
    /*
    * 注意：
    * 1.在event对象当中，没有touches集合
    * 2.e.originalEvent中有
    *
    * */
    var starx = 0;
    var distancex = 0;
    var isMove = false;
    $banner.on('touchstart', function (e) {
         startx = e.originalEvent.touches[0].clientX;
    });
    $banner.on('touchmove', function (e) {
        var movex = e.originalEvent.touches[0].clientX;
        distancex = movex-starx;
        isMove = true;
    });
    $banner.on('touchend', function (e) {
        // 手势
        /*
        * 1.滑动过
        * 2.移动的距离超过50px，认为是手势
        *
        * */
        if(isMove && Math.abs(distancex) >= 50){
            // 向右滑动
            $banner.carousel('prev');
        }else {
            // 向左滑动
            $banner.carousel('next');
        }
        // 重置
        starx = 0;
        distancex = 0;
        isMove = false;
    });

}

var initTab = function () {
    /*
    * 1.把所有的页签在一行显示 设置父容器的宽度是所欲自容器的宽度之和
    * 2.满足区域滚是哪个的html结构要求 必须有大容器套着一个小容器
    * 3.实现区域滑动功能 使用区域滚动插件
    *
    * */
    var tabs = $('.wjs_product .nav-tabs');
    // 所有的子容器
    var liList = tabs.find('li');
    //  1.把所有的页签在一行显示 设置父容器的宽度是所欲自容器的宽度之和
    var width =0;
    $.each(liList, function (i,item) {
        // width 是获取内容的宽度
        /*innerWidth 内容和内边距的宽度
        * outerWidth 内容和内边距和边框的宽度
        * outerWidth(true)内容和内边距，边框，外边距的宽度
        * */
        width += $(item).outerWidth(true);
    });
    tabs.width(width);
    //2.满足区域滚是哪个的html结构要求 必须有大容器套着一个小容器
    //3.实现区域滑动功能 使用区域滚动插件
    new IScroll('.nav-tabs-parent',{
        scrollX: true,
        scrollY: false
    });
}