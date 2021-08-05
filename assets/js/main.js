$(document).ready(function() {
    
    /*========== Toggle ==========*/
    $(document).on('click', '.toggle', function() {
        $('.toggle').toggleClass('active');
        $('.toggle').toggleClass('move');
        $('nav').toggleClass('move');
        // $('nav').slideToggle();
        $('.upperlay').toggleClass('active');
        $('body').toggleClass('move');
    });
    $(document).on('click', '.upperlay', function() {
        $('.toggle').removeClass('active');
        $('.toggle').removeClass('move');
        $('nav').removeClass('move');
        $('.upperlay').removeClass('active');
        $('body').removeClass('move');
    });
    
    $('#lightSlider').lightSlider({
            gallery: true,
            item: 1,
            auto: true,
            loop: true,
            speed: 2500,
            pause: 8000,
            slideMargin: 0,
            enableDrag: false,
            thumbMargin: 4,
            thumbItem: 4
        });

    // ========faq's===========
    $('.acc h4').click(function(){
        $(this).next('.content').slideToggle();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().children('.content').slideUp();
        $(this).parent().siblings().removeClass('active');
    });
    /*----- Card Sec Bar -----*/
    $(document).on('click', '.cardSecBar .lblBtn', function() {
        var checkbox = $(this).parents('.lblBtn').find('input[type=radio]');
        checkbox.prop("checked", !checkbox.prop("checked"));
        $('.cardSec').slideDown('3000');
        $('.paypalSec').slideUp('3000');
    });
    $(document).on('click', '.paypalSecBar .lblBtn', function() {
        var checkbox = $(this).parents('.lblBtn').find('input[type=radio]');
        checkbox.prop("checked", !checkbox.prop("checked"));
        $('.paypalSec').slideDown('3000');
        $('.cardSec').slideUp('3000');
    });
    $('.qtyplus').click(function(e) {
        e.preventDefault();
        var parnt = $(this).parent().children('.qty');
        var currentVal = parnt.val();
        if (!isNaN(currentVal)) {
            parnt.val(parseInt(currentVal) + 1);
        } else {
            parnt.val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        e.preventDefault();
        var parnt = $(this).parent().children('.qty');
        var currentVal = parnt.val();
        if (!isNaN(currentVal) && currentVal > 0) {
            parnt.val(parseInt(currentVal) - 1);
        } else {
            parnt.val(0);
        }
    });

    /*========== File Upload ==========*/
    var imgFile;
    $(document).on('click', '#uploadDp', function() {
        imgFile = $(this).attr('data-file');
        $(this).parents('form').children('.uploadFile').trigger('click');
    });
    $(document).on('change', '.uploadFile', function() {
        // alert(imgFile);
        var file = $(this).val();
        $('.uploadImg').html(file);
    });

    
    /*========== Dropdown ==========*/
    $(document).on('click', '.dropBtn', function(e) {
        e.stopPropagation();
        var $this = $(this).parent().children('.dropCnt');
        $('.dropCnt').not($this).removeClass('active');
        var $parent = $(this).parent('.dropDown');
        $parent.children('.dropCnt').toggleClass('active');
    });
    $(document).on('click', '.dropCnt', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', function() {
        $('.dropCnt').removeClass('active');
    });
    /*----- video button -----*/


var vid = $('video');
    // var vid = document.getElementById("bannerVid");
    $(document).on('click', '.fa-play', function() {
      
        $(this).parents().children(vid).trigger('play');

        $(this).removeClass('fa-play').addClass('fa-pause');
    });
    $(document).on('click', '.fa-pause', function() {
        $(this).parents().children(vid).trigger('pause');

        $(this).removeClass('fa-pause').addClass('fa-play');
    });


    /*========== Popup ==========*/
    $(document).on('click', '.popBtn', function() {
        var popUp = $(this).data('popup');
        $('body').addClass('flow');
        $('.popup[data-popup= ' + popUp + ']').fadeIn();
    });
    $(document).on('click', '.crosBtn', function() {
        var popUp = $(this).parents('.popup').data('popup');
        $('body').removeClass('flow');
        $('.popup[data-popup= ' + popUp + ']').fadeOut();
    });

$('.datepicker').datepicker({
            dateFormat: 'MM dd, yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '1900:2060'
        });

        // Timepicker Js
        $('.timepicker').timepicki({
            reset: true
        });

        // Select Js
        $(document).ready(function () {
            $('.selectpicker').selectpicker();
        });
        
        // Data Table Js
        var sortOrder = ($('th.sortBy').index()>-1)?$('th.sortBy').index():0;
        $('.dataTable').DataTable({
            'order': [[
                sortOrder, 'asc'
            ]],
            'pageLength': 25,
            columnDefs: [{
                orderable: false,
                targets: 'no-sort'
            }],
            responsive: true
        });
        // rateYo
        $('.ratestars').rateYo({
            rating: 4.0,
            fullStar: true,
            // readOnly: true,
            normalFill: '#ddd',
            ratedFill: '#f6a623',
            starWidth: '14px',
            spacing: '2px'
        });

        $('#owl-SmBanner').owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            autoHeight: true,
            animateOut: 'fadeOut',
            smartSpeed: 1000,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items: 1,
                    autoplay: false,
                    dots: true
                },
                480:{
                    items: 1
                },
                991:{
                    items: 1
                },
                1200:{
                    items: 1
                }
            }
        });
        $('#owl-proBanner').owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            autoHeight: true,
            animateOut: 'fadeOut',
            smartSpeed: 1000,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items: 1,
                    autoplay: false,
                    dots: true
                },
                480:{
                    items: 1
                },
                991:{
                    items: 1
                },
                1200:{
                    items: 1
                }
            }
        });
        $('#owl-testi').owlCarousel({
            autoplay: true,
            dots: false,
            loop: true,
            center: true,
            autoWidth: true,
            autoHeight: true,
            smartSpeed: 1000,
            autoplayTimeout: 10000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items: 1,
                    autoplay: false,
                    autoHeight: true,
                    dots: true
                },
                600:{
                    items: 2
                },
                1000:{
                    items: 3
                }
            }
        });
        $('#clientLogo').owlCarousel({
            autoplay: true,
            nav: true,
            navText: ['<i class="fi-chevron-left"></i>', '<i class="fi-chevron-right"></i>'],
            // navText: [ 'prev', 'next' ],
            dots: false,
            loop:true,
            smartSpeed: 1000,
            autoplayTimeout: 10000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items: 2,
                    autoplay: false,
                    autoHeight: true,
                    dots: true,
                    nav:false
                },
                600:{
                    items: 4
                },
                1000:{
                    items: 4
                }
            }
        });


        



        var offSet = $('body').offset().top;
        var offSet = offSet + 150;
        $(window).scroll(function() {
            var scrollPos = $(window).scrollTop();
            if (scrollPos >= offSet) {
               $('header').addClass('fix'); 
            } else {
                $('header').removeClass('fix'); 
            }
        });

       
        

});


function textAreaAdjust(o) {
    o.style.height = '1px';
    o.style.height = (25 + o.scrollHeight) + 'px';
}

// smooth scroling effect================
// $("html").easeScroll();

/*========== Page Loader ==========*/
$(window).on('load', function() {
    $('.loader').delay(700).fadeOut();
    $('#pageloader').delay(1200).fadeOut('slow');
});

