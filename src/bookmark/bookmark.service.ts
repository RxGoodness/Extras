import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
 constructor(private bookmarkService:BookmarkService){}
    getBookmarks(userId: number){
        return this.bookmarkService.getBookmarks(userId)
    }

    createBookmark(userId: number, dto: CreateBookmarkDto){
        return this.bookmarkService.createBookmark(userId, dto)

    }

    getBookmarkById(userId: number, bookmarkId: number){
        return this.bookmarkService.getBookmarkById(userId, bookmarkId)
        
    }

    editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto){
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto)

    }

    deleteBookmarkById(userId: number, bookmarkId: number){
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
    }

}
