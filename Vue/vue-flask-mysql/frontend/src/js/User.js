export default class User {
    constructor() {
        this.message = 'Hey there from user'
        this.logged_in = false;
        this.email = "";
        this.name = "";
        this.encoded_jwt = "";
        this.check_frequently()
    };

    login(email, password) {
        const payload = {};
        // payload.encoded_jwt = "this.user.encoded_jwt";
        payload.model_name = "User";
        payload.operation = "update";
        payload.email = email;
        payload.password = password;

        const request_options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify(payload),
        };
        const url = "http://127.0.0.1:5000/api_login";
        fetch(url, request_options)
            .then((response) => response.json())
            .then((data) => {
                if (data.rc == 0) {
                    this.encoded_jwt = data.user.encoded_jwt;
                    this.name = data.user.name;
                    this.email = data.user.email;
                    this.logged_in = true;
                    console.log(this.name + this.email);
                } else {
                    this.encoded_jwt = "";
                    this.name = "";
                    this.email = "";
                    this.logged_in = false;
                    // The update was rejected so we need to get a fresh copy of the user data
                    // const retailer_id = user.retailer_id;
                    // this.getUsersAtRetailer(retailer_id);
                    // this.messages.addMessage(data.message);
                }
                this.message = data.message;
                return this.email;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    check_frequently() {
        if (this.logged_in == true) {
            const payload = {};
            payload.encoded_jwt = this.encoded_jwt;

            const request_options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': 'Bearer my-token',
                },
                body: JSON.stringify(payload),
            };
            const url = "http://127.0.0.1:5000/api_get_user";
            fetch(url, request_options)
                .then((response) => response.json())
                .then((data) => {
                    if (data.rc == 0) {
                        this.email = data.user.email;
                        this.logged_in = data.user.logged_in;
                        console.log(data.message);
                        if (!this.logged_in) {
                            console.log("logged out due to timeout, about to refresh");
                            setTimeout(() => {
                                location.replace("/createuser")
                            }, 5000);
                        }
                    } else {
                        this.email = "";
                        this.logged_in = false;
                        console.log("logged out because of API error, about to refresh");
                        setTimeout(() => {
                            location.replace("/createuser")
                        }, 5000);
                    }
                })
                .catch((error) => {
                    this.email = "";
                    this.logged_in = false;
                    console.log(error);
                });
        } else {
            console.log("inside check timeout, not logged in")
        }

        console.log("about to restart check_frequently")
        // setTimeout(this.check_frequently, 3000);
        setTimeout(() => { this.check_frequently() }, 3900);
    };

}

