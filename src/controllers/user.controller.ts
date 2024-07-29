import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status';
import userService from '@/services/user.service';
import bookService from '@/services/book.service';

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;

  await userService.createUser({ name });

  res.status(HTTP_STATUS.CREATED).send();
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await userService.getUsers();

  res.status(HTTP_STATUS.OK).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await userService.getUser(id);

  if (!user) {
    throw new Error('User not found');
  }

  res.status(HTTP_STATUS.OK).json(user);
};

export const borrowBook = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const bookId = Number(req.params.bookId);

  const user = await userService.getUser(userId);

  const book = await bookService.getBook(bookId);

  await userService.borrowBook(user.id, book.id);

  res.status(HTTP_STATUS.NO_CONTENT).send();
};

export const returnBook = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const bookId = Number(req.params.bookId);

  const user = await userService.getUser(userId);

  const book = await bookService.getBook(bookId);

  await userService.returnBook(user.id, book.id, req.body.score);

  res.status(HTTP_STATUS.NO_CONTENT).send();
};
