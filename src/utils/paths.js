const paths = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    CONTACT_US: 'contactus',
    DETAIL_PRODUCT_CATEGORY_PID_TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'resetpassword/:token',
    BLOG_DETAIL: 'blogs/:bid',
    // admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGER_USER: 'manager-user',
    MANAGER_PRODUCT: 'manager-product',
    MANAGER_ORDER: 'manager-order',
    CREATE_PRODUCT: 'create-product',
    CREATE_BLOG: 'create-blog',
    BLOG_DASHBOARD: 'manager-blogs',
    // member
    MEMBER: 'member',
    PERSONAL: 'personal',
    CART: 'cart',
    SHOPPING_HISTORY: 'shoppinghistory',
    WISHLIST: 'wishlist',
    ORDER: 'order',

    ALL: '*'
}

export default paths