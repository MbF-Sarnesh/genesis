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
            _radioOnchange();
            _tabPanel();
            _loginFormvalidate();
            _accordionHandler();
            _checkboxBook();  
            _getMechlist();      
            _getLocation();   
            _popup(); 
         },

            _getLocation=function(){           
              
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position){
                    
                var map;
                var marker;
                var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                var mapOptions = {
                  zoom: 17,
                  center: myLatlng,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                // var icon = {
                //  url: "http://52.210.196.48:8080/images/location-marker.png", // url
                // };
                marker = new google.maps.Marker({
                  map: map,
                  position: myLatlng,
                  animation: google.maps.Animation.DROP,
                }); 
                console.log(marker.position);
                
                  });
              } else { 
                console.log("else");
                  x.innerHTML = "Geolocation is not supported by this browser.";
              }
          },
          _popup=function(){
           $("input[name=timetaken]").on('change', function(e){
             // e.preventDefault();              
                var numb=e.target.value;
               $('body,html').addClass('hidden');               
               // $(".popup-inner").css({left:halfWith,top: '25%',transform: 'translate(-25%,-'+halfWith+')'});
               var id = $(this).attr('data-id');
               $('#'+id).fadeIn(200);    
               $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/atm', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var atm_name=element.name;
                        var atm_address=element.vicinity;
                        var atm_distance=element.distance.toFixed(2);
                        var atm_direction=element.direction;
                        var key=index+1;
                          //$("#atm_data").append('<ul><li><h4>Name :</h4><span>'+atm_name+'</span> </li><li><h4>Address :</h4> <span>'+atm_address+'</span></li><li><h4>Distance :</h4><span>'+atm_distance+'</span> </li><li><h4>Direction :</h4><span>'+atm_direction+'</span> </li></ul>');
                          $("#atm_data").append('<ul><li><h5>Name :</h5><span>'+atm_name+'</span> </li><li><h5>Address :</h5> <span>'+atm_address+'</span></li><li><h5>Distance :</h5><span>'+atm_distance+'</span> </li><li><h5>Direction :</h5><span>'+atm_direction+'</span> </li></ul><hr/>');
                          //$("#mech_list_data").html('<div class="col-4"><figure><img src="img/profile.png" alt="" /><figcaption><span>'+mech_name+'</span><ul><li><h4>Email :</h4><span>'+mech_email+'</span> </li><li><h4>Mobile No :</h4> <span><a href="tel:'+mech_mobile+'">8760021445</a></span></li><li><h4>Rating :</h4><span>'+mech_rating+'/5</span></li></ul></figcaption></figure></div>');                        
                    });
                }
            });                          
             
           });


           $('.popup-close').on('click', function(e){
              e.preventDefault();               
              $(this).each(function(){
                $('body,html').removeClass('hidden');
                $(this).closest('.popup').hide();
              });
            });
          },
          _getMechlist=function(){
            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.0.103/Genesis-block/wp-json/wp/v2/register', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var mech_name=element.mc_name;
                        var mech_email=element.mc_email;
                        var mech_mobile=element.mc_phone;
                        var mech_rating=element.mc_rating;
                        var key=index+1;
                        
                          $("#mech_list_data").append('<div class="col-4"><figure><img src="img/profile.png" alt="" /><figcaption><span>'+mech_name+'</span><ul><li><h4>Email :</h4><span>'+mech_email+'</span> </li><li><h4>Mobile No :</h4> <span><a href="tel:'+mech_mobile+'">'+mech_mobile+'</a></span></li><li><h4>Rating :</h4><span>'+mech_rating+'/5</span> </li></ul><div class="form-row checkboxradio"><div class="checkboxradio-row"><input class="checkboxradio-item checkboxradio-invisible" name="checkgroup" id="checkbox'+key+'" type="checkbox"  /><label class="checkboxradio-label checkbox-label" for="checkbox'+key+'">Book</label></div><div class="timetaken-row"><label>Time to Take</label><label class="floating-item" ><input type="number" min="1" class="floating-item-input input-item timetaken popup-trigger" name="timetaken" data-id="holder" /></label></div></div></figcaption></figure></div>');
                          //$("#mech_list_data").html('<div class="col-4"><figure><img src="img/profile.png" alt="" /><figcaption><span>'+mech_name+'</span><ul><li><h4>Email :</h4><span>'+mech_email+'</span> </li><li><h4>Mobile No :</h4> <span><a href="tel:'+mech_mobile+'">8760021445</a></span></li><li><h4>Rating :</h4><span>'+mech_rating+'/5</span></li></ul></figcaption></figure></div>');
                        _checkboxBook();
                        
                        // $('body').append($('<div>', {
                        //     text: element.name
                        // }));
                    });
                }
            });

            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/atm', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var atm_name=element.name;
                        var atm_address=element.vicinity;
                        var atm_distance=element.distance.toFixed(2);
                        var atm_direction=element.direction;
                        var key=index+1;
                          //$("#atm_data").append('<ul><li><h4>Name :</h4><span>'+atm_name+'</span> </li><li><h4>Address :</h4> <span>'+atm_address+'</span></li><li><h4>Distance :</h4><span>'+atm_distance+'</span> </li><li><h4>Direction :</h4><span>'+atm_direction+'</span> </li></ul>');
                          $("#atm_data").append('<ul><li><h5>Name :</h5><span>'+atm_name+'</span> </li><li><h5>Address :</h5> <span>'+atm_address+'</span></li><li><h5>Distance :</h5><span>'+atm_distance+'</span> </li><li><h5>Direction :</h5><span>'+atm_direction+'</span> </li></ul><hr/>');
                          //$("#mech_list_data").html('<div class="col-4"><figure><img src="img/profile.png" alt="" /><figcaption><span>'+mech_name+'</span><ul><li><h4>Email :</h4><span>'+mech_email+'</span> </li><li><h4>Mobile No :</h4> <span><a href="tel:'+mech_mobile+'">8760021445</a></span></li><li><h4>Rating :</h4><span>'+mech_rating+'/5</span></li></ul></figcaption></figure></div>');                        
                    });
                }
            });

             $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/clothingstore', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var cs_name=element.name;
                        var cs_address=element.vicinity;
                        var cs_distance=element.distance.toFixed(2);
                        var cs_direction=element.direction;
                        var key=index+1;                          
                        $("#cs_data").append('<ul><li><h5>Name :</h5><span>'+cs_name+'</span> </li><li><h5>Address :</h5> <span>'+cs_address+'</span></li><li><h5>Distance :</h5><span>'+cs_distance+'</span> </li><li><h5>Direction :</h5><span>'+cs_direction+'</span> </li></ul><hr/>');
                    });
                }
            });

            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/restaurant', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#res_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });

            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/departmentStore', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#deps_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });

            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/shoppingmall', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#shop_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });

            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/bakery', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#bakery_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });


            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/theater', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#theater_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });


            $.ajax({ 
                type: 'GET', 
                url: 'http://192.168.3.44:8081/eme/type/bus_station', 
                // data: { get_param: 'value' }, 
                dataType: 'json',
                asnyc:false,
                success: function (data) { 
                    $.each(data, function(index, element) {
                        var res_name=element.name;
                        var res_address=element.vicinity;
                        var res_distance=element.distance.toFixed(2);
                        var res_direction=element.direction;
                        var key=index+1;                          
                        $("#bus_data").append('<ul><li><h5>Name :</h5><span>'+res_name+'</span> </li><li><h5>Address :</h5> <span>'+res_address+'</span></li><li><h5>Distance :</h5><span>'+res_distance+'</span> </li><li><h5>Direction :</h5><span>'+res_direction+'</span> </li></ul><hr/>');
                    });
                }
            });


          },
          _checkboxBook=function(){
            $('input[class^="checkboxradio-item"]').click(function() {
                var $this = $(this);
                    if ($this.is(":checked")) {
                        $(".checkboxradio-item").not($this).prop({ disabled: true, checked: false });
                        $(".checkboxradio-item").not($this).siblings(".checkboxradio-label").addClass("disabled");
                        $(".checkboxradio-item").not($this).parent().siblings(".timetaken-row").hide();
                        $($this).parent().siblings(".timetaken-row").show();
                        _popup();
                        
                    } else {
                        $(".checkboxradio-item").prop("disabled", false);
                        $(".checkboxradio-item").siblings(".checkboxradio-label").removeClass("disabled");
                        // $(".checkboxradio-item").not($this).parent().siblings(".timetaken-row").show();
                        $(".checkboxradio-item").parent().siblings(".timetaken-row").hide();
                        _popup();
                    }
                
            });
          },
          _accordionHandler = function(){
            $('.accordion-row-blk h4').on('click', function(){
                if(!$(this).hasClass('active')){
                    $('.accordion-row-blk h4').removeClass('active');
                    $(".accordion-content").stop(true, true).slideUp();
                    $(this).addClass('active');
                    $(this).parents('.accordion-row-blk').find(".accordion-content").slideDown();
                }else{
                 $('.accordion-row-blk h4').removeClass('active');
                    $(".accordion-content").stop(true, true).slideUp();
                }
            });
          },
         _loginFormvalidate=function(){
            $("#sign-in-form").validate({
              rules: {
                  "bikeid": {
                      required: true
                  },
                  "password": {
                      required: true
                  }
              },
              messages: {
                  "bikeid": {
                      required: "Please, enter a Bike ID"
                  },
                  "password": {
                      required: "Please, enter a Password",
                  }
              },
              submitHandler: function (form) { // for demo
                  // alert('valid form submitted'); // for demo
                  // return false; // for demo
                  
                  if($("#bikeid").val()==1234 && $("#password").val()==123456){
                    window.location="home.html";
                  }
                  else{
                    $("#bikeid").val("");
                    $("#password").val("");
                    $("#sign-in-form").valid();
                    //window.location="index.html";
                  }
              }
          });
         },
         //Tab Panel
          _tabPanel = function(){ 
           
            
            $('ul.tabs li').click(function(){            
              var tab_id = $(this).attr('data-tab');     
              $(this).addClass('current').siblings().removeClass('current');              
              $('#'+tab_id).addClass('current').siblings().removeClass('current');              
            });
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
        _radioOnchange=function(){
              $("input[name=radio-knownGroup]:radio").change(function () {
                  if ($("#radio-known").is(":checked")) {
                      $('#known-issue').show();
                      $('#unknown-issue').hide();
                  }
                  else {
                      $('#known-issue').hide();
                      $('#unknown-issue').show();
                  }
              })
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

  function startTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById('digi_time').innerHTML =
      h + ":" + m + ":" + s;
      var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }
  startTime();
});
