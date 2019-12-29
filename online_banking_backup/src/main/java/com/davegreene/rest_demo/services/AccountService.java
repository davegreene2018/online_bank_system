/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.services;


import com.davegreene.rest_demo.databases.Database;
import com.davegreene.rest_demo.models.Account;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class AccountService {
          
    Database d = new Database();
    private List<Account> accountList = d.getAccountDB();
    
    public List<Account> getAllAccount() {
        return accountList;
    }
        
    public Account getAccount(int accId) {
        return accountList.get(accId-1);
    }
    
    public Account createAccount(Account m) {
	m.setAccId(accountList.size() + 1);
	accountList.add(m);
	return m;
    }
    
    public Account updateAccount(int accId, Account m) {
       Date date = accountList.get(accId-1).getDate();
       m.setDate(date);
       accountList.set(accId-1,m);
       return m;
    }
   
    public Account deleteAccount(int accId) {
       Account account = accountList.get(accId-1);
       accountList.remove(account);
       return account;
    }
}
