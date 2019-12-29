package com.davegreene.rest_demo.resources;

import com.davegreene.rest_demo.models.Transaction;
import com.davegreene.rest_demo.services.TransactionService;
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
public class TransactionResource {
    
    TransactionService transactionService = new TransactionService();
  
    @GET
    @Path("/transaction")
    public List<Transaction> getTransactions() {
        System.out.println("Getting transactions");
        List<Transaction> transactionList = transactionService.getAllTransaction();
        return transactionList;
    }
    
    @GET
    @Path("/transaction/{transactionId}")
    public Transaction getTransaction(@PathParam("transactionId") int id) {
        System.out.println("Getting transaction with ID="+id);
        return transactionService.getTransaction(id);
    }
    
    @PUT
    @Path("/transaction/{transactionId}")
    public Transaction setTransaction(@PathParam("transactionId") int id, Transaction m) {
        System.out.println("Updating transaction with ID="+id);
        return transactionService.updateTransaction(id,m);
    }

    @POST
    @Path("/transaction")
    public Transaction postTransaction(Transaction m) {
        System.out.println("Creating new transaction");
	return transactionService.createTransaction(m);
    }
    
    @POST
    @Path("/deposit/{ammount}")
    public Transaction postDeposit (@PathParam("accId") int accId,@PathParam("ammount") double ammount) {
        System.out.println("Creating new deposit");
	return transactionService.createDeposit(accId,ammount);
        
    }
    
    @POST
    @Path("/withdraw/{ammount}")
    public Transaction postWithdraw (@PathParam("accId") int accId,@PathParam("ammount") double ammount) {
        System.out.println("Creating new withdraw");
	return transactionService.createDeposit(accId,ammount);
        
    }
    
  //  @POST
    //@Path("/transfer/{ammount}/{toAccId}")
    //public Transaction postTransfer (@PathParam("accId") int accId,@PathParam("ammount") double ammount) {
      //  System.out.println("Creating new withdraw");
	//return transactionService.createTransfer(accId,ammount);
        
  //  }
    
    @DELETE 
    @Path("/transaction/{transactionId}")
    public Transaction deleteTransaction(@PathParam("transactionId") int id) {
        System.out.println("Deleting transaction "+id);
	Transaction transaction = transactionService.deleteTransaction(id);
        return transaction;
    }
}
