import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status';
import bookService from '@/services/book.service';

export const createBook = async (req: Request, res: Response) => {
  const { name } = req.body;

  await bookService.createBook({ name });

  res.status(HTTP_STATUS.CREATED).send();
};

export const getBooks = async (_: Request, res: Response) => {
  const books = await bookService.getBooks();

  res.status(HTTP_STATUS.OK).json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const book = await bookService.getBook(id);

  if (!book) {
    throw new Error('Book not found');
  }

  res.status(HTTP_STATUS.OK).json(book);
};
