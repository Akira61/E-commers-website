

export function language(phrase){
    const words = {
        'hello' : 'مرحبا',
        // admin navbar dashboard
        "admin_title" : "Admin",
        "home" : "Home",
        "categories"  : "Categories",
        "items" : "Products",
        "members" : "Staff",
        "comments" : "Comments",
        "logs" : "Logs",
        "Edit Profile" : "Edit Profile",
        "Settings" : "Settings",
        "Logout" : "Logout",
    };
    return words[phrase];
};