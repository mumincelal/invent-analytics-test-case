import { Router } from 'express';
import {
  borrowBook,
  createUser,
  getUser,
  getUsers,
  returnBook
} from '@/controllers/user.controller';
import { withErrorHandling } from '@/utils/error.util';
import { validateBody } from '@/middlewares/validation.middleware';
import { createUserDtoSchema } from '@/dtos/user.dto';
import { returnBookDtoSchema } from '@/dtos/borrow-history.dto';

const router: Router = Router();

router.post(
  '/',
  validateBody(createUserDtoSchema),
  withErrorHandling(createUser)
);
router.get('/', withErrorHandling(getUsers));
router.get('/:id', withErrorHandling(getUser));
router.post('/:id/borrow/:bookId', withErrorHandling(borrowBook));
router.post(
  '/:id/return/:bookId',
  validateBody(returnBookDtoSchema),
  withErrorHandling(returnBook)
);

export default router;
