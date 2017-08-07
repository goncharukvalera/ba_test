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

    var form = $('form');
    form.on('submit', function (e) {
        e.stopPropagation();
        console.log(form.serialize());
        $.ajax({
            url: './backend.php',
            type: 'POST',
            data: form.serialize(),
            success: function (respond) {
                console.log('success' + respond);
            },
            error: function (jqXHR, textStatus) {
                console.log('ОШИБКИ AJAX запроса: ' + textStatus);
            }
        });
    });
})(jQuery);