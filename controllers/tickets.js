const { SchemaType } = require('mongoose');
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

	
module.exports = {
  new: newTicket,
  create, 
};
	
function newTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    // flight.ticket.push(req.body.ticketId);
    // flight.save(function(err) {
      res.render('/tickets/new', {title: 'Add Tickets', flight });
    });
  };


function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        req.body.flight = flight._id;
        Ticket.create(req.body, function(err, ticket) {
            Ticket.find({ flight: flight._id}, function (err, tickets) {
                flight.save(function (err) {
                    res.redirect(`/flights/${flight._id}`);
                });
            });
        });
    });
}

