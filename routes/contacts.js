var express = require('express');
const router = express.Router();
const Boom = require('boom');

const Contact = require('../models/contact');
const ContactService = require('../services/contact-service');


const


const service = require('../services/contact-service');

/* GET users listing. */
router.get('/contact', async(req, res) => {
  const contact = await service.retrieve(req.body);
  res.json(contact);

});
router.get('/contact/:id', async(req, res) => {
  const {id} = req.params;
  const contact = await service.retrieve(id);
  res.json(contact);

});
router.post('/contact', async(req, res) => {
  const contact = await service.create(req.body);
  res.json(contact);

});
router.put('/contact/:id', async(req, res) => {
  const {id} = req.params;
  const contact = await service.update(id, req.body);
  res.json(contact);

});
router.delete('/contact/:id', async(req, res) => {
  const {id} = req.params;
  const contact = await service.delete(id);
  res.json(contact);

});

module.exports = router;
