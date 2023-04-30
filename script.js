const messageContent = $('.msg-content')
const messageInput = $('.msg-input')
const messageSubmit = $('.msg-submit')
const avatarImage = 'logo.jpg'
const fakeMessages = [
  `Hi there,I'm a fake chatbot and you?`,
  `Nice to meet you`,
  `How are you`,
  `Not too bad, thanks`,
  `That's awesome`,
  `Youtube is a nice place to learn new things`,
  `I think you're a nice person`,
  `Why do you think that`,
  `Can you explain`,
  `Anyway I've gotta go now`,
  `It was a pleasure chatting with you`,
  `Time to learn new things`,
  `Bye`,
]

let minutes = 0

//  Initialize scrollbar and display fake message on window load

$(window).on('load', function () {
  setTimeout(fakeMessage, 100)
})

// Update scrollbar to bottom and add timestamp

function updateScrollbar() {
  messageContent.stop().animate({
    scrollTop: messageContent.prop('scrollHeight'),
  })
}

function addTimestamp() {
  const date = new Date()
  const minutesNow = String(date.getMinutes()).padStart(2, '0')
  minutes = minutesNow
  const timestamp = $('<div class="timestamp"><div>').text(
    `${date.getHours()}:${minutes}`
  )
  $('.msg:last').append(timestamp)
}

function addMessageToPage(msg, isPersonal = false) {
  const message = $('<div class="msg"></div>').text(msg)
  if (isPersonal) {
    message.addClass('msg-personal')
  } else {
    const figure = $('<figure class="avatar"></figure>')
    const image = $('<img>').attr('src', avatarImage)
    figure.append(image)
    message.addClass('new').prepend(figure)
  }
  messageContent.append(message)
  addTimestamp()
  updateScrollbar()
}

// Function to insert user message and trigger fake message after 1 second
function insertMessage() {
  const messageText = messageInput.val().trim()
  if (messageText == '') {
    return false
  }
  addMessageToPage(messageText, true)
  messageInput.val(null)
  setTimeout(fakeMessage, 1000 + Math.random() * 20 * 100)
}

// Message input and submit button event listener
messageInput.on('keydown', function (e) {
  // if user presses enter send message
  if (e.which === 13) {
    insertMessage()
    return false
  }
})

messageSubmit.on('click', () => {
  insertMessage()
})

// function to dislplay loading message and replace with fake message after 1-2 seconds

function fakeMessage() {
  if (messageInput.val() !== '') {
    return false
  }
  const loadingMessage = $('<div class="msg loading-msg new"></div>')
  const figure = $('<figure class="avatar"></figure')
  const image = $('<img>').attr('src', avatarImage)
  figure.append(image)
  loadingMessage
    .prepend(figure)
    .append($('<span></span> <span></span> <span></span>'))
  messageContent.append(loadingMessage)
  updateScrollbar()
  setTimeout(function () {
    loadingMessage.remove()
    addMessageToPage(fakeMessages.shift())
  }, 1000 + Math.random() * 20 * 100)
}
