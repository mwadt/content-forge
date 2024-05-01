console.log('script running')

const yesElement = document.querySelector('#imgYes')
const noElement = document.querySelector('#imgNo')



const showLinkbox = () => {
const linkDiv = document.createElement('label')
linkDiv.setAttribute('id', 'link-div')

const linkLabelElement = document.createElement('label')
linkLabelElement.setAttribute('for', 'link')
linkLabelElement.innerHTML = "Link: "
linkDivElement.appendChild(linkLabelElement)

const linkInputElement = document.createElement('input')
linkInputElement.setAttribute('type', 'text')
linkInputElement.setAttribute('name', 'link')
linkDivElement.appendChild(linkInputElement)

const formFieldElement = document.querySelector('#form-field')
formFieldElement.appendChild(linkDivElement)
formFieldElement.sibli(linkDivElement)

const submitElement = document.querySelector('#submit-button')
submitElement.insertAdjacentElement('beforebegin', linkDivElement)
}
const hideLinkBox = () => {
    const linkDivElement = document.querySelector('#link-div')
    linkDivElement.remove()
}

yesElement.addEventListener('click', showLinkbox)

noElement.addEventListener('click', hideLinkBox)