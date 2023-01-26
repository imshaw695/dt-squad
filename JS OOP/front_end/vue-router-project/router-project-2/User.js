import CryptoJS from 'crypto-js';

export class User {
    constructor(users) {
        console.log("User has been instantiated.")
        this.users = users;
        this.user_name = "";
        this.user_password = "";
        this.user = {};
    }
    // this method will search the cookies and look for the username, and if it finds the username it will
    // fetch the encrypted password before decrypting it and comparing it to the one entered.
    // If correct, the user will be logged_in and the jwt will be created
    login() {
        const decrypted_test_pass = CryptoJS.AES.decrypt("password", "key", { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8)
        console.log(decrypted_test_pass)
        console.log("inside login method")
        this.user = this.users.get_user(this.user_name, this.user_password);
        this.user_password = "";
        if (this.users.logged_in == true) {
            var now = new Date();
            var minutes = 1;
            // session expires in 1 minutes, change to 20 later
            now.setTime(now.getTime() + (minutes * 60 * 1000));
            let expires = "expires=" + now.toUTCString();
            const cookie_name = "logged_in";
            const userAsJson = JSON.stringify(this.user);
            document.cookie = cookie_name + "=" + userAsJson + ";" + expires + ";path=/";
            alert("Login successful.")
        } else {
            this.users.current_user = "";
            alert("Login failed, please check username and password.")
        }
    };

    logout() {
        console.log("inside logout method")
        if (this.users.logged_in == true) {
            this.user = {};
            this.user_name = ""
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
                if (split_cookie_array.indexOf("logged_in") == 0) {
                    console.log("found logged_in to delete in cookies")
                    document.cookie = "logged_in" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }
                // what if there is no cookies to use?

            }
            this.users.logged_in = false;
            this.users.current_user = "";
            alert("Successfully logged out.")
        } else {
            alert("No user currently logged in.")
        }
    };

    check_logged_in() {
        console.log("checking logged in status")
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        // this.cookie_array = cookieArray;
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            let split_cookie_array = cookie.split("=");
            console.log(split_cookie_array.includes("logged_in"))
            if (split_cookie_array.includes("logged_in")) {
                console.log("still logged in");
                this.users.logged_in = true;
            } else {
                this.user.logged_in = false;
                this.users.current_user = "";
            }
            // setTimeout(this.check_logged_in, 5000);
        }
        if (!this.users.logged_in) {
            console.log("not logged in")
        }
    }
}