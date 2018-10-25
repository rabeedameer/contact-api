var express = require('express');
var router = express.Router();
const Boom = require('boom');
const Address = require('../models/address.js');
const addressService = require('../services/address-service');





/* list all addresses */
router.get('/', async(req, res) => {
  const addresses = await addressService.retrieve();
  res.json(addresses);

});


/* Get a address by id*/ 
router.get('/:id', async(req, res, next) => {
  const {id} = req.params;
  try {
    const address = await addressService.retrieve(id);
    res.json(contact);
  } catch(err){
    next(Boom.notFound(`No such a address with id: ${id}`));
  }
});

/*Add a new address*/
router.post('/', async(req, res, next) => {
  try {
    const address = await addressService.create(req.body);
  res.json(address);
  } catch(err){
    if(err.name === 'ValidationError'){
      next(Boom.badImplementation(err));
    }
  }
});
/* Update a address */
router.put('/:id', async(req, res, next) => {
  const {id} = req.params;
  try{
    const updated = await addressService.update(id, req.body);
  res.json(updated);
  } catch(err){
    if(err.name === 'ValidationError'){
      next(Boom.badRequest(err));
    } else {
      next(Boom.notFound(`No such a address with id: ${id}`));
    }
  }
});
/* delete a address */
router.delete('/:id', async(req, res, next) => {
  const {id} = req.params;
  try{
    const deleted = await addressService.delete(id);
  res.json(deleted);
  } catch (err){
    next(Boom.notFound(`No such a address with id: ${id}`));
  }  
});

module.exports = router;
