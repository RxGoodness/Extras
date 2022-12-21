import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {

    getBookmarks(userId: number){
        return this.bookmarkService.getBookmarks(userId)
    }

    createBookmark(userId: number, dto: CreateBookmarkDto){}

    getBookmarkById(userId: number, bookmarkId: number){}

    editBookmarkById(userId: number, dto: EditBookmarkDto){}

    deleteBookmarkById(userId: number, bookmarkId: number){}

}
