import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectApprovalsList, selectApprovalsLoading } from "@app/state/approvals/approvals.selectors";
import { ActionGetApprovals, ActionSetCurrentApproval, ActionSetCurrentApprovedData, ActionBulkApprove, ActionBulkReject } from "@app/state/approvals/approvals.actions";

@Injectable()

export class ApprovalsFacade {

    allApprovals$ = this.store.select(selectApprovalsList);
    loading$ = this.store.select(selectApprovalsLoading);

    constructor(private store: Store<any>) { }

    getAllApprovals() {
        this.store.dispatch(
            new ActionGetApprovals(
                {}
            )
        );
    }

    saveCurrentApprovalToState(payload) {
        this.store.dispatch(
            new ActionSetCurrentApproval(payload)
        );
    }

    saveAlreadyExistingDataToState(payload) {
        this.store.dispatch(
            new ActionSetCurrentApprovedData(payload.data)
        );
    }

    bulkApprovals(payload) {
        this.store.dispatch(
            new ActionBulkApprove(payload)
        );
    }

    bulkRejects(payload) {
        this.store.dispatch(
            new ActionBulkApprove(payload)
        );
    }

    approve(payload){
        this.store.dispatch(
            new ActionBulkApprove(payload)
        );
    }

}
