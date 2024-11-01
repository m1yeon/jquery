
// 갤러리 스크립트
$(document).ready(function(){

  //변수 선언
  const g_nav = $('.g_nav ul li a');
  const g_list = $('.g_list li a');
  
  const total_btn = $('.g_nav ul li:first-child a');
  const plan_btn = $('.g_nav ul li:nth-child(2) a');
  const design_btn = $('.g_nav ul li:nth-child(3) a');
  const ui_btn = $('.g_nav ul li:nth-child(4) a');
  const coding_btn = $('.g_nav ul li:last-child a');


  //이미지 목록에 마우스 오버시 caption이 밑에서 위로 올라오게하기
  g_list.mouseenter(function(){
    $(this).find('.caption').stop().animate({'bottom':'0px'},300);
  });

  g_list.mouseleave(function(){
    $('.caption').stop().animate({'bottom':'-40px'},300);
  });


  //텝메뉴 구현하기
  //1. 탭 메뉴 클릭시 해당 탭 컬러 변경
  g_nav.click(function(){
    //선택한 현재 a요소에 act서식을 적용하고 부모의 다른 형제요소의 자식요소인 a요소는 act를 제거함.
    $(this).addClass('act').parent().siblings().find('a').removeClass('act');
  });
  
  // 2. 탭 메뉴 클릭시 해당 카테고리에 맞는 콘텐츠 보이게 하기
  // 전체보기 > .total
  total_btn.click(function(){
    $('.total').hide();
    $('.total').fadeIn();
  });
  

  // 기획 > .plan
  plan_btn.click(function(){
    $('.total').hide();
    $('.plan').fadeIn();
  });

  // 설계 > .design
  design_btn.click(function(){
    $('.total').hide();
    $('.design').fadeIn();
  });

  // 디자인 > .ui
  ui_btn.click(function(){
    $('.total').hide();
    $('.ui').fadeIn();
  });

  // 구현 > .coding
  coding_btn.click(function(){
    $('.total').hide();
    $('.coding').fadeIn();
  });

  //3. 각 콘텐츠 클릭시 모달창 띄우기

  g_list.click(function(){
    // 내가 선택한 a태그에 해당하는 href주소값을 변수에 저장
    let img_src = $(this).attr('href');  

    //내가 선택한 a태그의 자손  span태그의 text값 출력
    // let title = $(this).attr('title');
    let title = $(this).find('span').text(); 

    //내가 선택한 a의 부모(li)의 인덱스값 
    let i = $(this).parent().index()+1; 



    console.log(img_src); //이미지 href값 출력
    console.log(title); //title 제목 출력
    console.log(i);


    let modal = `
    <div class="modal">
      <div class="center">
        <h3>${title}</h3>
        <img src="${img_src}" alt="이미지">
        <i class="fa-solid fa-xmark"></i>
        <span class="p_num">${i}/12</span>
        <i class="fas fa-angle-left"></i>
        <i class="fas fa-angle-right"</i>
      </div>
    </div>`

    //바디태그의 맨뒤에 modal 변수값 출려하기
    $('body').append(modal);

    //닫기 버튼 클릭시 모달 윈도 숨기기
    $('.center i.fa-xmark').click(function(){
      $('.modal').fadeOut();
    });

    //좌,우 버튼 클릭시 각 함수 작성하기
    $('.modal i.fa-angle-left').click(function(){
      if(i == 1){
        i=12;
      }else{
        i--;
      }
      console.log(i);
      dataChange(i);
    });

    $('.modal i.fa-angle-right').click(function(){
      if(i==12){
        i=1;
      }else{
        i++;
      }
      console.log(i);
      dataChange(i);
    });

    return false;
  });

  //dataChange 함수 좌/우 버튼 클릭시  받아온 i값을 가지고 
  //제목, 이미지, 페이지번호 변경하기

  function dataChange(i){
    //1.페이지 번호 변경
    $('.modal .p_num').text(i+'/12');

    //2.각 이미지에 맞는 제목 변경
    $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());

    //3. 해당 인덱스 번호에 맞는 이미지 출력
    if(i==4||i==9||i==11){
      $('.modal img').attr('src','./images/imgallery/img'+i+'.png');
    }else{
      $('.modal img').attr('src','./images/imgallery/img'+i+'.jpg');
    }
  };











});