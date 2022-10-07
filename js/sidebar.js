async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]')
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // includes the file name
      
    try{
      let resp = await fetch(file);
      element.innerHTML = await resp.text();
    }catch(e){
      element.innerHTML= "Page not found.";
    }
  
  }
}

function checkUrlShowOnNav() {
  if (window.location.href.endsWith('/board.html')) {
    document.getElementById('link-board').classList.add('active')
  }
  if (window.location.href.endsWith('/backlog.html')) {
    document.getElementById('link-backlog').classList.add('active')
  }
  if (window.location.href.endsWith('/addtask.html')) {
    document.getElementById('link-addtask').classList.add('active')
  }
  if (window.location.href.endsWith('/help.html')) {
    document.getElementById('link-help').classList.add('active')
  }
  if (window.location.href.endsWith('/imprint.html')) {
    document.getElementById('link-imprint').classList.add('active')
  }
}

/**
 * Shows sidebar fullscreen
 */
function sidebarFullscreen() {
  document.getElementById('id-body').classList.add('stop-scrolling');
  document.getElementById('id-sidebarCloseBtn').classList.remove('d-none');
  document.getElementById('id-sidebar').classList.remove('side-bar');
  document.getElementById('id-sidebar').classList.add('sidebarFullscreen');
  document.getElementById('id-linkText').classList.remove('link-text');
  document.getElementById('id-linkText').classList.add('link-textFullscreen');
  document.getElementById('id-links').classList.remove('links');
  document.getElementById('id-links').classList.add('linksFullscreen');
  // document.getElementById('id-profilePicture').classList.add('div-profilePicture');
  // document.getElementById('id-member-img').classList.remove('member-img');
  // document.getElementById('id-member-img').classList.add('member-imgFullscreen');
}

/**
 * Closes sidebar fullscreen
 */
function closeSidebarFullscreen() {
  document.getElementById('id-body').classList.remove('stop-scrolling');
  document.getElementById('id-sidebarCloseBtn').classList.add('d-none');
  document.getElementById('id-sidebar').classList.add('side-bar');
  document.getElementById('id-sidebar').classList.remove('sidebarFullscreen');
  document.getElementById('id-linkText').classList.add('link-text');
  document.getElementById('id-linkText').classList.remove('link-textFullscreen');
  document.getElementById('id-links').classList.add('links');
  document.getElementById('id-links').classList.remove('linksFullscreen');
  document.getElementById('id-profilePicture').classList.remove('div-profilePicture');
  document.getElementById('id-member-img').classList.add('member-img');
  document.getElementById('id-member-img').classList.remove('member-imgFullscreen');
}

/**
 * Shows the arrow which leads to the top if scrolled past certain pixels
 */
/* window.onscroll = showBtn;

function showBtn() {
  if (scrolledPastCertainPixels()) {
    document.getElementById('id-scrollToTop').classList.remove('d-none');
  } else {
    document.getElementById('id-scrollToTop').classList.add('d-none');
  }
} */

/**
* Gave condition meaning for clean coding
* @returns - Whether the certain pixels passed
*/
/* function scrolledPastCertainPixels() {
  return document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
} */

/**
 * Clicked on the arrow image it jumps back to the top 
 */
/* function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
} */