;(function ($) {
    $(document).ready(function () {

        $('.works__slider-cont').slick({
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        $('.team__slider-cont').slick({
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        var map,
            pointPin = {lat: -7.926579, lng: 112.637335},
            pointCenter = {lat: -7.935560, lng: 112.632655};

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: pointCenter,
                zoom: 15,
                disableDefaultUI: false,
                scrollwheel: false
            });
            var image = {
                url: 'images/pin.png'
            };
            var marker = new google.maps.Marker({
                position: pointPin,
                map: map,
                icon: image
            });
        }

        initMap();


        $('.header__menu--mini').on('click', function () {
            $(this).next().slideToggle(200);
            $('.overlay').show();
        });
        $('.overlay').on('click', function () {
            $('.header__menu').slideUp(200);
            $(this).hide();
        });


        $('.menu-about').click(function () {
            $('.overlay').trigger('click');
            $('html, body').animate({
                scrollTop: $('.about-us').offset().top
            }, 300);
        });


        $('.menu-services').click(function () {
            $('.overlay').trigger('click');
            $('html, body').animate({
                scrollTop: $('.our-services').offset().top
            }, 300);
        });

        $('.menu-works').click(function () {
            $('.overlay').trigger('click');
            $('html, body').animate({
                scrollTop: $('.works').offset().top
            }, 300);
        });

        $('.menu-contacts').click(function () {
            $('.overlay').trigger('click');
            $('html, body').animate({
                scrollTop: $('.contact').offset().top
            }, 300);
        });


        $('.scroll-top').click(function () {
            $('.overlay').trigger('click');
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        });


    });

    // sending form
    var regex = {
        firstName: /^[a-zA-Z ]{2,30}$/,
        surName: /^[a-zA-Z ]{2,50}$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    function validateField(val, fieldName) {
        var pattern = regex[fieldName];
        if (pattern.test(val)) {
            return true;
        } else {
            return false;
        }
    }
    $('#send-request-form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var firstName = $("#firstName"),
            surName = $("#surName"),
            phone = $("#phone"),
            email = $("#email"),
            message = $("#message"),
            data = {
                firstName: firstName.val(),
                surName: surName.val(),
                phone: phone.val(),
                email: email.val(),
                message: message.val()
            };
        if (!data.firstName || (data.firstName && !validateField(data.firstName, 'firstName'))) {
            console.log(1);
            firstName.prev('.contact__error').show();
        } else if (!data.surName || (data.surName && !validateField(data.surName, 'surName'))) {
            console.log(2);
            surName.prev('.contact__error').show();
        } else if (!data.phone || (data.phone && !validateField(data.phone, 'phone'))) {
            console.log(3);
            phone.prev('.contact__error').show();
        } else if (!data.email || (data.email && !validateField(data.email, 'email'))) {
            email.prev('.contact__error').show();
        } else if (!data.message || (data.message && data.message.length > 1000)) {
            email.prev('.contact__error').show();
        } else {
            $.ajax({
                url: './php/backend.php',
                type: 'POST',
                data: data,
                success: function (response) {
                    if (response && response.error) {
                        console.log(response.error)
                    } else if (response && response.success) {
                        alert('Thanks for your treatment');
                    }
                },
                error: function (jqXHR, textStatus) {
                    console.log('ОШИБКИ AJAX запроса: ' + textStatus);
                }
            });
        }
    });

    $('#send-request-form input, #send-request-form textarea').on('keydown', function () {
        $(this).prev('.contact__error').hide();
    });
})(jQuery);