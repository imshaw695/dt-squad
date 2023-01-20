import { reactive } from 'vue'

export default class Messages {
  constructor(message_array) {
    this.message_array = message_array;
    this.displayed_message = "";
  };

  add_message(message) {
    this.message_array.push(message)
  };

  delete_message() {
    this.message_array.splice(0, 1);
  };

  // when I try to run display messages from here, it throws up an error and message_array is undefined
  // display_messages() {
  //   console.log("inside displayed_messages function");
  //   console.log(this.message_array)
  //   if (this.message_array.length > 0) {
  //     this.displayed_message = this.message_array[0];
  //     this.delete_message();
  //   } else {
  //     this.displayed_message = "";
  //   }

  //   setTimeout(this.display_messages, 5000);
  // };
}