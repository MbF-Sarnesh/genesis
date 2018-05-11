////////////////////
//Application Module
////////////////////
 var app = (function () {   
     "use strict";  
     //-----------------------------------------------------------------
     // Page Initalization handler : exposed to app.init();
     //-----------------------------------------------------------------
     var init = function () {  
            _commenEvents();
            _formElements();
            _menuToggle();
            _wowAnimated();
            _vulnerabilitySlider();  
            _complianceSlider();
            _mostactivetrafficSlider();
         },
        _wowAnimated = function() {
          var wow = new WOW(
            {
            animateClass: 'animated',
            offset:60
            }
          );
          wow.init();
        },

        _rippleActions = function() {
            // ripple
            window.rippler = $.ripple('.button', {
                debug: true,
                multi: true,
                opacity: 0.45,
                color: "auto",
                duration: 1
            });
        },
        _formElements = function() {
            //form 
            /*jquery ui selectbox placeholder start*/
            $.widget('app.selectmenu', $.ui.selectmenu, {
               _drawButton: function() {
                   this._super();
                   var selected = this.element
                       .find('[selected]')
                       .length,
                       placeholder = this.options.placeholder;

                   if (!selected && placeholder) {
                       this.buttonItem.text(placeholder);
                   } 
               }
            });

           //Select menu
           $('.select-menu').each(function() {

               var $placeholder = $(this).data('placeholder');
               $(this).selectmenu({
                   placeholder: $placeholder,
                   appendTo: $(this).parent(".select-row"),                  
                   create: function(event, ui) {
                       $('.ui-selectmenu-text').addClass('placeholder');
                   },
                   change: function(event, ui) {
                       $('.ui-selectmenu-text').removeClass('placeholder');
                   }
               });
           });

           if($('.select-menu').length>0){
               $(".select-menu").selectmenu({
                   select: function(event, ui) {
                       var errorText  = $(this).parents('.form-row').find('label').attr('data-error');
                       if($('option:selected',$(this)).index()>0) {
                           $(this).parents('.form-row').removeClass('error-row');
                           $(this).parents('.form-row').find('.error-message').slideUp(function(){
                               $(this).remove();
                           });
                       } else {
                           $(this).parents('.form-row').addClass('error-row');
                           $(this).parents('.form-row').find('.error-message').slideDown(); 
                       }
                   }
               });
           }

          $(".select-menu").selectmenu({
             change: function(event, ui) {
               if ($('.select-menu option:selected').val() != 0) {
                   $('.select-menu').find('.error-message').hide();
                   $('.select-menu').parent('.form-row').removeClass('error-row');
               }
             }
          });

           $('.floating-item input, textarea').focus(function(){
               $(this).parent('.floating-item').addClass('input-animate'); 
            });

            $('input, textarea').keyup(function() {
                if ($(this).val() !== "") {
                    $(this).addClass('input-email-active'); 
                } else {
                    $(this).removeClass('input-email-active');  
                } 
            });
        },

        _menuToggle = function() {
          $('.menu-toggle').on('click', function() {
            $('body').addClass('y-hidden');
            $('.menu-open').addClass('slide');
          });
          $('.menu-close').on('click', function() {
            $('body').removeClass('y-hidden');
            $('.menu-open').removeClass('slide');
          });
        },

        _vulnerabilitySlider = function(){
          // vulnerability slider
              $('.vulnerability-slide').slick({                  
                  dots: true,
                  arrows:false,
                  infinite: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  swipe:true,
              });
        },
        _complianceSlider = function(){
            // compliance slider
                $('.compliance-slide').slick({                  
                    dots: true,
                    arrows:false,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe:true,
                });
        },
        _mostactivetrafficSlider = function(){
            // compliance slider
                $('.mostactivetraffic-slide').slick({                  
                    dots: true,
                    arrows:false,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe:true,
                });
        },

        _commenEvents = function() {
            // Add common js here

            $('#search-trigger').on('click', function(){
              $('.navigation-wrapper').addClass('search-active');
              $('#search-trigger').addClass('active');
              setTimeout(function(){
                if($('.navigation-wrapper').hasClass('search-active')) {
                  $('.search-block').fadeIn('slow').addClass('active');
                  $('.search-elements').addClass('active');
                  $('#search-trigger').fadeOut('slow');
                }
              },300);
            });

            $('#search-close').on('click', function(){
              $('.search-elements').removeClass('active');
              $('.navigation-wrapper').removeClass('search-active');
              
              setTimeout(function(){
                if(!$('.navigation-wrapper').hasClass('search-active')) {
                  $('.search-block').removeClass('active', function(){
                      $(this).delay(1200).fadeOut();
                      $('#search-trigger').fadeIn(1200, function(){
                        $(this).removeClass('active')
                      });
                  });
                }
              },500);
            });

            $('#drawer-trigger').on('click', function(){
              $('.dash-board-blk').toggleClass('close-nav');
            });
            //Main Menu Tab Toggle
            $('nav ul.main-menu li a').click(function(){
              var tab_id = $(this).attr('data-tab');              
              $('ul.main-menu li a').removeClass('active');
              $('.secondary-menu').removeClass('current');
              $(this).addClass('active');
              $("#"+tab_id).addClass('current');
            }); 
            //Portlet Body Toggle
            $(".portlet-header a.portlet-toggle").click(function(){
                if($(this).children().hasClass("fa-minus")){
                  $(this).children().removeClass("fa-minus");
                  $(this).children().addClass("fa-plus");
                }
                else{
                  $(this).children().removeClass("fa-plus");
                 $(this).children().addClass("fa-minus");
                }

                $(this).parent().parent().find(".portlet-body").toggle();                      
            });    

        };


    // Expose Global Functions
    return {
         init: init
     };
 })();

$(window).scroll(function() { 
   //scroll function here

});

$().ready(function () {
    app.init();           
});

$(window).resize(function(){
  //app.viewportCondition();
});
if(Modernizr.touch){  
  //modernizer touch function code here for mobile
}
$(window).on('load', function() { 
  $('.render-blk').stop(true, true).animate({opacity:1}, 1000);
  if(sessionStorage.getItem('loader') == null) {
    NProgress.done();  
    sessionStorage.setItem('loader', 'true');
  }else{      
    NProgress.done();
  }
});
