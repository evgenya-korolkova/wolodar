// хранить стили блока навигации
let headerNavStyle

const headerMenuItemText = document.querySelectorAll('.header__menu__item__text')
const headerMenuItems = document.querySelectorAll('.header__menu__item')
const headerSubmenuList = document.querySelectorAll('.header__submenu')
const headerNav = document.querySelector('.header__nav')
const header = document.querySelector('.header__nav')
const headerIcons = document.querySelector('.header__icons')
const headerIconsSearch = document.querySelector('.header__icons__search')

const burgerBtn = document.querySelector('.burger-btn')
const overlay = document.querySelector("#overlay");


headerMenuItemText.forEach((item) => {
    item.addEventListener('click', handleHeaderMenuItemTextClick)
})

headerMenuItems.forEach((item) => {
    item.addEventListener('mouseover', handleHeaderMenuItemMouseOver)
    item.addEventListener('mouseout', handleHeaderMenuItemMouseOut)
})

window.addEventListener('resize', handleWindowResize)

burgerBtn.addEventListener('click', handleBurgerBtnClick)

// Клик по пункту меню
function handleHeaderMenuItemTextClick(e) {

    // открывать по клику только для маленьких экранов ( < 1024px)
    if (document.body.clientWidth < 1024) {
        const menuItemText = e.currentTarget
        const subMenu = menuItemText.parentNode.querySelector('.header__submenu')
    
        if (subMenu) {
            subMenu.classList.toggle('header__submenu_hidden')
        }
    }
}

// Наведение курсора мыши на пунк меню
function handleHeaderMenuItemMouseOver(e) {

    // открывать по ховеру только для больших экранов ( >= 1024px)
    if (document.body.clientWidth >= 1024) {

        const menuItem = e.currentTarget
        const subMenu = menuItem.querySelector('.header__submenu')

        if (subMenu) {
            const navHeight = getComputedStyle(headerNav).height

            // запомнить стили блока навигации
            headerNavStyle = headerNav.style
            // изменить высоту блока навигации
            headerNav.style.height = parseInt(navHeight) + parseInt(getComputedStyle(subMenu).height) + 'px'
            // // установить top у submenu
            // subMenu.style.top = navHeight
        }
    }
}

// Увод курсора мыши с пункта меню
function handleHeaderMenuItemMouseOut(e) {

    // открывать по ховеру только для больших экранов ( >= 1024px)
    if (document.body.clientWidth >= 1024) {
    
        const menuItem = e.currentTarget
        const subMenu = menuItem.querySelector('.header__submenu')

        if (subMenu) {
            // восстановить стили блока навигации
            headerNav.style = headerNavStyle
        }
    }
}

// Изменение размера окна
function handleWindowResize() {

    if (document.body.clientWidth >= 1024) {
        headerSubmenuList.forEach((item) => {
            item.classList.add('header__submenu_hidden')
        })
    }

    document.body.classList.remove('none-scroll');
    burgerBtn.classList.remove('burger-btn_active')
    headerNav.classList.remove('header__nav_active')
    headerIcons.classList.remove('header__icons_active')
    headerIconsSearch.classList.remove('header__icons__search_active')
    overlay.classList.remove('active')
}

// Клик по кнопке меню-бургер
function handleBurgerBtnClick() {
    document.body.classList.toggle('none-scroll');
    burgerBtn.classList.toggle('burger-btn_active')
    headerNav.classList.toggle('header__nav_active')
    headerIcons.classList.toggle('header__icons_active')
    headerIconsSearch.classList.toggle('header__icons__search_active')
    overlay.classList.toggle('active')

    // определить left у header__icons
    const headerIconsWidth = getComputedStyle(headerIcons).width
    const headerNavBeforeWidth = getComputedStyle(headerNav,':before').width
    headerIcons.style.left = (parseInt(headerNavBeforeWidth) - parseInt(headerIconsWidth)) + 'px'
}
