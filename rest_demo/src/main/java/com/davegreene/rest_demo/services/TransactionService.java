/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.services;


import com.davegreene.rest_demo.databases.Database;
import com.davegreene.rest_demo.models.Transaction;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class TransactionService {
          
    Database d = new Database();
    private List<Transaction> transactionList = d.getTransactionDB();
    
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
    
    public Transaction updateTransaction(int id, Transaction m) {
       transactionList.set(id-1,m);
       return m;
    }
   
    public Transaction deleteTransaction(int id) {
       Transaction transaction = transactionList.get(id-1);
       transactionList.remove(transaction);
       return transaction;
    }
}
