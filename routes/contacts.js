var express = require('express');
var router = express.Router();
const Boom = require('boom');

const contactService = require('../services/contact-service');


/* list all contacts */
router.get('/', async(req, res) => {
  const contacts = await contactService.retrieve();
  res.json(contacts);

});


/* Get a contact by id*/ 
router.get('/:id', async(req, res, next) => {
  const {id} = req.params;
  try {
    const contact = await contactService.retrieve(id);
    res.json(contact);
  } catch(err){
    next(Boom.notFound(`No such a contact with id: ${id}`));
  }
});

/*Add a new contact*/
router.post('/', async(req, res, next) => {
  try {
    const contact = await contactService.create(req.body);
  res.json(contact);
  } catch(err){
    if(err.name === 'ValidationError'){
      next(Boom.badImplementation(err));
    }
  }
});
/* Update a contact */
router.put('/:id', async(req, res, next) => {
  const {id} = req.params;
  try{
    const updated = await contactService.update(id, req.body);
  res.json(updated);
  } catch(err){
    if(err.name === 'ValidationError'){
      next(Boom.badRequest(err));
    } else {
      next(Boom.notFound(`No such a contact with id: ${id}`));
    }
  }
});
/* delete a contact */
router.delete('/:id', async(req, res, next) => {
  const {id} = req.params;
  try{
    const deleted = await contactService.delete(id);
  res.json(deleted);
  } catch (err){
    next(Boom.notFound(`No such a contact with id: ${id}`));
  }  
});

module.exports = router;
