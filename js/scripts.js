'use strict'
//************** ALERTIFY **************
alertify.set('notifier', 'delay', 3);
alertify.set('notifier', 'position', 'bottom-left');
alertify.set('prompt', 'reverseButtons', true);
alertify.set('prompt', 'transition', 'fade');
alertify.set('confirm', 'transition', 'fade');

 //************** MENU TOGGLE **************
 $('._jshamBurger').on('click', function () {
  $('body').toggleClass('navOpen');
  $('#menuNav .nav-item').removeClass('active');
  $('#menuNav').css('padding-bottom', '0');
});
//************** CHECK SCROLL **************
function isScrolled(){
	var scroll = $(window).scrollTop();
	if (scroll >= 20) {
		$("body").addClass("scrolled");
	}else{
		$("body").removeClass("scrolled");
	}
}

// Scroll Event
window.onscroll = function (){
	  isScrolled();

}

$("#scrollTop").on("click", function () {
  $('html, body').animate({
      scrollTop: 0
  }, 1000);
});

//************** MAIN SLIDE **************
var mainSwiper = new Swiper ('.swiper-container.mainSlider', {
    autoplay: {
      delay: 3000
    },
      loop: false,
      effect: 'fade',
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1000,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
    }, // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
var carsModel = ['PRIME-7%', 'BMW 5 Series', 'BMW X3']
  var modelSlider = new Swiper(".modelSlider", {
    autoplay: {
      delay: 3000
    },
      loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (carsModel[index]) + "</span>";
      },
    },
  });
  //************** FORM VALIDATION **************

// Validation for south afican mobile number
$.formUtils.addValidator({
  name: 'mobile_number',
  validatorFunction: function (value, $el, config, language, $form) {
        var regex = new RegExp(/((?:\+27|27)|0)(=\d{1}|31|72|81|82|73|83|74|84|85|86|87|88|89|76|61|60|62|63|70|71|72|73|74|78|79)\s?(\d{7})/); //('/^(\+?27|0)\s?\d{2}\s?\d{3}\s?\d{4}$/');
        return regex.test(value);
      },
      errorMessage: 'Please enter valid South African mobile number.',
      errorMessageKey: 'badMobileNumber'
    });

$.validate();

$.validate({
  form : '#contactForm',
  onError : function($form) {
    alertify.error('Please make sure all fields are filled in correctly');
    console.log('not submitted');
    return false; // this will stop the submission of the form
  },
  onSuccess: function($form){

  },
});

$("#submitBtn").on("click", function(e){
  e.preventDefault();
  if(!$('#contactForm').isValid()){
    return false;
  }
  else{
        $('#contactForm').addClass('loading');
        $(this).addClass('loading');
        $(this)[0].setAttribute('disabled','');
        contactUsForm();

  }
});


function contactUsForm(e){
    $.ajax({
        type: 'POST',
        url: $('#contactForm').attr('action'),
    headers: {'X-CSRF-TOKEN': $('input[name=_token]').val()},
        data: $('#contactForm').serialize(),
        success: function (data) {
            alertify.success('Thank you! Your request has been submitted.');
            $('#contactForm').removeClass('loading');
            $('#contactForm').get(0).reset();
            $(".submitBtn")[0].removeAttribute("disabled");
            $('.submitBtn').removeClass('loading');
        },
        error: function (error) {
            alertify.error('Ooops there was an error sending your contact email.');
            $('#contactForm').removeClass('loading');
            $(".submitBtn")[0].removeAttribute("disabled");
            $('.submitBtn').removeClass('loading');
            if (error.response.status === 422) {
                console.log(error);
            } else if (error.response.status === 503) {
                console.log(error);
            }
        }
    });
}
