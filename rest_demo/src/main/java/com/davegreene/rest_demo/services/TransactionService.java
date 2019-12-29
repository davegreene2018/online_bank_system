/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.services;


import com.davegreene.rest_demo.databases.Database;
import com.davegreene.rest_demo.models.Account;
import com.davegreene.rest_demo.models.Transaction;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class TransactionService {
          
    Database d = new Database();
    private List<Transaction> transactionList = d.getTransactionDB();
    private List<Account> accountList = d.getAccountDB();
    
    
    public List<Transaction> getAllTransaction() {
        return transactionList;
    }
        
    public Transaction getTransaction(int id) {
        return transactionList.get(id-1);
    }
    
    public Transaction createTransaction(Transaction m) {
	m.setTransId(transactionList.size() + 1);
	transactionList.add(m);

	return m;
    }
     public Transaction createUserTransaction(int id, Transaction m) {
	m.setTransId(transactionList.size() + 1);
	transactionList.add(m);
        accountList.get(id-1).setCurBal(m.getPostBalance());
        accountList.get(id-1).getTransactions().add((javax.transaction.Transaction) m);
        
	return m;
    }
    public Transaction updateTransaction(int id, Transaction m) {
       Date date = transactionList.get(id-1).getDate();
       m.setDate(date);
       transactionList.set(id-1,m);
       return m;
    }
   
    public Transaction deleteTransaction(int id) {
       Transaction transaction = transactionList.get(id-1);
       transactionList.remove(transaction);
       return transaction;
    }
    public Transaction createDeposit(int id, double ammount) {
	double postBalance = accountList.get(id).getCurBal() + ammount;
        Transaction m = new Transaction(1,"Credit", "Deposit" + ammount, postBalance);
        return createUserTransaction(id, m);
    }
     
     public Transaction createWithdraw(int id, double ammount) {
	double postBalance = accountList.get(id).getCurBal() - ammount;
        Transaction m = new Transaction(1,"Credit", "Withdraw" + ammount, postBalance);
        return createUserTransaction(id, m);
    }
     
     public Transaction createTransfer(int fromAccId, int toAccId, double ammount) {
	double fromPostBalance = accountList.get(fromAccId).getCurBal() - ammount;
        double toPostBalance = accountList.get(toAccId).getCurBal() + ammount;
        Transaction fromTransfer = new Transaction(1,"Debit", "Transfer" + ammount, fromPostBalance);
         Transaction toTransfer = new Transaction(1,"Debit", "Transfer" + ammount, toPostBalance);
        return createUserTransaction(fromAccId, fromTransfer);
    }
    

    public Account transfer(int id, Account m){
        
       accountList.set(id-1,m);
       return m;     
    }
    
    
    
}
