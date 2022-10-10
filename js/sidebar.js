
let profileImages = [
  'img/profile-pictures/avatar-2092113_640.png',
  'img/profile-pictures/geek-avatar-1632962.jpg',
  'img/profile-pictures/lady-avatar-1632967.jpg',
  'img/profile-pictures/user-310807_640.png'
]







async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]')
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // includes the file name

    try {
      let resp = await fetch(file);
      element.innerHTML = await resp.text();
    } catch (e) {
      element.innerHTML = "Page not found.";
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

function showUserImage() {
  let content = document.getElementById('profile-img');
  

  
}