
var needToConfirm = false;
window.onbeforeunload = confirmExit;
function confirmExit()
{
    if (needToConfirm)
      return "You have attempted to leave this page while form submission is in progress. Are you sure?";
}
/* ----------------- Start Document ----------------- */
(function($){
    "use strict";

    $(document).ready(function(){
    /*----------------------------------------------------*/
    /*  Ajax Form
    /*----------------------------------------------------*/
    // $('.frmAjax').validate({ 
    //     errorPlacement: function(){
    //         return false;  // suppresses error message text
    //     }
    // });

    // if((typeof recaptcha !== 'undefined') && recaptcha){
    //    var frmAjax='';
    //    $(document).on('click','.frmAjax button[type="submit"]',function(e){
    //         e.preventDefault();f
    //         frmAjax=$(this).parents('.frmAjax');

    //         if(frmAjax.valid()){
    //             if($("#g-recaptcha-response").val()){
    //                 frmAjax.submit();
    //             }
    //             else
    //                 grecaptcha.execute();
    //         }
    //     })
    //     /*onSubmit=function (token) {
    //         frmAjax.submit();
    //     }*/
    // }

    

    $(document).on('submit','.frmAjax',function(e){
        needToConfirm = true;
        var frmbtn=$(this).find("button[type='submit']");
        var btn_text = frmbtn.text();
        console.log();
        var frmIcon=$(this).find("button[type='submit'] i.spinner");
        var frmMsg=$(this).find("div.alertMsg:first");
        var frm=this;
        frmbtn.attr("disabled", true);
        frmbtn.html(frmIcon);
        frmIcon.removeClass("hidden");
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            data : new FormData(frm),
            processData: false,
            contentType: false,
            dataType: 'JSON',
            method: 'POST',

            error: function (rs) {
                alert('Network error');
                console.log(rs);
            },
            success: function (rs) {
                console.log(rs);
                if(rs.scroll_top)
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                if (rs.status == 1) {
                    frmMsg.html(rs.msg).slideDown(500);
                    setTimeout(function () {
                        if(rs.frm_reset){
                            frm.reset();
                            if((typeof recaptcha !== 'undefined') && recaptcha)
                                grecaptcha.reset();
                        }
                        if(rs.hide_msg)
                            frmMsg.slideUp(500);
                        frmIcon.addClass("hidden");
                        if(rs.redirect_url){
                            window.location.href = rs.redirect_url;   
                        }else{
                            frmbtn.html("<i class='spinner hidden'></i>"+btn_text);
                            frmbtn.attr("disabled", false);
                        }

                    }, 3000);
                } else {
                    frmMsg.html(rs.msg).slideDown(500);
                    setTimeout(function () {
                        if(rs.hide_msg)
                            frmMsg.slideUp(500);
                        frmbtn.html("<i class='spinner hidden'></i>"+btn_text);
                        frmbtn.attr("disabled", false);
                        frmIcon.addClass("hidden");

                        if(rs.redirect_url)
                            window.location.href = rs.redirect_url;   
                    }, 3000);
                }
            },
            complete: function (rs) {
                needToConfirm = false;
                setTimeout(function () {
                        frmbtn.html("<i class='spinner hidden'></i>"+btn_text);
                        frmbtn.attr("disabled", false);
                        frmIcon.addClass("hidden");   
                },3000);
            }
        });
    });
    $(document).on("change",".select-task",function(){
        var task = $(this).val();
        var task_status= (task==1)?2:0;
        var mem_id = $(this).data("user-id");
        var task_id = $(this).data("task-id");
        var action = $("#action").val();

        $.ajax({
            url:action,
            dataType: 'JSON',
            method: 'POST',
            data:{mem_id:mem_id,task_status:task_status,task_id:task_id},
            error:function(er){
                console.log(er);
            },
            success: function(sc){
                $('#'+task_id).attr("disabled",true);
                $('#'+task_id).css("display","block").slideUp(5000);
            },
        });

    });
    /*----------------------------------------------------*/
    /*  Navigation
    /*----------------------------------------------------*/
    if($('header').hasClass('full-width')) {
        $('header').attr('data-full', 'yes');
    }  
    if($('header').hasClass('alternative')) {
        $('header').attr('data-alt', 'yes');
    }
    // menumobile();


     /*----------------------------------------------------*/
    /*  Mobile Navigation
    /*----------------------------------------------------*/
        // var jPanelMenu = $.jPanelMenu({
        //   menu: '#responsive',
        //   animated: false,
        //   duration: 200,
        //   keyboardShortcuts: false,
        //   closeOnContentClick: true
        // });


      // desktop devices
        $('.menu-trigger').click(function(){
          var jpm = $(this);

          if( jpm.hasClass('active') )
          {
            jPanelMenu.off();
            jpm.removeClass('active');
          }
          else
          {
            jPanelMenu.on();
            jPanelMenu.open();
            jpm.addClass('active');
          }
          return false;
        });


        // // Removes SuperFish Styles
        // $('#jPanelMenu-menu').removeClass('sf-menu');
        // $('#jPanelMenu-menu li ul').removeAttr('style');


        // $(window).resize(function (){
        //   var winWidth = $(window).width();
        //   var jpmactive = $('.menu-trigger');
        //   if(winWidth>990) {
        //     jPanelMenu.off();
        //     jpmactive.removeClass('active');
        //   }
        // });


    /*----------------------------------------------------*/
    /*  Stacktable / Responsive Tables Plug-in
    /*----------------------------------------------------*/
    // $('.responsive-table').stacktable();
    


    /*----------------------------------------------------*/
    /*  Back to Top
    /*----------------------------------------------------*/
        var pxShow = 400; // height on which the button will show
        var fadeInTime = 400; // how slow / fast you want the button to show
        var fadeOutTime = 400; // how slow / fast you want the button to hide
        var scrollSpeed = 400; // how slow / fast you want the button to scroll to top.

        $(window).scroll(function(){
          if($(window).scrollTop() >= pxShow){
            $("#backtotop").fadeIn(fadeInTime);
          } else {
            $("#backtotop").fadeOut(fadeOutTime);
          }
        });

        $('#backtotop a').click(function(){
          $('html, body').animate({scrollTop:0}, scrollSpeed);
          return false;
        });
    


    /*----------------------------------------------------*/
    /*  Showbiz Carousel
    /*----------------------------------------------------*/
        // $('#job-spotlight').showbizpro({
        //     dragAndScroll:"off",
        //     visibleElementsArray:[1,1,1,1],
        //     carousel:"off",
        //     entrySizeOffset:0,
        //     allEntryAtOnce:"off",
        //     rewindFromEnd:"off",
        //     autoPlay:"off",
        //     delay:2000,
        //     speed:400,
        //     easing:'easeOut'
        // });

        // $('#our-clients').showbizpro({
        //     dragAndScroll:"off",
        //     visibleElementsArray:[5,4,3,1],
        //     carousel:"off",
        //     entrySizeOffset:0,
        //     allEntryAtOnce:"off"
        // });



    /*----------------------------------------------------*/
    /*  Revolution Slider
    /*----------------------------------------------------*/
        // $('.fullwidthbanner').revolution({
        //     delay: 9000,
        //     startwidth: 1180,
        //     startheight: 640,
        //     onHoverStop: "on", // Stop Banner Timet at Hover on Slide on/off
        //     navigationType: "none", //bullet, none
        //     navigationArrows: "verticalcentered", //nexttobullets, verticalcentered, none
        //     navigationStyle: "none", //round, square, navbar, none
        //     touchenabled: "on", // Enable Swipe Function : on/off
        //     navOffsetHorizontal: 0,
        //     navOffsetVertical: 20,
        //     stopAtSlide: -1, // Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
        //     stopAfterLoops: -1, // Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
        //     fullWidth: "on",
        // });



    /*----------------------------------------------------*/
    /*  Flexslider
    /*----------------------------------------------------*/
        // $('.testimonials-slider').flexslider({
        //     animation: "fade",
        //     controlsContainer: $(".custom-controls-container"),
        //     customDirectionNav: $(".custom-navigation a")
        // });



    /*----------------------------------------------------*/
    /*  Counters
    /*----------------------------------------------------*/

        // $('.counter').counterUp({
        //     delay: 10,
        //     time: 800
        // });



    /*----------------------------------------------------*/
    /*  Chosen Plugin
    /*----------------------------------------------------*/

        // var config = {
        //   '.chosen-select'           : {disable_search_threshold: 10, width:"100%"},
        //   '.chosen-select-deselect'  : {allow_single_deselect:true, width:"100%"},
        //   '.chosen-select-no-single' : {disable_search_threshold:10, width:"100%"},
        //   '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        //   '.chosen-select-width'     : {width:"95%"}
        // };
        // for (var selector in config) {
        //   $(selector).chosen(config[selector]);
        // }


    /*----------------------------------------------------*/
    /*  Checkboxes "any" fix
    /*----------------------------------------------------*/   
        $('.checkboxes').find('input:first').addClass('first');
        $('.checkboxes input').on('change', function() {
            if($(this).hasClass('first')){
                $(this).parents('.checkboxes').find('input').prop('checked', false);
                $(this).prop('checked', true);
            } else {
                $(this).parents('.checkboxes').find('input:first').not(this).prop('checked', false);
            }
        });


    /*----------------------------------------------------*/
    /*  Magnific Popup
    /*----------------------------------------------------*/   
        
            // $('body').magnificPopup({
            //     type: 'image',
            //     delegate: 'a.mfp-gallery',

            //     fixedContentPos: true,
            //     fixedBgPos: true,

            //     overflowY: 'auto',

            //     closeBtnInside: true,
            //     preloader: true,

            //     removalDelay: 0,
            //     mainClass: 'mfp-fade',

            //     gallery:{enabled:true},

            //     callbacks: {
            //         buildControls: function() {
            //             console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            //         }
            //     }
            // });


            // $('.popup-with-zoom-anim').magnificPopup({
            //     type: 'inline',

            //     fixedContentPos: false,
            //     fixedBgPos: true,

            //     overflowY: 'auto',

            //     closeBtnInside: true,
            //     preloader: false,

            //     midClick: true,
            //     removalDelay: 300,
            //     mainClass: 'my-mfp-zoom-in'
            // });


            // $('.mfp-image').magnificPopup({
            //     type: 'image',
            //     closeOnContentClick: true,
            //     mainClass: 'mfp-fade',
            //     image: {
            //         verticalFit: true
            //     }
            // });


            // $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            //     disableOn: 700,
            //     type: 'iframe',
            //     mainClass: 'mfp-fade',
            //     removalDelay: 160,
            //     preloader: false,

            //     fixedContentPos: false
            // });


     /*---------------------------------------------------*/
    /*  Contact Form
    /*---------------------------------------------------*/
    $("#contactform .submit").click(function(e) {


      e.preventDefault();
      var user_name       = $('input[name=name]').val();
      var user_email      = $('input[name=email]').val();
      var user_comment    = $('textarea[name=comment]').val();

      //simple validation at client's end
      //we simply change border color to red if empty field using .css()
      var proceed = true;
      if(user_name===""){
          $('input[name=name]').addClass('error');
            proceed = false;
          }
          if(user_email===""){
            $('input[name=email]').addClass('error');
            proceed = false;
          }
          if(user_comment==="") {
            $('textarea[name=comment]').addClass('error');
            proceed = false;
          }

          //everything looks good! proceed...
          if(proceed) {
            $('.hide').fadeIn();
            $("#contactform .submit").fadeOut();
              //data to be sent to server
              var post_data = {'userName':user_name, 'userEmail':user_email, 'userComment':user_comment};

              //Ajax post data to server
              $.post('contact.php', post_data, function(response){
                var output;
                //load json data from server and output comment
                if(response.type == 'error')
                  {
                    output = '<div class="error">'+response.text+'</div>';
                    $('.hide').fadeOut();
                    $("#contactform .submit").fadeIn();
                  } else {

                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $('#contact div input').val('');
                    $('#contact textarea').val('');
                    $('.hide').fadeOut();
                    $("#contactform .submit").fadeIn().attr("disabled", "disabled").css({'backgroundColor':'#c0c0c0', 'cursor': 'default' });
                  }

                  $("#result").hide().html(output).slideDown();
                }, 'json');
            }
      });

    //reset previously set border colors and hide all comment on .keyup()
    $("#contactform input, #contactform textarea").keyup(function() {
        $("#contactform input, #contactform textarea").removeClass('error');
        $("#result").slideUp();
    });




    /*----------------------------------------------------*/
    /*  Accordions
    /*----------------------------------------------------*/

        var $accor = $('.accordion');

         $accor.each(function() {
            $(this).addClass('ui-accordion ui-widget ui-helper-reset');
            $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
            $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
            $(this).find("div").hide().first().show();
            $(this).find("h3").first().removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
            $(this).find("span").first().addClass('ui-accordion-icon-active');
        });

        var $trigger = $accor.find('h3');

        $trigger.on('click', function(e) {
            var location = $(this).parent();

            if( $(this).next().is(':hidden') ) {
                var $triggerloc = $('h3',location);
                $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
                $triggerloc.find('span').removeClass('ui-accordion-icon-active');
                $(this).find('span').addClass('ui-accordion-icon-active');
                $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
            }
             e.preventDefault();
        });

    

    /*----------------------------------------------------*/
    /*  Application Tabs
    /*----------------------------------------------------*/   
        // Get all the links.
        var link = $(".app-link");
        $('.close-tab').hide();

        $('.app-tabs div.app-tab-content').hide();
        // On clicking of the links do something.
        link.on('click', function(e) {

            e.preventDefault();
            $(this).parents('div.application').find('.close-tab').fadeOut();
            var a = $(this).attr("href");
            if($(this).hasClass('opened')) {
                $(this).parents('div.application').find(".app-tabs div.app-tab-content").slideUp('fast');
                $(this).parents('div.application').find('.close-tab').fadeOut(10);
                $(this).removeClass('opened');
            } else {
                $(this).parents('div.application').find(".app-link").removeClass('opened');
                $(this).addClass('opened');
                $(this).parents('div.application').find(a).slideDown('fast').removeClass('closed').addClass('opened');
                $(this).parents('div.application').find('.close-tab').fadeIn(10);
            }

            $(this).parents('div.application').find(".app-tabs div.app-tab-content").not(a).slideUp('fast').addClass('closed').removeClass('opened');
            
        });

        $('.close-tab').on('click',function(e){
            $(this).fadeOut();
            e.preventDefault();
            $(this).parents('div.application').find(".app-link").removeClass('opened');
            $(this).parents('div.application').find(".app-tabs div.app-tab-content").slideUp('fast').addClass('closed').removeClass('opened');
        });


    /*----------------------------------------------------*/
    /*  Add Resume 
    /*----------------------------------------------------*/   
        $('.box-to-clone').hide();
        $('.add-box').on('click', function(e) {
            e.preventDefault();
            var newElem = $(this).parent().find('.box-to-clone:first').clone();
            newElem.find('input').val('');
            newElem.prependTo($(this).parent()).show();
            var height = $(this).prev('.box-to-clone').outerHeight(true);
            
            $("html, body").stop().animate({ scrollTop: $(this).offset().top-height}, 600);
        });

        $('body').on('click','.remove-box', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });



    /*----------------------------------------------------*/
    /*  Tabs
    /*----------------------------------------------------*/ 
  

        var $tabsNav    = $('.tabs-nav'),
        $tabsNavLis = $tabsNav.children('li');
        // $tabContent = $('.tab-content');

        $tabsNav.each(function() {
            var $this = $(this);

            $this.next().children('.tab-content').stop(true,true).hide()
            .first().show();

            $this.children('li').first().addClass('active').stop(true,true).show();
        });

        $tabsNavLis.on('click', function(e) {
            var $this = $(this);

            $this.siblings().removeClass('active').end()
            .addClass('active');

            $this.parent().next().children('.tab-content').stop(true,true).hide()
            .siblings( $this.find('a').attr('href') ).fadeIn();

            e.preventDefault();
        });
          var hash = window.location.hash;
    var anchor = $('.tabs-nav a[href="' + hash + '"]');
    if (anchor.length === 0) {
        $(".tabs-nav li:first").addClass("active").show(); //Activate first tab
        $(".tab-content:first").show(); //Show first tab content
    } else {
        console.log(anchor);
        anchor.parent('li').click();
    }



    /*----------------------------------------------------*/
    /*  Sliding In-Out Content
    /*----------------------------------------------------*/

    $(window).bind("load resize scroll",function(e){
        var headerElem = $('.search-container');

        // flying out and fading for header content
        $(headerElem).css({  'transform': 'translateY(' + (  $(window).scrollTop() / -9 ) + 'px)', });
        // $(headerElem).css({ 'opacity': 1 - $(window).scrollTop() / 600 });  
    });



    /*----------------------------------------------------*/
    /*  Parallax
    /*----------------------------------------------------*/
    /* detect touch */
    if("ontouchstart" in window){
        document.documentElement.className = document.documentElement.className + " touch";
    }
    if(!$("html").hasClass("touch")){
        /* background fix */
        $(".parallax").css("background-attachment", "fixed");
    }

    /* fix vertical when not overflow
    call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix(){
        var h = $('body').height();
        // set .fullscreen height
        $(".parallax-content").each(function(i){
            if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
            }
        });
    }
    $(window).resize(fullscreenFix);
    fullscreenFix();



    /* resize background images */
    function backgroundResize(){
        var windowH = $(window).height();
        $(".background").each(function(i){
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if(path.hasClass("parallax") && !$("html").hasClass("touch")){
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if(contW > imgW){
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }
    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();



    /* set parallax background-position */
    function parallaxPosition(e){
        var heightWindow = $(window).height();
        var topWindow = $(window).scrollTop();
        var bottomWindow = topWindow + heightWindow;
        var currentWindow = (topWindow + bottomWindow) / 2;
        $(".parallax").each(function(i){
            var path = $(this);
            var height = path.height();
            var top = path.offset().top;
            var bottom = top + height;
            // only when in range
            if(bottomWindow > top && topWindow < bottom){
                var imgW = path.data("resized-imgW");
                var imgH = path.data("resized-imgH");
                // min when image touch top of window
                var min = 0;
                // max when image touch bottom of window
                var max = - imgH + heightWindow;
                // overflow changes parallax
                var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
                top = top - overflowH;
                bottom = bottom + overflowH;
                // value with linear interpolation
                var value = -100 + min + (max - min) * (currentWindow - top) / (bottom - top);
                // set background-position
                var orizontalPosition = path.attr("data-oriz-pos");
                orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
                $(this).css("background-position", orizontalPosition + " " + value + "px");

            }
        });
    }
    if(!$("html").hasClass("touch")){
        $(window).resize(parallaxPosition);
        //$(window).focus(parallaxPosition);
        $(window).scroll(parallaxPosition);
        parallaxPosition();
    }


    /*----------------------------------------------------*/
    /*  Sticky Header 
    /*----------------------------------------------------*/
    $( ".sticky-header" ).clone(true).addClass('cloned').insertAfter(".sticky-header");
    $(".sticky-header.cloned.transparent #logo a img").attr("src", "images/logo.png");
    $(".sticky-header.cloned.alternative").removeClass('alternative');

    var stickyHeader = document.querySelector(".sticky-header.cloned");

    // var headroom = new Headroom(stickyHeader, {
    //   "offset": $(".sticky-header").height(),
    //   "tolerance": 0
    // });

    // disabling on mobile
    // $(window).bind("load resize",function(e){
    //     $( ".sticky-header.cloned" ).removeClass('transparent alternative');

    //     var winWidth = $(window).width();

    //     if(winWidth>1290) {
    //         headroom.init();
    //         }

    //         else if(winWidth<1290) {
    //             headroom.destroy();
    //         }
    // });
	
	/*----------------------------------------------------*/
    /*  Toastr
    /*----------------------------------------------------*/
	if ($.trim($(".div-toastr-success").html()).length > 0) {
		$(".div-toastr-success p").each(function( index ) {
			toastr.success($(this).html(), 'Success Alert', {timeOut: 5000});
		});
	}
	
	if ($.trim($(".div-toastr-error").html()).length > 0) {
		$(".div-toastr-error p").each(function( index ) {
			toastr.error($(this).html(), 'Failure Alert', {timeOut: 5000});
		});
	}
	
	/*----------------------------------------------------*/
    /*  Datepicker
    /*----------------------------------------------------*/
	$("#close_date").datepicker({ minDate: 0, showOtherMonths: true });
	
	$('*[data-href]').on("click",function(){
		window.location = $(this).data('href');
		return false;
	});
	
	$(".delete").on("click",function(e){
		var link = this;
		e.preventDefault();
		
		$("#confirm-delete").dialog({
			resizable: false,
			draggable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
				"Confirm": function() {
					window.location = link.href;
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
		});
	});

	$('#cover_letter').bind('input propertychange', function() {
		var email = extractEmails(this.value);
		if(email) {
			toastr.warning('Do not share personal information like email address or phone number!', 'Warning', {"preventDuplicates": true, timeOut: 5000});
			return false;
		}
	});
	
	$('#client_note').bind('input propertychange', function() {
		var email = extractEmails(this.value);
		if(email) {
			toastr.warning('Do not share personal information like email address or phone number!', 'Warning', {"preventDuplicates": true, timeOut: 5000});
			return false;
		}
	});
	
	function extractEmails(text){
		return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	}
	
	if ($('#hourly_rate').val() > 0) {
		$('#hourly_rate').parent('.form').show();
	} else {
		$('#hourly_rate').parent('.form').hide();	
	}

	$("input[name='contract_type']").click(function () {
		if ($(this).val() == 'hourly') {
			$('#hourly_rate').parent('.form').show("fast", "linear");
		} else {
			$('#hourly_rate').parent('.form').hide("fast", "linear");
		}
	});
	
	$(".frm-respond-nda .button").each(function(i, obj) {
		$(obj).click(function() {
			var status = 2;
			
			var form = $(this).parent('form').get(0);
			var auto = $(form).find('.auto-gen').html().toString();
			var code = $(form).find('input[name="nda_code"]').val();
			
			// Agreed NDA
			if ($(this).hasClass("agree")) {
				// Validate Empty
				if ($.trim(code) == '') {
					toastr.error('Use the following code to accept the NDA.', 'Failure Alert', {"preventDuplicates": true, timeOut: 5000});
					return false;
				}
				
				// Validate Code
				if ($.trim(code) != $.trim(auto)) {
					toastr.error('Use the same following code to accept the NDA.', 'Failure Alert', {"preventDuplicates": true, timeOut: 5000});
					return false;
				}
				
				status = 1;
			}
			
			$.ajax({
				url: $(form).attr('action'),
				type: "POST",
				data: $(form).serialize() + '&nda_status=' + status,
				dataType : 'json',
				cache: false,             
				processData: false,      
				success: function(data) {
					window.location = data.redirect_URL;
					return false;
				}
			});
						  
		});
	});
	
	// $('input[type=text]').bind("cut copy paste",function(e) { e.preventDefault(); });

// ------------------ End Document ------------------ //
});

})(this.jQuery);


function shareFacebook(url, title) {
    window.open('https://www.facebook.com/share.php?u=' + url + '&title=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
function shareTwitter(url, title) {
    window.open('https://twitter.com/home?status=' + title + ' ' + url + '', 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
function shareGoogle(url, title) {
    window.open('https://plus.google.com/share?url=' + url + '&title=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
function sharePinterest(url, image, title) {
    window.open('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + image + '&description=' + title, 'sharer', 'toolbar=0,status=0,width=548,height=325,top=170,left=400');
}
function shareWhatsapp(title) {
    document.location = 'whatsapp://send?text=' + title;
}
// $(document).on('click', '.attDlt', function(){
//     var maintg =$(this).parent('span');
//     $('.filesAtch').find('input').remove()
//     maintg.remove();
//     $('textarea[name="msg"]').focus();
// })
   