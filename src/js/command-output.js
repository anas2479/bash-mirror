const { contentWrap } = require("./bashCofig")




/**
 * The output constructor.
 */
module.exports = class OutPut{
    /**
     * For HTML use Template Literals.
     * @param {string} content 
     */
    constructor(content){
        this.element = document.createElement('div')
        this.element.setAttribute('class','command-output-container')

        
        this.element.innerHTML = `${content}`

        contentWrap.appendChild(this.element)
    }
}