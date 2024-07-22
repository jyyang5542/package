// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const bsSample = {
    setSwiper() {
      $(document).ready(function () {
        const progressFill = document.querySelector('.progress-fill');
        var swiper = new Swiper('.parallax-slider', {
          speed: 1000,
          parallax: true,
          loop: true,
          autoplay: {
            delay: 10000, // Adjust autoplay delay as needed
            disableOnInteraction: false,
          },
          grabCursor: true,
          effect: 'creative',
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, -1000],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            slideChange: function () {
              // Reset progress bar when slide changes
              progressFill.style.width = '0%';
            },
            autoplayTimeLeft(s, time, progress) {
              // Update progress bar width based on autoplay time left
              progressFill.style.width = (1 - progress) * 100 + '%';
            },
          },
        });
      });
    },

    writeRandomLists() {
      const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi', 'lemon', 'mango', 'nectarine', 'olive', 'peach', 'plum', 'quince'];
      const ulElement = document.querySelector('.loremIpsum');

      function addRandomWordsToList(numberOfWords) {
        for (let i = 0; i < numberOfWords; i++) {
          const randomWord = 'Lorem Ipsum : ' + words[Math.floor(Math.random() * words.length)];
          const liElement = document.createElement('li');
          liElement.textContent = randomWord;
          ulElement.appendChild(liElement);
        }
      }

      addRandomWordsToList(30);
    },

    init() {
      this.setSwiper();
      this.writeRandomLists();
    },
  };

  bsSample.init();
});
