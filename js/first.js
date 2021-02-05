$(function (){
    const navHeight = $(".navigation").innerHeight()
    $(".nav-box").css({height : navHeight})
    $(window).scrollTop(0);
    const sec1Offset = $("#home").offset().top;
    $('a').click(function (e){
        e.preventDefault(); // to prevent loading the page again
        const eleOffset = ($("#" + $(this).data("scroll")).offset().top)
            
        $("html , body").animate (
            {
                scrollTop: (eleOffset - sec1Offset +2)
            } , 
            500
        );
        // add class active
        $(".navigation li ").each(function(){
            $(this).find("a").removeClass("active")
        })
        $(this).addClass("active")
        
    })
    // change active class on scrolling between navbars
    $(window).scroll(function(){
        $("section").each(function(){
            if ($(window).scrollTop() >= ($(this).offset().top - sec1Offset) && $(window).scrollTop() < ($(this).offset().top + $(this).innerHeight()) ) {
                const secId = $(this).attr("id")
                $(".navigation li a").removeClass("active")
                $(".navigation li a[data-scroll = "+secId+"]" ).addClass("active")
            }
        });
        
    }) 
    //Scroll to top button
    
    $(window).scroll(function(){
        if ($(window).scrollTop() <= 500) {
            $(".scrTop").fadeOut(500)
        } else {
            $(".scrTop").fadeIn(500)
        }
    })
    $(".scrTop").click(function () {
        $("html , body").animate({ scrollTop: 0 }, 500)
    })
    /* pop Up imgs  */
    const secImg = $("section .img"),
        popLayer = $(".pop-layer")
    popLayer.fadeOut(100);
    secImg.each(function(){
        $(this).click(function () {
            const imgSrc = $(this).attr("src");
            popLayer.fadeIn(500);
            $(".pop-layer .pop-img").attr("src",imgSrc);
        })
    })

    $(".pop-layer .close-pop span , .pop-layer").click(function(){
        popLayer.fadeOut(500);
    })
    
    $(".pop-layer .pop-img").click(function (e) {
        e.stopPropagation()
    })
    //press (ecs) key to close popup
    $(document).keydown(function(e){
        if (e.keyCode == 27) {
            popLayer.fadeOut(500);
        }
    })
    //start animated progress bar
    $(window).scroll(function (){
        $(".container-progress").each(function(){
            if ($(window).scrollTop() > ($(this).offset().top - $(window).innerHeight()) && $(window).scrollTop() < ($(this).offset().top - $(window).innerHeight() + $(this).innerHeight())  ) {
                $(this).find(".progress-percent").each(function(){
                    $(this).animate({width : $(this).attr("data-progress")+"%"} ,
                    700 ,
                    function(){
                        $(this).parent().siblings(".percent-val").text($(this).attr("data-progress"))
                    })
                })
            }
        })
    }) 
    // Start fixed Menu bar
    $(".fixed-menu").offset({ top: ((.5 * $(window).innerHeight()) - (.5 * $(".fixed-menu").innerHeight()))})
    $(".fixed-menu").offset({ left:(-1) * ($(".fixed-menu").innerWidth())})
    $(".fixed-menu .control-fixed-menu").click(function(){
        if($(this).offset().left == 0){
            $(".fixed-menu").animate({ left: 0 }, 500)
        }else{
            $(".fixed-menu").animate({ left: (-1) * ($(".fixed-menu").innerWidth()) }, 500)
        }
    })
    // change page color
    $(".fixed-menu .color-box span").each(function(){
        $(this).click(function(){
            let pageColor = $(this).css("backgroundColor");
            $("body p , body h2").each(function(){
                $(this).css({color : pageColor})
            });
        })
    })
    // start Thumbnail section
    const bigImg = $(".thumbnail .show-img img")
    let smallImg = $(".thumbnail .small-imgs img ");

    smallImg.click(function(){
            if (bigImg.attr("src") != $(this).attr("src")) {
                bigImg.fadeOut(100);
                bigImg.css({ display: "none" }).attr("src", $(this).attr("src"))
                bigImg.fadeIn(200);
                $(".thumbnail .small-imgs ").children().removeClass('selected')
                $(this).addClass('selected')
            }
            if ($(this).is(':last-child')) {
                nextImg.addClass('pointer-none')
            }else{
                nextImg.removeClass('pointer-none')
            }
        if ($(this).is(':first-child')) {
            lastImg.addClass('pointer-none')
    }else
            lastImg.removeClass('pointer-none')
        })

    // divide small imgs width on its section width
    let smallSecWidth = $('.thumbnail .small-imgs ').innerWidth(),
        imgCount = $('.thumbnail .small-imgs ').children().length
    imgWidth = (.95 * smallSecWidth) / imgCount;
    totMargin = (.05 * smallSecWidth);
    imgMargin = totMargin / (2 * imgCount);
    smallImg.each(function(){
        $(this).css({
            width : imgWidth ,
            marginLeft : imgMargin ,
            marginRight : imgMargin
        })
    })
    
    
    //next img
    let nextImg = $(".thumbnail .show-img i.fa-arrow-right")
    var selectedImg;
    nextImg.click(function(){
        lastImg.removeClass('pointer-none')
        selectedImg = smallImg.parent().find('.selected');
        smallImg.each(function(){
            $(this).removeClass('selected')
        })
        selectedImg.next().addClass('selected')
        bigImg.fadeOut(100);
        bigImg.css({ display: "none" }).attr("src", selectedImg.next().attr("src"))
        bigImg.fadeIn(200);
        if (selectedImg.next().is(':last-child')) {
            $(this).addClass('pointer-none')
        }else{
            $(this).removeClass('pointer-none')
        }
        
    })
    //last img
    let lastImg = $(".thumbnail .show-img i.fa-arrow-left");
    lastImg.addClass('pointer-none')
    lastImg.click(function(){
        nextImg.removeClass('pointer-none')
        selectedImg = smallImg.parent().find('.selected');
        smallImg.each(function () {
            $(this).removeClass('selected')
        })
        selectedImg.prev().addClass('selected');
        bigImg.fadeOut(100);
        bigImg.css({ display: "none" }).attr("src", selectedImg.prev().attr("src"))
        bigImg.fadeIn(200);
        if (selectedImg.prev().is(':first-child')) {
            $(this).addClass('pointer-none')
        }else{
            $(this).removeClass('pointer-none')
        }
        
        
    })
    
    // start  Product description section
    let descInfo = $('.prod-desc .desc-info'),
        descHeader = $('.prod-desc .desc-header')
        descInfo.slideUp();
    descHeader.each(function(){
            $(this).click(function (){
                $(this).siblings('.desc-info').slideToggle();
                $(this).find('i').toggleClass('rotate');
            })
        })
        //  start grid and list products
    let product = $('.product-container .prods ')
    $('.product-container div .fa-border-none').click(function(){
        if (product.hasClass('list')) {
            product.fadeOut(200 , function(){
                $(this).removeClass('list').addClass('grid').fadeIn(200)
            })
        }
        
    })
    $('.product-container div .fa-bars').click(function () {
        if (product.hasClass('grid')) {
            product.fadeOut(200, function () {
                $(this).removeClass('grid').addClass('list').fadeIn(200)
            })
        }
    })

/* Satrt form coDe */
// 1 - remove placeholder on focus
let userName = $('#contact-us .form input[type = text]').attr('placeholder'),
    email = $('#contact-us .form input[type = email]').attr('placeholder'),
    password = $('#contact-us .form input[type = password]').attr('placeholder'),
    submit = $('#contact-us .form input[type = submit]').attr('placeholder'),
    textArea = $('#contact-us .form textarea').attr('placeholder');
    
$('#contact-us .form form div').children().each(function(){
    $(this).focus(function(){
        placeholder = $(this).attr('placeholder')
        $(this).attr('placeholder' , '')

    })
    $(this).blur(function(){
        $(this).attr('placeholder', placeholder);
        if($(this).val() == ""){
            $(this).next('span').fadeIn(400).delay(1000).fadeOut(400)
        }
    })
})
$('.footer').css({
    height: $('.form').innerHeight()
}) 

// buttons Effects
function slideButton(selector ) {
    $(selector).click(function () {
        $(this).find('.slide').animate(
            {
                height : '100%',
                width : '100%' 
            }, 300)
    })
}
slideButton('.footer .slide-background .top');
slideButton('.footer .slide-background .bottom');
slideButton('.footer .slide-background .left');
slideButton('.footer .slide-background .right')
function slideBorder(selector , height , width) {
    $(selector).click(function () {
        $(this).find('.slide').animate(
            {
                height: height,
                width: width
            }, 400)
    })
}

slideBorder('.footer .slide-border .top' , '4px' , '100%');
slideBorder('.footer .slide-border .bottom' , '4px' , '100%');
slideBorder('.footer .slide-border .left' , '100%' , '4px');
slideBorder('.footer .slide-border .right' , '100%' , '4px')
/* satrt cards */
let marginLeft = 0,
topCard = 0,
    step = 30,
    zIndex = 3
$('.cards .card').each(function(){
    $(this).css({
        marginLeft: marginLeft+=step,
        top: topCard+=(.333*step)
    })
    
})
    maxMargin = $('.cards .card:last-child').css('margin-left')
    $('.cards .card').click(function () { 
        let interval = 0;           
            for (let i = 0; i < $('.cards .card').length; i++) {
                if (parseInt($(this).css('margin-left')) < parseInt($('.cards .card').eq(i).css('margin-left'))) {
                    interval = interval + 1;
                    $('.cards .card').eq(i).css({
                        marginLeft : "-=" + step ,
                        top:  "-=" +  (.333 * step)
                    })
                }
            }
            $(this).animate({
                left: 200,
            }, 100, function () {
                $(this).animate({
                    left: 0,
                    marginLeft: parseInt($(this).css('margin-left')) + (interval * step),
                    top: parseInt($(this).css('top')) + (interval * step)*(.333)
                }, 100).css({
                    zIndex: zIndex++
                })
            })
        
    })
    
})