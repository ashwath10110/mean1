import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ClientsState } from "@app/state/clients/clients.model";
import { selectAllTenants, selectClientsLoading, selectClientsIsLoaded } from "@app/state/clients/clients.selectors";
import { ActionGetTenants, ActionDeleteTenant, ActionGetTenantDetails } from "@app/state/clients/clients.actions";

@Injectable()

export class ClientsFacade {

    allTenants$ = this.store.select(selectAllTenants);
    loading$ = this.store.select(selectClientsLoading);
    tenantsIsLoaded$ = this.store.select(selectClientsIsLoaded);

    constructor(private store: Store<any>) { }

    loadAllTenants() {
        this.store.dispatch(
            new ActionGetTenants({})
        );
    }

    deleteTenant(payload) {
        this.store.dispatch(
            new ActionDeleteTenant(payload)
        );
    }

    getTenantDetails(payload) {
        this.store.dispatch(
            new ActionGetTenantDetails(payload)
        );
    }

}
