document.addEventListener("DOMContentLoaded", () => {
  const wordCards = document.querySelectorAll(".word-card");
  const answerArea = document.getElementById("answer-area");
  const submitBtn = document.getElementById("submit-btn");
  const placeholder = document.querySelector(".answer-placeholder");

  let selectedWords = [];

    wordCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("disabled")) return;

      const word = card.getAttribute("data-word");
      const isMultiLine = card.classList.contains("multi-line");

      // 1. Get initial position
      const startRect = card.getBoundingClientRect();

      // 2. Create phantom/target card in answer area to get final position
      const clone = document.createElement("div");
      clone.className = "word-card";
      if (isMultiLine) {
        clone.className += " multi-line";
        clone.innerHTML = card.innerHTML;
      } else {
        clone.textContent = card.textContent;
      }
      clone.style.visibility = 'hidden'; // Hide initially to calculate position
      answerArea.appendChild(clone);
      
      const endRect = clone.getBoundingClientRect();

      // 3. Create flying card
      const flyingCard = document.createElement("div");
      flyingCard.className = card.className + " flying-card";
      flyingCard.innerHTML = card.innerHTML;
      flyingCard.style.position = 'fixed';
      flyingCard.style.top = `${startRect.top}px`;
      flyingCard.style.left = `${startRect.left}px`;
      flyingCard.style.width = `${startRect.width}px`;
      flyingCard.style.height = `${startRect.height}px`;
      flyingCard.style.margin = '0';
      flyingCard.style.zIndex = '1000';
      flyingCard.style.pointerEvents = 'none';
      flyingCard.style.transition = 'all 0.1s ease-out';
      
      document.body.appendChild(flyingCard);

      // Disable original card
      card.classList.add("disabled");

      // Trigger animation
      requestAnimationFrame(() => {
        flyingCard.style.top = `${endRect.top}px`;
        flyingCard.style.left = `${endRect.left}px`;
        flyingCard.style.width = `${endRect.width}px`;
        flyingCard.style.height = `${endRect.height}px`;
      });

      flyingCard.addEventListener('transitionend', () => {
        flyingCard.remove();
        clone.style.visibility = 'visible';
        clone.style.opacity = '1';
        clone.style.transform = 'translateY(0)';
      }, { once: true });

      clone.addEventListener("click", () => {
        // 1. Get initial position from clone
        const currentRect = clone.getBoundingClientRect();
        
        // 2. Get target position (the original card)
        const targetRect = card.getBoundingClientRect();
        
        // 3. Create flying card
        const flyingBackCard = document.createElement("div");
        flyingBackCard.className = card.className + " flying-card";
        flyingBackCard.innerHTML = card.innerHTML;
        flyingBackCard.style.position = 'fixed';
        flyingBackCard.style.top = `${currentRect.top}px`;
        flyingBackCard.style.left = `${currentRect.left}px`;
        flyingBackCard.style.width = `${currentRect.width}px`;
        flyingBackCard.style.height = `${currentRect.height}px`;
        flyingBackCard.style.margin = '0';
        flyingBackCard.style.zIndex = '1000';
        flyingBackCard.style.pointerEvents = 'none';
        flyingBackCard.style.transition = 'all 0.1s ease-out';
        
        document.body.appendChild(flyingBackCard);
        
        // Remove clone immediately (or hide it)
        clone.style.visibility = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => {
          flyingBackBackCard_style_top = `${targetRect.top}px`;
          flyingBackBackCard_style_left = `${targetRect.left}px`;
          flyingBackBackCard_style_width = `${targetRect.width}px`;
          flyingBackBackCard_style_height = `${targetRect.height}px`;
          
          // Using JS property assignment since template literals in replacement content can be tricky
          flyingBackCard.style.top = flyingBackBackCard_style_top;
          flyingBackCard.style.left = flyingBackBackCard_style_left;
          flyingBackCard.style.width = flyingBackBackCard_style_width;
          flyingBackCard.style.height = flyingBackBackCard_style_height;
        });

        flyingBackCard.addEventListener('transitionend', () => {
          flyingBackCard.remove();
          clone.remove();
          // Re-enable original card
          card.classList.remove("disabled");
          selectedWords = selectedWords.filter((w) => w !== word);
          updateUI();
        }, { once: true });
      });

      selectedWords.push(word);
      updateUI();
    });
  });

  function updateUI() {
    if (selectedWords.length > 0) {
      placeholder.style.display = "none";
      answerArea.classList.add('no-border');
      submitBtn.disabled = false;
      submitBtn.classList.add("active");
    } else {
      placeholder.style.display = "block";
      answerArea.classList.remove('no-border');
      submitBtn.disabled = true;
      submitBtn.classList.remove("active");
    }
  }
});
