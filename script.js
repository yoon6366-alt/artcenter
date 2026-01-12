// 모바일 메뉴 토글
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// 검색 기능
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        // 검색 모달 열기 (추후 구현)
        alert('검색 기능은 준비 중입니다.');
    });
}

// 스크롤 시 헤더 효과
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 메가카드 클릭 이벤트
const megaCards = document.querySelectorAll('.mega-card');

megaCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const titles = ['평택아트센터', '티켓예매', '대관신청', '교육신청'];
        console.log(`${titles[index]} 클릭됨`);
        // 추후 페이지 이동 구현
    });
});

// 카드 호버 애니메이션 강화
const contentCards = document.querySelectorAll('.content-card');

contentCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 페이지 로드 애니메이션
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 메가카드 순차 애니메이션
    const cards = document.querySelectorAll('.mega-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// 인터섹션 옵저버 - 스크롤 시 요소 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animateElements = document.querySelectorAll('.content-card, .quick-item, .news-item');
animateElements.forEach(el => observer.observe(el));

// 퀵링크 카드 클릭 이벤트
const quickItems = document.querySelectorAll('.quick-item');

quickItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const title = item.querySelector('h4').textContent;
        console.log(`${title} 섹션으로 이동`);
    });
});

// 소식 아이템 클릭 이벤트
const newsItems = document.querySelectorAll('.news-item');

newsItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        console.log(`소식 상세보기: ${title}`);
        // 추후 상세 페이지로 이동
    });
});

// 관련기관 링크
const affiliatedItems = document.querySelectorAll('.affiliated-item');

affiliatedItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const name = item.querySelector('span').textContent;
        console.log(`${name} 페이지로 이동`);
    });
});

// 반응형 대응
let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    
    if ((windowWidth >= 768 && newWidth < 768) || (windowWidth < 768 && newWidth >= 768)) {
        // 모바일 ↔ 데스크탑 전환 시
        location.reload();
    }
    
    windowWidth = newWidth;
});

// CSS 애니메이션 클래스 추가
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    @media (max-width: 768px) {
        .main-nav.active {
            display: block;
            position: fixed;
            top: 140px;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        
        .main-nav.active ul {
            flex-direction: column;
            gap: 20px;
        }
        
        .menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }
        
        .menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

// ========== 시설별 전시·공연 탭 필터링 ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const facilityCards = document.querySelectorAll('.facility-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 활성 탭 변경
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // 카드 필터링
        facilityCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// ========== 시설별 슬라이더 좌우 버튼 ==========
const facilitySlider = document.querySelector('.facility-slider');
const prevArrow = document.querySelector('.slider-arrow.prev');
const nextArrow = document.querySelector('.slider-arrow.next');

if (facilitySlider && prevArrow && nextArrow) {
    const scrollAmount = 300;
    
    prevArrow.addEventListener('click', () => {
        facilitySlider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextArrow.addEventListener('click', () => {
        facilitySlider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// ========== 캘린더 기능 ==========
const calendarDays = document.getElementById('calendarDays');
const currentMonthEl = document.querySelector('.current-month');
const prevMonthBtn = document.querySelector('.prev-month');
const nextMonthBtn = document.querySelector('.next-month');

let currentDate = new Date(2026, 0, 1); // 2026년 1월

// 일정이 있는 날짜 (파란색으로 표시)
const eventDays = {
    '2026-01': [2, 5, 8, 12, 15, 18, 20, 22, 25, 28],
    '2026-02': [3, 7, 10, 14, 17, 21, 24],
    '2026-03': [1, 5, 9, 13, 16, 20, 23, 27, 30]
};

function renderCalendar() {
    if (!calendarDays) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 월 표시 업데이트 (예: 2026.1)
    currentMonthEl.textContent = `${year}.${month + 1}`;
    
    // 해당 월의 마지막 날짜 구하기
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // 이벤트가 있는 날짜 배열 가져오기
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const eventDates = eventDays[monthKey] || [];
    
    let html = '';
    
    // 1일부터 마지막 날까지 렌더링
    for (let day = 1; day <= lastDay; day++) {
        const hasEvent = eventDates.includes(day);
        const isToday = new Date().getFullYear() === year && 
                        new Date().getMonth() === month && 
                        new Date().getDate() === day;
        
        let classes = 'cal-day-item';
        if (hasEvent) classes += ' has-event';
        if (isToday) classes += ' today';
        
        html += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }
    
    calendarDays.innerHTML = html;
    
    // 날짜 클릭 이벤트
    document.querySelectorAll('.cal-day-item').forEach(dayEl => {
        dayEl.addEventListener('click', () => {
            document.querySelectorAll('.cal-day-item').forEach(d => d.classList.remove('selected'));
            dayEl.classList.add('selected');
        });
    });
}

// 이전/다음 달 버튼
if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

// 초기 렌더링
renderCalendar();

// ========== 공간소개 슬라이더 ==========
const spaceItems = document.querySelectorAll('.space-item');
const spacePrevBtn = document.querySelector('.space-prev');
const spaceNextBtn = document.querySelector('.space-next');

const spacesData = [
    { name: '웨스트홀', desc: '서쪽에 위치한 다목적 문화공간으로 다양한 공연과 행사가 열립니다.' },
    { name: '시민회관', desc: '평택시 시민회관으로 대강연장, 소회의실, 다목적홀 등을 운영하고 있습니다.' },
    { name: '사우스홀', desc: '남쪽에 위치한 전시 및 교육 공간으로 다양한 프로그램이 진행됩니다.' }
];

let currentSpaceIndex = 1; // 중앙 이미지부터 시작

function updateSpaceCarousel() {
    const items = document.querySelectorAll('.space-item');
    if (items.length < 3) return;
    
    items.forEach(item => {
        item.classList.remove('prev', 'main', 'active', 'next', 'side');
    });
    
    const prevIndex = (currentSpaceIndex - 1 + 3) % 3;
    const nextIndex = (currentSpaceIndex + 1) % 3;
    
    items[prevIndex].classList.add('side', 'prev');
    items[currentSpaceIndex].classList.add('main', 'active');
    items[nextIndex].classList.add('side', 'next');
    
    // 오버레이 정보 업데이트
    const overlay = document.querySelector('.space-overlay');
    if (overlay) {
        overlay.querySelector('h3').textContent = spacesData[currentSpaceIndex].name;
        overlay.querySelector('p').textContent = spacesData[currentSpaceIndex].desc;
    }
}

function nextSpace() {
    currentSpaceIndex = (currentSpaceIndex + 1) % 3;
    updateSpaceCarousel();
}

function prevSpace() {
    currentSpaceIndex = (currentSpaceIndex - 1 + 3) % 3;
    updateSpaceCarousel();
}

if (spacePrevBtn) spacePrevBtn.addEventListener('click', prevSpace);
if (spaceNextBtn) spaceNextBtn.addEventListener('click', nextSpace);

// VR 투어 버튼
const vrTourBtn = document.querySelector('.vr-tour-btn');
if (vrTourBtn) {
    vrTourBtn.addEventListener('click', () => {
        alert('VR 투어 페이지로 이동합니다.');
    });
}

console.log('평택시문화재단 홈페이지 초기화 완료');
