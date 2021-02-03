let monthArr = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];
let year = new Date().getFullYear()//получение года
let month = new Date().getMonth()//получение месяца(0 - 11)
let days = new Date(year, month + 1, 0).getDate()//получение кол-ва дней в месяце
let discount_date = document.querySelector('.discount_date_p span')
if(discount_date) {
  discount_date.textContent = days + ' ' + monthArr[month]//вывод  
}


let body = document.querySelector('body');
const containerFurnace = document.querySelector('.catalog_furnace__items')
const containerReadySet = document.querySelector('.ready_set__items')
const containerAccessories = document.querySelector('.accessories_catalog__categories')
let isQuiz = JSON.parse(localStorage.getItem('kazanbelQuiz')) ? JSON.parse(localStorage.getItem('kazanbelQuiz')) : false
let isModalExit = false

function testWebP(callback) {
    //поддерживает ли браузер формат webp
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

function showModal(modal, src) {
    if(src) {
        let modalThis = document.querySelector(modal)
        modalThis.innerHTML = `<img src="${src}">`
    }
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });    
}
let isAfgan = body.classList.contains('afgan')
let fromPage = 'Узбекские казаны'
if(isAfgan) {
    fromPage = 'Афганские казаны'
}


let indexResolve = 0
let indexSlick = 0
let isInit = false
function showModalQuiz(modal) {
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });
    console.log(isInit)
    if(!isInit) {
        isInit = true
        setTimeout(function(){
        $('.quiz_left').slick(quizSlider());
        // Карусель квиза на аксессуары. Удалено
        // $(".quiz_accessories_elems.owl-carousel").owlCarousel({
        //     margin: 15,
        //     nav: true,
        //     items: 4,
        //     dots: false,
        //     mouseDrag: false,
        //     autoWidth: true
        // });
            
        },200)

        $('.input_person__phone input').click(function(){
            $(this).setCursorPosition(6);
          });

        $('.progress_back').click(function(){
            progressLine(-1)
            isDisabletNextBtn()
            $(modal + ' .slick-prev').trigger('click')
        })
        $('.progress_next').click(function(){
            progressLine(1)
            isDisabletNextBtn()
            $(modal + ' .slick-next').trigger('click')
        })
        $('.quiz_messenger input').click(function(){
            currentMessengerQuiz(this)
        }) 
        $('.input_radio').click(function(){
            setTimeout(function(){
                $(modal + ' .slick-next').trigger('click')
            },400)
            let inputs = this.parentNode.querySelectorAll('input')
            for(let input of inputs) {
                if(input.checked) {
                    progressLine(1)
                    isDisabletNextBtn()
                    return
                }
            }
            progressLine(1, true)
            isDisabletNextBtn() 
        })       
    }
 
}


function showModalYouTube(modal) {
    document.querySelector(modal).innerHTML = '<iframe width="100%" height="360" src="https://www.youtube.com/embed/FJxx0nxQVrI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });   
}

function showModalOneClickKazan(modal, data, dataFull, size ) {
    data = eval(data)
    let textSent = `<span><b>id:</b> ${data.id}, <b>название:</b> ${data.name}, <b>цена:</b> ${data.discountPrice}</span>`
    let jsModal = document.querySelector(modal)
    jsModal.innerHTML = `
    <form>
        <h3>Заполните форму, чтобы купить</h3>
        <div class="cart_item">
            <img class="cart_item__img " src="${data.img[0]}">
            <div class="cart_item__title">
                <span>${data.name}</span>
            </div>
            <div class="cart_item__price">
                <span class="cart_item__price--standart">${data.price} руб</span>
                <span class="cart_item__price--stock">${data.discountPrice} руб</span>
            </div>
        </div>
        <label for="person_phone_one_click">Ваш красивый номер телефона</label>
        <div class="input_person__phone">
        <input type="text" name="person_phone" id="person_phone_one_click" placeholder="+375 (__) ___ - __ - __"> 
        </div>
        <button type="submit" class="btn-b btn_b--call" onclick="orderOneClickKazan(this, 'Заказ в один клик', '${textSent}', '${data}')" type-submit="В один клик">Купить в 1 клик</button>
    </form>
    `
    $(function () {
        $(".input_person__phone input").mask("+375 (99) 999 - 99 - 99");
    });
    $('.input_person__phone input').click(function(){
        $(this).setCursorPosition(6);
    });

    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });

}
function showModalOneClickFurnace(modal, data, size) {
    size = +size.getAttribute('size')
    data = eval(data)
    console.log(data)
    let textSent = `<span><b>id:</b> ${data.id}, <b>название:</b> ${data.title}, <b>размер:</b> ${data.size[size].size}, <b>цена:</b> ${data.size[size].discountPrice}</span>`
    let jsModal = document.querySelector(modal)
    jsModal.innerHTML = `
    <form>
        <h3>Заполните форму, чтобы купить</h3>
        <div class="cart_item">
            <img class="cart_item__img " src="${data.img[0]}">
            <div class="cart_item__title">
                <span>${data.title}</span><br>
                <span>${data.size[size].size}</span>
            </div>
            <div class="cart_item__price">
                <span class="cart_item__price--standart">${data.size[size].price} руб</span>
                <span class="cart_item__price--stock">${data.size[size].discountPrice} руб</span>
            </div>
        </div>
        <label for="person_phone_one_click">Ваш красивый номер телефона</label>
        <div class="input_person__phone">
        <input type="text" name="person_phone" id="person_phone_one_click" placeholder="+375 (__) ___ - __ - __"> 
        </div>
        <button type="submit" class="btn-b btn_b--call" onclick="orderOneClickFurnace(this, 'Заказ в один клик', '${textSent}', '${data}')" type-submit="В один клик">Купить в 1 клик</button>
    </form>
    `
    $(function () {
        $(".input_person__phone input").mask("+375 (99) 999 - 99 - 99");
    });
    $('.input_person__phone input').click(function(){
        $(this).setCursorPosition(6);
      });

    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });
}

function showModalOneClickSet(modal, data) {
    data = eval(data)
    let textSent = `<span><b>id:</b> ${data.id}, <b>название:</b> ${data.title}, <b>цена:</b> ${data.setPrice}</span>`
    let jsModal = document.querySelector(modal)
    jsModal.innerHTML = `
    <form>
        <h3>Заполните форму, чтобы купить</h3>
        <div class="cart_item">
            <img class="cart_item__img " src="${data.img[0]}">
            <div class="cart_item__title">
                <span>${data.title}</span>
            </div>
            <div class="cart_item__price">
                <span class="cart_item__price--standart">${data.singlePrice} руб</span>
                <span class="cart_item__price--stock">${data.setPrice} руб</span>
            </div>
        </div>
        <label for="person_phone_one_click">Ваш красивый номер телефона</label>
        <div class="input_person__phone">
        <input type="text" name="person_phone" id="person_phone_one_click" placeholder="+375 (__) ___ - __ - __"> 
        </div>
        <button type="submit" class="btn-b btn_b--call" onclick="orderOneClickSet(this, 'Заказ в один клик', '${textSent}', '${data}')" type-submit="В один клик">Купить в 1 клик</button>
    </form>
    `
    $(function () {
        $(".input_person__phone input").mask("+375 (99) 999 - 99 - 99");
    });
    $('.input_person__phone input').click(function(){
        $(this).setCursorPosition(6);
      });

    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });
}

function showModalOneClickAccessories(modal, data, size) {
    size = +size.getAttribute('size')
    data = eval(data)
    let textSent = `<span><b>id:</b> ${data.id}, <b>название:</b> ${data.name}, <b>размер:</b> ${data.size[size].size}, <b>цена:</b> ${data.size[size].discountPrice}</span>`
    let jsModal = document.querySelector(modal)
    jsModal.innerHTML = `
    <form>
        <h3>Заполните форму, чтобы купить</h3>
        <div class="cart_item">
            <img class="cart_item__img " src="${data.size[size].img[0]}">
            <div class="cart_item__title">
                <span>${data.name}</span><br>
                <span>${data.size[size].size}</span>
            </div>
            <div class="cart_item__price">
                <span class="cart_item__price--standart">${data.size[size].price} руб</span>
                <span class="cart_item__price--stock">${data.size[size].discountPrice} руб</span>
            </div>
        </div>
        <label >Вам нужен казан?</label>
        <div class="__select _select_one_click" data-state="">
            <div onclick="(showSelect(this))" class="__select__title " data-default="Да, 4.5 литра">Да, 4.5 литра</div>
                <div class="__select__content">
                    <div>
                        <input id="acc_4-5" class="__select__input _select_input_furnace" type="radio" value="Да, 4.5 литра" name="needKazan"}"/>
                        <label for="acc_4-5" class="__select__label _select_label_furnace">Да, 4.5 литра</label>
                        <input id="acc_6" class="__select__input _select_input_furnace" type="radio" value="Да, 6 литров" name="needKazan"}"/>
                        <label for="acc_6" class="__select__label _select_label_furnace">Да, 6 литров</label>
                        <input id="acc_8" class="__select__input _select_input_furnace" type="radio" value="Да, 8 литров" name="needKazan"}"/>
                        <label for="acc_8" class="__select__label _select_label_furnace">Да, 8 литров</label>
                        <input id="acc_8" class="__select__input _select_input_furnace" type="radio" value="Да, 10 литров" name="needKazan"}"/>
                        <label for="acc_8" class="__select__label _select_label_furnace">Да, 10 литров</label>
                        <input id="acc_no" class="__select__input _select_input_furnace" type="radio" value="Нет" name="needKazan"}"/>
                        <label for="acc_no" class="__select__label _select_label_furnace">Нет</label>
                    </div>
                </div>
            </div>
        </div>
        <label for="person_phone_one_click">Ваш красивый номер телефона</label>
        <div class="input_person__phone">
        <input type="text" name="person_phone" id="person_phone_one_click" placeholder="+375 (__) ___ - __ - __"> 
        </div>
        <button type="submit" class="btn-b btn_b--call" onclick="orderOneClickAccessories(this, 'Заказ в один клик', '${textSent}', '${data}')" type-submit="В один клик">Купить в 1 клик</button>
    </form>
    `
    $(function () {
        $(".input_person__phone input").mask("+375 (99) 999 - 99 - 99");
    });
    $('.input_person__phone input').click(function(){
        $(this).setCursorPosition(6);
      });

    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50
    });
    $('.modal').css('display') == 'inline-block'
}



function progressLine(count, indexBtn) {
    if(indexBtn) {
        indexResolve += 1
    }
    indexSlick += +count
    if(indexSlick < 0) {
        indexSlick = 0
    }
    let progresLine = $('.progress_current_line');
    let resultGifts = $('.container_quiz .gifts_for_answers')
    let slickIndex = $('.elem_quiz.slick-active').attr('data-slick-index')
 
    let progressBlock = $('.progress_quiz_block')
    switch(+slickIndex + count) {
        case 0:
            progresLine.css('max-width', '0');
            animateElem('.quiz_right_block .discount_count span', '0')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '0')
            animateElem('.progress_quiz span span', '0%')
            
            break
        case 1:
            progresLine.css('max-width', '14%');
            animateElem('.progress_quiz span span', '14%')
            animateElem('.quiz_right_block .discount_count span', '3')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '3')
            break
        case 2:
            progresLine.css('max-width', '28%')
            animateElem('.progress_quiz span span', '28%')
            animateElem('.quiz_right_block .discount_count span', '5')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '5')
            break
        case 3:
            progresLine.css('max-width', '42%')
            animateElem('.progress_quiz span span', '42%')
            animateElem('.quiz_right_block .discount_count span', '7')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '7')
            break
        case 4:
            progresLine.css('max-width', '56%')
            animateElem('.progress_quiz span span', '56%')
            animateElem('.quiz_right_block .discount_count span', '9')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '9')
            break
        case 5:
            progresLine.css('max-width', '70%')
            animateElem('.progress_quiz span span', '70%')
            animateElem('.quiz_right_block .discount_count span', '11')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '11')
            break
        case 6:
            progresLine.css('max-width', '85%')
            animateElem('.progress_quiz span span', '85%')
            animateElem('.quiz_right_block .discount_count span', '13')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '13')
            break
        case 7:
            progresLine.css('max-width', '100%')
            animateElem('.progress_quiz span span', '100%')
            animateElem('.quiz_right_block .discount_count span', '15')
            animateElem('.quiz_right_block_mobile .discount_count_mobile span', '15')
            animateGiftBlocked('.quiz_gift i')
            animateFinishGift('.finish_block', 'block')
            if(window.innerWidth < 800) {
                animateFinishGift('.progress_quiz_block', 'none')
                animateFinishGift('.quiz_right_mobile', 'none')
                animateFinishGift('.container_quiz .gifts_for_answers', 'block')
            } else {
              progressBlock.css('opacity', '0')
              progressBlock.css('pointer-events', 'none')  
            }
            
            
            break
    }
}


function isDisabletNextBtn() {
    let btn = document.querySelector('.progress_next')
    btn.setAttribute('index', indexResolve)
    let btnIndex = btn.getAttribute('index')
    console.log(indexSlick, btnIndex)
    if(indexSlick < btnIndex) {
        btn.disabled = false //включает кнопку Далее, если ответ уже дан
    } 
    // else if(indexSlick == 4) {
    //     btn.disabled = false // кнопка Далее включена при выборе аксесуаров
    //     indexResolve += 1
    // } 
    else {
        btn.disabled = true//выключает кнопку Далее
    }
    
}

function currentMessengerQuiz(messeger) {
    let label = document.querySelector('.quiz_btns_sent_input label')
    console.log(messeger)
    let text = 'телефона'
    switch(messeger.value){
        case 'По телефону':
            text = 'телефона'
            break;
        case 'В Viber':
            text = 'в viber'
            break;
        case 'В WhatsApp':
            text = 'в whatsApp'
            break;
        case 'В telegram':
            text = 'в telegram'
            break;
    }
    label.textContent = 'Ваш красивый номер ' + text
}

function animateFinishGift(elem, action) {
    $(elem).animate({
    opacity: 0.0,
    }, 300, function() {
    $(elem).css('display', action) 
    $(elem).animate({
    opacity: 1,
    }, 300 );
    });
}
function animateElem(elem, text) {
    $(elem).animate({
    opacity: 0.0,
    }, 300, function() {
    document.querySelector(elem).textContent=text;
    $(elem).animate({
    opacity: 1,
    }, 300 );
    });
}
function animateGiftBlocked(elem) {
    $(elem).animate({
    opacity: 0.0,
    }, 300, function() {
    $(elem).addClass('checked')
    $(elem).animate({
    opacity: 1,
    }, 300 );
    });
}

function modalAddToCart() {
        $('.modal_add_to_cart').toggleClass('active')
        $('.black_bg').addClass('active')
        jQuery(function ($) {
            $(document).mouseup(function (e) { // событие клика по веб-документу
                var div = $(".nav__mobile"); // тут указываем ID элемента
                var disc = $('.cart_discount')
                var cart = $('.cart')
                if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 && !disc.is(e.target) && disc.has(e.target).length === 0 &&
                !cart.is(e.target) && cart.has(e.target).length === 0) { // и не по его дочерним элементам
                    $('.black_bg').removeClass('active')
                    $('.modal_add_to_cart').removeClass('active')
                }
            });
        });
        
        $('.open_cart_form_modal ').click(function () {
            $('.modal_add_to_cart').removeClass('active')
            $('.cart').addClass('active')
            jQuery(function ($) {
                $(document).mouseup(function (e) { // событие клика по веб-документу
                    var div = $(".cart"); // тут указываем ID элемента
                    var disc = $('.cart_discount')
                    if (!div.is(e.target) // если клик был не по нашему блоку
                        && div.has(e.target).length === 0 && !disc.is(e.target) && disc.has(e.target).length === 0) { // и не по его дочерним элементам
                        $('.cart').removeClass('active')
                        $('.black_bg').removeClass('active')
                        $('.cart_discount').removeClass('active')
                    }
                });
            });
            $('.btn_close--cart ').click(function () {
                $(".cart").removeClass('active')
                $(".black_bg").removeClass('active')
                $('.cart_discount').removeClass('active')
            })
            $('.cart_discount').addClass('active')
            $('.black_bg').addClass('active')  
        })     
    
    }

function showPrompt(prompt) {
    $(prompt).css('opacity', '1')
    $(prompt).css('pointer-events', 'visible')


    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $('.prompt'); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.prompt').css('opacity', '0')
                $('.prompt').css('pointer-events', 'none')
            }
        });
    });
}
$('.prompt').mouseleave(function () {
    $('.prompt').css('opacity', '0')
    $('.prompt').css('pointer-events', 'none')
})

function hidePrompt(prompt) {
    $(prompt).parent().css('opacity', '0')
    $(prompt).parent().css('pointer-events', 'none')
}

$('.nav__mobile .nav_toggle span').click(function () {
    $(this).siblings('ul').slideToggle()
    $(this).children('.nav_arrow').toggleClass('active')
})
$('.btn_menu ').click(function () {
    $('.nav__mobile').toggleClass('active')
    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(".nav__mobile"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.nav__mobile').removeClass('active')
                $('.black_bg').removeClass('active')
            }
        });
    });
    $('.close_mobile__menu ').click(function () {
        $(".nav__mobile").removeClass('active')
        $(".black_bg").removeClass('active')
    })
    $('.black_bg').addClass('active')
})
$('.btn_to_cart ').click(function () {
    
    $('.cart').toggleClass('active')
    $('.cart_discount').addClass('active')
    $('.black_bg').addClass('active')
    jQuery(function ($) {
        $(document).mouseup(function (e) { // событие клика по веб-документу
            var div = $(".cart"); // тут указываем ID элемента
            var disc = $('.cart_discount')
            var remove = $('.btn_remove')
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 && !disc.is(e.target) && disc.has(e.target).length === 0
                && !remove.is(e.target) && remove.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.cart').removeClass('active')
                $('.black_bg').removeClass('active')
                $('.cart_discount').removeClass('active')
            }
        });
    });
    $('.btn_close--cart ').click(function () {
        $(".cart").removeClass('active')
        $(".black_bg").removeClass('active')
        $('.cart_discount').removeClass('active')
    })
    
})



$(function () {
    $(".input_person__phone input").mask("+375 (99) 999 - 99 - 99");
});
let thnks = false;
function sentPhone(e, fromForm) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm
                
            });
            $.ajax({
                url: 'php/sentPhone.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraKazan('.modal_extra_oneclick', '', phonePerson)
                    // if(fromPage == 'Узбекские казаны') {
                    //     window.location.href = 'thanksUzbek.html'
                    // }
                    // if(fromPage == 'Афганские казаны') {
                    //     window.location.href = 'thanksAfgan.html'
                    // }
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        console.log(phone)
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function orderCart(e, fromForm) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let order = ''
            let totalPrice = 0
            for(let [item, elem] of cartArr.entries()) {
                item += 1 
                order += ` <li>${item}) <b>id:</b>${elem.id}, <b>название:</b> ${elem.name}, <b>количество:</b> ${elem.count}, <b>размер:</b> ${elem.size}, <b>цена</b> ${elem.discountPrice} </li>`
                totalPrice += elem.discountPrice * elem.count
            }
            
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&order=${order}`
            data+=`&totalPrice=${totalPrice}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + order
                
            });
            $.ajax({
                url: 'php/orderCart.php', 
                type: 'POST',
                data: data,
                success: function(){
                    if(fromPage == 'Узбекские казаны') {
                        window.location.href = 'thanksUzbek.html'
                    }
                    if(fromPage == 'Афганские казаны') {
                        window.location.href = 'thanksAfgan.html'
                    }

                    cartArr = []
                    localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
                    renderCart()
                    renderNumberInCart()
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        console.log(phone)
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}
let phonePerson = ''

function orderOneClickExtra(e, fromForm) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let data = $(e).serialize();
        data+=`&fromForm=${fromForm}`
        data+=`&person_phone=${phonePerson}`
        data+=`&fromPage=${fromPage}`
        let arrExtra = e.querySelectorAll(`.extra_item input`);

        let extraitems = ''
        for(let i = 0; i < arrExtra.length; i++) {
            if(arrExtra[i].checked) {
                extraitems += `
                ${arrExtra[i].value};
                `    
            }
            
        } 
  
        _rc('send', 'order', {
            'orderMethod': '',
            'phone': phonePerson,
            'customTransactionId': url('?transaction_id'),
            'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + extraitems
            
        });
        $.ajax({
            url: 'php/orderOneClickExtra.php', 
            type: 'POST',
            data: data,
            success: function(){
                if(fromPage == 'Узбекские казаны') {
                    window.location.href = 'thanksUzbek.html'
                }
                if(fromPage == 'Афганские казаны') {
                    window.location.href = 'thanksAfgan.html'
                }
            },
            error: function(err){
                alert('Ошибка сервера. Сообщение не отправлено');
            }
        });
        return false
        
    }
}

function orderOneClickKazan(e, fromForm, textOrder, dataOrder) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&order=${textOrder}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + textOrder 
                
            });
            $.ajax({
                url: 'php/orderOneClickKazan.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraKazan('.modal_extra_oneclick', dataOrder, phonePerson)
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        console.log(phone)
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            phonePerson = phoneField
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function orderOneClickFurnace(e, fromForm, textOrder, dataOrder) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&order=${textOrder}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + textOrder
                
            });
            $.ajax({
                url: 'php/orderOneClickKazan.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraFurnace('.modal_extra_oneclick', dataOrder, phonePerson)
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        console.log(phone)
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            phonePerson = phoneField
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function orderOneClickSet(e, fromForm, textOrder, dataOrder) {
    e = e.closest('form')
    textOrder = textOrder.replace('+', ' плюс ')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&order=${textOrder}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + textOrder
                
            });
            $.ajax({
                url: 'php/orderOneClickKazan.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraFurnace('.modal_extra_oneclick', dataOrder, phonePerson)
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            phonePerson = phoneField
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function orderOneClickAccessories(e, fromForm, textOrder, dataOrder) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&order=${textOrder}`
            data+=`&fromPage=${fromPage}`
            let needKazan = $(e).find('input[name=needKazan]').val();
            let needKazanText = ''
            if(needKazan) {
                needKazanText = `Нужен казан: ${needKazan}`
            }
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + textOrder + ' __ ' + needKazanText
                
            });
            $.ajax({
                url: 'php/orderOneClickKazan.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraAccessories('.modal_extra_oneclick', dataOrder, phonePerson)
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            phonePerson = phoneField
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function sentQuiz(e, fromForm,fromPage) {
    e = e.closest('form')
    e.onsubmit = (EO) => {
        let ok = true
        ok = phoneValidation(ok) && ok;
        if (!ok) {
            EO.preventDefault()
        } else {
            let data = $(e).serialize();
            data+=`&fromForm=${fromForm}`
            data+=`&fromPage=${fromPage}`
            _rc('send', 'order', {
                'orderMethod': '',
                'phone': $(e).find('input[name=person_phone_quiz]').val(),
                'customTransactionId': url('?transaction_id'),
                'customerComment': fromPage + ' __ ' + fromForm + ' __ ' + `
                1.  ${$(e).find('input[name=kazan_quiz]').val()};                                          
                2.  ${$(e).find('input[name=person_quiz]').val()};                                           
                3.  ${$(e).find('input[name=cook_quiz]').val()};                                              
                4.  ${$(e).find('input[name=quiz_furnace]').val()};                                           
                5.  ${$(e).find('input[name=accessories_quiz]').val()};                                           
                6.  ${$(e).find('input[name=quiz_budget]').val()};                                          
                7.  ${$(e).find('input[name=quiz_delivery]').val()};                                          
                8.  ${$(e).find('input[name=quiz_messenger]').val()};                                           
                9.  ${$(e).find('input[name=person_phone_quiz]').val()};     
                `
                
            });
            $.ajax({
                url: 'php/sentQuiz.php', 
                type: 'POST',
                data: data,
                success: function(){
                    showModalExtraKazan('.modal_extra_oneclick', '', phonePerson)
                    // if(fromPage == 'Узбекские казаны') {
                    //     window.location.href = 'thanksUzbek.html'
                    // }
                    // if(fromPage == 'Афганские казаны') {
                    //     window.location.href = 'thanksAfgan.html'
                    // }
                    isQuiz = true
                    localStorage.setItem('kazanbelQuiz', JSON.stringify(isQuiz))
                },
                error: function(err){
                    alert('Ошибка сервера. Сообщение не отправлено');
                }
            });
            return false
        }
        
    }

    function phoneValidation(err) {
        let re = /\+\d{3}\s\(\d{2}\)\s\d{3}\s-\s\d{2}\s-\s\d{2}/;

        let cont = e.parentNode.querySelector('.input_person__phone');
        let phone = e.parentNode.querySelector('.input_person__phone input');
        let phoneField = phone.value
        if (re.test(phoneField) && (phoneField.substr(6, 2) == 29) || (phoneField.substr(6, 2) == '33') || (phoneField.substr(6, 2) == '44') || (phoneField.substr(6, 2) == '25')) {
            phone.className = ''
            phonePerson = phoneField
            return true 
        } else {
            cont.className = 'input_person__phone phone_not_valid_cont'
            phone.className = 'phone_not_valid'
            if (err) phone.focus()
            return false
        }
    }
}

function setOwlCarousel(e, size) {
    
    if (window.innerWidth < size) {
        let elem = document.querySelectorAll(e)
        for(let i of elem) {
           i.classList.add('owl-carousel') 
        }
        
    }
}

$(document).ready(function () {
    $(".our_advantages__items.owl-carousel").owlCarousel({
        responsiveClass: true,
        nav: true,
        dots: false,
        margin: 20,
        autoWidth: true,
        slideTransition: 'linear',
        
    });

});

$(document).ready(function () {
    $(".credit_cards.owl-carousel").owlCarousel({
        margin: 16,
        responsiveClass: true,
        nav: true,
        dots: false,
        stagePadding: 20,
        slideTransition: 'linear',
        responsive: {
            0: {
                items: 1,
            },
            380: {
                items: 2,
            },
            480: {
                items: 3,
            },
            630: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        }
    });

});
let cartArr = JSON.parse(localStorage.getItem('kazanbelCart')) ? JSON.parse(localStorage.getItem('kazanbelCart')) : []

function addToCart(elem, type, size) {
    elem = eval(elem)
    let newObj = {}
    switch (type) {
        case 'kazan':
            newObj.id = +elem.id;
            newObj.count = 1
            newObj.name = elem.name
            newObj.img = elem.img[0]
            newObj.size = ''
            newObj.price = elem.price,
            newObj.discountPrice = elem.discountPrice
            break;
        case 'furnace':
            size = +size.getAttribute('size')
            newObj.id = +elem.id;
            newObj.count = 1
            newObj.name = elem.title,
            newObj.img = elem.img[0],
            newObj.size = elem.size[size].size,
            newObj.price = elem.size[size].price,
            newObj.discountPrice = elem.size[size].discountPrice
            break
        case 'set':
            newObj.id = +elem.id;
            newObj.count = 1
            newObj.name = elem.title,
            newObj.img = elem.img[0],
            newObj.size = '',
            newObj.price =  elem.singlePrice,
            newObj.discountPrice = elem.setPrice   
            break
        case 'accessories':
            size = +size.getAttribute('size')
            newObj.id = +elem.id;
            newObj.count = 1
            newObj.name = elem.name,
            newObj.img = elem.size[size].img[0],
            newObj.size = elem.size[size].size,
            newObj.price = elem.size[size].price,
            newObj.discountPrice = elem.size[size].discountPrice
    }
    for(let elem of cartArr) {
        if(newObj.id == elem.id) {
            elem.count += 1
            localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
            renderCart()
            modalAddToCart()
            return
        }
    }
    cartArr.push(newObj)
    renderNumberInCart()
    localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
    renderCart()
    modalAddToCart()
    
    console.log(cartArr)
}

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart .cart_items')
    const cartBlock = document.querySelector('.cart_block')
    const cartEmpty = document.querySelector('.cart_empty')
    const btnClose = document.querySelector('.cart_close_desktop')
    let totalText = document.querySelector('.cart_total_price')
    let totalPrice = 0
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.innerHTML = `
    <div class="cart_item cart_item--gift">
        <div class="cart_item__img cart_item__img--gift"></div>
        <div class="cart_item__title">
            <span>Книга рецептов</span>
        </div>
        <div class="cart_counter">
        </div>
        <div class="cart_item__price">
            <span class="cart_item__price--standart">120 руб</span>
            <span class="cart_item__price--stock">Бесплатно</span>
        </div>
    </div>
    `
    // if(cartArr.length == 0) {
    //     cartEmpty.style.display = 'block'
    //     cartBlock.style.display = 'none'
    //     btnClose.style.display = 'flex'
    // } else {
    //     cartEmpty.style.display = 'none'
    //     cartBlock.style.display = 'block'
    // }
    for(let [i, elem] of cartArr.entries()) {
        cartItemsContainer.innerHTML += `
        <div class="cart_item">
            <div class="btn_remove" remove-id="${elem.id}" onclick="removeFromCart(${elem.id})"></div>
            <img class="cart_item__img" src="${elem.img}">
            <div class="cart_item__title">
                <span>${elem.name}</span>
            </div>
            <div class="cart_counter">
                <span class="cart_count plus" onclick="plusCount(${i})"></span>
                <span class="input_counter">${elem.count}</span>
                <span class="cart_count minus" onclick="minusCount(${i})"></span>
            </div>
            <div class="cart_item__price">
                <span class="cart_item__price--standart">${elem.price * elem.count} руб.</span>
                <span class="cart_item__price--stock">${elem.discountPrice * elem.count} руб.</span>
            </div>
        </div>
        ` 
        totalPrice += elem.discountPrice * elem.count         
    }
    totalText.textContent = totalPrice
}
renderCart()

function removeFromCart(id) {
    for(let i = 0; i < cartArr.length; i++) {
        if(cartArr[i].id == id) {
            cartArr.splice(i, 1)
        }
    }
    // $('.black_bg').addClass('active')
    localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
    renderCart()
    renderNumberInCart()
}

function renderNumberInCart() {
    
    const countPC = document.querySelectorAll('.btn_cart--count')[0]
    const countMobile = document.querySelectorAll('.btn_cart--count')[1]
    countPC.innerHTML = cartArr.length + 1
    countMobile.innerHTML = cartArr.length + 1
}
renderNumberInCart()
function plusCount(e) {
    cartArr[e].count += 1
    localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
    renderCart()
}
function minusCount(e) {
    if(cartArr[e].count > 1) {
        cartArr[e].count-=1
        localStorage.setItem('kazanbelCart', JSON.stringify(cartArr))
        renderCart()
    } 
}


const catalogCategory = document.querySelector(".catalog_category")
const discountKazanUzbek = document.querySelector(".discount_kazan__uzbek")
const discountKazanAfgan = document.querySelector(".discount_kazan__afgan")

function renderKazan(kazan, name, isDiscount) {
    if(isDiscount) {
        if(name == 'kazanUzbek') {
            discountKazanUzbek.innerHTML = ''
        } else {
            discountKazanAfgan.innerHTML = ''
        }
    } else {
        catalogCategory.innerHTML = "";
    }
    

    for (let i = 0; i < kazan.length; i++) {
        let sub_category = `
        <div class="sub_category">
            <div class="sub_category--head ${isAfgan || name == 'kazanAfgan' ? 'afgan' : ''}">
                <div class="sub_category--img" style="background: url(${kazan[i].titleImg}) center center no-repeat, #ff8653;"></div>
                <h3>${kazan[i].title}<span> ${kazan[i].person}</span></h3>
            </div>
            
            <div class="sub_category__items">
        `
        let categoryItems = ``;
        for (let j = 0; j < kazan[i].products.length; j++) {
            let categoryItems1 = `
            <div class="sub_category__item sub_category__kazan">
            ${kazan[i].products[j].hit ? '<span class="hit">Хит</span>' : ''}
                <div class="img_bg__item">
                ${name == 'kazanAfgan' && kazan[i].products[j].imgPrev ? '<div class="imgPrev"><img src="'+ kazan[i].products[j].imgPrev +'"></div>' : ''}
                `
                let images = ''
                for(let [item, elem] of kazan[i].products[j].img.entries()) {
                    images += `<div class="img_bg__item--elem">
                    <a data-fancybox="gallery_${kazan[i].products[j].id}_${j}" href="${elem}"><img src="${elem}" alt="kazan"></a>
                    
                    </div>`
                }
            let categoryItems2 = `
                      
                </div>
                <h3 class="sub_category__item--title">${kazan[i].products[j].name}</h3>
                ${kazan[i].title != 'Экстра большие казаны' && name != 'kazanAfgan' ? '<span class="sub_category__item--preson">' + kazan[i].products[j].for + '</span>' : ''}
                
                <ul class="sub_category__item__params">
                    ${isAfgan || name == 'kazanAfgan' ? `
                    <li>
                        <span class="params_bottom">Материал</span>
                        <span>${kazan[i].products[j].material}</span>
                    </li>
                    <li>
                        <span class="params_d">Диаметр</span>
                        <span>${kazan[i].products[j].d}</span>
                    </li>
                    <li>
                        <span class="params_height">Высота</span>
                        <span>${kazan[i].products[j].height}</span>
                    </li>  
                    <li>
                        ${kazan[i].products[j].name == 'Казан 20 л.' || kazan[i].products[j].name == 'Казан 30 л.' ? '<span class="params_tWall">Толщина стенок</span>' : '<span class="params_weight">Вес</span>'}
                        <span>${kazan[i].products[j].weight}</span>
                    </li>   
                    <li>
                        <span class="params_value">Реальный обьем</span>
                        <span>${kazan[i].products[j].value}</span>
                    </li>                 
                    `
                    : 
                    `<li>
                        <span class="params_bottom">Дно</span>
                        <span>${kazan[i].products[j].bottom}</span>
                    </li>
                    <li>
                        <span class="params_d">Диаметр</span>
                        <span>${kazan[i].products[j].d}</span>
                    </li>
                    <li>
                        <span class="params_deep">Глубина</span>
                        <span>${kazan[i].products[j].deep}</span>
                    </li>
                    <li>
                        <span class="params_tWall">Толщина стенок</span>
                        <span>${kazan[i].products[j].tWall}</span>
                    </li>
                    <li>
                        <span class="params_weight">Вес</span>
                        <span>${kazan[i].products[j].weight}</span>
                    </li>
                    <li>
                        <span class="params_cap">Крышка</span>
                        <span>${kazan[i].products[j].cap}</span>
                    </li> `
                    }
                </ul>
                <div class="sub_category__item--price">
                    <p class="price_default"><span  class="price_text">${kazan[i].products[j].price} руб.</span></p>
                    <p class="price_discount"><span  class="price_text">${kazan[i].products[j].discountPrice} руб.</span></span><span><span class="price_discount__text">Цена с сезонной скидкой</span> </p>
                </div>
                <div class="sub_category__item--buy">
                    <button type="button" class="btn-b" product-id="${kazan[i].products[j].id}" onclick="showModalOneClickKazan('.modal_oneclick', '${name}[${i}].products[${j}]', '${name}[${i}]')">Купить в 1 клик</button>
                    <div class="btn_cart__wrap">
                        <button class="btn_cart add_to_cart header_btn_mobile" product-id="${kazan[i].products[j].id}"  onclick="addToCart('${name}[${i}].products[${j}]', 'kazan')">
                        <svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#000"><path d="M7.337 17.89a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm10.138-3.735a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm5.416-17.742a.667.667 0 00-.427-.214L5.096 3.43l-.48-1.467A2.455 2.455 0 002.32.308H.534a.534.534 0 100 1.067H2.32c.58.013 1.091.385 1.28.934l3.39 10.218-.268.614a2.561 2.561 0 00.24 2.32 2.481 2.481 0 002.001 1.121h10.379a.534.534 0 100-1.067H8.964a1.36 1.36 0 01-1.12-.64 1.467 1.467 0 01-.134-1.28l.214-.481 11.232-1.174a2.935 2.935 0 002.535-2.24l1.28-5.363a.454.454 0 00-.08-.453zm-2.24 5.576a1.814 1.814 0 01-1.628 1.414l-11.1 1.147-2.48-7.523 16.354.24-1.147 4.722z"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h23v23H0z"/></clipPath></defs></svg>
                        </button>
                        <i>+</i>  
                    </div>
                    
                </div>
            </div> 
            `
            categoryItems += categoryItems1 + images + categoryItems2
        }  
        if(isDiscount) {
            if(name == 'kazanUzbek') {
                discountKazanUzbek.innerHTML += `${sub_category} ${categoryItems} </div></div>`
            } else {
                discountKazanAfgan.innerHTML += `${sub_category} ${categoryItems} </div></div>`
            }
        } else {
            catalogCategory.innerHTML += `${sub_category} ${categoryItems} </div></div>`
        }
        // catalogCategory.innerHTML += `${sub_category} ${categoryItems} </div></div>`
    
    }

}



function renderFurnace(furnace, name) {
    
    containerFurnace.innerHTML = ''

    for(let [item, elem] of furnace.entries()) {
        let a = `
        <div class="catalog_furnace__item furnace__item_${item}" itemFurnace="${item}">
            ${elem.hit ? '<span class="hit">Хит</span>' : ''}
            <div class="catalog_furnace__item--images">
            
            `
            let images = ''
            for(let [i,imagesItem] of elem.img.entries()) {
                images += `
                <a href="${imagesItem}" data-fancybox="gallery_furnace_${item}" class="catalog_furnace__item--images__elem"><img src="${imagesItem}" alt="${elem.title}"><div></div></a>`
            }
            let b = `
            </div>
            <div class="catalog_furnace__item--right">
                <div class="catalog_furnace__item--descr__mobile">
                    <h3>${elem.title}</h3>
                    <div class="furnace__differences--descr">
                        <span class="furnace__btn_mobile" onclick="showPrompt('.prompt_diff_${elem.id}')">Отличия от других?</span>
                        <div class="prompt prompt_diff_${elem.id} prompt_furnace">
                            <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                            <h4 class="furnace__differences--title">${elem.differences.title}</h4>
                            <p>${elem.differences.descr}</p>
                        </div>
                    </div>
                    <div class="furnace__main--descr">
                        <span class="furnace__btn_mobile"  onclick="showPrompt('.prompt_char_${elem.id}')">Характеристики</span>
                        <div class="prompt prompt_char_${elem.id} prompt_furnace">
                            <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                                <h4>Характеристики</h4>
                                <ul class="sub_category__item__params">
                                    <li>
                                        <span class="params_weight">Толщина металла</span>
                                        <span>${elem.weight}</span>
                                    </li>
                                    <li>
                                        <span class="params_d">Под казан</span>
                                        <span>${elem.forKazan}</span>
                                    </li>
                                    <li>
                                        <span class="params_material">Материал</span>
                                        <span>${elem.material}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div> 

                <div class="catalog_furnace__item--descr">
                    <div class="furnace__main--descr">
                        <h3>${elem.title}</h3>
                        <ul class="sub_category__item__params">
                            <li>
                                <span class="params_weight">Толщина металла</span>
                                <span>${elem.weight}</span>
                            </li>
                            <li>
                                <span class="params_d">Под казан</span>
                                <span>${elem.forKazan}</span>
                            </li>
                            <li>
                                <span class="params_material">Материал</span>
                                <span>${elem.material}</span>
                            </li>
                        </ul>
                        <button type="button" class="btn_prompt" onclick="showModal('.modal_furnace_size_${elem.id}')"><i></i>Размеры печи</button>
                        <div class="modal modal_furnace_size modal_furnace_size_${elem.id}">
                        <h3>Размер печи</h3>
                        <img src="${elem.size[0].sizeImg}" alt="${elem.title}_размеры">
                    </div> 
                </div>
                <div class="furnace__differences--descr">
                    <span class="furnace__differences--text">Отличия от других</span>
                    <h4 class="furnace__differences--title">
                        <div class="differences_title--img" style="background: url(${elem.differences.imgIcon}) center bottom no-repeat, #FF9B64; background-size: 100%, auto;"></div>
                        ${elem.differences.title}</h4>
                    <p>${elem.differences.descr}</p>
                </div>
            </div>
            <div class="catalog_furnace__item--bottom">
                <div class="volume_price">
                    <div>
                        <span>Печь под размер казана</span>
                        <div class="__select _select_furnace _select_furnace_${item}" data-state="">
                        <div onclick="(showSelect(this))" class="__select__title  _select_title_furnace _select_title_furnace_${item}" data-default="${elem.size[0].size}">${elem.size[0].size}</div>
                            <div class="__select__content _select_content_furnace _select_content_furnace_${item}">
                                <div>
            `
            let sizes = ''
            for(let i= 0; i < elem.size.length; i++) {
                sizes += `<input id="selectFurncae_${i}_${item}" class="__select__input _select_input_furnace" type="radio" value="${i}" name="selectFurncae" 
                price="${elem.size[i].price}" discountPrice="${elem.size[i].discountPrice}" imageSize="${elem.size[i].sizeImg}"
                ${i == 0 ? "checked" : ''}
                 onclick="updateSizeFurnace(this, ${item}, ${name})"
                />
                <label for="selectFurncae_${i}_${item}" class="__select__label _select_label_furnace">${elem.size[i].size}</label>
                `
            }

            let c = `
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="volume_price_span">Цена печи со скидкой</span>
                                <div class="sub_category__item--price">
                                    <p class="price_default"><span class="price_text">${elem.size[0].price} руб.</span></p>
                                    <p class="price_discount"><span class="price_current price_text">${elem.size[0].discountPrice} руб.</span> </span><span><span class="price_discount__text">Цена со скидкой</span> </p>
                                </div>
                            </div>                                
                        </div>

                        <div class="sub_category__item--buy">
                            <button type="button" class="btn-b furnace_one_click" product-id="${elem.id}"  productItem="${item}" size="0" onclick="showModalOneClickFurnace('.modal_oneclick', ${name}[${item}], this)">Купить <span>${elem.title}</span></button>
                            <div class="btn_cart__wrap">
                                <button class="btn_cart add_to_cart header_btn_mobile" product-id="${elem.id}" productItem="${item}" onclick="addToCart(${name}[${item}], 'furnace', this)">
                                <svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#000"><path d="M7.337 17.89a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm10.138-3.735a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm5.416-17.742a.667.667 0 00-.427-.214L5.096 3.43l-.48-1.467A2.455 2.455 0 002.32.308H.534a.534.534 0 100 1.067H2.32c.58.013 1.091.385 1.28.934l3.39 10.218-.268.614a2.561 2.561 0 00.24 2.32 2.481 2.481 0 002.001 1.121h10.379a.534.534 0 100-1.067H8.964a1.36 1.36 0 01-1.12-.64 1.467 1.467 0 01-.134-1.28l.214-.481 11.232-1.174a2.935 2.935 0 002.535-2.24l1.28-5.363a.454.454 0 00-.08-.453zm-2.24 5.576a1.814 1.814 0 01-1.628 1.414l-11.1 1.147-2.48-7.523 16.354.24-1.147 4.722z"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h23v23H0z"/></clipPath></defs></svg>
                                </button>
                                <i>+</i>  
                            </div>
                        </div>
                    </div>  
                    </div>
                </div>
            
            `
        containerFurnace.innerHTML += a + images + b + sizes + c              
        
    }
}
function renderReadySet (ready_sets, name) {
    for(let [item, elem] of ready_sets.entries()) {
        let elem1 = `
        <div class="sub_category__item ready_set__item ready_set__item_${item} category_item">
            ${elem.hit ? '<span class="hit">Хит</span>' : ''}
            <div class="img_bg__item">
            `
            let images = ''
            for(let [i, src] of elem.img.entries()) {
                images += `<div class="img_bg__item--elem">
                <a data-fancybox="gallery_readyset_${item}" href="${src}"><img src="${src}" alt="kazan"></a>
                
                
                </div>`
            }
            let elem2 = ` 
            </div>
            <h3 class="sub_category__item--title">${elem.title}</h3>
            <div class="prompt_btn_container">
                <span class="btn_item_info gear__btn_prompt"  onclick="showPrompt('.prompt_ready_set_${elem.id}')">Характеристики</span>
                    <div class="prompt prompt_ready_set_${elem.id} prompt_furnace">
                    <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                        <h4>Казан</h4>
                        <ul class="sub_category__item__params">
                            <li>
                                <span class="params_d">Диаметр</span>
                                <span>${elem.prompt.d_kazan}</span>
                            </li>
                            <li>
                                <span class="params_material">Материал</span>
                                <span>${elem.prompt.material}</span>
                            </li>
                            <li>
                                <span class="params_weight">Толщина металла</span>
                                <span>${elem.prompt.weight_kazan}</span>
                            </li>
                            <li>
                                <span class="params_cap">Крышка</span>
                                <span>${elem.prompt.cap}</span>
                            </li>
                        </ul>

                        <h4>Печь</h4>
                        <ul class="sub_category__item__params">

                            <li>
                                <span class="params_d">Диаметр</span>
                                <span>${elem.prompt.d_furnace}</span>
                            </li>
                            <li>
                                <span class="params_weight">Толщина стали</span>
                                <span>${elem.prompt.weight_furnace}</span>
                            </li>
                        </ul>
                    </div>    
            </div>
            <div class="sub_category__item--price">
                <p class="price_default"><span class="price_text">${elem.singlePrice} руб.</span><span class="price_discount__text">Цена по отдельности</span> </p>
                <p class="price_discount"><span class="price_text">${elem.setPrice} руб.</span><span class="price_discount__text">Цена комплекта</span> </p>
            </div>
            <div class="sub_category__item--buy">
                <button type="button" class="btn-b" product-id="${elem.id} product-item="${item}" onclick="showModalOneClickSet('.modal_oneclick', ${name}[${item}])">Купить в 1 клик</button>
                <div class="btn_cart__wrap">
                    <button class="btn_cart add_to_cart header_btn_mobile" product-id="${elem.id} product-item="${item}" onclick="addToCart('${name}[${item}]', 'set')">
                    <svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#000"><path d="M7.337 17.89a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm10.138-3.735a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm5.416-17.742a.667.667 0 00-.427-.214L5.096 3.43l-.48-1.467A2.455 2.455 0 002.32.308H.534a.534.534 0 100 1.067H2.32c.58.013 1.091.385 1.28.934l3.39 10.218-.268.614a2.561 2.561 0 00.24 2.32 2.481 2.481 0 002.001 1.121h10.379a.534.534 0 100-1.067H8.964a1.36 1.36 0 01-1.12-.64 1.467 1.467 0 01-.134-1.28l.214-.481 11.232-1.174a2.935 2.935 0 002.535-2.24l1.28-5.363a.454.454 0 00-.08-.453zm-2.24 5.576a1.814 1.814 0 01-1.628 1.414l-11.1 1.147-2.48-7.523 16.354.24-1.147 4.722z"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h23v23H0z"/></clipPath></defs></svg>
                    </button>
                    <i>+</i>  
                </div>
            </div>
        </div> 
        `
        containerReadySet.innerHTML += elem1 + images + elem2
    }
}
let hideAccessory = []

const discountAccessories = document.querySelector('.discount_accessories')
function renderAccessories (isDiscount) {
    if(isDiscount) {
        discountAccessories.innerHTML = ''
    } else {
        containerAccessories.innerHTML = '' 
    }
    let head =''
    let acc_id = ''
    for(let [i, el] of accessories.entries()) {
        switch(i) {
            case 0:
            acc_id = 'acc_for_kazan'
            break
            case 1:
            acc_id = 'acc_shumovki'
            break
            case 2:
            acc_id = 'acc_tableware'
            break
            case 3:
            acc_id = 'acc_pchaki'
            break
            case 4:
            acc_id = 'acc_for_grill'
            break
        }
        head = `
        <div class="sub_category--head" id="${acc_id}">
            <div class="sub_category--img" style="background: url(${el.titleImg}) center center no-repeat, #ff8653;"></div>
            <h3>${el.title}</h3>
            ${ el.title == 'Ножи пчаки' ? '<p class="actuality_color">На сайте представлены не все расцветки,<br>актуальные уточняйте у менеджера</p>' : '' }
            
        </div>
        <div class="accessories_catalog__items owl-carousel accessories_catalog__items_${i}">
        `
        let catalogItem = ''
        for(let [item, elem] of el.products.entries()) {
            if( hideAccessory.indexOf(+elem.id) !== -1) {
                continue
            } else {
            catalogItem1 = `
            <div class="sub_category__item accessories_catalog__item accessories_catalog__item_${item} category_item acc_id_${elem.id}">
                ${elem.hit ? '<span class="hit">Хит</span>' : ''}
                <div class="img_bg__item">
                `
                let images = ''
                for(let [it, src] of elem.size[0].img.entries()) {
                    images += `<div class="img_bg__item--elem">
                    <a data-fancybox="gallery_accessories_${i}_${elem.id}_${item}_0" href="${src}"><img src="${src}" alt="accessories"></a>
                    </div>`
                }

                
                let afterImage = `
                </div>
                <h3 class="sub_category__item--title">${elem.name}</h3>
                <div class="prompt_btn_container">
                    <span class="btn_item_info gear__btn_prompt question__btn_prompt"  onclick="showPrompt('.prompt_accessories__${elem.id}')">Чем пригодится?</span>
                    <div class="prompt prompt_accessories__${elem.id} prompt_info">
                        <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                        <h4>${elem.useful.title}</h4>
                        <p>${elem.useful.descr}</p>
                    </div>    
                </div>
                <div class="prompt_btn_container">
                    <span class="btn_item_info gear__btn_prompt"  onclick="showPrompt('.prompt_accessories_char_${elem.id}')">Характеристики</span>
                    <div class="prompt prompt_accessories_char_${elem.id} prompt_info">
                        <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                        <h4>Характеристики</h4>
                        <ul class="sub_category__item__params">
                `
                let params = ''
                let typeParams = ''
                for(let [j, param] of elem.params.entries()) {
                    switch(param.title) {
                        case 'Материал':
                            typeParams = 'params_material'
                        break
                        case 'Длина':
                            typeParams = 'params_length'
                        break
                        case 'Диаметр':
                            typeParams = 'params_d'
                        break
                        case 'Толщина металла':
                            typeParams = 'params_weight'
                        break
                        case 'Глубина':
                            typeParams = 'params_deep'
                        break
                        default :
                        typeParams = 'params_weight'
                        break
                    }
                    params += 
                    
                    `
                    <li>
                        <span class="${typeParams}">${param.title}</span>
                        <span>${param.index}</span>
                    </li>                    
                    
                    `

                }
                let catalogItem2 = `
                        </ul>
                    </div>    
                </div>
                <div class="volume_price">
                    <div>
                        <span>Печь под размер казана</span>
                        <div class="__select _select_accessories" data-state="">
                            <div onclick="(showSelect(this))" elem_item="${item}" class="__select__title _select_accessories_title" data-default="${elem.size[0].size}">${elem.size[0].size}</div>
                            <div class="__select__content _select_accessories_content">
                                <div>`
                            let sizes = ''
                            for(let [j, size] of elem.size.entries()) {
                                sizes += `
                                    <input value="${j}" id="singleAccessories_${i}_${item}_${j}" class="__select__input _select_accessories_input" onclick="updateSizeAccessories(this, ${i}, ${item})" type="radio" name="singleAccessories" ${j == 0 ? "checked" : ''} />
                                    <label value="${j}" for="singleAccessories_${i}_${item}_${j}" class="__select__label __select_accessories_label" >${size.size}</label>                                    
                                `
                            }
                    let   catalogItem3 = `               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="sub_category__item--price">
                            <p class="price_default"><span class="price_text">${elem.size[0].price} руб.</span class="price_text"></p>
                            <p class="price_discount"><span class="price_current price_text">${elem.size[0].discountPrice} руб.</span> <span><span class="price_discount__text">Цена со скидкой</span> </span></p>
                        </div>
                    </div>                                
                </div>
                <div class="sub_category__item--buy">
                    <button type="button" class="btn-b one_click_accessories" product-id="${elem.id} product-item="${item}" size='0' onclick="showModalOneClickAccessories('.modal_oneclick', accessories[${i}].products[${item}], this)">Купить в 1 клик</button>
                    <div class="btn_cart__wrap">
                        <button class="btn_cart add_to_cart header_btn_mobile" product-id="${elem.id} product-item="${item}" size="0"  onclick="addToCart('accessories[${i}].products[${item}]','accessories', this)">
                        <svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)" fill="#000"><path d="M7.337 17.89a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm10.138-3.735a2.401 2.401 0 100 4.802 2.401 2.401 0 000-4.802zm0 3.735a1.334 1.334 0 110-2.668 1.334 1.334 0 010 2.668zm5.416-17.742a.667.667 0 00-.427-.214L5.096 3.43l-.48-1.467A2.455 2.455 0 002.32.308H.534a.534.534 0 100 1.067H2.32c.58.013 1.091.385 1.28.934l3.39 10.218-.268.614a2.561 2.561 0 00.24 2.32 2.481 2.481 0 002.001 1.121h10.379a.534.534 0 100-1.067H8.964a1.36 1.36 0 01-1.12-.64 1.467 1.467 0 01-.134-1.28l.214-.481 11.232-1.174a2.935 2.935 0 002.535-2.24l1.28-5.363a.454.454 0 00-.08-.453zm-2.24 5.576a1.814 1.814 0 01-1.628 1.414l-11.1 1.147-2.48-7.523 16.354.24-1.147 4.722z"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h23v23H0z"/></clipPath></defs></svg>
                        </button>
                        <i>+</i>  
                    </div>
                </div>
            </div>              
            `
        catalogItem += catalogItem1 + images + afterImage + params + catalogItem2 + sizes + catalogItem3  
            }  
        }
        if(isDiscount) {
            discountAccessories.innerHTML  += head + catalogItem + '</div>'
        } else {
            containerAccessories.innerHTML  += head + catalogItem + '</div>'
        }
      
    }
    
}

function showModalExtraKazan(modal, data) {
    const container = document.querySelector(modal + ' form');
    if(body.classList.contains('uzbek')) {
        data = furnaceUzbek
    } else if(body.classList.contains('afgan')){
        data = furnaceAfgan
    }
    
    container.innerHTML = renderExtraFurnace(modal, data) + renderExtraAccessories(modal, true)
    
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50,
        clickClose: false,
    });  
    
    setTimeout(function(){
        $('.modal_extra_oneclick form').slick(quizSlider());
        $('.extra_img_block').slick(imgItemSlider());  
        $(".extra_items.owl-carousel").owlCarousel({
            autoWidth: true,
            items: 4,
            dots: false,
        });
        $('.extra_block').css('opacity', '1')
      },200)

    $('.extra_back').click(function(){
        $(modal + ' form>.slick-prev').trigger('click')
    })

    $('.extra_next').click(function(){
        $(modal + ' form>.slick-next').trigger('click')
    })
    $( '.modal_extra_oneclick .close_modal_slick').click(function(e){
        e.preventDefault()
        $('.modal_extra_oneclick form').slick('unslick');
        $('.extra_img_block').slick('unslick'); 
        $('.extra_block').css('opacity', '0') 
        setTimeout(function() {
            if(fromPage == 'Узбекские казаны') {
                window.location.href = 'thanksUzbek.html'
            }
            if(fromPage == 'Афганские казаны') {
                window.location.href = 'thanksAfgan.html'
            }
        }, 500)
    })
    // $(document).mouseup(function (e) {
    //     var div = $(modal);
    //     if (!div.is(e.target) 
    //         && div.has(e.target).length === 0) { 
    //         $('.modal_extra_oneclick form').slick('unslick');
    //         $('.extra_img_block').slick('unslick');  
    //     }
    // });
}


function showModalExtraAccessories(modal) {
    const container = document.querySelector(modal + ' form');
    if(body.classList.contains('uzbek')) {
        data = furnaceUzbek
    } else if(body.classList.contains('afgan')){
        data = furnaceAfgan
    }
    container.innerHTML = renderExtraFurnace(modal, data, true)
    
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50,
        clickClose: false,
    });  
    
    setTimeout(function(){
        $('.modal_extra_oneclick form').slick(quizSlider());
        $('.extra_img_block').slick(imgItemSlider());  
        $(".extra_items.owl-carousel").owlCarousel({
            autoWidth: true,
            items: 4,
            dots: false,
        });
        $('.extra_block').css('opacity', '1')
      },200)

    $('.extra_back').click(function(){
        $(modal + ' form>.slick-prev').trigger('click')
    })

    $('.extra_next').click(function(){
        $(modal + ' form>.slick-next').trigger('click')
    })
    $( '.modal_extra_oneclick .close_modal_slick').click(function(e){
        e.preventDefault()
        $('.modal_extra_oneclick form').slick('unslick');
        $('.extra_img_block').slick('unslick');  
        $('.extra_block').css('opacity', '0')
        setTimeout(function() {
            if(fromPage == 'Узбекские казаны') {
                window.location.href = 'thanksUzbek.html'
            }
            if(fromPage == 'Афганские казаны') {
                window.location.href = 'thanksAfgan.html'
            }
        }, 500)

    })
    // $(document).mouseup(function (e) {
    //     var div = $(modal);
    //     if (!div.is(e.target) 
    //         && div.has(e.target).length === 0) { 
    //         $('.modal_extra_oneclick form').slick('unslick');
    //         $('.extra_img_block').slick('unslick');  
    //         if(fromPage == 'Узбекские казаны') {
    //             window.location.href = 'thanksUzbek.html'
    //         }
    //         if(fromPage == 'Афганские казаны') {
    //             window.location.href = 'thanksAfgan.html'
    //         }
    //     }
    // });
}

function showModalExtraFurnace(modal) {
    const container = document.querySelector(modal + ' form');
    
    container.innerHTML = renderExtraAccessories(modal, true)
    
    $(modal).modal({
        // fadeDuration: 300,
        // fadeDelay: 0.50,
        clickClose: false,
    });  
    
    setTimeout(function(){
        $('.modal_extra_oneclick form').slick(quizSlider());
        $('.extra_img_block').slick(imgItemSlider());  
        $(".extra_items.owl-carousel").owlCarousel({
            autoWidth: true,
            items: 4,
            dots: false,
        });
        $('.extra_block').css('opacity', '1')
      },200)

    $('.extra_back').click(function(){
        $(modal + ' form>.slick-prev').trigger('click')
    })

    $('.extra_next').click(function(){
        $(modal + ' form>.slick-next').trigger('click')
    })
    $( '.modal_extra_oneclick .close_modal_slick').click(function(e){
        e.preventDefault()
        $('.modal_extra_oneclick form').slick('unslick');
        $('.extra_img_block').slick('unslick');  
        $('.extra_block').css('opacity', '0')
        setTimeout(function() {
            if(fromPage == 'Узбекские казаны') {
                window.location.href = 'thanksUzbek.html'
            }
            if(fromPage == 'Афганские казаны') {
                window.location.href = 'thanksAfgan.html'
            }
        }, 500)
    })
    // $(document).mouseup(function (e) {
    //     var div = $(modal);
    //     if (!div.is(e.target) 
    //         && div.has(e.target).length === 0) { 
    //         $('.modal_extra_oneclick form').slick('unslick');
    //         $('.extra_img_block').slick('unslick');  
    //     }
    // });
}

function renderExtraFurnace(modal, data, isEnd) {
    let furnaceExtra = `
    <div class="extra_block">
        <h3>Вам нужна печь?</h3>
        <p class="extra_discount"><i></i>При заказе печи, <b>у вас будет скидка 10% на казан и шумовка в подарок</b></p>
        <p class="swipe_slider">Листайте карточки, чтобы смотреть другие размеры</p>
        <div class="extra_items owl-carousel">
        `
    let items = ''
        for(let [item, elem] of data.entries()) {
            console.log(elem)
            let items1 = `
            <div class="extra_item">
                <input type="checkbox" name="extra_furnace[]" id="extra_furnace_${elem.id}" value="id: ${elem.id}, Название: ${elem.title}, Цена:${elem.size[0].discountPrice}">
                <label for="extra_furnace_${elem.id}">
                    <div class="extra_img_block">
                    `
            let images = ''
                    for(let img of elem.img) {
                        images += `<img src="${img}" alt="test">`
                    }
            let items2 = `    
                    </div>
                    <h4>${elem.title}</h4>
                    <div class="extra_btns">
                        <div class="btn_extra_block">
                        <button type="button" class="btn-a" onclick="showPrompt('.btn_extra_furnace_char_${elem.id}')">Характеристики</button> 
                        <div class="prompt btn_extra_furnace_char_${elem.id} prompt_furnace">
                            <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                                <h4>Характеристики</h4>
                                <ul class="sub_category__item__params">
                                    <li>
                                        <span class="params_weight">Толщина металла</span>
                                        <span>${elem.weight}</span>
                                    </li>
                                    <li>
                                        <span class="params_d">Под казан</span>
                                        <span>${elem.forKazan}</span>
                                    </li>
                                    <li>
                                        <span class="params_material">Материал</span>
                                        <span>${elem.material}</span>
                                    </li>
                                </ul>
                            </div> 
                        </div>
                        <div class="btn_extra_block">
                            <button type="button" class="btn-a"  onclick="showPrompt('.btn_extra_furnace_info_${elem.id}')">Информация</button>
                            <div class="prompt btn_extra_furnace_info_${elem.id} prompt_furnace">
                                <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                                <h4 class="furnace__differences--title">${elem.differences.title}</h4>
                                <p>${elem.differences.descr}</p>
                            </div>
                        </div>                                
                    </div>
                    <div class="exptra_price">
                        <span class="extra_old_price">${elem.size[0].price} руб.</span>
                        <span class="extra_current_price">${elem.size[0].discountPrice} руб.</span>
                    </div>                            
                </label>
            </div>
            `
            items += items1 + images + items2
        }
        let furnaceExtra1 = `
        </div>
        <div class="extra_btns_nav">
            <div class="btns">
                <button type="button" class="extra_back"></button>
                <button type="${isEnd ? 'submit' : 'button'}" ${isEnd ? 'onclick="orderOneClickExtra(this, `Заказ допов`)" ' : ''} class="btn-b extra_next">Далее<i></i></button>                       
            </div>
            <span class="extra_skip">Можно пропустить</span>
        </div>
        <div class="extra_bottom">
            <h4>Вам нужна печь, но вы сомневаетесь с размером?</h4>
            <p>Выберите нужную вам печь в любом размере, при оформлении заказа менеджер подберет вам размер</p>                    
        </div>
    </div>
    `
    return furnaceExtra + items + furnaceExtra1
}

function renderExtraAccessories (modal, isEnd) {
    
    let extraAccessories = ''
    let extraAccessories1 = `
    <div class="extra_block">
        <h3>Дополнительные аксессуары?</h3>
        <p class="extra_discount"><i></i>При заказе печь + казан + аксессуар,<br>доставка в подарок</b></p>
        // <p class="swipe_slider">Листайте карточки, чтобы смотреть другие размеры</p>
        <div class="extra_items_block">
        `
        let extraAccessories2 = '' 
        for(let [i, elemBlock] of accessories.entries()) {
        let extraAccessories3 = `
            <div class="extra_items_head">
                <div class="extra_items_head--img" style="background: url(${elemBlock.titleImg}) left bottom no-repeat, #ff8653;"></div>
                <h3>${elemBlock.title}</h3>
            </div>
            <div class="extra_items owl-carousel">
            `

        let extraAccessories4 = ''
            for(let [item, elem] of elemBlock.products.entries()) {
                let extraAccessories5 = `
                <div class="extra_item extra_item_accessories">
                    <input type="checkbox" name="extra_furnace[]" id="extra_accessories_${elem.id}_${i}" value="id: ${elem.id}, Название: ${elem.name}, Цена: ${elem.size[0].discountPrice}">
                    <label for="extra_accessories_${elem.id}_${i}">
                        <div class="extra_img_block">
                        `
                let images = ''
                for(let img of elem.size[0].img) {
                    images += `<img src="${img}" alt="${elem.name}">`
                }
                let extraAccessories6 = `
                        </div>
                        <h4>${elem.name}</h4>
                        <div class="extra_btns">
                            <div class="btn_extra_block">
                            <button type="button" class="btn-a" onclick="showPrompt('.btn_extra_accessories_char_${elem.id}_${i}')">Характеристики</button> 
                            <div class="prompt btn_extra_accessories_char_${elem.id}_${i} prompt_info">
                                <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                                    <h4>Характеристики</h4>
                                    <ul class="sub_category__item__params">
                                    `
                        let params = ''
                        for(let param of elem.params) {
                            params += `
                            <li>
                                <span>${param.title}</span>
                                <span>${param.index}</span>
                            </li>
                            `
                        }
                let extraAccessories7 = `   
                                    </ul>
                                </div> 
                            </div>
                            <div class="btn_extra_block">
                                <button type="button" class="btn-a"  onclick="showPrompt('.btn_extra_accessories_info_${elem.id}_${i}')">Информация</button>
                                <div class="prompt btn_extra_accessories_info_${elem.id}_${i} prompt_info">
                                    <div class="prompt_btn__close" onclick="hidePrompt(this)"></div>
                                    <h4 class="furnace__differences--title">Информация</h4>
                                    <p>${elem.useful.descr}</p>
                                </div>
                            </div>                                
                        </div>
                        <div class="exptra_price">
                            <span class="extra_old_price">${elem.size[0].price} руб.</span>
                            <span class="extra_current_price">${elem.size[0].discountPrice} руб.</span>
                        </div>                            
                    </label>
                </div>
                `
                extraAccessories4 += extraAccessories5 + images + extraAccessories6 + params + extraAccessories7
            }
            
        let extraAccessories8 = `  
            </div>
        
        `
        extraAccessories2 += extraAccessories3 + extraAccessories4 + extraAccessories8
    }
    let extraAccessories9 = `
        </div>
        <div class="extra_btns_nav">
            <div class="btns">
                <button type="button" class="extra_back"></button>
                <button type="${isEnd ? 'submit' : 'button'}" ${isEnd ? 'onclick="orderOneClickExtra(this, `Заказ допов`)" ' : ''} class="btn-b extra_next">Далее<i></i></button>                       
            </div>
            <span class="extra_skip">Можно пропустить</span>
        </div>
    </div>
    `
    return extraAccessories = extraAccessories1 + extraAccessories2 + extraAccessories9
}

//обновление цены\размера в категории печек
function updateSizeFurnace (e, contItem, name) {
    name = eval(name)
    let mainItem = document.querySelector(`.furnace__item_${contItem}`)
    let mainDescr = mainItem.querySelector('.furnace__main--descr')
    mainItem.querySelector('.furnace_one_click').setAttribute('size', e.value)
    mainItem.querySelector('.add_to_cart').setAttribute('size', e.value)
    mainItem.querySelector('.price_default span').textContent = name[contItem].size[e.value].price + " руб."
    mainItem.querySelector('.price_discount .price_current').textContent = name[contItem].size[e.value].discountPrice + " руб."
    console.log(document.querySelectorAll(`.modal_furnace_size_${name[contItem].id}`)) 
    if(mainItem.querySelector(`.modal_furnace_size_${name[contItem].id}`)) {
        mainItem.querySelector(`.modal_furnace_size_${name[contItem].id} img`).setAttribute('src', name[contItem].size[e.value].sizeImg + "")   
    } else {
        document.querySelector(`.modal_furnace_size_${name[contItem].id}`).parentNode.removeChild(document.querySelector(`.modal_furnace_size_${name[contItem].id}`))
        mainDescr.innerHTML += `
        <div class="modal modal_furnace_size modal_furnace_size_${name[contItem].id}">
        <h3>Размер печи</h3>
        <img src="${name[contItem].size[e.value].sizeImg}" alt="_размеры">
        </div> `
    }
    // mainItem.querySelector(`.modal_furnace_size_${name[contItem].id}`).innerHTML = `<h3>Размер печи</h3>
    // <img src="${name[contItem].size[e.value].sizeImg}" alt="_размеры">`
    
}
//обновление цены в категории аксесуаров
function updateSizeAccessories(e, contItems, contItem) {
    let mainItem = document.querySelector(`.accessories_catalog__items_${contItems}`).querySelector(`.accessories_catalog__item_${contItem}`)
    mainItem.querySelector('.one_click_accessories').setAttribute('size', e.value +'')
    mainItem.querySelector('.add_to_cart').setAttribute('size', e.value +'')
    // mainItem.querySelector('.img_bg__item img').setAttribute('src', accessories[contItems].products[contItem].size[e.value].img + "")
    let imgBg = mainItem.querySelector('.img_bg__item')
    imgBg.innerHTML = ''
    let images = ''
    for(let src of accessories[contItems].products[contItem].size[e.value].img) {
       images +=  `<div class="img_bg__item--elem">
       <a data-fancybox="gallery_accessories_${accessories[contItems].products[contItem].id}_${e.value}" href="${src}"><img src="${src}" alt="accessories"></a>
       </div>`
    }
    console.log(images)
    $(imgBg).slick('unslick');   
    imgBg.innerHTML = images    
    $(imgBg).slick(imgItemSlider());    
    mainItem.querySelector('.price_default span').textContent = accessories[contItems].products[contItem].size[e.value].price + " руб."
    mainItem.querySelector('.price_discount .price_current').textContent = accessories[contItems].products[contItem].size[e.value].discountPrice + " руб." 
}

const furnaceNav = document.querySelector('.nav_catalog_furnace');
if(furnaceNav) {
    furnaceNav.onclick=function(e){
    for(let i = 0;i<furnaceNav.children.length;i++){
        furnaceNav.children[i].classList.remove('active');
    }
    $('.catalog_furnace__item--images').slick('unslick');
    $('.catalog_furnace__item--images').slick(furnaceSlider());
    e.target.classList.add('active');
    let item = e.target.getAttribute('furnace-item')
    let fornaceItems = containerFurnace.querySelectorAll('.catalog_furnace__item')
    for(let i = 0; i < fornaceItems.length; i++){
        fornaceItems[i].style.display ="none"
    }
    containerFurnace.querySelector(`.furnace__item_${item}`).style.display = "flex";
    }    
}

let isScrollCatalog = true;
let isScrollReviews = true;

if(body.classList.contains('discount_page')) {
    renderAccessories (true)  
    renderFurnace(furnaceUzbek, 'furnaceUzbek',true) 
    setSlidersFancybox ()
    renderKazan(kazanUzbek, 'kazanUzbek', true) 
    renderKazan(kazanAfgan, 'kazanAfgan', true) 
    }
function render() {
    if(body.classList.contains('uzbek')) {
    hideAccessory = hideAccessoryUzbek
    renderKazan(kazanUzbek, 'kazanUzbek')  
    renderFurnace(furnaceUzbek, 'furnaceUzbek')
    renderReadySet(ready_setsUzbek, 'ready_setsUzbek')  
    }
    if(body.classList.contains('afgan')) {
        hideAccessory = hideAccessoryAfgan
        renderKazan(kazanAfgan, 'kazanAfgan')  
        renderFurnace(furnaceAfgan, 'furnaceAfgan')
        renderReadySet(ready_setsAfgan, 'ready_setsAfgan')    
    }
    renderAccessories () 
    setSlidersFancybox () 
}
// function renderScrollKazan() {
//     if(body.classList.contains('uzbek')) {
//         renderKazan(kazanUzbek, 'kazanUzbek') 
//     }
//     if(body.classList.contains('afgan')) {
//         renderKazan(kazanAfgan, 'kazanAfgan')  
//     }
// }
// function renderScrollFurnace() {
//     if(body.classList.contains('uzbek')) {
//         renderFurnace(furnaceUzbek, 'furnaceUzbek')
//     }
//     if(body.classList.contains('afgan')) {
//         renderFurnace(furnaceAfgan, 'furnaceAfgan')  
//     }
// }
// function renderScrollReadySet() {
//     if(body.classList.contains('uzbek')) {
//         renderReadySet(ready_setsUzbek, 'ready_setsUzbek')  
//     }
//     if(body.classList.contains('afgan')) {
//         renderFurnace(furnaceAfgan, 'furnaceAfgan')  
//     }
// }
function setSlidersFancybox () {
    // $(document).ready(function () {
    //     $(".sub_category__items.owl-carousel").owlCarousel({
    //         margin: 7,
    //         responsiveClass: true,
    //         nav: false,
    //         items: 1,
    //         dots: true,
    //         slideTransition: 'linear',
    //         responsive: {
    //             0: {
    //                 stagePadding: 8,
    //             },
    //             340: {
    //                 stagePadding: 15,
    //             },
    //             370: {
    //                 stagePadding: 33,
    //             },
    //             400: {
    //                 stagePadding: 45,
    //             },
    //             435: {
    //                 stagePadding: 65,
    //             },
    //             490: {
    //                 stagePadding: 95,
    //             },
    //             540: {
    //                 stagePadding: 115,
    //             },
    //         }
    //     });
    // });
    $('.catalog_furnace__item--images').slick(furnaceSlider());
    $('.img_bg__item').slick(imgItemSlider());  

    $(document).ready(function () {
        $(".catalog_furnace__items.owl-carousel").owlCarousel({
            responsiveClass: true,
            nav: false,
            items: 1,
            dots: false,
            slideTransition: 'linear',
        });

    });
    // $(document).ready(function () {
    //     $(".ready_set__items.owl-carousel").owlCarousel({
    //         margin: 7,
    //         responsiveClass: true,
    //         nav: false,
    //         items: 1,
    //         dots: false,
    //         slideTransition: 'linear',
    //     });
    
    // });
    if (window.innerWidth < 600) {
        let arr = document.querySelectorAll('.catalog_furnace__item')
        console.log(arr)
        for(let elem of arr) {
            let i = elem.querySelector('.btn-b')
            i.textContent = 'купить в 1 клик'
        }
    }
    if (window.innerWidth > 600) { 
        $(document).ready(function () {
            $(".accessories_catalog__items.owl-carousel").owlCarousel({
                margin: 7,
                responsiveClass: true,
                dotsEach: true,
                slideTransition: 'linear',
                slideBy: 4,
                responsive: {
                    0: {
                        items: 1,
                        autoWidth: true,
                        dots: false,
                    },
                    500: {
                        items: 2,
                        autoWidth: true,
                    },
                    800: {
                        nav: false,
                        dots: false,
                    },
                    900: {
                        items: 3,
                        nav: true,
                        dots: true,
                        slideBy: 2,
                    },
                    1200: {
                        items: 4,
                        nav: true,
                        dots: true,
                        slideBy: 3,
                    },
                }
            });
        });  
    }
    $('[data-fancybox]').fancybox({
        buttons : [ 
            'fullScreen',
            'close'
          ],
          thumbs : {
            autoStart : true
          }
    });
}
function renderReviewYandex() {
    let container = document.querySelector('.review_left')
    container.innerHTML = `
    <iframe style="width:100%;height:100%;border:1px solid #e6e6e6;border-radius:8px;box-sizing:border-box" src="https://yandex.ru/maps-reviews-widget/105833180518?comments"></iframe>
    <a href="https://yandex.by/maps/org/kazan_bel/105833180518/" target="_blank" style="box-sizing:border-box;text-decoration:none;color:#b3b3b3;font-size:10px;font-family:YS Text,sans-serif;padding:0 20px;position:absolute;bottom:8px;width:100%;text-align:center;left:0">
    </a>
    `
}
let preloaderEl = document.getElementById('preloader');
if(!body.classList.contains('discount_page')) {
   $(window).scroll(function(){
       
    if($(window).scrollTop() > 2500 && isScrollCatalog ) {
        isScrollCatalog = false 
        preloaderEl.style.opacity = '1'
        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve(render()) 
            }, 300)
          });
          
          promise1.then((value) => {
            preloaderEl.style.opacity = '0'
          });
        // render()      
    }
    if($(window).scrollTop() > 6500 && isScrollReviews ) {
        isScrollReviews = false 
        renderReviewYandex()      
    }
    }) 
}




function furnaceSlider() {
    return {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false, 
        cssEase: 'linear'      
    }
}
// $('.catalog_furnace__item--images').slick(furnaceSlider());

function quizSlider() {
    return {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        infinite: false,  
        touchMove: false,
        swipe: false    
    }
}


function imgItemSlider() {
    return {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,        
        cssEase: 'ease'  
    }
}
// $('.img_bg__item').slick(imgItemSlider());    

// $(document).ready(function () {
//     $(".catalog_furnace__items.owl-carousel").owlCarousel({
//         responsiveClass: true,
//         nav: false,
//         items: 1,
//         dots: false,
//         slideTransition: 'linear',
//     });

// });
// $(document).ready(function () {
//     $(".ready_set__items.owl-carousel").owlCarousel({
//         margin: 7,
//         responsiveClass: true,
//         nav: false,
//         items: 1,
//         dots: false,
//         slideTransition: 'linear',
//     });

// });

// if (window.innerWidth > 600) { 
// $(document).ready(function () {
//     $(".accessories_catalog__items.owl-carousel").owlCarousel({
//         margin: 7,
//         responsiveClass: true,
//         dotsEach: true,
//         slideTransition: 'linear',
//         responsive: {
//             0: {
//                 items: 1,
//                 autoWidth: true,
//                 dots: false,
//             },
//             500: {
//                 items: 2,
//                 autoWidth: true,
//             },
//             800: {
//                 nav: false,
//                 dots: false,
//             },
//             900: {
//                 items: 3,
//                 nav: true,
//                 dots: true,
//             },
//             1200: {
//                 items: 4,
//                 nav: true,
//                 dots: true,
//             },
//         }
//     });

// });    
// }


setOwlCarousel('.our_advantages__items', 1200)
setOwlCarousel('.credit_cards', 1200)
// setOwlCarousel('.sub_category__items', 600)
if (window.innerWidth > 600) {
setOwlCarousel('.catalog_furnace__items', 1000)
}
// setOwlCarousel('.ready_set__items', 600)

window.addEventListener('resize', function () {
    setOwlCarousel('.our_advantages__items', 1200)
    setOwlCarousel('.credit_cards', 1200)
    // setOwlCarousel('.sub_category__items', 600)
    if (window.innerWidth > 600) {
        setOwlCarousel('.catalog_furnace__items', 1000)
        }
    setOwlCarousel('.ready_set__items', 600)
    if (window.innerWidth < 1200) {
        // location.reload()//если изменилась ширина экрана, обновить страницу
    }

});


$(".questions-block").click(function(){
    $(this).children('.questions-block-cont').slideToggle()
})
// $(".showrooms img").click(function(){
//     let images = document.querySelectorAll('.showrooms img')
//     for(let elem of images) {
//         elem.classList.remove('active')
//     }
//     $(this).toggleClass('active');
//     jQuery(function ($) {
//         $(document).mouseup(function (e) { // событие клика по веб-документу
//             var div = $('.showrooms img'); // тут указываем ID элемента
//             if (!div.is(e.target)) { // и не по его дочерним элементам
//                 $('.showrooms img').removeClass('active')
//             }
//         });
//     });
// })

function showSelect(e) {
    
    const selectSingle_title = e;
    const selectSingle = selectSingle_title.parentNode
    const selectSingle_labels = selectSingle.querySelectorAll(".__select__label");

    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
    } else {
        selectSingle.setAttribute('data-state', 'active');
    }
     for (let i = 0; i < selectSingle_labels.length; i++) {
        selectSingle_labels[i].addEventListener('click', (evt) => {
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
        });
    } 
}


// ymaps.ready(function () {
//     var myMap = new ymaps.Map('map', {
//             center: [53.874300, 27.559063],
//             zoom: 17,
//             controls: []
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),

//         myPlacemark = new ymaps.Placemark([53.875193, 27.560933], {
//             hintContent: 'Магазин Узбекских а Афганских казанов',
//             balloonContent: 'Казан. Бел'
//         }, {
//             // Опции.
//             // Необходимо указать данный тип макета.
//             iconLayout: 'default#image',
//             // Своё изображение иконки метки.
//             iconImageHref: 'img/icons/map_icon.svg',
//             // Размеры метки.
//             iconImageSize: [73, 78],
//             // Смещение левого верхнего угла иконки относительно
//             // её "ножки" (точки привязки).
//             iconImageOffset: [-40, -76]
//         });

//     myMap.geoObjects
//         .add(myPlacemark)
//     myMap.behaviors.disable('scrollZoom')
// });



const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };
  $('.input_person__phone input').click(function(){
    $(this).setCursorPosition(6);  // set position number
  });


  if(window.innerWidth < 660 ) {
    $(window).scroll(function(){
        if($(window).scrollTop() > 200) {
            $('.why_we__mobile_btns').addClass('active')
            $('.header_mobile .header_bottom').addClass('remove')
        }
        if($(window).scrollTop() < 200) {
            $('.why_we__mobile_btns').removeClass('active')
            $('.header_mobile .header_bottom').removeClass('remove')
        }
    })}

let scrollParallax = 0
if(isAfgan) {
    scrollParallax = -1600
}

if(window.innerWidth > 1200 && !body.classList.contains('discount_page') ) {
    $(window).scroll(function(){
        if($(window).scrollTop() > 800) {
            $('.parallax_terminal').bgscroll({
                direction: 'top',
            });        
        }
        if($(window).scrollTop() > 2600) {
            $('.parallax_paper').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 2600) {
            $('.parallax_kazan').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 5500 + scrollParallax ) {
            $('.parallax_furnace').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 7500 + scrollParallax ) {
            $('.acces_parallax').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 11700 + scrollParallax) {
            $('.review_parallax').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 14000 + scrollParallax) {
            $('.parallax_gift').bgscroll({
                direction: 'top',
            });
        }
        if($(window).scrollTop() > 16000 + scrollParallax) {
            $('.parallax_bot').bgscroll({
                direction: 'top',
            });
        }
      })
}

//  setTimeout(function(){
//     if(!isQuiz) {
//         $('.quiz_modal').modal({
//             // fadeDuration: 300,
//             // fadeDelay: 0.50,
//             closeExisting: false
//         });
//     } 
// }, 25000)


$(document).mouseleave(function(e){
    if (e.clientY < 10 && !isModalExit) {
        $('.modal_exit').modal({
            // fadeDuration: 300,
            // fadeDelay: 0.50,
            closeExisting: false
            }); 
        isModalExit = true
    }    
});



