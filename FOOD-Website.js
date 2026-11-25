// Accessibility + touch fallback: toggle .open on the wrapper when button clicked
(function(){
  const wrapper = document.getElementById('moreDropdown');
  const toggle = document.getElementById('dropToggle');

  if (!wrapper || !toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const open = wrapper.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      wrapper.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.focus();
    }
  });
})();

function Add(done) {
  alert('🎉 Selected The Item');
}



document.addEventListener('DOMContentLoaded', () => {
  const amountDisplay = document.getElementById('Amount');
  const totalDisplay = document.getElementById('Total');
  const itemSelect = document.getElementById('all');
  const itemButtons = document.querySelectorAll('.select-items-btn');

  const parsePrice = (text) => {
    if (!text) return 0;
    const clean = text.replace(/[^\d.]/g, '');
    return parseFloat(clean) || 0;
  };

  itemButtons.forEach((button) => {
    const price = parsePrice(button.textContent);
    button.dataset.price = price;

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!price) {
        return;
      }
      amountDisplay.textContent = `₹${price}`;
      totalDisplay.textContent = '';
      itemButtons.forEach((btn) => btn.classList.remove('selected-price'));
      button.classList.add('selected-price');
      alert("Item Selected")
    });
  });

  window.showAmount = function () {
    const selected = document.querySelector('.select-items-btn.selected-price');
    if (selected) {
      const selectedPrice = parsePrice(selected.textContent);
      amountDisplay.textContent = `₹${selectedPrice}`;
      return;
    }
    amountDisplay.textContent = '₹99';
  };

  window.showItems = function () {
    const selectedValue = itemSelect?.value;
    const itemLabel = document.getElementById('itm');
    if (!itemLabel) return;
    itemLabel.textContent = selectedValue ? `${selectedValue} item${selectedValue === '1' ? '' : 's'}` : '';
  };

  window.showTotal = function () {
    const itemCount = parseInt(itemSelect?.value, 10);
    const amountValue = parsePrice(amountDisplay.textContent);

    if (!amountValue) {
      totalDisplay.textContent = 'Please click a price button first.';
      return;
    }

    if (!itemCount || Number.isNaN(itemCount)) {
      totalDisplay.textContent = 'Please select items.';
      return;
    }

    const totalValue = amountValue * itemCount;
    totalDisplay.textContent = `₹${totalValue}`;
  };
});
 



// Slider Button
;(function() {
  const slideTrack = document.getElementById('slideTrack');
  if (!slideTrack) return;

  const item = slideTrack.querySelector('.Foods');
  const slideGap = 24;
  const slideWidth = item ? Math.round(item.getBoundingClientRect().width + slideGap) : 304;

  window.nextSlides = function () {
    slideTrack.scrollBy({ left: slideWidth, behavior: 'smooth' });
  };

  window.prevSlides = function () {
    slideTrack.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  };
})();