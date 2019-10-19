const Event = require("../Model/Event.js").Model;

//TODO: Ask about how to pass in an object into any CRUD in DAO
// 2. Implement Mongoose (schema migrations, api, model strictness)
// 3. Get rid of nulls in callbacks
// 4. Clean up a lot of the code
// 5. Possible memoization of db connection
// 6. Return error codes instead of throw exception
exports.createEvent = (
    name_,
    location_,
    major_of_interest_,
    description_,
    date_,
    club_
) => {
    const newEvent = new Event({
        name: name_,
        location: location_,
        major_of_interest: major_of_interest_,
        description: description_,
        date: date_,
        club: club_
    });
    newEvent.save((error, document) => {
        if (error)
            throw error;
        else
            console.log("Successfully added event " + name_);
    });
};
exports.getAllEvents = callback => {
    if (!callback)
        throw new Error("Must have callback function");
    Event.find({}, (error, events) => {
        if (error)
            throw error;
        callback(events);
    })
};
exports.getEventByName = (name_, callback) => {
    if (!callback)
        throw new Error("Must have callback function");
    Event.findOne({ name: name_ }, (error, event) => {
        if (error)
            throw error;
        if (event) {
            console.log(`Successfully retreived ${name_} from events' database`);
            callback(event);
        } else {
            console.log(`Failed to retreive ${name_} from events' database`);
            callback(null);
        }
    });
}
//TODO: implement all events by club
//TODO: last n, use parameter findById
exports.updateEvent = (name_, updatedInfo) => {
    Event.findOneAndUpdate(
        { name: name_ },
        updatedInfo,
        { upsert: true },
        (error, document) => {
            if (error)
                throw error;
            console.log(`Successfully updated ${name_} info`);
        }
    );
};
exports.deleteEvent = name_ => {
    Event.remove({ name: name_ }, (error) => {
        if (error)
            console.log(`Failed to remove ${name_} from events' database`);
    })
};