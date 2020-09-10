/**
 * Checks if an elements contains the css class 'dropDownExpend'
 * @param element - an HTML element
 * @returns {boolean}
 */
let isDropDownExtended = (element) => element.classList.contains('dropDownExpend');
/**
 * Adds the css classes to start the label and icon animations
 * Removes the transitionend event from the background element
 * @param event - The animation event
 * @param element - The drop down element
 * @param icon - The arrow Icon
 * @param bgElement - The drop down elements background
 * @constructor
 */
let BgAnimationHandler = (event, element, icon, bgElement) => {
    element.classList.add('dropDownExpend');
    icon.classList.add('dropDownRotate');
    bgElement.removeEventListener('transitionend', BgAnimationHandler);
};
/**
 * Updates the drop down menu's label according to the user selection
 * @param target - The label element
 */
let updateDropDownLabel = target => {
    let oldLabel = dropDownLabel.innerHTML;
    dropDownLabel.innerHTML = target.text;
    for (elm of dropDown.children) {
        elm.classList.remove('hidden');
        if (elm.innerText === dropDownLabel.innerHTML) elm.classList.add('hidden');
    }
};
/**
 * Add or removes the css animation for the border and dropdown animation effect
 * @param event - The animation effect
 * @param parent - The element's parent
 * @param dropDownElement - The dropdown element
 */
let dropDownAnimationHandler = (event, parent, dropDownElement) => {
    for (elm of parent.children) {
        if (elm.classList.contains('outerBorder')) {
            elm.classList.remove('outerBorderMoveOut');
        }
        if (elm.classList.contains('dropAnimation')) {
            elm.classList.remove('dropDownMoveIn');
        }
    }
    dropDownElement.removeEventListener('transitionend', dropDownAnimationHandler);
};
/**
 * Add or removes 1 when user clicks on the counter +/- elements
 * @param Controls - The counter controls
 * @param target - The counter input element
 */
let counterControlsHandler = (Controls, target) => {
    for (let i = 0; i < 2; i++) {
        Controls[i].addEventListener('click', event => {
            if (Controls[i].classList.contains('addIncrement')) {
                target.value++
            } else {
                if (target.value > 1) target.value--
            }
        })
    }
};
/**
 * Handles a users click on the drop down menu
 * @param parent - The elements parent
 * @param bgElement - Drop down background
 * @param dropDownElement - The element itself
 * @param icon - Arrow icon
 */
let dropDownClickHandler = (parent, bgElement, dropDownElement, icon) => {
    parent.addEventListener('click', event => {
        if (event.target.tagName === 'A') updateDropDownLabel(event.target);
        if (!isDropDownExtended(dropDownElement)) {
            for (elm of parent.children) {
                if (elm.classList.contains('outerBorder')) {
                    elm.classList.add('outerBorderMoveOut');
                }
                if (elm.classList.contains('dropAnimation')) {
                    elm.classList.add('dropDownMoveIn');
                }
            }
            bgElement.addEventListener('transitionend', BgAnimationHandler(event, dropDownElement, icon, bgElement))
        } else {
            dropDownElement.classList.remove('dropDownExpend');
            icon.classList.remove('dropDownRotate');
            dropDownElement.addEventListener('transitionend', dropDownAnimationHandler(event, parent, dropDownElement))
        }
    });
};
/**
 * Handles account menu interactions
 * @param parent - The parent element
 */
let accountMenuClickHandler = (parent) => {
    parent.addEventListener('click', event => {
        if (parent.children[2].classList.contains('fadeIn')) {
            parent.children[2].classList.remove('fadeIn')
        } else {
            parent.children[2].classList.add('fadeIn')
        }
    });
};

/**
 * Runs when dom is ready
 */
document.addEventListener("DOMContentLoaded", () => {
    const dropDownParent    = document.getElementsByClassName('sortList')[0],
          dropDownIcon      = document.getElementsByClassName('dropDownIcon')[0],
          dropDownBg        = document.getElementsByClassName('labelBackground')[0],
          dropDownLabel     = document.getElementsByClassName('sortLabel')[0].getElementsByTagName('h4')[0],
          dropDown          = document.getElementsByClassName('dropDown')[0],
          accountParent     = document.getElementsByClassName('account')[0],
          counterTarget     = document.getElementsByClassName('counter')[0],
          counterControls   = document.getElementsByClassName('increments');

    counterControlsHandler(counterControls, counterTarget);
    dropDownClickHandler(dropDownParent, dropDownBg, dropDown, dropDownIcon);
    accountMenuClickHandler(accountParent);
});