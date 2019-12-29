/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.davegreene.rest_demo.models;

import java.util.Date;
import java.util.List;
import javax.transaction.Transaction;

/**
 *
 * @author Daveg
 */
public class Account {
    
    private int accId;
    private String sortCode;
    private int accNum;
    private double curBal;
    private Date date;
    private List<Transaction> transactions;
    private List<Account> accounts;
    private String functions;

    public Account() {
    }

    public Account(int accId, String sortCode, int accNum, double curBal, List<Transaction> transactions, List<Account> accounts) {
        this.accId = accId;
        this.sortCode = sortCode;
        this.accNum = accNum;
        this.curBal = curBal;
        this.date = new Date();
        this.transactions = transactions;
        this.accounts = accounts;
    }

    public Account(int accId, String sortCode, int accNum, double curBal) {
        this.accId = accId;
        this.sortCode = sortCode;
        this.accNum = accNum;
        this.curBal = curBal;
        //this.dateAdded = new Date();
    }


    public int getAccId() {
        return accId;
    }

    public void setAccId(int accId) {
        this.accId = accId;
    }

    public String getSortCode() {
        return sortCode;
    }

    public void setSortCode(String sortCode) {
        this.sortCode = sortCode;
    }

    public int getAccNum() {
        return accNum;
    }

    public void setAccNum(int accNum) {
        this.accNum = accNum;
    }

    public double getCurBal() {
        return curBal;
    }

    public void setCurBal(double curBal) {
        this.curBal = curBal;
    }
    
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }
    
     public String getFunctions() {
        functions = "<div class='function_buttons'><ul>";
        functions += "<li class='function_edit'><a data-id='"+accId+" 'data-name='"+sortCode+"'><span>Edit</span></a></li>";
        functions += "<li class='function_delete'><a data-id='"+accId+" 'data-name='"+sortCode+"'><span>Delete</span></a></li>";
        functions += "</ul></div>";
        return functions;
    }
    
    private void setFunctions(String functions) {
        // dummy setter 
    }
}
