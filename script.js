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

console.log('평택시문화재단 홈페이지 초기화 완료');
