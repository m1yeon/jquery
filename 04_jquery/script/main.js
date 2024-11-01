$(document).ready(function(){  
  // ///////////////////////////////////
  // 서브 메뉴 
  // 변수 선언
  let gnb = $('header .gnb > ul > li > a'); 

  //gnb 메뉴 클릭시 해당 서브메뉴 보이게 하기
  // gnb.click(function(){
  //   $('.sub').hide(); // 다른 서브 숨기고
  //   $(this).next().show();
  // });

  // 외부클릭하면 서브메뉴 전부 닫기
  $('main').click(function(){
    $('.sub').hide();
  });

  // ///////////////////////////////////
  // 모바일 토글버튼 서식
  $('#toggle').click(function(){
    $('#toggle span:nth-child(2)').toggle();
    $('#toggle span:first-child').toggleClass('rotate1');
    $('#toggle span:last-child').toggleClass('rotate2');
    $(this).toggleClass('act');
    $('header .gnb').slideToggle();
  });


  // 미에로 화이바 모바일 내비게이션
  // 1. 토클버튼 클릭시 .gnb slidedown()/slideup() => slideToggle(); 
  // 2. 메인메뉴 클릭시 해당 .sub메뉴 show()/hide() => toggle();
  // 3. 메인메뉴 클릭시 펼쳐진 다른 .sub메뉴 모두 숨기기


  gnb.click(function(){
    // $('.sub').hide();
    // $(this).next().toggle();
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });

  // ///////////////////////////////////
  //메인 슬라이드

    //1. 변수선언
    const l_btn = $('.visual .s_btn li:first-child');//좌 버튼
    const r_btn = $('.visual .s_btn li:last-child'); //우 버튼
    const c_btn = $('.visual .ctrl_btn li'); //콘트롤 버튼
    let v_slide_img = $('.visual > div');//슬라이드 이미지

    let i = 0;
    
    //2. 움직이는 함수 = 서서히 사라지고 나타나는 효과
  function fade(idx){
    // console.log('시간호출함수')
    v_slide_img.fadeOut(); //보이는 이미지 모두 숨기기
    // v_slide_img.eq(i).fadeOut(); //eq(숫자) : 몇번째인지 //
    c_btn.removeClass('on'); //기존 컨트롤 버튼 서식을 제거

    if(i==2){ //만약 마지막 이미지라면
      i=0; //처음이미지가 보이게 하고
    }else{ //그렇지 않다면
      i++; //다음 이미지가 보이게 함
    }

    // c_btn.eq(i).addClass('on');
    c_btn.eq(i).addClass('on');
    v_slide_img.eq(i).stop().fadeIn();//해당 이미지가 보이게 함 //stop()를 넣으면 나중에 좌/우 버튼 많이 클릭해도 오류가 나지않게 해줌_한번만 작동하게 해서
  }

  function fade2(idx){
    v_slide_img.fadeOut();
    c_btn.removeClass('on');
    if(i==0){
      i=2;
    }else{
      i--;
    }
    c_btn.eq(i).addClass('on');
    v_slide_img.eq(i).stop().fadeIn();
  }


  //3. 매 5초마다 함수를 반복호출하여 슬라이드가 변하게 함
  //setTimeOUt();지정시간 후 실행// 또는 setInterval(); 바로 실행
  let Timer = setInterval(fade,5000);

  // 4. 좌,우 버튼 클릭시 해당하는 방향으로 슬라이드 이미지가 나오게 하기

  l_btn.click(function(){
    fade2();
  });

  r_btn.click(function(){
    fade();
  });
  
  //좌,우 버튼에 마우스 오버시 시간을 제거하거
  $('.s_btn > li').hover(function(){
    clearInterval(Timer);
  },function(){ //마우스 아웃시 시간을 생성하여 다시 움직이게 함
    Timer = setInterval(fade,5000);
  });

  //pagenation(콘트롤버튼)
  //1. 현재페이지 번호를 체크
  //2. 이미지의 전체 개수 

  /*
  구현순서
  1. 컨트롤 버튼 변수 선언
  2. 컨트롤 버튼(li) 클릭시 인덱스값0,1,2 값을 출력
  3. 출력값을 fade 함수의 매개변수값으로 넘김 => 슬라이드가 변함
  4. 사용자가 클릭한 콘트럴 버튼(li)에 act서식을 적용하여 어둡게함.
  */

  c_btn.click(function(){
    let idx = $(this).index();
    console.log(idx);

    v_slide_img.fadeOut();
    c_btn.removeClass('on');

    c_btn.eq(idx).addClass('on');
    v_slide_img.eq(idx).stop().fadeIn();

    i = idx

    clearInterval(Timer); //기존의 자동 슬라이드는 제거
  });

c_btn.mouseleave(function(){
  Timer = setInterval(fade,5000);
});


// ///////////////////////////////////
// 3. 탭 콘텐츠
const  tab_m = $('.tab_con article li > a');


tab_m.click(function(){ //탭 메뉴 클릭시 
  //pc해상도라면
  if($(window).width()>=767){
  //클릭한 탭 메뉴의 옆 형제는 보이게 하고 -> 다른 div는 숨김 
  $(this).parent().siblings().find('div').hide();
  $(this).next().show();


  //클릭한 탭 메뉴에 tab_act 서식 적용 나머지는 서식 빼기
  $(this).parent().siblings().find('a').removeClass('tab_act');
  $(this).addClass('tab_act');

  // $(this).addClass('tab_act').parent().siblings().find('a').removeClass('tab_act');



  const i = $(this).parent().index();
  console.log(i);

  if(i==2){
    $('.tab_con article').height(1200);
  }else{
    $('tab_con article').height(830);
  }

  //모바일일때
  }else{
    $(this).parent().siblings().find('div').slideUp();
    $(this).next().slideDown();
    $(this).parent().siblings().find('a').removeClass('tab_act');
    $(this).addClass('tab_act');
   //모바일 tab_act2 적용
  $(this).find('i.fas').addClass('tab_act2').parent().parent().siblings().find('i.fas').removeClass('tab_act2');

  const i = $(this).parent().index();
  console.log(i);
  if(i==2){
    $('.tab_con article').height(1000);
  }else{
    $('tab_con article').height(400);
  }
  }

  return false;
});


// 모바일 이벤트 
const eslide = $('.es_wrap');
const es_lbtn = $('.fa-angle-left');
const es_rbtn = $('.fa-angle-right');

// 1번 슬라이드의 앞에 3번 슬라이드를 배치함
$('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

// 왼쪽으로 1200px 이동하여 1번에 가운데 배치가 되게 함
eslide.css('margin-left','-100%');

//왼쪽 이동 함수
function moveLeft(){
  eslide.animate({'margin-left':'-100%'},500,function(){
    $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
    eslide.css('margin-left','-100%');
  });
}

//시간객체를 사용하여 4초마다 움직이도록 함
let Timer02 = setInterval(moveLeft,2000);

//오른쪽 이동 함수
function moveRight(){
  eslide.animate({'margin-left':'0%'},500,function(){
    $('.es_wrap > div:first-child').insertBefore('.es_wrap > div:last-child');
    eslide.css('margin-left','-100%');
  });
}

//좌측버튼 클릭시 함수 호출
es_lbtn.click(function(){
  clearInterval(Timer02);
  moveLeft();
});

es_rbtn.click(function(){
  clearInterval(Timer02);
  moveRight();
});

$('es_slide i.fas').mouseenter(function(){
      clearInterval(Timer02);
    });
//좌, 우 버튼 마우스 아웃시 다시 시간을 생성해 움직이게하기
$('es_slide i.fas').mouseleave(function(){
  Timer02 = setInterval(moveLeft,3000);
});

  //시간객체를 사용하여 4초마다 움직이도록 함
let Timer2 = setInterval(moveLeft,2000);

//오른쪽 이동 함수
function moveRight(){
  eslide.animate({'margin-left':'0%'},500,function(){
    $('.es_wrap > div:first-child').insertBefore('.es_wrap > div:last-child');
    eslide.css('margin-left','-100%');
  });
}

//좌측버튼 클릭시 함수 호출
es_lbtn.click(function(){
  clearInterval(Timer2);
  moveLeft();
});

es_rbtn.click(function(){
  clearInterval(Timer2);
  moveRight();
});

$('es_slide i.fas').mouseenter(function(){
      clearInterval(Timer2);
    });
//좌, 우 버튼 마우스 아웃시 다시 시간을 생성해 움직이게하기
$('es_slide i.fas').mouseleave(function(){
  Timer2 = setInterval(moveLeft,3000);
});



  // ///////////////////////////////////
// 탑버튼 
// 1. 탑 버튼 클릭시 0.5동안 화면 올라가게 하기
$('.t_btn').click(function(){
  $('html, body').animate({'scrollTop':'0'},500);

  return false;
});  

// 2. 처음 화면에서 스크롤 내릴 시 탑 버튼 나타나게 하기
$(window).scroll(function(){
  let s_pos = $(this).scrollTop();
  console.log(s_pos);

  if(s_pos >= 600){
    $('.t_btn').fadeIn();
  }else{
    $('.t_btn').fadeOut();
  }
});

// 모달 제이쿼리
let popup = `
<div class="p_modal">
  <div class="banner">
    <a href="#" title="banner">
      <img src="./images/mierohiber/modal.JPG">
    </a>
    <input type="checkbox" id="ch">
    <label for="ch">오늘 하루 열지 않음</label>
    <input type="button" value="닫기 X" id="c_btn">
  </div>
</div>
`
$('body').append(popup);

//현재 브라우저에 쿠키 popup의 값이 none이면 팝업을 나오지 않게 함
if($.cookie('popup')=='none'){
  $('.p_modal').hide();
}

// 체크박스 변수
let $ex = $('.p_modal #ch');

//체크박스에 사용자가 체크를 했는지 하지 않았는지 학인하기 위한 함수 작성
function closePopup(){
  if($ex.is(':checked')){ //체크박스에 체크되었다면
    $.cookie('popup','none', {expires:1, path:'/'});
  }
  $('.p_modal').fadeOut();
}

  //닫기 버튼 클릭시 해당 함수를 호출하여 모달윈도 닫기
  $('.p_modal  #c_btn').click(function(){
    // $('.p_modal').fadeOut();
    closePopup();
  });


  });