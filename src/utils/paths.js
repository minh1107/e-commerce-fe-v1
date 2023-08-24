const paths = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT_CATEGORY_PID_TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'resetpassword/:token',

    // admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGER_USER: 'manager-user',
    MANAGER_PRODUCT: 'manager-product',
    MANAGER_ORDER: 'manager-order',
    CREATE_PRODUCT: 'create-product',
    // member
    MEMBER: 'member',
    PERSONAL: 'personal',

    ALL: '*'
}

export default paths