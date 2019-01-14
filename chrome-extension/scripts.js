window.onload = () => {
  console.log("The Ironhack script is ready!");

  // This code listen for click events on cards (with "ctrl"/"cmd"/"shift" pressed) and open the first attachement in a new tab
  document.querySelectorAll('.list-card').forEach($listCard => {
    $listCard.addEventListener('click', (event) => {
      // If the user clicked with "ctrl", "cmd" or "shift"
      if (event.crlKey || event.metaKey || event.shiftKey) {
        event.preventDefault()
        let id = $listCard.getAttribute('href').split('/')[2]
        fetch(`https://trello.com/1/cards/${id}?attachments=true`)
          .then(response => response.json())
          .then(myJson => {
            if (myJson.attachments.length > 0) {
              let url = myJson.attachments[0].url
              window.open(url)
            }
          });
      }
    })
  })

  let boardName = document.querySelector('.board-header-btn-name .board-header-btn-text').innerText
  let bootcampStartingDate = new Date(boardName.substr(-10))
  if (bootcampStartingDate.getTime()) {

    let $titles = document.querySelectorAll('.list-header-name-assist.js-list-name-assist')
    
    for (let i = 0; i < $titles.length; i++) {
      let title = $titles[i].innerText
      let matches = title.match(/[0-9]/g)
      if (matches && matches.length === 2) {
        let weeks = matches[0]
        let days = matches[1]
        let titleDate = addDays(bootcampStartingDate, days-1, weeks-1)

        // If we've found the right title
        if (titleDate.toDateString() === (new Date()).toDateString()){
          let $list = $titles[i].parentElement.parentElement
          $list.style.backgroundColor = "#61a2d3"

          let centerXList = ($list.getBoundingClientRect().left + $list.getBoundingClientRect().right) / 2
          document.getElementById('board').scrollBy(centerXList-window.innerWidth/2, 0)
        }
      }
    }
  }

  function addDays(date, days=0, weeks=0) {
    var result = new Date(date);
    result.setDate(result.getDate() + days + 7*weeks);
    return result;
  }
}
