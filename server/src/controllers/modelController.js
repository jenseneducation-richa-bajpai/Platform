import Joi from 'joi';
import {
  modelUploadService,
  assignModelerService,
  getModelersService,
  getModelsService,
} from '../services/modelService';

const orderIdParser = Joi.object({
  orderid: Joi.number()
    .integer()
    .min(0)
    .required(),
});

const modelAssignmentParser = Joi.object({
  modelid: Joi.number()
    .integer()
    .min(0)
    .required(),

  modelerid: Joi.number()
    .integer()
    .min(0)
    .required(),
});

export async function uploadmodel(req, res) {
  try {
    return modelUploadService(req.body).then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}

export async function assignmodeler(req, res) {
  try {
    const { error, value } = modelAssignmentParser.validate(req.body);
    if (typeof error !== 'undefined' && error !== null) {
      res.send(error);
    }
    return assignModelerService(value).then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}

export async function getmodelers(req, res) {
  try {
    return getModelersService().then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}

export async function getmodels(req, res) {
  try {
    const { error, value } = orderIdParser.validate(req.body);
    if (typeof error !== 'undefined' && error !== null) {
      return res.send(error);
    }
    return getModelsService(value).then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}