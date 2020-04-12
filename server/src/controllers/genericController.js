import Joi from 'joi';
import { commentService, getCommentsService } from '../services/genericService';

const commentIdParser = Joi.object({
  orderid: Joi.number()
    .integer()
    .min(0),

  modelid: Joi.number()
    .integer()
    .min(0),

  productid: Joi.number()
    .integer()
    .min(0),

}).xor('orderid', 'modelid', 'productid');

const commentParser = Joi.object({
  commenttype: Joi.string()
    .valid(['Order', 'Model', 'Product'])
    .required(),

  orderid: Joi.number()
    .integer()
    .min(0),

  modelid: Joi.number()
    .integer()
    .min(0),

  productid: Joi.number()
    .integer()
    .min(0),
  comment: Joi.string()
    .required(),

}).xor('orderid', 'modelid', 'productid');

export async function comment(req, res) {
  try {
    const { error, value } = commentParser.validate(req.body);
    if (typeof error !== 'undefined' && error !== null) {
      return res.send(error);
    }
    return commentService(value, req.session.userid).then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}

export async function getComments(req, res) {
  try {
    const { error, value } = commentIdParser.validate(req.body);
    if (typeof error !== 'undefined' && error !== null) {
      return res.send(error);
    }
    return getCommentsService(value).then((result) => {
      res.send(result);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.send('Failed');
  }
}