import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { popupAnimations } from '../../animations/popup-animations'
import { BoardService } from '../../services/board.service'
import { BoardMembersInterface } from '../../types/board-members.interface'

@Component({
    selector: 'app-board-members-popup',
    templateUrl: './board-members-popup.component.html',
    styleUrls: ['./board-members-popup.component.scss'],
    animations: popupAnimations
})
export class BoardMembersPopupComponent implements OnInit {
    
    @Input() boardId: number
    @Output() onClose = new EventEmitter()
    
    loading: boolean = false
    boardMembersData: BoardMembersInterface
    showAddMemberPopup: boolean = false
    
    constructor(private boardService: BoardService) {
    }
    
    ngOnInit(): void {
        this.loading = true
        
        this.boardService.getBoardMembers(this.boardId).subscribe((boardMembersData) => {
            this.boardMembersData = boardMembersData
            this.loading = false
        })
    }
    
    getCurrentBoardAdminEmails(): string[] {
        return this.boardMembersData.members
            .filter(member => member.isAdmin)
            .map(member => member.email)
    }
    
    getCurrentBoardMemberEmails(): string[] {
        return this.boardMembersData.members
            .filter(member => !member.isAdmin)
            .map(member => member.email)
    }
    
}