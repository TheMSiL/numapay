document.querySelectorAll(".line-path").forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});

document.querySelectorAll(".faq_item").forEach((item) => {
  const showFaq = item.querySelector(".show_faq");
  const hideFaq = item.querySelector(".hide_faq");

  showFaq.innerHTML = `
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="28.5" fill="#F2F2F2" stroke="#0A0A0A"/>
      <path d="M25.6 41.08V31.36H16V25.72H25.6V16H31.48V25.72H41.08V31.36H31.48V41.08H25.6Z" fill="#191A23"/>
    </svg>
  `;

  hideFaq.innerHTML = `
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="28.5" fill="#F8F8F8" stroke="#0A0A0A"/>
      <path d="M20 31.64V26H37.76V31.64H20Z" fill="#0A0A0A"/>
    </svg>
  `;

  item.addEventListener("click", () => {
    document.querySelectorAll(".faq_item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");

        const otherShowFaq = otherItem.querySelector(".show_faq");
        const otherHideFaq = otherItem.querySelector(".hide_faq");
        const otherHiddenContent = otherItem.querySelector(".faq_item-hidden");

        otherShowFaq.classList.remove("hidden");
        otherHideFaq.classList.add("hidden");
        otherHiddenContent.classList.add("opacity-0");
        otherHiddenContent.classList.remove("opacity-100");
      }
    });

    item.classList.toggle("active");

    const hiddenContent = item.querySelector(".faq_item-hidden");

    if (item.classList.contains("active")) {
      showFaq.classList.add("hidden");
      hideFaq.classList.remove("hidden");
      hiddenContent.classList.remove("opacity-0");
      hiddenContent.classList.add("opacity-100");
    } else {
      showFaq.classList.remove("hidden");
      hideFaq.classList.add("hidden");
      hiddenContent.classList.add("opacity-0");
      hiddenContent.classList.remove("opacity-100");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const circles = [
    document.querySelector(".line-1 circle"),
    document.querySelector(".line-2 circle"),
    document.querySelector(".line-3 circle"),
  ];

  circles.forEach((circle, index) => {
    const length = circle.getTotalLength();

    gsap.set(circle, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(circle, {
      strokeDashoffset: -length,
      duration: 10,
      ease: "linear",
      repeat: -1,
      delay: index * 3,
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input, textarea");
  const submitBtn = form.querySelector("button");

  const validators = {
    name: (value) => {
      if (!value.trim()) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      return "";
    },
    email: (value) => {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email format";
      return "";
    },
    messenger: (value) => {
      if (!value.trim()) return "Messenger is required";
      return "";
    },
    message: (value) => {
      if (value.length > 0 && value.length < 10)
        return "Message must be at least 10 characters";
      return "";
    },
  };

  const validateField = (field) => {
    const errorSpan = field.parentElement.querySelector(".error_message");
    const error = validators[field.name](field.value);

    if (error) {
      field.classList.add("error_input");
      errorSpan.textContent = error;
      errorSpan.classList.remove("hidden");
    } else {
      field.classList.remove("error_input");
      errorSpan.textContent = "";
      errorSpan.classList.add("hidden");
    }

    return !error;
  };

  const checkFormValidity = () => {
    const isValid = Array.from(inputs).every((input) => {
      if (input.required) {
        return validators[input.name](input.value) === "";
      }
      return true;
    });
    submitBtn.disabled = !isValid;
  };

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
      checkFormValidity();
    });

    input.addEventListener("blur", () => {
      validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = Array.from(inputs).every((input) => validateField(input));
  });
});

const burger = document.getElementById("burger");
const overlay = document.getElementById("overlay");
const showBurger = document.getElementById("show_burger");
const closeBurger = document.getElementById("close_burger");

burger.addEventListener("click", () => {
  if (showBurger.classList.contains("block")) {
    overlay.classList.add("top-[80px]");
    overlay.classList.remove("top-[-105%]");
    showBurger.classList.toggle("hidden");
    showBurger.classList.toggle("block");
    closeBurger.classList.toggle("hidden");
    closeBurger.classList.toggle("block");
    document.body.classList.add("overflow-hidden");
  } else {
    overlay.classList.remove("top-[80px]");
    overlay.classList.add("top-[-105%]");
    showBurger.classList.toggle("hidden");
    showBurger.classList.toggle("block");
    closeBurger.classList.toggle("hidden");
    closeBurger.classList.toggle("block");
    document.body.classList.remove("overflow-hidden");
  }
});

document.querySelectorAll("#overlay .header_link a").forEach((link) => {
  link.addEventListener("click", () => {
    overlay.classList.remove("top-[80px]");
    overlay.classList.add("top-[-105%]");
    showBurger.classList.toggle("hidden");
    showBurger.classList.toggle("block");
    closeBurger.classList.toggle("hidden");
    closeBurger.classList.toggle("block");
    document.body.classList.remove("overflow-hidden");
  });
});

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setVh();
window.addEventListener("resize", setVh);
