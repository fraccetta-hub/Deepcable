document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length) {
    let idx = 0;
    setInterval(function () {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 4500);
  }

  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  document.querySelectorAll('.expand-button').forEach(function (button) {
    button.addEventListener('click', function () {
      const description = this.previousElementSibling;
      description.classList.toggle('expanded');
      this.textContent = description.classList.contains('expanded') ? '−' : '+';
    });
  });
});

function toggleTable() {
  const section = document.getElementById('tableSection');
  const btn = document.querySelector('.table-toggle-btn');
  const nowHidden = section.classList.toggle('table-hidden');
  btn.textContent = nowHidden ? '+' : '−';
  if (!nowHidden) initYearFilter();
}

function initYearFilter() {
  const container = document.getElementById('yearFilter');
  if (!container || container.dataset.ready) return;
  container.dataset.ready = '1';

  const rows = Array.from(document.querySelectorAll('#projectsTable tbody tr'));
  const years = [...new Set(
    rows.map(r => (r.cells[2]?.textContent.match(/\d{4}/) || [])[0]).filter(Boolean)
  )].sort();

  function setFilter(year) {
    rows.forEach(r => {
      const d = r.cells[2]?.textContent || '';
      r.style.display = (!year || d.includes(year)) ? '' : 'none';
    });
    container.querySelectorAll('.year-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.year === (year || ''));
    });
  }

  const allBtn = document.createElement('button');
  allBtn.className = 'year-btn active';
  allBtn.textContent = 'All';
  allBtn.dataset.year = '';
  allBtn.onclick = () => setFilter('');
  container.appendChild(allBtn);

  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'year-btn';
    btn.textContent = y;
    btn.dataset.year = y;
    btn.onclick = () => setFilter(y);
    container.appendChild(btn);
  });
}
