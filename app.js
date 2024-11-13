 // Animate .line h1 elements
gsap.from(".line h1", {
  y: 150,
  stagger: 0.2,
  duration: 0.6,
  delay: 0.5,
});

// Increment the h5 value
let h5timer = document.querySelector("#line1-part1 h5");
let grow = 0;
let h5Interval = setInterval(() => {
  if (grow <= 100) {
    h5timer.innerHTML = grow++;
  } else {
    clearInterval(h5Interval); // Clear interval to stop incrementing
  }
}, 35);

// Create a timeline for other animations
let tl = gsap.timeline();

// Animate #line1-part1 and .line h2
tl.from("#line1-part1, .line h2", { opacity: 0 })
  .to("#loader", { opacity: 0, duration: 0.2, delay: 4 })
  .from("#page1", {
    y: 1600,
    opacity: 0,
    duration: 0.5,
    ease: "power4.out",
  }, "-=0.3") // Adjust start time
  .to("#loader", { display: "none" });

// Animate .hero h1 and .hero h2 with staggered effect
tl.from(".hero h1", {
  y: 120,
  stagger: 0.2
}).from(".hero h2", {
  y: 120,
  stagger: 0.2
});

// Cursor animation (customize as needed)
document.addEventListener("mousemove", (dets) => {
  gsap.to("#crsr", {
    left: dets.x,
    top: dets.y,
  });
});

// Video container mouse interactions
let videoContainer = document.querySelector("#video-container");
let video = document.querySelector("#video-container video");
videoContainer.addEventListener("mousemove", (dets) => {
  gsap.to("#video-cursor", {
    left: dets.x - 530,
    top: dets.y - 300,
  });
});
videoContainer.addEventListener("mouseenter", () => {
  gsap.to(".mousefollower", { opacity: 0 });
});
videoContainer.addEventListener("mouseleave", () => {
  gsap.to(".mousefollower", { opacity: 1 });
  gsap.to("#video-cursor", { left: "70%", top: "-15%" });
});

let flag = 0;
videoContainer.addEventListener("click", () => {
  if (flag === 0) {
    video.play();
    video.style.opacity = 1;
    document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`;
    gsap.to("#video-cursor", { scale: 0.5 });
    flag = 1;
  } else {
    video.pause();
    video.style.opacity = 0;
    document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`;
    gsap.to("#video-cursor", { scale: 1 });
    flag = 0;
  }
});

// Shery image effect animation
function sheryAnimation() {
  if (typeof Shery !== 'undefined' && Shery.imageEffect) { // Check if Shery is loaded
    Shery.imageEffect(".image-div", {
      style: 5,
      gooey: true,
      config: {
        "a": { "value": 2, "range": [0, 30] },
        "b": { "value": 0.75, "range": [-1, 1] },
        "zindex": { "value": -9996999, "range": [-9999999, 9999999] },
        "aspect": { "value": 0.7241195453907675 },
        "gooey": { "value": true },
      },
    });
  }
}

// Locomotive Scroll animation
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  if (typeof LocomotiveScroll !== 'undefined') { // Check if LocomotiveScroll is loaded
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
}

// Initialize animations
locomotiveAnimation();
sheryAnimation();
Shery.makeMagnet("#nav1 h4", {}); // Check if Shery library is loaded
// Locomotive Scroll and ScrollTrigger setup
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Ensure Locomotive Scroll library is loaded
  if (typeof LocomotiveScroll !== 'undefined') {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"), // Ensure this matches your scroll container in HTML
      smooth: true,
      // Other settings as needed
    });

    // Update ScrollTrigger on every Locomotive Scroll update
    locoScroll.on("scroll", ScrollTrigger.update);

    // Proxy Locomotive Scroll for ScrollTrigger
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });

    // Refresh ScrollTrigger and Locomotive Scroll when the window updates
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh(); // Ensures ScrollTrigger syncs with Locomotive Scroll
  } else {
    console.error("LocomotiveScroll library not loaded.");
  }
}

// Call the function to initialize Locomotive Scroll and ScrollTrigger
locomotiveAnimation();
function flagAnimation() {

  document.addEventListener("mousemove", function (dets) {
    gsap.to("#flag", {
      x: dets.x,
      y: dets.y
    })
  })
  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1
    })
  })
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0
    })
  })

}
flagAnimation();
function footerAnimation() {
  // Select the elements and check if they exist
  const footerH1 = document.querySelector("#footer-text h1");
  const footerText = document.querySelector("#footer-text");

  // Ensure elements are found before proceeding
  if (!footerH1 || !footerText) {
    console.error("Required elements (#footer-text h1 or #footer-text) not found.");
    return;
  }

  // Wrap each character in h1 with a span for animation
  let clutter = "";
  footerH1.textContent.split("").forEach((elem) => {
    clutter += `<span>${elem}</span>`;
  });
  footerH1.innerHTML = clutter;

  // Add event listeners for hover effects
  footerText.addEventListener("mouseenter", function () {
    gsap.to("#footer-text h1 span", {
      opacity: 0,
      stagger: 0.05,
    });
  });

  footerText.addEventListener("mouseleave", function () {
    gsap.to("#footer-text h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,
    });
  });
}

// Call the function to activate the animation
footerAnimation();


  
  
  
  
  
  
  
  
  
  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
 
 
