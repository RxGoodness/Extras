import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';

import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
// import {  EditBookmarkDto } from './dto/edit-bookmark.dto';
// import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@UseGuards(
  JwtGuard,
)
@Controller(
  'bookmarks',
)
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Get()
  getBookmarks(
    @GetUser(
      'id',
    )
    userId: number,
  ) {}

  @Post()
  createBookmark(
    @GetUser(
      'id',
    )
    userId: number,
    @Body() dto:CreateBookmarkDto
  ) {}

  @Get(':id')
  getBookmarkById(
    @GetUser(
      'id',
    )
    userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {}

  @Patch(':id')
  editBookmarkById(
    @GetUser(
      'id',
    )
    userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto
  ) {
    return this.bookmarkService.editBookmarkById(
        userId,
        bookmarkId,
        dto
    )
  }

  @Delete(':id')
  deleteBookmarkById(
    @GetUser(
      'id',
    )
    userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {}
}
