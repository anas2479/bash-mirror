/**
 * The command-line constructor.
 */
module.exports = class CommandLine{
    /**
     * The command-line's sign.
     * For html elements, use Template Literals.
     * @param {string} sign 
     */
    constructor(sign){

        // The command-line element
        this.element = document.createElement('div')
        this.element.setAttribute('class','command-input-container')

        // The sign element
        this.signElement = document.createElement('span')
        this.signElement.setAttribute('class', 'command-line-sign')
        this.signElement.innerHTML = `${sign}`


        this.element.appendChild(this.signElement)


        this.input = document.createElement('input')
        this.input.setAttribute('autofocus', true)


        this.element.appendChild(this.input)
    }
}