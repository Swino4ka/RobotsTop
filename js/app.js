(function () {
  "use strict";

  function enableBtn() {
    var button = document.getElementById("button1");
    if (button) {
      button.disabled = false;
    }
  }

  window.enableBtn = enableBtn;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img[data-fallback]").forEach(function (image) {
      function useFallback() {
        var fallback = image.getAttribute("data-fallback");
        if (fallback && image.getAttribute("src") !== fallback) {
          image.classList.add("is-fallback");
          image.src = fallback;
        }
      }

      image.addEventListener("error", useFallback);
      if (image.complete && image.naturalWidth === 0) {
        useFallback();
      }
    });

    var submitButton = document.getElementById("button1");
    if (submitButton) {
      submitButton.disabled = true;
      var form = submitButton.form;
      if (form) {
        form.addEventListener("submit", function () {
          if (!submitButton.disabled) {
            submitButton.classList.add("is-loading");
            submitButton.setAttribute("aria-label", "Submitting");
            submitButton.setAttribute("aria-busy", "true");
          }
        });
      }
    }

    var modal = document.getElementById("infoModal");
    if (!(modal instanceof HTMLDialogElement)) {
      return;
    }

    var closeButton = modal.querySelector(".close");
    var infoButton = document.getElementById("infoButton");

    function closeModal() {
      if (modal.open) {
        modal.close();
      }
      if (infoButton) {
        infoButton.setAttribute("aria-expanded", "false");
      }
    }

    if (infoButton) {
      infoButton.addEventListener("click", function () {
        if (!modal.open) {
          modal.showModal();
          infoButton.setAttribute("aria-expanded", "true");
        }
        if (closeButton) {
          closeButton.focus();
        }
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    modal.addEventListener("close", function () {
      if (infoButton) {
        infoButton.focus();
      }
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    modal.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.open) {
        closeModal();
      }
    });
  });
}());
