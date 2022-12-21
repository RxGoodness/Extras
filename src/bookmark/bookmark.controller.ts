import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    @Get()
    getBookmarks(){}

    @Post()
    createBookmark(){}

    @Get()
    getBookmarkById(){}

    @Patch()
    editBookmarkById(){}

    @Delete()
    deleteBookmarkById(){}

}
