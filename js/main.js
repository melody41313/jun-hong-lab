
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
if(menuToggle&&nav)menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-item>button').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();btn.parentElement.classList.toggle('open')}));

const lineContact=document.createElement('aside');
lineContact.className='line-contact';
lineContact.innerHTML=`
  <section class="line-contact-panel" id="line-contact-panel" aria-labelledby="line-contact-title" hidden>
    <button class="line-contact-close" type="button" aria-label="關閉 LINE 諮詢選單">×</button>
    <p class="line-contact-kicker">JUN HONG</p>
    <h2 id="line-contact-title">有任何需求嗎？</h2>
    <p class="line-contact-description">實驗室規劃、設備訂製、耗材或其他需求，歡迎聯絡。</p>
    <a class="line-contact-qr-link" href="https://line.me/ti/p/~1201pei" target="_blank" rel="noopener" aria-label="掃描 QR Code 加入 LINE 帳號 1201pei">
      <img class="line-contact-qr" src="assets/service/line-1201pei.svg" alt="LINE 帳號 1201pei 加好友 QR Code">
      <span>掃碼加入 LINE 好友</span>
    </a>
    <a class="line-contact-open" href="https://line.me/ti/p/~1201pei" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.9 3 2.8 6.3 2.8 10.5c0 2.3 1.3 4.4 3.5 5.7l-.8 3 3.6-1.8c.9.2 1.9.4 2.9.4 5.1 0 9.2-3.3 9.2-7.4S17.1 3 12 3Z"/><path d="M7.4 10.7h9.2M7.4 13.2h6.8"/></svg>
      <span>LINE 詢問</span><span class="line-contact-arrow">↗</span>
    </a>
    <a class="line-contact-call" href="tel:0911900522">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5h2.2c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .8-.4 1.1L9.3 9.9a14.2 14.2 0 0 0 4.8 4.8l1.3-1.5c.3-.3.7-.5 1.1-.4l3.2.8c.5.1.8.5.8 1v2.2c0 .7-.6 1.3-1.3 1.3A16.7 16.7 0 0 1 5.9 5c0-.8.6-1.5 1.3-1.5Z"/></svg>
      <span>電話詢問</span><span class="line-contact-arrow">↗</span>
    </a>
  </section>
  <button class="line-contact-toggle" type="button" aria-expanded="false" aria-controls="line-contact-panel">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.9 3 2.8 6.3 2.8 10.5c0 2.3 1.3 4.4 3.5 5.7l-.8 3 3.6-1.8c.9.2 1.9.4 2.9.4 5.1 0 9.2-3.3 9.2-7.4S17.1 3 12 3Z"/><path d="M7.4 10.7h9.2M7.4 13.2h6.8"/></svg>
    <span>LINE 詢問</span>
  </button>
</aside>`;
document.body.append(lineContact);
const lineToggle=lineContact.querySelector('.line-contact-toggle');
const linePanel=lineContact.querySelector('.line-contact-panel');
const setLinePanelOpen=open=>{
  if(open){
    linePanel.hidden=false;
    requestAnimationFrame(()=>linePanel.classList.add('is-visible'));
  }else{
    linePanel.classList.remove('is-visible');
    linePanel.hidden=true;
  }
  lineToggle.setAttribute('aria-expanded',String(open));
  lineToggle.classList.toggle('is-open',open);
};
lineToggle.addEventListener('click',()=>setLinePanelOpen(linePanel.hidden));
lineContact.querySelector('.line-contact-close').addEventListener('click',()=>setLinePanelOpen(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setLinePanelOpen(false)});

const parallaxBanners=[...document.querySelectorAll('.hero')];
if(parallaxBanners.length){
  let parallaxFrame=0;
  const updateParallax=()=>{
    parallaxFrame=0;
    const viewportCenter=window.innerHeight/2;
    parallaxBanners.forEach(banner=>{
      const rect=banner.getBoundingClientRect();
      const rawOffset=(rect.top+rect.height/2-viewportCenter)*-0.3;
      const offset=Math.max(-40,Math.min(40,rawOffset));
      banner.style.setProperty('--parallax-y',`${offset.toFixed(1)}px`);
    });
  };
  const requestParallaxUpdate=()=>{
    if(!parallaxFrame)parallaxFrame=window.requestAnimationFrame(updateParallax);
  };
  window.addEventListener('scroll',requestParallaxUpdate,{passive:true});
  window.addEventListener('resize',requestParallaxUpdate);
  updateParallax();
}

const caseCarousel=document.querySelector('.home-case-carousel');
if(caseCarousel){
  const slides=[...caseCarousel.querySelectorAll('.home-case-slides img')];
  const dotsContainer=caseCarousel.querySelector('.home-case-dots');
  let activeIndex=slides.findIndex(slide=>slide.classList.contains('is-active'));
  let autoplay;
  const showSlide=index=>{
    activeIndex=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===activeIndex;
      slide.classList.toggle('is-active',active);
      slide.setAttribute('aria-hidden',String(!active));
      dotsContainer.children[i].setAttribute('aria-current',String(active));
    });
  };
  slides.forEach((slide,i)=>{
    const dot=document.createElement('button');
    dot.type='button';
    dot.className='home-case-dot';
    dot.setAttribute('aria-label',`顯示第 ${i+1} 張案例照片`);
    dot.setAttribute('aria-current',String(i===activeIndex));
    dot.addEventListener('click',()=>{showSlide(i);restartAutoplay()});
    dotsContainer.append(dot);
  });
  const restartAutoplay=()=>{
    window.clearInterval(autoplay);
    autoplay=window.setInterval(()=>showSlide(activeIndex+1),2000);
  };
  const carouselWrap=caseCarousel.closest('.home-case-carousel-wrap');
  carouselWrap.querySelector('.prev').addEventListener('click',()=>{showSlide(activeIndex-1);restartAutoplay()});
  carouselWrap.querySelector('.next').addEventListener('click',()=>{showSlide(activeIndex+1);restartAutoplay()});
  let touchStartX=0;
  caseCarousel.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0].clientX},{passive:true});
  caseCarousel.addEventListener('touchend',event=>{
    const delta=event.changedTouches[0].clientX-touchStartX;
    if(Math.abs(delta)>45){showSlide(activeIndex+(delta<0?1:-1));restartAutoplay()}
  },{passive:true});
  caseCarousel.addEventListener('mouseenter',()=>window.clearInterval(autoplay));
  caseCarousel.addEventListener('mouseleave',restartAutoplay);
  caseCarousel.addEventListener('focusin',()=>window.clearInterval(autoplay));
  caseCarousel.addEventListener('focusout',restartAutoplay);
  restartAutoplay();
}

/*
  表單已照 Weebly 截圖做好。
  要啟用「送出後寄到客戶 Email」，只需要把 FORM_ENDPOINT
  換成你的表單服務網址即可；不用改 HTML。
*/
const FORM_ENDPOINT="";
const form=document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status=document.querySelector('#form-status');
    if(!FORM_ENDPOINT){
      status.textContent='表單介面已完成；設定 Email 寄送服務後即可正式收件。';
      return;
    }
    status.textContent='送出中…';
    try{
      const res=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!res.ok) throw new Error('send failed');
      form.reset();
      status.textContent='已成功送出，我們會盡快與您聯繫。';
    }catch(err){
      status.textContent='送出失敗，請稍後再試或直接來電聯絡。';
    }
  });
}
