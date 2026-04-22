// script.js 수정
// 페이지가 완전히 로드되면 실행
window.addEventListener("load", function () {

  // 첫 번째 상품 영역을 강제로 보이게 설정
  document.getElementById('product01').style.display = 'flex';

  // item-wrap 내부 내용을 복제해서 무한 스크롤 구조 만들기
  cloneItemWrapsOnce();

  // 브라우저 렌더링 이후에 거리 계산 (레이아웃 확정 후 실행)
  requestAnimationFrame(() => {
    setMarqueeDistance();
  }, 100);
});

// marquee(흐르는 애니메이션) 이동 거리 계산 함수
function setMarqueeDistance() {
  document.querySelectorAll(".item-wrap").forEach((wrap) => {

    // 실제 이동 거리 계산 함수
    const update = () => {

      // 전체 높이의 1/3 만큼 이동하도록 설정
      // (3배 복제했기 때문에 원본 높이 기준으로 맞추는 것)
      const height = wrap.scrollHeight / 3;

      // CSS 변수(--move)에 이동 거리 넣어줌
      wrap.style.setProperty("--move", `-${height}px`);
    };

    // 이미지까지 로딩 완료 후 정확한 높이 계산을 위해 처리
    const imgs = wrap.querySelectorAll("img");
    let loaded = 0;

    imgs.forEach((img) => {

      // 이미 로드된 이미지면 바로 카운트 증가
      if (img.complete) {
        loaded++;
      } else {
        // 아직 로드 안 됐으면 로드 완료 시 카운트 증가
        img.onload = () => {
          loaded++;

          // 모든 이미지 로딩 끝나면 거리 계산
          if (loaded === imgs.length) update();
        };
      }
    });

    // 이미지가 이미 전부 로드된 상태면 바로 실행
    if (loaded === imgs.length) update();
  });
}

// item-wrap 내부를 3배로 복제하는 함수 (무한 반복용)
function cloneItemWrapsOnce() {
  document.querySelectorAll(".item-wrap").forEach((wrap) => {

    // 이미 복제된 경우 다시 실행 안 함 (중복 방지)
    if (!wrap.dataset.cloned) {

      // 기존 내용을 3번 이어붙임 (총 3배)
      wrap.innerHTML += wrap.innerHTML + wrap.innerHTML; // 3배

      // 복제 완료 표시
      wrap.dataset.cloned = "true";
    }
  });
}

// 상단 띠배너 무한 반복용 함수
function infiniteBanner() {
  const track = document.querySelector("#thin_banner_flow .track");

  // 현재 텍스트 내용 저장
  const content = track.innerHTML;

  // track의 전체 너비가 화면의 2배보다 작으면 계속 복제
  // (끊김 없이 자연스럽게 흐르게 하기 위함)
  while (track.scrollWidth < window.innerWidth * 2) {
    track.innerHTML += content;
  }
}

window.addEventListener("load", infiniteBanner);
window.addEventListener("resize", infiniteBanner);

function openBoard(evt, boardName) {
  var i, x, tablinks;

  // 1. 모든 상세 이미지 영역(.board)을 숨김
  x = document.getElementsByClassName("board");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  // 2. 모든 탭 버튼(.tablink)에서 활성화 클래스(opacity) 제거
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("opacity");
  }

  // 3. 클릭한 버튼에 해당하는 콘텐츠만 보여줌
  // flex로 설정해야 위에서 잡은 레이아웃이 유지됩니다.
  document.getElementById(boardName).style.display = "flex";

  // 4. 클릭된 버튼에 활성화 클래스 추가
  evt.currentTarget.classList.add("opacity");
}


const hearts = document.querySelectorAll('.heart');

hearts.forEach(heart => {
  heart.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});