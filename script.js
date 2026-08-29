document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const livePlayer = document.getElementById('livePlayer');
  const liveError = document.getElementById('liveError');
  const liveStreamUrl = 'https://ats-edge-iqui-1.live.clarovtrcdn.vtrplay.com/telecanalsdchi/vxfmt=dp/playlist.m3u8?device_profile=STB_HLS_VCAS_LIVE_HD';

  if (livePlayer) {
    const showError = () => {
      if (liveError) liveError.style.display = 'block';
      livePlayer.style.display = 'none';
    };

    const loadNativeHls = () => {
      livePlayer.src = liveStreamUrl;
      livePlayer.load();
    };

    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        liveBackBufferLength: 90,
        liveSyncDurationCount: 3,
      });
      hls.loadSource(liveStreamUrl);
      hls.attachMedia(livePlayer);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          showError();
        }
      });
    } else if (livePlayer.canPlayType('application/vnd.apple.mpegurl')) {
      loadNativeHls();
    } else {
      showError();
    }

    livePlayer.addEventListener('error', () => {
      showError();
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const programCards = document.querySelectorAll('[data-category]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      programCards.forEach((card) => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.style.display = visible ? '' : 'none';
      });
    });
  });

  const searchField = document.querySelector('#site-search');
  if (searchField) {
    searchField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const target = searchField.value.trim();
        if (target) {
          window.location.href = 'programas.html';
        }
      }
    });
  }
});
