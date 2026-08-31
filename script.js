(() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggle = qs('.nav-toggle');
  const nav = qs('#site-nav');
  const closeNav = (returnFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeNav(); });
  addEventListener('resize', () => { if (innerWidth > 760) closeNav(); }, { passive: true });

  const worldData = {
    italy: { cuisine: 'Italian', region: 'Italian cuisine · Naples influence', dish: 'Ember Margherita', story: 'The comfort of a neighbourhood pizzeria, carried by smoke, bright tomato, and torn basil.', highlights: 'Ember Margherita · Burrata & citrus · Olive-oil cake', ingredients: 'Fire-roasted tomato, fior di latte, basil, olive oil', diet: 'Vegetarian', spice: 'None', pairing: 'Italian Aperol Spritz', price: '$24', image: 'assets/images/latitude-pizza.jpg', alt: 'Margherita pizza with basil and a blistered crust' },
    japan: { cuisine: 'Japanese', region: 'Japanese cuisine', dish: 'Miso-Glazed Salmon', story: 'A quiet balance of savoury miso, caramelized edges, garden greens, and fragrant rice.', highlights: 'Miso-Glazed Salmon · Sesame Tuna Crudo · Yuzu Highball', ingredients: 'Atlantic salmon, white miso, ginger, broccolini, sesame rice', diet: 'Gluten-conscious preparation available', spice: 'None', pairing: 'Japanese Yuzu Highball', price: '$32', image: 'assets/images/latitude-salmon.jpg', alt: 'Plated salmon with broccoli and potatoes' },
    mexico: { cuisine: 'Mexican', region: 'Mexican cuisine', dish: 'Birria-Style Tacos', story: 'Slow braising, dried chile, and fresh herbs gather in a plate made to be shared with both hands.', highlights: 'Birria-Style Tacos · Charred corn esquites · Latitude Margarita', ingredients: 'Braised beef, dried chile, corn tortillas, onion, cilantro', diet: 'Gluten-conscious', spice: 'Medium', pairing: 'Latitude Margarita', price: '$18', image: 'assets/images/latitude-tacos.jpg', alt: 'Colourful tacos with fresh toppings' },
    indian: { cuisine: 'Indian', region: 'Indian cuisine · North Indian influence', dish: 'Latitude Butter Chicken', story: 'Live fire and a gently spiced tomato sauce shape a generous dish intended for the centre of the table.', highlights: 'Latitude Butter Chicken · Ember Paneer · Mango Cardamom Cooler', ingredients: 'Chicken, tomato, cultured butter, fenugreek, basmati', diet: 'Gluten-conscious', spice: 'Mild', pairing: 'Mango Cardamom Cooler', price: '$29', image: 'assets/images/latitude-indian.jpg', alt: 'Butter chicken with fresh cucumber, onion, and lime' },
    korean: { cuisine: 'Korean', region: 'Korean cuisine', dish: 'Gochujang Garden Bowl', story: 'A colourful rice bowl connects fresh vegetables, sesame, fermentation, and a warm gochujang finish.', highlights: 'Gochujang Garden Bowl · Gochujang Cauliflower · Pear ginger soda', ingredients: 'Rice, seasonal vegetables, mushrooms, sesame, gochujang', diet: 'Vegetarian', spice: 'Medium', pairing: 'Pear and ginger soda', price: '$22', image: 'assets/images/latitude-korean.jpg', alt: 'Korean bibimbap with vegetables and traditional side dishes' },
    caribbean: { cuisine: 'Caribbean', region: 'Caribbean cuisine', dish: 'Jerk-Spiced Chicken', story: 'Allspice, thyme, chile, and smoke meet coconut rice and sweet plantain in a bright shared plate.', highlights: 'Jerk-Spiced Chicken · Coconut rice · Caribbean Rum Punch', ingredients: 'Chicken, allspice, thyme, chile, rice and peas, plantain', diet: 'Gluten-conscious', spice: 'Hot', pairing: 'Caribbean Rum Punch', price: '$31', image: 'assets/images/latitude-caribbean.jpg', alt: 'Caribbean jerk chicken with rice and beans and fried plantain' },
    mediterranean: { cuisine: 'Mediterranean', region: 'Mediterranean cuisine', dish: 'Latitude Mezze', story: 'A generous centre-of-table spread that moves between creamy, smoky, bright, and herbaceous.', highlights: 'Latitude Mezze · Charred market fish · Mediterranean Gin & Tonic', ingredients: 'Hummus, muhammara, smoky eggplant, olives, warm flatbread', diet: 'Plant-based', spice: 'Mild', pairing: 'Mediterranean Gin & Tonic', price: '$22', image: 'assets/images/latitude-mezze.jpg', alt: 'Mediterranean meze dips and warm bread arranged for sharing' },
    middleEastern: { cuisine: 'Middle Eastern', region: 'Middle Eastern cuisine · Levantine influence', dish: 'Falafel & Tahini', story: 'Crisp chickpea fritters, silken hummus, herbs, and warm bread make an easy, abundant sharing plate.', highlights: 'Falafel & Tahini · Roasted eggplant · Mint lemon tonic', ingredients: 'Chickpeas, tahini, parsley, mint, sumac, flatbread', diet: 'Plant-based', spice: 'Mild', pairing: 'Mint and preserved-lemon tonic', price: '$20', image: 'assets/images/latitude-middle-eastern.jpg', alt: 'Falafel and hummus with fresh herbs and vegetables' },
    thai: { cuisine: 'Thai', region: 'Thai cuisine', dish: 'Tamarind Prawn Noodles', story: 'Rice noodles carry tamarind brightness, toasted peanut, herbs, and wok-charred prawns.', highlights: 'Tamarind Prawn Noodles · Green curry vegetables · Lemongrass cooler', ingredients: 'Rice noodles, prawns, tamarind, peanut, bean sprouts, lime', diet: 'Gluten-conscious preparation available', spice: 'Medium', pairing: 'Lemongrass lime cooler', price: '$27', image: 'assets/images/latitude-thai.jpg', alt: 'Thai rice noodles with prawns, bean sprouts, peanuts, and lime' },
    chinese: { cuisine: 'Chinese', region: 'Chinese cuisine · Fujian influence', dish: 'Hand-Folded Dumplings', story: 'Delicate wrappers hold a savoury filling, served simply with black vinegar, chile, and scallion.', highlights: 'Hand-Folded Dumplings · Tea-smoked mushrooms · Jasmine tea', ingredients: 'Wheat wrappers, pork and chive, black vinegar, scallion', diet: 'Vegetarian filling available', spice: 'Optional chile', pairing: 'Cold-brewed jasmine tea', price: '$16', image: 'assets/images/latitude-chinese.jpg', alt: 'Chinese dumplings arranged on a decorative plate' },
    france: { cuisine: 'French', region: 'French cuisine', dish: 'Burnt Vanilla Crème Brûlée', story: 'The small theatre of a caramel shell giving way to cool vanilla custard and bright citrus.', highlights: 'Burnt Vanilla Crème Brûlée · Market fish meunière · French 75', ingredients: 'Vanilla custard, caramelized sugar, seasonal citrus', diet: 'Vegetarian · Gluten-conscious', spice: 'None', pairing: 'Espresso or late-harvest riesling', price: '$13', image: 'assets/images/latitude-creme-brulee.jpg', alt: 'Crème brûlée with a crisp caramelized top' },
    northAmerican: { cuisine: 'Contemporary North American', region: 'Contemporary North American cuisine', dish: 'Maple-Smoked Short Rib', story: 'Low, slow smoke meets Ontario maple, black pepper, and market roots in a polished comfort-food plate.', highlights: 'Maple-Smoked Short Rib · Market vegetable · Ontario wine', ingredients: 'Beef short rib, maple, black pepper, seasonal roots', diet: 'Gluten-conscious', spice: 'Mild', pairing: 'Ontario pinot noir or smoked cherry tea', price: '$38', image: 'assets/images/latitude-north-american.jpg', alt: 'Gourmet barbecue ribs with herbs on a white plate' }
  };
  const worldTabs = qsa('.world-tab');
  let activeWorld = 'italy';
  const worldFields = { region: qs('#world-region'), dish: qs('#world-dish'), story: qs('#world-story'), highlights: qs('#world-highlights'), ingredients: qs('#world-ingredients'), diet: qs('#world-diet'), spice: qs('#world-spice'), pairing: qs('#world-pairing'), price: qs('#world-price') };
  const selectWorld = tab => {
    const item = worldData[tab.dataset.world];
    if (!item) return;
    activeWorld = tab.dataset.world;
    worldTabs.forEach(button => {
      const selected = button === tab;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    Object.entries(worldFields).forEach(([key, node]) => { node.textContent = item[key]; });
    const image = qs('#world-image');
    image.src = item.image;
    image.alt = item.alt;
    qs('#world-menu-link').href = '#menu';
    qs('#world-panel').setAttribute('aria-labelledby', tab.id);
    if (innerWidth <= 760) tab.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  };
  worldTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectWorld(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % worldTabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + worldTabs.length) % worldTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = worldTabs.length - 1;
      selectWorld(worldTabs[next]);
      worldTabs[next].focus();
    });
  });
  const moveWorld = direction => {
    const current = worldTabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    const nextIndex = (current + direction + worldTabs.length) % worldTabs.length;
    selectWorld(worldTabs[nextIndex]);
    worldTabs[nextIndex].focus();
  };
  qs('[data-world-prev]')?.addEventListener('click', () => moveWorld(-1));
  qs('[data-world-next]')?.addEventListener('click', () => moveWorld(1));

  const sectionButtons = qsa('[data-menu-section]');
  const dishes = qsa('.dish');
  const diet = qs('#diet-filter');
  const search = qs('#menu-search');
  const menuStatus = qs('#menu-status');
  const empty = qs('#menu-empty');
  const cuisineMap = {
    italy: ['dish-ember-margherita', 'dish-aperol-spritz'],
    japan: ['dish-sesame-crudo', 'dish-miso-salmon', 'dish-yuzu-highball'],
    mexico: ['dish-birria-tacos', 'dish-margarita'],
    indian: ['dish-paneer', 'dish-chicken', 'dish-mango-cooler'],
    korean: ['dish-gochujang-cauliflower'],
    caribbean: ['dish-jerk-chicken', 'dish-rum-punch'],
    mediterranean: ['dish-mezze', 'dish-gin-tonic'],
    middleEastern: ['dish-falafel'],
    thai: ['dish-thai-noodles'],
    chinese: ['dish-dumplings'],
    france: ['dish-creme-brulee'],
    northAmerican: ['dish-short-rib', 'dish-cellar']
  };
  let section = 'all', menuCuisine = 'all';
  const filterMenu = () => {
    const dietary = diet.value;
    const query = search.value.trim().toLowerCase();
    let count = 0;
    dishes.forEach(dish => {
      const matchesCuisine = menuCuisine === 'all' || cuisineMap[menuCuisine]?.includes(dish.id);
      const matches = matchesCuisine && (section === 'all' || dish.dataset.section === section) && (dietary === 'all' || dish.dataset.diet.includes(dietary)) && (!query || dish.dataset.search.includes(query));
      dish.hidden = !matches;
      if (matches) count += 1;
    });
    empty.hidden = count !== 0;
    qs('[data-drinks-visual]').hidden = section !== 'drinks' || dietary !== 'all' || Boolean(query) || menuCuisine !== 'all';
    menuStatus.textContent = `${count} ${count === 1 ? 'dish' : 'dishes'} shown.`;
  };
  const resetMenu = () => {
    section = 'all'; menuCuisine = 'all'; diet.value = 'all'; search.value = '';
    qs('#active-cuisine').hidden = true;
    sectionButtons.forEach((button, index) => { button.classList.toggle('is-active', index === 0); button.setAttribute('aria-pressed', String(index === 0)); });
    filterMenu();
  };
  sectionButtons.forEach(button => button.addEventListener('click', () => {
    section = button.dataset.menuSection;
    sectionButtons.forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    filterMenu();
  }));
  diet?.addEventListener('change', filterMenu);
  search?.addEventListener('input', filterMenu);
  qs('#menu-reset')?.addEventListener('click', resetMenu);
  qsa('[data-reset-menu]').forEach(button => button.addEventListener('click', resetMenu));
  qsa('[data-clear-cuisine]').forEach(button => button.addEventListener('click', () => { menuCuisine = 'all'; qs('#active-cuisine').hidden = true; filterMenu(); }));
  qsa('[data-open-drinks]').forEach(button => button.addEventListener('click', () => {
    section = 'drinks'; menuCuisine = 'all'; diet.value = 'all'; search.value = '';
    qs('#active-cuisine').hidden = true;
    sectionButtons.forEach(item => { const active = item.dataset.menuSection === 'drinks'; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    filterMenu();
  }));
  qs('#world-menu-link')?.addEventListener('click', () => {
    menuCuisine = activeWorld; section = 'all'; diet.value = 'all'; search.value = '';
    sectionButtons.forEach((button, index) => { button.classList.toggle('is-active', index === 0); button.setAttribute('aria-pressed', String(index === 0)); });
    qs('#active-cuisine-name').textContent = worldData[activeWorld].cuisine;
    qs('#active-cuisine').hidden = false;
    filterMenu();
  });
  filterMenu();

  const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let dialogTrigger = null;
  const trapFocus = (dialog, event) => {
    if (event.key !== 'Tab') return;
    const focusable = qsa(focusableSelector, dialog);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  const closeDialog = dialog => {
    if (!dialog?.open) return;
    dialog.close(); document.body.classList.remove('modal-open'); dialogTrigger?.focus();
  };
  const dishDialog = qs('#dish-dialog');
  qsa('[data-dish]').forEach(button => button.addEventListener('click', () => {
    const dish = button.closest('.dish');
    dialogTrigger = button;
    qs('#dish-dialog-region').textContent = qs('div>p:first-child', dish).textContent;
    qs('#dish-dialog-title').textContent = qs('h3', dish).textContent;
    qs('#dish-dialog-description').textContent = qs('div>p:nth-of-type(2)', dish).textContent;
    qs('#dish-dialog-ingredients').textContent = dish.dataset.ingredients;
    qs('#dish-dialog-diet').textContent = qs('div>span', dish).textContent;
    qs('#dish-dialog-spice').textContent = dish.dataset.spice;
    qs('#dish-dialog-pairing').textContent = dish.dataset.pairing;
    qs('#dish-dialog-price').textContent = qs(':scope>strong', dish).textContent;
    dishDialog.showModal(); document.body.classList.add('modal-open'); qs('[data-close-dish]', dishDialog).focus();
  }));
  qsa('[data-close-dish]').forEach(button => button.addEventListener('click', () => closeDialog(dishDialog)));
  dishDialog?.addEventListener('click', event => { if (event.target === dishDialog) closeDialog(dishDialog); });
  dishDialog?.addEventListener('keydown', event => trapFocus(dishDialog, event));

  const noticeDialog = qs('#notice-dialog');
  const openNotice = (title, message, trigger) => {
    dialogTrigger = trigger; qs('#notice-title').textContent = title; qs('#notice-message').textContent = message;
    noticeDialog.showModal(); document.body.classList.add('modal-open'); qs('[data-close-notice]', noticeDialog).focus();
  };
  qsa('[data-order]').forEach(button => button.addEventListener('click', () => openNotice('Ordering integration', 'This demonstration can connect to the restaurant’s existing online-ordering or POS provider.', button)));
  qsa('[data-demo-action]').forEach(button => button.addEventListener('click', () => {
    const directions = button.dataset.demoAction === 'directions';
    openNotice(directions ? 'Directions demonstration' : 'Calling demonstration', directions ? 'A real restaurant website would open its verified map listing here. This demo does not link to a real address.' : 'A real restaurant website would call its verified business number here. This demo does not call any number.', button);
  }));
  qsa('[data-close-notice]').forEach(button => button.addEventListener('click', () => closeDialog(noticeDialog)));
  noticeDialog?.addEventListener('click', event => { if (event.target === noticeDialog) closeDialog(noticeDialog); });
  noticeDialog?.addEventListener('keydown', event => trapFocus(noticeDialog, event));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeNav(true); closeDialog(dishDialog); closeDialog(noticeDialog); } });

  const form = qs('#reservation-form');
  const formSteps = qsa('[data-form-step]');
  const indicators = qsa('[data-step-indicator]');
  const back = qs('[data-form-back]');
  const next = qs('[data-form-next]');
  const submit = qs('[data-form-submit]');
  const formStatus = qs('#reservation-status');
  let currentStep = 1, submitting = false;
  const removeError = field => {
    const id = `${field.id}-error`; qs(`#${id}`)?.remove(); field.removeAttribute('aria-invalid');
    const refs = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(ref => ref && ref !== id);
    refs.length ? field.setAttribute('aria-describedby', refs.join(' ')) : field.removeAttribute('aria-describedby');
  };
  const showError = field => {
    removeError(field); const error = document.createElement('p'); error.id = `${field.id}-error`; error.className = 'field-error';
    error.textContent = field.validity.typeMismatch ? 'Enter a valid email address.' : 'Please complete this field.';
    field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', error.id); field.insertAdjacentElement('afterend', error);
  };
  const stepFields = step => qsa('input, select, textarea', qs(`[data-form-step="${step}"]`));
  const validateStep = step => {
    const invalid = stepFields(step).filter(field => !field.checkValidity());
    stepFields(step).forEach(removeError); invalid.forEach(showError);
    if (invalid.length) { formStatus.textContent = 'Please complete the highlighted fields. Nothing has been sent or stored.'; formStatus.className = 'form-status error'; invalid[0].focus(); return false; }
    formStatus.textContent = ''; formStatus.className = 'form-status'; return true;
  };
  const showStep = step => {
    currentStep = step;
    formSteps.forEach(item => { item.hidden = Number(item.dataset.formStep) !== step; });
    indicators.forEach(item => { const number = Number(item.dataset.stepIndicator); const active = number === step; item.classList.toggle('is-current', active); item.classList.toggle('is-complete', number < step); active ? item.setAttribute('aria-current', 'step') : item.removeAttribute('aria-current'); });
    back.hidden = step === 1; next.hidden = step === 4; submit.hidden = step !== 4;
    if (step === 4) qs('#review-summary').textContent = `${qs('#party').value} on ${qs('#date').value} at ${qs('#time').value}, requested by ${qs('#full-name').value}. Occasion: ${qs('#occasion').value}. Seating: ${qs('#seating').value}.`;
    qs('legend', formSteps[step - 1]).focus?.();
  };
  if (form) {
    formSteps.forEach(step => step.hidden = true); showStep(1);
    qsa('input,select,textarea', form).forEach(field => field.addEventListener(field.matches('select') ? 'change' : 'input', () => { if (field.checkValidity()) removeError(field); }));
    next.addEventListener('click', () => { if (validateStep(currentStep)) showStep(currentStep + 1); });
    back.addEventListener('click', () => showStep(currentStep - 1));
    form.addEventListener('submit', event => {
      event.preventDefault(); if (submitting || !validateStep(3)) return; submitting = true; submit.disabled = true; submit.textContent = 'Preparing demo…';
      setTimeout(() => { form.reset(); qsa('input,select,textarea', form).forEach(removeError); showStep(1); formStatus.textContent = 'Demonstration complete. No information was sent or stored, and no reservation was created. A real restaurant would review the request and respond before it became confirmed.'; formStatus.className = 'form-status success'; submit.disabled = false; submit.textContent = 'Complete demo request'; submitting = false; formStatus.focus(); }, 450);
    });
  }
  const date = qs('#date'); if (date) { const now = new Date(); date.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]; }

  const updateTime = () => {
    const now = new Date(); const hour = now.getHours();
    qs('#local-time').textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    qs('#service-label').textContent = hour < 16 ? 'Preparing for evening service' : hour < 22 ? 'Evening service period' : 'After tonight’s service';
  };
  updateTime();
  if (!reduceMotion && !navigator.connection?.saveData) setInterval(updateTime, 60000);

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    qsa('.reveal').forEach(item => observer.observe(item));
  } else qsa('.reveal').forEach(item => item.classList.add('is-visible'));
  if (!reduceMotion && !navigator.connection?.saveData && matchMedia('(min-width: 900px)').matches) addEventListener('scroll', () => { qs('.hero-image')?.style.setProperty('--parallax', `${Math.min(scrollY * .08, 70)}px`); }, { passive: true });
})();
