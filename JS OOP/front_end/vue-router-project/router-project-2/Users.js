import CryptoJS from 'crypto-js';

export class Users {
    constructor() {
        console.log("Users has been instantiated.")
        this.populate_user_list();
        this.new_user_name = "";
        this.new_user_password = "";
        this.new_user = {};
        this.logged_in = false;
        this.current_user = "";
        this.user_to_delete = "";
    }
    set_user(encrypted_password) {
        if (this.user_list.includes(this.new_user_name)) {
            alert("Username already exists, try again.")
            this.new_user_name = "";
            this.new_user_password = "";
        } else {
            this.new_user.name = this.new_user_name;
            this.new_user_name = "";
            this.new_user.password = encrypted_password;
            this.new_user_password = "";
            console.log(this.new_user)
            const userAsJson = JSON.stringify(this.new_user);
            let cookieName = this.new_user.name;
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (10000 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + expiryDate.toUTCString();
            document.cookie = cookieName + "=" + userAsJson + ";" + expires + ";path=/";
            console.log(document.cookie);
            // reset user dict
            this.new_user = {}
            this.populate_user_list();
            return document.cookie;
        }
    }
    get_user(user_name, user_password) {
        let key = "123456";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        // this.cookie_array = cookieArray;
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let split_cookie_array = cookie.split("=");
            if (split_cookie_array.indexOf(user_name) == 0) {
                console.log("found correct cookie")
                let userAsJson = cookie.substring(user_name.length + 1, cookie.length);
                let user = JSON.parse(userAsJson);
                const decrypted_password = CryptoJS.AES.decrypt(user.password, key).toString(CryptoJS.enc.Utf8)
                if (user_password != decrypted_password) {
                    this.logged_in = false;
                    this.current_user = "";
                    return {};
                } else {
                    this.logged_in = true;
                    this.current_user = user.name;
                    return user;
                }
            }
            // what if there is no cookies to use?
        }
    }

    delete_user() {
        console.log("inside delete_user method");
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        console.log(cookieArray)
        // this.cookie_array = cookieArray;
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let split_cookie_array = cookie.split("=");
            if (split_cookie_array.indexOf(this.user_to_delete) == 0) {
                console.log("found user to delete in cookies")
                document.cookie = this.user_to_delete + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            // what if there is no cookies to use?

        }
        this.populate_user_list();
    }

    // is there a benefit to a user list?
    populate_user_list() {
        this.user_list = [];
        console.log("inside populate_user_list method");
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        console.log(cookieArray)
        // this.cookie_array = cookieArray;
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let split_cookie_array = cookie.split("=");
            console.log(split_cookie_array)
            console.log(this.user_list)
            if (split_cookie_array[0] != "logged_in" && split_cookie_array[0] != "observations") {
                this.user_list.push(split_cookie_array[0])
            } else {
                this.logged_in = true;
            }
            console.log(this.user_list)
            // what if there is no cookies to use?

        }
    }
}