  //윈도우창의 너비값, 높이값 = $(window).width(); or $(window).height();
  // $(window).innerWidth(); = 패딩값을 포함한 너비

  let w_width;

  // 반응형인지 확인시 창의 너비를 줄여봄 -> 제이쿼리에서도 브라우저의 크기 변화에 따라 기능 넣기 가능 
  //브라우저의 크기가 변하면 함수내용을 실행함
  $(window).resize(function(){
    w_width = $(window).innerWidth();
    console.log(w_width); //해상도 console 창에서 확인

    //pc버전 해상도일경우 배경색 노랑 tablet버전 초록

    if(w_width>=1025){
      $('header h1 img').attr('src','./images/mierohiber/logo2.png');
    }else if(w_width>=768){  //w_width > 767 && w_width>=1024
      $('body').css('background','green');
      $('header h1 img').attr('src','./images/mierohiber/logo.png');

    }else{
      $('body').css('background','#ccc');
      $('header h1 img').attr('src','./images/mierohiber/logo.png');
    }
  }).resize();
