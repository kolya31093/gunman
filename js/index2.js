$(function(){
    var bg_img = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    var elem = Math.floor(Math.random() * bg_img.length);
    var win_img_arr = ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg','c1.jpg','c2.jpg','c3.jpg','c4.jpg' ];
    var win_img;
    var page = document.body;
    var game = page.querySelector('.game');
    var fire = page.querySelector('.fire');
    $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');
// // trooper Element
    var trooper = document.createElement('div');
    trooper.className = 'trooper';
// // Audio element
    var audio = page.querySelector('.js-audio');
    var minus_time = 100;

    trooper.style.backgroundImage = 'url(images/gunman.png)';
    var troopers = {
        first: {
            stay: '0px -810px',
            firstStep: '-120px -810px',
            secondStep: '-240px -810px',
            firstShot: '-360px -810px',
            secondShot: '-480px -810px',
            thirdShot: '-600px -810px',
            dead: '-840px -810px',
            backgroundPosition: '0px -810px'
        },
        second: {
            stay: '0px -1067px',
            firstStep: '-120px -1067px',
            secondStep: '-240px -1067px',
            firstShot: '-360px -1067px',
            secondShot: '-460px -1067px',
            thirdShot: '-460px -1067px',
            dead: '-930px -1067px',
            backgroundPosition: '0px -1067px'
        }
    }
    // console.log(troopers['1']);

    localStorage['reward'] = 0;
    var reward = localStorage['reward'];

    var round = 0;

    $('body').on('click', function() {

        audio.src = 'media/shot.mp3';


    });
//Play next level
    $('body').on('click', '.play', function(){

        // this.style.display = 'none';
        $('.play-message').css('display', 'none');
        $('.play').css('display', 'none');
        // this.style.display = 'none';
        elem = Math.floor(Math.random() * bg_img.length);
        $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');
        startGame();
        // alert('play');
    });
//Restart
    $('body').on('click', '.restart', function(){
        // restart.style.display = 'none';
        $('.blood').css('display', 'none');
        $('.restart-message').css('display', 'none');

        $('.restart').css('display', 'none');

        elem = Math.floor(Math.random() * bg_img.length);
        $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');

        // this.style.display = 'none';
        startGame();
    });
//-------------------
//move warrior/////////////////////////
// function move(num) {
//       var position_warrior = 500;
//       for(var i = 0; i < num; i++) {
//           setTimeout(function() {
//               trooper.style.right = position_warrior + 'px';
//               position_warrior += 50;
//               window.timeout = 1000;
//               var step = (i % 2 == 0) ? secondStep : firstStep;
//               trooper.style.backgroundPosition = step;
//           }, timeout);
//           window.timeout += 1000;
//       }
// }
//////////////////////
    function startGame() {
        //WARRIOR  choose///////////////////////////////
        var warrior = Math.floor(Math.random() * Object.keys(troopers).length);
        console.log(Object.keys(troopers)[warrior]);
        warrior = Object.keys(troopers)[warrior];

        trooper.style.backgroundPosition = troopers[warrior]['backgroundPosition'];
        game.appendChild(trooper);
        var trPosStep = 120;
        var trPos = 0;
        var stay = troopers[warrior]['stay'];
        var firstStep = troopers[warrior]['firstStep'];
        var secondStep = troopers[warrior]['secondStep'];
        var firstShot = troopers[warrior]['firstShot'];
        var secondShot = troopers[warrior]['secondShot'];
        var thirdShot = troopers[warrior]['thirdShot'];
        var dead = troopers[warrior]['dead'];
        // var time_lose = 6000;
        // var time_win = time_lose - 1;
        //move warrior/////////////////////////
        // function move(num) {
        //     var position_warrior = 500;
        //     for(var i = 0; i < num; i++) {
        //         window.timeout = 1000;
        //         setTimeout(function() {
        //             trooper.style.right = position_warrior + 'px';
        //             position_warrior += 50;
        //
        //             var step = (i % 2 == 0) ? secondStep : firstStep;
        //             trooper.style.backgroundPosition = step;
        //         }, timeout);
        //         window.move_interval += 1000;
        //     }
        // }
        function move(num) {
            var position_warrior = 50;

            window.timeout = num * 1000;
            var move_interval = setInterval(function() {
                trooper.style.right = position_warrior + 'px';
                position_warrior += 50;

                var step = (i % 2 == 0) ? secondStep : firstStep;
                // trooper.style.backgroundPosition = step;
            }, 1000);
            setTimeout(function () {
                clearInterval(move_interval);
            }, num * 1000);

        }
//////////////////////
////////////////////////////////////////////////
        window.target = 0;
        $('.intro').attr('src', 'media/intro.m4a');
//round
        $('.round').text(++round);
        setTimeout(function() {
            trooper.style.right = '0px';
            // trPos -= trPosStep;
            trooper.style.backgroundPosition = stay;
        }, 200);
        //  First Step
        // setTimeout(function() {
        //     trooper.style.right = '50px';
        //     // trPos -= trPosStep;
        //     trooper.style.backgroundPosition = secondStep;
        // }, 1000);
        //
        // //  Second Step
        // setTimeout(function() {
        //     trooper.style.right = '150px';
        //     trPos -= trPosStep;
        //     trooper.style.backgroundPosition = firstStep;
        // }, 2000);
        // setTimeout(function() {
        //     trooper.style.right = '200px';
        //     // trPos -= trPosStep;
        //     trooper.style.backgroundPosition = secondStep;
        // }, 3000);
        //
        // //  Second Step
        // setTimeout(function() {
        //     trooper.style.right = '250px';
        //     trPos -= trPosStep;
        //     trooper.style.backgroundPosition = firstStep;
        // }, 4000);
        move(6);
        //  Center
//FIRE!!!!!!----------------
        setTimeout(function() {
            trooper.style.right = '300px';
            trooper.style.backgroundPosition = stay;
            audio.src = 'media/fire.m4a';
            fire.style.display = 'block';
            setTimeout(function () {
                fire.style.display = 'none';
            }, 1000);
            //shot player
            $('body').on('click', '.trooper', function(e) {

                audio.src = 'media/shot.mp3';
                console.log(e.target);
                window.target = e.target;

            });

        }, timeout + 1000);
        // --------------------------------
        // Player shot
        setTimeout(function() {
            if(window.target != 0){
                window.target = 0;
                reward = +localStorage['reward'] + 100;
                localStorage['reward'] = reward
                console.log(reward);
                $('.js-reward').text(reward);
                console.log('Winner');
                // clearTimeout(shot2);
                // clearTimeout(shot3);
                //Deth-------------------------------
                setTimeout(function() {
                    trooper.style.right = '300px';

                    trooper.style.backgroundPosition = dead;
                    var time_lose = timeout + 2000;
                    var time_win = time_lose - 1;
                    time_lose -= minus_time;
                    minus_time += 100;
                    // time_lose -= 100;
                    // time_win = time_lose - 1;
                    if(time_lose < timeout + 200){
                        time_lose = timeout + 200;
                        time_win = time_lose - 1;
                    }
                    if(reward >= 500) {
                        $('.win').attr('src', 'media/win_game.mp3');

                        $('#win').css('display', 'block');
                        $('#win_message').css('display', 'block');
                        $('#win img').fadeOut(1);
                        $('#win img').fadeIn(1500);
                        var timerId = setInterval(function() {
                            win_img = Math.floor(Math.random() * win_img_arr.length);
                            $('#win img').attr("src", '../images/' + win_img_arr[win_img]);
                            setTimeout(function() { $('#win img').fadeOut(1000)}, 3000);
                            setTimeout(function() { $('#win img').fadeIn(1000)}, 4000);
                        }, 4000);

// через 5 сек остановить повторы
                        setTimeout(function() {
                            clearInterval(timerId);

                        }, 120000);
                    }
                    // alert('Win!!!');
                    $('.play').css('display', 'block');
                    $('.play-message').css('display', 'block');


                }, 300);
            };
            // console.log(target.tagName);
            audio.src = 'media/win.m4a';

        }, time_win);
// -------------------------------------
        //Trooper shot
        var shot1 = setTimeout(function () {
            trooper.style.right = '300px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = firstShot;
        }, 5500);

        var shot2 = setTimeout(function () {
            trooper.style.right = '300px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = secondShot;
            audio.src = 'media/shot.m4a';
            console.log('lose!!!');
        }, time_lose);
        var shot3 = setTimeout(function () {
            trooper.style.right = '300px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = thirdShot;
            localStorage['reward'] = 0;
            audio.src = 'media/shot.m4a';

            round = 0;
            time_lose = 6000;
            time_win = time_lose - 1;
            // alert('lose!!!');
            $('.blood').css('display', 'block');
            $('.restart').css('display', 'block');

            $('.restart-message').css('display', 'block');


            setTimeout(function () {
                audio.src = 'media/foul.m4a';

            }, 500);
            setTimeout(function () {
                // audio.src = 'media/death.m4a';

            }, 3000);
        }, 6500);





    }
    startGame();
});



/**
 * Created by Kolya on 05.05.2017.
 */









$(function(){
    var bg_img = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg'];
    var elem = Math.floor(Math.random() * bg_img.length);
    var win_img_arr = ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg','c1.jpg','c2.jpg','c3.jpg','c4.jpg' ];
    var win_img;
    var page = document.body;
    var game = page.querySelector('.game');
    var fire = page.querySelector('.fire');
    $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');
// // trooper Element
    var trooper = document.createElement('div');
    trooper.className = 'trooper';
// // Audio element
    var audio = page.querySelector('.js-audio');

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    trooper.style.backgroundImage = 'url(images/gunman.png)';
    var troopers = {
        first: {
            stay: '0px -810px',
            firstStep: '-120px -810px',
            secondStep: '-240px -810px',
            firstShot: '-360px -810px',
            secondShot: '-480px -810px',
            thirdShot: '-600px -810px',
            dead: '-840px -810px',
            backgroundPosition: '0px -810px'
        },
        second: {
            stay: '0px -1067px',
            firstStep: '-120px -1067px',
            secondStep: '-240px -1067px',
            firstShot: '-360px -1067px',
            secondShot: '-470px -1067px',
            thirdShot: '-470px -1067px',
            dead: '-930px -1067px',
            backgroundPosition: '0px -1067px'
        }
    }
    // console.log(troopers['1']);

    localStorage['reward'] = 0;
    var reward = localStorage['reward'];

    var round = 0;

    $('body').on('click', function() {

        audio.src = 'media/shot.mp3';


    });
//Play next level
    $('body').on('click', '.play', function(){

        // this.style.display = 'none';
        $('.play-message').css('display', 'none');
        $('.play').css('display', 'none');
        // this.style.display = 'none';
        elem = Math.floor(Math.random() * bg_img.length);
        $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');
        startGame();
        // alert('play');
    });
//Restart
    $('body').on('click', '.restart', function(){
        // restart.style.display = 'none';
        $('.blood').css('display', 'none');
        $('.restart-message').css('display', 'none');

        $('.restart').css('display', 'none');

        elem = Math.floor(Math.random() * bg_img.length);
        $(game).css('background', 'url(../images/' + bg_img[elem] + ') no-repeat');

        // this.style.display = 'none';
        startGame();
    });
//-------------------
    function startGame() {
        //WARRIOR  choose///////////////////////////////
        var warrior = Math.floor(Math.random() * Object.keys(troopers).length);
        console.log(Object.keys(troopers)[warrior]);
        warrior = Object.keys(troopers)[warrior];

        trooper.style.backgroundPosition = troopers[warrior]['backgroundPosition'];
        game.appendChild(trooper);
        var trPosStep = 120;
        var trPos = 0;
        var stay = troopers[warrior]['stay'];
        var firstStep = troopers[warrior]['firstStep'];
        var secondStep = troopers[warrior]['secondStep'];
        var firstShot = troopers[warrior]['firstShot'];
        var secondShot = troopers[warrior]['secondShot'];
        var thirdShot = troopers[warrior]['thirdShot'];
        var dead = troopers[warrior]['dead'];
        var time_lose = 6000;
        var time_win = time_lose - 1;
        // var num = randomInteger(2, 8);
        var num = 8;

////////////////Move////////////////////////////////
        function move(num) {
            var position_warrior = 50;
            var i = 1;

            window.timeout = num * 1000;
            var move_interval = setInterval(function() {
                trooper.style.right = position_warrior + 'px';
                position_warrior += 50;
                i++;
                var step = (i % 2 == 0) ? secondStep : firstStep;
                trooper.style.backgroundPosition = step;
            }, 1000);
            setTimeout(function () {
                clearInterval(move_interval);
            }, num * 1000);

        }
        window.target = 0;
        $('.intro').attr('src', 'media/intro.m4a');
//round
        $('.round').text(++round);
        setTimeout(function() {
            trooper.style.right = '0px';
            // trPos -= trPosStep;
            trooper.style.backgroundPosition = stay;
        }, 200);
        //  First Step
        // setTimeout(function() {
        //     trooper.style.right = '50px';
        //     // trPos -= trPosStep;
        //     trooper.style.backgroundPosition = secondStep;
        // }, 1000);
        //
        // //  Second Step
        // setTimeout(function() {
        //     trooper.style.right = '150px';
        //     trPos -= trPosStep;
        //     trooper.style.backgroundPosition = firstStep;
        // }, 2000);
        // //Third step
        // setTimeout(function() {
        //     trooper.style.right = '200px';
        //     // trPos -= trPosStep;
        //     trooper.style.backgroundPosition = secondStep;
        // }, 3000);
        //
        // //  Four Step
        // setTimeout(function() {
        //     trooper.style.right = '250px';
        //     trPos -= trPosStep;
        //     trooper.style.backgroundPosition = firstStep;
        // }, 4000);
        move(num);
        //  Center
//FIRE!!!!!!----------------
        setTimeout(function() {
            trooper.style.right = ((num + 1) * 50) + 'px';
            trooper.style.backgroundPosition = stay;
            audio.src = 'media/fire.m4a';
            fire.style.display = 'block';
            setTimeout(function () {
                fire.style.display = 'none';
            }, 1000)
            //shot player
            $('body').on('click', '.trooper', function(e) {

                audio.src = 'media/shot.mp3';
                console.log(e.target);
                window.target = e.target;

            });
        }, num * 1000 + 1000 );//5000sec  //пример 4 sec
////////////////////////////////////////

        // Player shot
        setTimeout(function() {
            if(window.target != 0){
                window.target = 0;
                reward = +localStorage['reward'] + 100;
                localStorage['reward'] = reward
                console.log(reward);
                $('.js-reward').text(reward);
                console.log('Winner');
                clearTimeout(shot2);
                clearTimeout(shot3);
                //Deth-------------------------------
                setTimeout(function() {
                    trooper.style.right = ((num + 1) * 50) + 'px';
                    trPos -= trPosStep;
                    trooper.style.backgroundPosition = dead;

                    time_lose -= 100;
                    time_win = time_lose - 1;
                    if(time_lose < 5200){
                        time_lose = 5200;
                        time_win = time_lose - 1;
                    }
                    if(reward >= 500) {
                        $('.win').attr('src', 'media/win_game.mp3');

                        $('#win').css('display', 'block');
                        $('#win_message').css('display', 'block');
                        $('#win img').fadeOut(1);
                        $('#win img').fadeIn(1500);
                        var timerId = setInterval(function() {
                            win_img = Math.floor(Math.random() * win_img_arr.length);
                            $('#win img').attr("src", '../images/' + win_img_arr[win_img]);
                            setTimeout(function() { $('#win img').fadeOut(1000)}, 3000);
                            setTimeout(function() { $('#win img').fadeIn(1000)}, 4000);
                        }, 4000);

// через 5 сек остановить повторы
                        setTimeout(function() {
                            clearInterval(timerId);

                        }, 120000);
                    }
                    // alert('Win!!!');
                    $('.play').css('display', 'block');
                    $('.play-message').css('display', 'block');


                }, 300);
            };
            // console.log(target.tagName);
            audio.src = 'media/win.m4a';

        },num * 1000 + 2000 );//6000sec  //пример 4 sec
// -------------------------------------
        //Trooper shot
        var shot1 = setTimeout(function () {
            trooper.style.right = ((num + 1) * 50) + 'px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = firstShot;
        }, num * 1000 + 1500);//5500sec  //пример 4 sec

        var shot2 = setTimeout(function () {
            trooper.style.right = ((num + 1) * 50) + 'px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = secondShot;
            audio.src = 'media/shot.m4a';
            console.log('lose!!!');
        }, num * 1000 + 2000);//6000sec  //пример 4 sec

        var shot3 = setTimeout(function () {
            trooper.style.right = ((num + 1) * 50) + 'px';
            trPos -= trPosStep;
            trooper.style.backgroundPosition = thirdShot;
            localStorage['reward'] = 0;
            audio.src = 'media/shot.m4a';

            round = 0;
            time_lose = 6000;
            time_win = time_lose - 1;
            // alert('lose!!!');
            $('.blood').css('display', 'block');
            $('.restart').css('display', 'block');

            $('.restart-message').css('display', 'block');


            setTimeout(function () {
                audio.src = 'media/foul.m4a';

            }, 500);
            setTimeout(function () {
                // audio.src = 'media/death.m4a';

            }, 3000);
        }, num * 1000 + 2500);//6500sec  //пример 4 sec





    }
    startGame();
});




