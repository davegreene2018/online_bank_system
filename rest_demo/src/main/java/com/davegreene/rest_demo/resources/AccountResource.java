package com.davegreene.rest_demo.resources;

import com.davegreene.rest_demo.models.Account;
import com.davegreene.rest_demo.services.AccountService;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Date;


@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AccountResource {
    
    AccountService accountService = new AccountService();
  
    @GET
    @Path("/customer")
    public List<Account> getAccounts() {
        System.out.println("Getting accounts");
        List<Account> accountList = accountService.getAllAccount();
        return accountList;
    }
    
    @GET
    @Path("/account/{accountId}")
    public Account getAccount(@PathParam("accountId") int id) {
        System.out.println("Getting account with ID="+id);
        return accountService.getAccount(id);
    }
    
    @PUT
    @Path("/account/{accountId}")
    public Account setAccount(@PathParam("accoundId") int id, Account m) {
        System.out.println("Updating account with ID="+id);
        return accountService.updateAccount(id,m);
    }

    @POST
    @Path("/account")
    public Account postAccount(Account m) {
        System.out.println("Creating new account");
	return accountService.createAccount(m);
    }
    
    @DELETE 
    @Path("/account/{accountId}")
    public Account deleteAccount(@PathParam("accountId") int id) {
        System.out.println("Deleting account "+id);
	Account account = accountService.deleteAccount(id);
        return account;
    }
}
