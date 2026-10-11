(() => {
  'use strict';
  const data = window.ARTS_CONTENT;
  const main = document.querySelector('#main');
  const dialog = document.querySelector('#entry-dialog');
  const state = { query: '', category: '全部', order: 'newest', view: 'wall' };
  const routes = {
    home: ['序页', '00'], reading: ['读书分享', '01'], thoughts: ['思考随笔', '02'],
    gallery: ['画廊', '03'], music: ['音乐', '04'], exchange: ['交流', '05'], about: ['关于本站', '06']
  };
  const sections = [
    ['reading', '01', '读书分享', 'READING ROOM', '书页之间，留下一点自己的理解。', '翻开书页'],
    ['thoughts', '02', '思考随笔', 'MARGINAL NOTES', '为尚在生长的念头，留一页空白。', '走进随笔'],
    ['gallery', '03', '画廊', 'THE GALLERY', '让目光停留，让画面自己说话。', '步入画廊'],
    ['music', '04', '音乐', 'LISTENING ROOM', '在声音与静默之间，慢慢聆听。', '走进听室']
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeUrl = value => {
    const text = String(value || '').trim();
    if (!text || /[\u0000-\u0020\\]/.test(text) || text.startsWith('//')) return '';
    if (/^https?:\/\//i.test(text)) return text;
    return /^[\w.\-/]+(?:[?#][^<>]*)?$/.test(text) && !text.includes('..') && !text.includes(':') ? text : '';
  };
  const glyph = (type, cls = '') => {
    const forms = {
      reading: '<path d="M8 12q12-5 24 1v35q-12-6-24-1zM32 13q12-6 24-1v35q-12-5-24 1M14 20l12 1m-12 6 12 1m13-7 11-1m-11 8 11-1"/>',
      thoughts: '<path d="M17 8h27l6 6v42H17zM44 8v8h6M24 25h19M24 33h19M24 41h11"/><path d="m8 47 9-9m-11 6 7 7"/>',
      gallery: '<path d="M10 10h44v44H10zM16 17h32v30H16zM17 41l10-11 8 9 6-6 7 8"/><circle cx="39" cy="24" r="3"/>',
      music: '<circle cx="32" cy="32" r="23"/><circle cx="32" cy="32" r="15"/><circle cx="32" cy="32" r="4"/><path d="M40 12a22 22 0 0 1 13 19M11 34a22 22 0 0 0 10 16"/>',
      exchange: '<path d="M9 15h46v34H9zM9 16l23 18 23-18M9 48l16-18m30 18L39 30"/>',
      about: '<circle cx="32" cy="32" r="23"/><path d="M32 28v17M32 19v2M6 32h9m34 0h9M32 6v9m0 34v9"/>'
    };
    return `<svg class="line-icon ${cls}" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2">${forms[type] || forms.about}</svg>`;
  };
  const routeName = () => { const hash = location.hash.replace(/^#\/?/, '').split('?')[0]; return hash || 'home'; };
  const routeHeader = (id, subtitle, description) => `<header class="page-heading"><div class="folio"><span>FOLIO / ${routes[id][1]}</span><span>${subtitle}</span></div><div class="heading-line"><h1>${routes[id][0]}<span class="heading-dot">.</span></h1>${glyph(id)}</div><p>${description}</p></header>`;
  function home() {
    return `<section class="hero"><div class="hero-grid" aria-hidden="true"></div><div class="hero-topline"><span>EVERSTARINE’S PERSONAL ATELIER</span><span>文字 · 形色 · 声音</span></div><img class="hero-art" src="assets/paper-observatory.svg" alt="原创几何插画：纸页与阶梯悬浮于蓝色轨道之间"><div class="hero-copy"><p class="eyebrow"><span></span> A PLACE FOR QUIET THOUGHTS</p><h1>纸间<span class="ampersand">与</span><br><span class="echo">回声</span><i aria-hidden="true">.</i></h1><p class="hero-description">一处安放阅读、思考与艺术的个人空间。</p><a class="blue-link" href="#/reading">从一页书开始 <span aria-hidden="true">↗</span></a></div><div class="vertical-note" aria-hidden="true">READ / REFLECT / SEE / LISTEN</div><div class="hero-caption"><span class="caption-cross" aria-hidden="true">＋</span><span>留白，是下一次相遇的起点。</span><span class="caption-index">INDEX — 00</span></div></section><section class="contents" aria-labelledby="contents-heading"><div class="section-heading"><h2 id="contents-heading">由此展开</h2><span>EXPLORE THE COLLECTION</span></div><div class="portal-grid">${sections.map(s => `<a class="portal portal-${s[0]}" href="#/${s[0]}"><div class="portal-top"><span>${s[1]}</span><span>${s[3]}</span></div>${glyph(s[0])}<h3>${s[2]}</h3><p>${s[4]}</p><div class="portal-bottom"><span>${s[5]}</span><span aria-hidden="true">↗</span></div></a>`).join('')}</div></section><section class="invitation"><span class="eyebrow">CORRESPONDENCE</span><h2>也为对话，<br>留一个位置。</h2><p>关于阅读的共鸣，对艺术的感受，<br>都可以从这里开始。</p><a class="text-link" href="#/exchange">前往交流页 <span aria-hidden="true">↗</span></a><span class="invitation-orbit" aria-hidden="true"></span></section>`;
  }
  const categories = {reading: ['全部','文学','思想','艺术','其他'],thoughts: ['全部','读书札记','日常思考','艺术随想'],gallery: ['全部','绘画','摄影','其他'],music: ['全部','古典','原声','其他']};
  const intros = {reading:['READING ROOM','在阅读中相遇，在分享中延伸。'],thoughts:['MARGINAL NOTES','收存思绪的片段，也容纳未完成的问题。'],gallery:['THE GALLERY','将目光交给画面，将时间留给观看。'],music:['LISTENING ROOM','让旋律、感受与记忆，在这里相逢。']};
  const empties = {reading:['书架正等待第一本书','读书分享尚未收录。这里将安放书籍、摘记与阅读感受。'],thoughts:['下一页，留给一个念头','随笔尚未收录。这里将记录思考、问题与偶然的发现。'],gallery:['展墙已留白','作品尚未收录。这里将呈现绘画、摄影与视觉创作。'],music:['把第一段旋律留给以后','音乐尚未收录。这里将分享作品与聆听笔记。']};
  function collection(id) {
    const controls = categories[id].map(c => `<button class="filter${state.category === c ? ' selected' : ''}" data-category="${c}" aria-pressed="${state.category === c}">${c}</button>`).join('');
    return `${routeHeader(id,...intros[id])}<section class="collection" aria-label="${routes[id][0]}列表"><div class="collection-toolbar"><div class="filters" aria-label="分类">${controls}</div><div class="collection-options">${id === 'gallery' ? `<div class="view-switch" aria-label="显示方式"><button data-view="wall" aria-pressed="${state.view === 'wall'}" title="展墙视图">展墙</button><button data-view="list" aria-pressed="${state.view === 'list'}" title="索引视图">索引</button></div>` : ''}<label class="sort-label"><span class="sr-only">排序</span><select id="sort-order"><option value="newest"${state.order === 'newest' ? ' selected' : ''}>最新收录</option><option value="oldest"${state.order === 'oldest' ? ' selected' : ''}>最早收录</option><option value="title"${state.order === 'title' ? ' selected' : ''}>标题顺序</option></select></label></div></div><div class="search-line"><label><span aria-hidden="true">⌕</span><span class="sr-only">搜索${routes[id][0]}</span><input id="collection-search" type="search" maxlength="100" placeholder="在${routes[id][0]}中寻找…" value="${escape(state.query)}" autocomplete="off"></label><span id="result-count" role="status"></span></div><div id="collection-results"></div></section><div class="page-end"><span>END OF FOLIO ${routes[id][1]}</span><a href="#/">返回序页 ↗</a></div>`;
  }
  function updateResults(id) {
    const all = data[id] || [];
    const query = state.query.trim().toLocaleLowerCase();
    const entries = all.map((item,index)=>({item,index})).filter(({item}) => (state.category === '全部' || item.category === state.category) && [item.title,item.author,item.artist,item.description,item.body].join(' ').toLocaleLowerCase().includes(query));
    entries.sort((a,b) => state.order === 'title' ? String(a.item.title || '').localeCompare(String(b.item.title || ''),'zh-CN') : (state.order === 'oldest' ? 1 : -1) * String(a.item.date || '').localeCompare(String(b.item.date || '')));
    document.querySelector('#result-count').textContent = `${entries.length} ${id === 'gallery' ? '件作品' : '条收录'}`;
    const results = document.querySelector('#collection-results');
    results.className = `results results-${id} ${state.view === 'list' ? 'list-view' : ''}`;
    if (!entries.length) {
      const isFiltered = !!all.length || query || state.category !== '全部';
      results.innerHTML = `<div class="empty-state empty-${id}"><div class="empty-illustration" aria-hidden="true"><span class="empty-orbit"></span>${glyph(id)}<span class="empty-coordinate">${routes[id][1]} / —</span></div><div class="empty-copy"><p class="eyebrow">${isFiltered ? 'NO MATCHES' : 'SPACE RESERVED'}</p><h2>${isFiltered ? '这里暂时没有匹配的内容' : empties[id][0]}</h2><p>${isFiltered ? '试试其他关键词，或回到全部分类。' : empties[id][1]}</p>${isFiltered ? '<button class="text-link" data-reset>清除筛选 ↗</button>' : '<span class="empty-badge">静候更新</span>'}</div></div>`;
      return;
    }
    results.innerHTML = entries.map(({item,index}) => `<button class="entry-card" data-entry="${index}" data-kind="${id}">${id === 'gallery' && safeUrl(item.src) ? `<img src="${escape(safeUrl(item.src))}" alt="${escape(item.alt || item.title)}" loading="lazy">` : glyph(id)}<span class="entry-category">${escape(item.category || routes[id][0])}</span><h2>${escape(item.title)}</h2><span class="entry-meta">${escape(item.author || item.artist || '')} ${escape(item.date || '')}</span><p>${escape(item.description || '')}</p><span class="entry-arrow" aria-hidden="true">↗</span></button>`).join('');
  }
  function exchange() {
    return `${routeHeader('exchange','CORRESPONDENCE','为阅读与艺术留一处相遇的地方。')}<section class="exchange-layout"><div class="letter-wall"><div class="section-heading"><h2>来信墙</h2><span>${data.messages.length} 封来信</span></div>${data.messages.length ? data.messages.map(m=>`<article class="message"><h3>${escape(m.name)}</h3><p>${escape(m.message)}</p><time>${escape(m.date)}</time></article>`).join('') : `<div class="letter-empty">${glyph('exchange')}<h3>第一封来信，尚在路上。</h3><p>来信墙暂未开放公开投稿。</p><span class="eyebrow">A SPACE FOR DIALOGUE</span></div>`}</div><form id="letter-form" class="letter-form"><div class="letter-form-heading"><span>写下此刻的想法</span><span aria-hidden="true">↗</span></div><p class="form-note">先试写一封来信。草稿仅保存在当前浏览器，尚不会公开或发送给站主。</p><label for="letter-name">称呼 <span>选填</span></label><input id="letter-name" name="name" maxlength="40" placeholder="如何称呼你"><label for="letter-topic">关于</label><select id="letter-topic" name="topic"><option>读书与思考</option><option>绘画与视觉</option><option>音乐与聆听</option><option>其他</option></select><label for="letter-message">正文</label><textarea id="letter-message" name="message" maxlength="1200" rows="6" required placeholder="将想说的话，写在这里…"></textarea><div class="draft-meta"><span id="draft-status" role="status">仅本地草稿</span><span id="letter-count">0 / 1200</span></div><div class="form-actions"><button class="blue-link" type="submit">预览来信 <span aria-hidden="true">↗</span></button><button class="clear-draft" type="button">清空草稿</button></div></form></section>`;
  }
  function about() {
    const related = data.relatedSites;
    return `${routeHeader('about','ABOUT THIS ATELIER','一个独立的个人阅读、思考与艺术交流空间。')}<section class="about-layout"><div class="about-monogram" aria-hidden="true"><span>纸</span><span>声</span><i>ES / PERSONAL ATELIER</i></div><div class="about-copy"><p class="eyebrow">EVERSTARINE</p><h2>在书页与世界之间。</h2><p>${data.profile.bio ? escape(data.profile.bio) : '个人介绍尚未填写。'}</p><div class="about-note"><h3>关于这里</h3><p>读书分享、随笔、画廊与音乐共同构成这处空间。各栏目已备好，等待真实内容慢慢进入。</p></div><div class="about-note"><h3>站外入口</h3>${related.enabled && related.items.length ? related.items.filter(i=>safeUrl(i.url)).map(i=>`<p><a class="text-link" href="${escape(safeUrl(i.url))}" target="_blank" rel="noopener noreferrer">${escape(i.title)} ↗</a></p>`).join('') : '<p>位置已预留，链接尚未启用。本站目前独立运行。</p>'}</div><div class="about-note"><h3>关于来信</h3><p>交流页目前提供本地草稿与预览。来信不会发送到服务器，也不会出现在其他访客的页面上。</p></div></div></section>`;
  }
  let hasNavigated = false;
  function render() {
    const id = routeName();
    state.query = ''; state.category = '全部'; state.order = 'newest';
    if (dialog.open) dialog.close();
    main.innerHTML = id === 'home' ? home() : Object.hasOwn(categories,id) ? collection(id) : id === 'exchange' ? exchange() : id === 'about' ? about() : '<section class="not-found"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1>这页尚未写下。</h1><a class="blue-link" href="#/">返回序页 ↗</a></section>';
    document.title = `${Object.hasOwn(routes,id) ? routes[id][0] : '页面未找到'} · 纸间与回声 · EverStarine`;
    document.body.dataset.page = id;
    document.querySelectorAll('[data-route]').forEach(link => { if (link.dataset.route === id) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current'); });
    document.querySelector('#navigation').classList.remove('is-open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
    if (Object.hasOwn(categories,id)) updateResults(id);
    if (id === 'exchange') restoreDraft();
    if (hasNavigated) { main.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
    hasNavigated = true;
  }
  const draftKey = 'everstarine-arts-letter-v1';
  let storageAvailable = true;
  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) || 'null');
      if (draft && typeof draft === 'object') {
        document.querySelector('#letter-name').value = String(draft.name || '').slice(0,40);
        document.querySelector('#letter-message').value = String(draft.message || '').slice(0,1200);
        if (['读书与思考','绘画与视觉','音乐与聆听','其他'].includes(draft.topic)) document.querySelector('#letter-topic').value = draft.topic;
        document.querySelector('#draft-status').textContent = '已恢复本地草稿';
      }
    } catch { storageAvailable = false; document.querySelector('#draft-status').textContent = '浏览器存储不可用，草稿仅在本页保留'; }
    document.querySelector('#letter-count').textContent = `${document.querySelector('#letter-message').value.length} / 1200`;
  }
  function currentDraft() {return {name:document.querySelector('#letter-name').value,topic:document.querySelector('#letter-topic').value,message:document.querySelector('#letter-message').value};}
  function saveDraft() {
    const draft = currentDraft();
    document.querySelector('#letter-count').textContent = `${draft.message.length} / 1200`;
    try { localStorage.setItem(draftKey,JSON.stringify(draft)); storageAvailable = true; document.querySelector('#draft-status').textContent = '已保存到当前浏览器'; }
    catch { storageAvailable = false; document.querySelector('#draft-status').textContent = '浏览器存储不可用，草稿仅在本页保留'; }
  }
  function openDialog(markup) {document.querySelector('#dialog-body').innerHTML = markup; dialog.showModal();}
  document.addEventListener('click', event => {
    if (event.target.closest('.skip')) {event.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({block:'start'});return;}
    const target = event.target.closest('button');
    if (!target) return;
    if (target.matches('.menu-toggle')) {const expanded = target.getAttribute('aria-expanded') === 'true'; target.setAttribute('aria-expanded',String(!expanded)); document.querySelector('#navigation').classList.toggle('is-open',!expanded);}
    if (target.hasAttribute('data-category')) {state.category = target.dataset.category; document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('selected',b===target);b.setAttribute('aria-pressed',String(b===target));}); updateResults(routeName());}
    if (target.hasAttribute('data-view')) {state.view = target.dataset.view; document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===target))); updateResults(routeName());}
    if (target.hasAttribute('data-reset')) {state.category = '全部';state.query = '';main.innerHTML = collection(routeName());updateResults(routeName());document.querySelector('#collection-search').focus();}
    if (target.matches('.clear-draft')) {document.querySelector('#letter-form').reset();try {localStorage.removeItem(draftKey);} catch {storageAvailable=false;}document.querySelector('#letter-count').textContent = '0 / 1200';document.querySelector('#draft-status').textContent = storageAvailable ? '本地草稿已清空' : '页面已清空；无法访问浏览器存储';}
    if (target.hasAttribute('data-entry')) {
      const item = data[target.dataset.kind]?.[Number(target.dataset.entry)];
      if (!item) return;
      const media = target.dataset.kind === 'gallery' && safeUrl(item.src) ? `<img class="dialog-art" src="${escape(safeUrl(item.src))}" alt="${escape(item.alt || item.title)}">` : target.dataset.kind === 'music' && safeUrl(item.audio) ? `<audio controls preload="none" src="${escape(safeUrl(item.audio))}">浏览器不支持音频播放。</audio>` : '';
      openDialog(`<p class="eyebrow">${escape(item.category || routes[target.dataset.kind][0])}</p><h2 id="dialog-title">${escape(item.title)}</h2><p class="entry-meta">${escape(item.author || item.artist || '')} ${escape(item.date || '')}</p>${media}<p class="long-text">${escape(item.body || item.description || '')}</p>`);
    }
    if (target.matches('.dialog-close')) dialog.close();
  });
  document.addEventListener('input', event => {if (event.target.id === 'collection-search') {state.query = event.target.value;updateResults(routeName());} if (event.target.closest('#letter-form')) saveDraft();});
  document.addEventListener('change', event => {if (event.target.id === 'sort-order') {state.order = event.target.value;updateResults(routeName());} if (event.target.id === 'letter-topic') saveDraft();});
  document.addEventListener('submit', event => {
    if (event.target.id !== 'letter-form') return;
    event.preventDefault(); const draft = currentDraft();
    if (!draft.message.trim()) {document.querySelector('#letter-message').setCustomValidity('请写下一点内容再预览。');document.querySelector('#letter-message').reportValidity();document.querySelector('#letter-message').setCustomValidity('');return;}
    saveDraft();openDialog(`<p class="eyebrow">LOCAL LETTER PREVIEW</p><h2 id="dialog-title">来信预览</h2><p class="preview-note">此内容仅供本地预览，尚未发送或公开。</p><p class="entry-meta">${escape(draft.name.trim() || '未署名')} · ${escape(draft.topic)}</p><p class="long-text">${escape(draft.message)}</p>`);
  });
  dialog.addEventListener('close',()=>{dialog.querySelectorAll('audio').forEach(a=>a.pause());});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  window.addEventListener('hashchange',render);
  document.querySelector('#year').textContent = new Date().getFullYear();
  render();
})();
