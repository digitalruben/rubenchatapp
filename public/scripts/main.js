import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');

    // load the socket library and make a connnection
    const socket = io();

    // messenger service event handling - > incoming from the manager
    function setUserId({sID, message}) {
        // incominng connected event with data
       // debugger;
        vm.socketID = sID; 
    }

    function appendMessage(message) {
        // debuger;
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive!!');
        },

        methods: {
            dispatchMessage() {
                //debuger;
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonimous" });

                this.message = "";
            }

        },    

        components: {
            newmessage: ChatMessage
        }
    }) .$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);
})();