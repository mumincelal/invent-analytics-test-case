import { createBook, getBook, getBooks } from '@/controllers/book.controller';
import { createBookDtoSchema } from '@/dtos/book.dto';
import { validateBody } from '@/middlewares/validation.middleware';
import { withErrorHandling } from '@/utils/error.util';
import { Router } from 'express';

const router: Router = Router();

router.post(
  '/',
  validateBody(createBookDtoSchema),
  withErrorHandling(createBook)
);
router.get('/', withErrorHandling(getBooks));
router.get('/:id', withErrorHandling(getBook));

export default router;
