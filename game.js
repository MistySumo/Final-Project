const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const textNodes = [
  {
      id: 1,
      text:'Dazed and hungry you wake up in a cold and rutheless Forest.',
      options: [
          {
              text: 'You see  sword and take it',
              setState: { bSword: true },
              nextText: 2
          },
          {
              text: 'You see a staff and take it',
              setState: { bStaff: true },
              nextText: 2
          },
          {
              text: 'You see a comically large knife and take it',
              setState: { bKnife: true },
              nextText: 2
          }
        ]
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
                  }
              ]
          }, {
              id: 3,
              text: 'Upon Entering the Cave.',
              options: [
                {
                  text: 'You call out to the voice',
                  nextText: 4
                },
                {
                  text: 'You move closer to the voice',
                  nextText: 5
                },
                {
                  text: 'You blow up the cave with your staff',
                  nextText: 6
                }
              ]
            },
            {
              id: 6,
              text: 'Instead of helping, you decided to blow up the cave killing the person inside.',
              options: [
                {
                  text: 'Restart',
                  nextText: -1
                }
              ]
            },
            {
              id: 4,
              text: 'A women seeking help is spotted, you come to her aid and she leads to civilzation',
              options: [
                {
                  text: 'Congratualtions. You live to tell another Tale',
                  nextText: -1
                },
              ]
            },
            {
              id: 5,
              text: 'A women seeking help is spotted, you come to her aid and she leads to civilzation',
              options: [
                {
                  text: 'Congratualtions. You live to tell another Tale',
                  nextText: -1
                },
              ]
            }  
]

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

startGame()