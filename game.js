const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
  
    textNode.options.forEach(option => {
      if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
      }
    })
  }

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNode = [
    {
        id: 1,
        text:'Dazed and hungry you wake up in a cold and rutheless Forest.',
        options: [
            {
                text: 'You see a sword and take it',
                setState: {bSword: true},
                nextText: 2
            },
            {
                text: 'You see a staff and take it',
                setState: {bStaff: true},
                nextText: 2
            },
            {
                text: 'You see a comically large knife and take it',
                setState: {bKnife: true},
                nextText: 2
            },
            {
                id: 2,
                text: 'After gathering your barings you hear a scream coming from a distant cave',
                options: [
                    {
                        text: 'You move with the sword to the cave to check it out',
                        requiredState: (currentState) => currentState.bSword,
                        setState: {bSword: true},
                        nextText: 3
                    },
                    {
                        text: 'You keep your distance with the staff and check it out',
                        requiredState: (currentState) => currentState.bStaff,
                        setState: {bStaff: true},
                        nextText:3
                    },
                    {
                        text: 'Second guess yourself with the comically large sword',
                        requiredState: (currentState) => currentState.bKnife,
                        setState: {bKnife: true},
                        nextText:3
                    },
                ]
            }
        ]
    }
]

startGame();