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

// function checkUrlShowOnNav() {
//   if (window.location.href.endsWith('/board.html')) {
//     document.getElementById('link-board').classList.add('active')
//   }
//   if (window.location.href.endsWith('/backlog.html')) {
//     document.getElementById('link-backlog').classList.add('active')
//   }
//   // if (window.location.href.endsWith('/addtask.html')) {
//   //   document.getElementById('link-addtask').classList.add('active')
//   // }
//   if (window.location.href.endsWith('/help.html')) {
//     document.getElementById('link-help').classList.add('active')
//   }
//   if (window.location.href.endsWith('/imprint.html')) {
//     document.getElementById('link-imprint').classList.add('active')
//   }
// }
