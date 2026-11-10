/**
 * FocusShield v5.0 — Kỷ Nguyên Tập Trung Tuyệt Đối
 * Tác giả: Đậu Phi Kiên
 * Tinh giản: Tập trung Khóa máy và Trợ lý AI thông minh
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MÔ PHỎNG CHẾ ĐỘ KHÓA MÁY (DEEP FOCUS LOCK)
  // ==========================================================================
  const btnLockToggle = document.getElementById('btnLockToggle');
  const mockupTimer = document.getElementById('mockupTimer');
  const timerBox = document.getElementById('timerBox');
  const mockupStatusText = document.getElementById('mockupStatusText');

  let isLocked = false;
  let remainingSeconds = 45 * 60;
  let timerInterval = null;

  function updateTimerText() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    if (mockupTimer) {
      mockupTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  if (btnLockToggle) {
    btnLockToggle.addEventListener('click', () => {
      isLocked = !isLocked;

      if (isLocked) {
        // Bắt đầu khóa máy
        btnLockToggle.innerHTML = "<span>🔓 Đang Khóa Máy (Bấm để Mở)</span>";
        btnLockToggle.style.background = "#475569";
        if (timerBox) timerBox.style.borderColor = "#ef4444";
        if (mockupStatusText) {
          mockupStatusText.textContent = "ĐANG KHÓA TẬP TRUNG";
          mockupStatusText.style.color = "#ef4444";
        }

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerText();
          } else {
            clearInterval(timerInterval);
            isLocked = false;
            resetLockState();
            alert("Đã hoàn thành phiên tập trung!");
          }
        }, 1000);
      } else {
        // Mở khóa
        clearInterval(timerInterval);
        resetLockState();
      }
    });
  }

  function resetLockState() {
    remainingSeconds = 45 * 60;
    updateTimerText();
    if (btnLockToggle) {
      btnLockToggle.innerHTML = "<span>🔒 Bắt Đầu Khóa Máy</span>";
      btnLockToggle.style.background = "#ef4444";
    }
    if (timerBox) timerBox.style.borderColor = "#10b981";
    if (mockupStatusText) {
      mockupStatusText.textContent = "SẴN SÀNG";
      mockupStatusText.style.color = "#10b981";
    }
  }

  // ==========================================================================
  // 2. MÔ PHỎNG TRỢ LÝ AI (HỎI ĐÁP NGẮN GỌN & THẲNG VÀO TRỌNG TÂM)
  // ==========================================================================
  const aiQuestionInput = document.getElementById('aiQuestionInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiChatBox = document.getElementById('aiChatBox');

  const SAMPLE_AI_ANSWERS = {
    "default": "Để xử lý vấn đề này, bạn chỉ cần áp dụng đúng công thức và đi thẳng vào kết quả: đáp án là chính xác.",
    "toan": "Đáp án: x = 2. Bạn chuyển vế, đổi dấu và rút gọn trực tiếp mẫu số.",
    "ly": "Định luật II Newton: Gia tốc a = F / m. Lực càng lớn thì vật gia tốc càng nhanh.",
    "hoa": "Phương trình phản ứng: 2Al + 6HCl -> 2AlCl3 + 3H2. Kim loại tan và có bọt khí thoát ra.",
    "code": "Trong lập trình, bạn có thể dùng cú pháp ngắn gọn: array.filter(item => item !== null)."
  };

  function sendAiQuestion() {
    const text = aiQuestionInput?.value.trim();
    if (!text) return;

    // Tin nhắn người dùng
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user-msg';
    userDiv.innerHTML = `<div class="msg-sender">Bạn:</div><div class="msg-text">${escapeHtml(text)}</div>`;
    aiChatBox.appendChild(userDiv);
    aiQuestionInput.value = '';
    aiChatBox.scrollTop = aiChatBox.scrollHeight;

    // Trợ lý AI trả lời ngắn gọn
    setTimeout(() => {
      let reply = SAMPLE_AI_ANSWERS["default"];
      const lower = text.toLowerCase();
      if (lower.includes("toán") || lower.includes("tính") || lower.includes("phương trình")) {
        reply = SAMPLE_AI_ANSWERS["toan"];
      } else if (lower.includes("lý") || lower.includes("newton") || lower.includes("vận tốc")) {
        reply = SAMPLE_AI_ANSWERS["ly"];
      } else if (lower.includes("hóa") || lower.includes("axit")) {
        reply = SAMPLE_AI_ANSWERS["hoa"];
      } else if (lower.includes("code") || lower.includes("lập trình")) {
        reply = SAMPLE_AI_ANSWERS["code"];
      }

      const aiDiv = document.createElement('div');
      aiDiv.className = 'chat-msg ai-msg';
      aiDiv.innerHTML = `<div class="msg-sender">Trợ lý AI:</div><div class="msg-text">${reply}</div>`;
      aiChatBox.appendChild(aiDiv);
      aiChatBox.scrollTop = aiChatBox.scrollHeight;
    }, 350);
  }

  if (aiSendBtn) {
    aiSendBtn.addEventListener('click', sendAiQuestion);
  }

  if (aiQuestionInput) {
    aiQuestionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendAiQuestion();
      }
    });
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ==========================================================================
  // 3. HIỆU ỨNG TẢI FILE (TOAST THÔNG BÁO)
  // ==========================================================================
  const mainDownloadBtn = document.getElementById('mainDownloadBtn');
  const toastNotification = document.getElementById('toastNotification');
  let toastTimer = null;

  function showDownloadToast() {
    if (toastNotification) {
      clearTimeout(toastTimer);
      toastNotification.classList.add('show');
      toastTimer = setTimeout(() => {
        toastNotification.classList.remove('show');
      }, 4000);
    }
  }

  if (mainDownloadBtn) {
    mainDownloadBtn.addEventListener('click', showDownloadToast);
  }

  // ==========================================================================
  // 4. NAVBAR SCROLL & AMBIENT CANVAS
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.2
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

});
