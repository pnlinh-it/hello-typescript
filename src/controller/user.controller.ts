import { Request, Response } from 'express';

export const getAll = (request: Request, response: Response) =>{
  response.send('get-all');
}

export const getDetail = (request: Request, response: Response) =>{
  response.send('get-detail');
}