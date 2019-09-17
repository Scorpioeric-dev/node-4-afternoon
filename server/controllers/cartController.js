const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    //this will return -1 if it isn't in the cart meaning it's not in the cart already
    //also adding the item plus it's price to the swag
    const index = user.cart.findIndex(swag => swag.id === +id);

    if (index === -1) {
      const selectedSwag = swag.find(swag => swag.id === +id);
      //this will add swag to the cart if not already in the cart
      user.cart.push(selectedSwag);
      user.total += selectedSwag.price;
    }
    res.status(200).send(user);
  },
  delete: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    
    // finds specific id or item in array of obj
    const index = user.cart.findIndex(swag => swag.id === +id);
    const selectedSwag = swag.find(swag => swag.id === +id);
    
    //this if statement will remove swag from a cart meaning item will be removed and the price subtracted from cart total 
    if (index !== -1) {
      user.cart.splice(index, 1);
      user.total -= selectedSwag.price;
    }
    res.status(200).send(user);
  },
  //this resets the value cart to empty array and total to 0
  checkout: (req, res) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(user);
  }
};
