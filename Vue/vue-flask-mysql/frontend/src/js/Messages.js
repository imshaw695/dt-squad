export default class Messages {
    constructor(user) {
        this.messageArray = ["test message"];
        this.user = user;
        this.new_message = ""
    };

    add_message() {
        this.messageArray.push(this.new_message)
    };

    display_messages() {
        return this.messageArray;
    }
}