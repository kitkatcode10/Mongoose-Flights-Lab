const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight' });
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) return res.render('/flights/new');
        console.log(flight);
        res.redirect(`/flights/${flight._id}`);
    });
}

function index(req, res) {
    Flight.find({}, function (err, flights) {
        if (err) {
            return console.log(err);
        }
    res.render('flights/index', { title: 'List of All Flights', flight });
});

}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id}, function(err, tickets) {
            flight.save(function(err) {
                res.render('flights/show', {title: 'Flight Details', flight, tickets });
            });
        });
    })
}



module.exports = {
    new: newFlight,
    create,
    show, 
    index
}
