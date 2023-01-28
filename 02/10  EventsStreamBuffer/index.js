// local module
const other = require('./other');

const events = require('events');
const eventEmitter = new events.EventEmitter();

// Creating a event handler
 
const chitKarDibo = () => {
      console.log("Oi beta koi tui? ami darai achi")
}

// assign the handler in to event
eventEmitter.on("scream", chitKarDibo).chitKarDibo

// firing the event
eventEmitter.emit("scream")